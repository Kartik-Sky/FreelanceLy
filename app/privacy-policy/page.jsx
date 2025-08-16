"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, ArrowLeft, Shield, Eye, Cookie, Mail } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
            <CardTitle className="text-3xl text-center flex items-center justify-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              Privacy Policy
            </CardTitle>
            <p className="text-center text-muted-foreground">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 mb-6">
              <p className="text-blue-800 font-medium">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use BusinessFlow.
              </p>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Information We Collect
                </h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Personal Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                      When you create an account, we collect your name, email address, phone number, and password. 
                      This information is necessary to provide our services and communicate with you.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Usage Data</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We automatically collect information about how you use our service, including your IP address, 
                      browser type, pages visited, and time spent on our platform.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and administrative messages</li>
                  <li>Respond to comments, questions, and customer service requests</li>
                  <li>Monitor and analyze trends and usage patterns</li>
                  <li>Detect, investigate, and prevent fraudulent transactions</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With trusted service providers who help us operate our business</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-blue-600" />
                  Cookies and Tracking
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. 
                  You can control cookie preferences through your browser settings, but disabling cookies may affect 
                  the functionality of our service.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
                  storage is 100% secure.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Object to processing of your data</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only for as long as necessary to provide our services and fulfill 
                  the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting 
                  the new policy on this page and updating the "last updated" date.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-3">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@businessflow.com<br />
                    <strong>Address:</strong> BusinessFlow Privacy Team<br />
                    123 Business Street, Suite 100<br />
                    Business City, BC 12345
                  </p>
                </div>
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