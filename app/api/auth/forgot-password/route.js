import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { email } = body

    // Validate email is provided
    if (!email) {
      return NextResponse.json(
        { message: "Email address is required" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    // Call your Node.js server for email verification and sending
    const nodeServerResponse = await fetch(`${process.env.SERVER_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NODE_SERVER_API_KEY}` // Optional: API key for security
      },
      body: JSON.stringify({ email })
    })

    const nodeData = await nodeServerResponse.json()

    // Handle different responses from Node server
    if (nodeServerResponse.ok) {
      return NextResponse.json(
        { 
          message: "If this email is registered with us, you'll receive password reset instructions shortly.",
          success: true 
        },
        { status: 200 }
      )
    } else {
      // Handle specific error cases from Node server
      if (nodeServerResponse.status === 404) {
        // For security, we don't want to reveal if email exists or not
        // So we return success message even if email doesn't exist
        return NextResponse.json(
          { 
            message: "If this email is registered with us, you'll receive password reset instructions shortly.",
            success: true 
          },
          { status: 200 }
        )
      } else if (nodeServerResponse.status === 429) {
        return NextResponse.json(
          { message: "Too many requests. Please try again later." },
          { status: 429 }
        )
      } else {
        return NextResponse.json(
          { message: nodeData.message || "Failed to process request. Please try again." },
          { status: nodeServerResponse.status }
        )
      }
    }

  } catch (error) {
    console.error('Forgot password API error:', error)
    
    // Handle network errors or Node server unavailable
    if (error.code === 'ECONNREFUSED' || error.name === 'FetchError') {
      return NextResponse.json(
        { message: "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  )
}