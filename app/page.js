import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Clock, DollarSign, FileText, TrendingUp, Users, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const features = [
  { icon: Clock, title: "Time Tracking", description: "Track billable hours with precision" },
  { icon: DollarSign, title: "Expense Logging", description: "Log and categorize business expenses" },
  { icon: FileText, title: "Invoicing", description: "Create professional invoices instantly" },
  { icon: TrendingUp, title: "Stripe Payments", description: "Get paid online securely" },
  { icon: Users, title: "Profit Reports", description: "Real-time project profitability insights" },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    quote: "BusinessFlow transformed how I manage my projects. I've increased my profit margins by 30%!",
  },
  {
    name: "Mike Rodriguez",
    role: "Web Developer",
    quote: "Finally, a tool that actually understands freelancer needs. The time tracking is seamless.",
  },
  {
    name: "Emma Thompson",
    role: "Marketing Consultant",
    quote: "The invoicing feature alone has saved me hours each week. Highly recommended!",
  },
]

const faq = [
  {
    q: "Is my data secure?",
    a: "Yes, we use industry-standard encryption and security measures to protect your data.",
  },
  {
    q: "Can I integrate with my existing tools?",
    a: "We offer integrations with popular tools and APIs for seamless workflow integration.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards and process payments securely through Stripe.",
  },
  { q: "Is there a free trial?", a: "Yes, we offer a 14-day free trial with full access to all features." },
]

const comparisonData = [
  { feature: "Time Tracking", businessFlow: true, spreadsheets: false, generic: true },
  { feature: "Automated Invoicing", businessFlow: true, spreadsheets: false, generic: false },
  { feature: "Real-time Profitability", businessFlow: true, spreadsheets: false, generic: false },
  { feature: "Online Payments", businessFlow: true, spreadsheets: false, generic: true },
  { feature: "Expense Categorization", businessFlow: true, spreadsheets: true, generic: true },
  { feature: "Client Management", businessFlow: true, spreadsheets: false, generic: true },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BusinessFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Trusted by 10,000+ freelancers
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Time Tracking & Invoicing
            <span className="text-blue-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track time, log expenses, send invoices, and get paid online with real-time project profitability insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Watch Demo
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="BusinessFlow Dashboard"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl border"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to run your business</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From time tracking to getting paid, we've got you covered with powerful features designed for modern
              freelancers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Set up your projects and clients in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Track</h3>
              <p className="text-gray-600">Log time and expenses as you work</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Invoice & Profit</h3>
              <p className="text-gray-600">Generate invoices and track profitability in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why choose BusinessFlow?</h2>
            <p className="text-xl text-gray-600">See how we compare to spreadsheets and generic tools</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-6 font-semibold">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">BusinessFlow</th>
                    <th className="text-center py-4 px-6 font-semibold">Spreadsheets</th>
                    <th className="text-center py-4 px-6 font-semibold">Generic Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="text-center py-4 px-6">
                        {row.businessFlow ? (
                          <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {row.spreadsheets ? (
                          <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        {row.generic ? (
                          <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What our users say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied freelancers and small business owners</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about BusinessFlow</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your business?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of freelancers who've already made the switch</p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6" />
                <span className="text-xl font-bold">BusinessFlow</span>
              </div>
              <p className="text-gray-400">
                The complete business management solution for freelancers and small businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BusinessFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
