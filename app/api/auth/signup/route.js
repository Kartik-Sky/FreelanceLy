export async function POST(req) {
    try {
      const body = await req.json()
  
      const response = await fetch(`${process.env.SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      })
      console.log(response);
      const data = await response.json()
  
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error("Error proxying signup:", error)
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  }
  