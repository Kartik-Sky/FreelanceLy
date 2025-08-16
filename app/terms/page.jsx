"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BusinessFlow</span>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="bg-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign Up
            </Button>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Terms of Service</CardTitle>
            <p className="text-center text-muted-foreground">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using BusinessFlow ("Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use License</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Permission is granted to temporarily access BusinessFlow for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained in BusinessFlow</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                  You are responsible for safeguarding the password and for maintaining the security of your account.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You may not use another person's account or misrepresent your identity or affiliation with any person or organization.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                  to understand our practices.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Service Availability</h2>
                <p className="text-gray-700 leading-relaxed">
                  We strive to provide continuous service availability, but we do not guarantee that the Service will be available 
                  at all times. We may suspend or discontinue the Service at any time, with or without notice.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitations</h2>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall BusinessFlow or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
                  the materials on BusinessFlow, even if BusinessFlow or its authorized representative has been notified orally 
                  or in writing of the possibility of such damage.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Revisions and Errata</h2>
                <p className="text-gray-700 leading-relaxed">
                  The materials appearing on BusinessFlow could include technical, typographical, or photographic errors. 
                  BusinessFlow does not warrant that any of the materials on its website are accurate, complete, or current.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at legal@businessflow.com.
                </p>
              </section>
            </div>

            <div className="text-center mt-8 pt-6 border-t">
              <Link href="/signup">
                <Button className="px-8">
                  Back to Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}