"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Search, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data
const unpaidInvoicesData = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    client: "Acme Corp",
    project: "Website Redesign",
    amount: 2400.0,
    dueDate: "2024-02-15",
    status: "Sent",
    paymentLink: "https://pay.businessflow.com/inv-001",
  },
  {
    id: 3,
    invoiceNumber: "INV-003",
    client: "Local Business",
    project: "Brand Identity",
    amount: 1200.0,
    dueDate: "2024-02-20",
    status: "Sent",
    paymentLink: "https://pay.businessflow.com/inv-003",
  },
  {
    id: 4,
    invoiceNumber: "INV-004",
    client: "Design Agency",
    project: "E-commerce Platform",
    amount: 4800.0,
    dueDate: "2024-01-30",
    status: "Overdue",
    paymentLink: "https://pay.businessflow.com/inv-004",
  },
]

const paymentHistoryData = [
  {
    id: 1,
    invoiceNumber: "INV-002",
    client: "Tech Startup",
    amount: 3600.0,
    paymentDate: "2024-01-25",
    paymentMethod: "Credit Card",
    transactionId: "txn_1234567890",
    status: "Completed",
  },
  {
    id: 2,
    invoiceNumber: "INV-005",
    client: "Marketing Agency",
    amount: 1800.0,
    paymentDate: "2024-01-20",
    paymentMethod: "Bank Transfer",
    transactionId: "txn_0987654321",
    status: "Completed",
  },
  {
    id: 3,
    invoiceNumber: "INV-006",
    client: "Startup Co",
    amount: 950.0,
    paymentDate: "2024-01-18",
    paymentMethod: "Credit Card",
    transactionId: "txn_1122334455",
    status: "Completed",
  },
]

export default function PaymentsPage() {
  const [unpaidInvoices, setUnpaidInvoices] = useState(unpaidInvoicesData)
  const [paymentHistory, setPaymentHistory] = useState(paymentHistoryData)
  const [searchTerm, setSearchTerm] = useState("")

  const handlePayOnline = (invoiceId) => {
    // Simulate opening Stripe checkout
    const invoice = unpaidInvoices.find((inv) => inv.id === invoiceId)
    if (invoice) {
      // In a real app, this would open Stripe checkout
      alert(`Opening payment page for ${invoice.invoiceNumber}`)
    }
  }

  const handleMarkAsPaid = (invoiceId) => {
    const invoice = unpaidInvoices.find((inv) => inv.id === invoiceId)
    if (invoice) {
      // Move to payment history
      const newPayment = {
        id: paymentHistory.length + 1,
        invoiceNumber: invoice.invoiceNumber,
        client: invoice.client,
        amount: invoice.amount,
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "Manual",
        transactionId: `txn_${Date.now()}`,
        status: "Completed",
      }

      setPaymentHistory([newPayment, ...paymentHistory])
      setUnpaidInvoices(unpaidInvoices.filter((inv) => inv.id !== invoiceId))
    }
  }

  const filteredPaymentHistory = paymentHistory.filter(
    (payment) =>
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalUnpaid = unpaidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
  const overdueAmount = unpaidInvoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage invoice payments and track payment history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${totalUnpaid.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${overdueAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Past due date</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalPaid.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Received payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active methods</p>
            </CardContent>
          </Card>
        </div>

        {/* Unpaid Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Unpaid Invoices</CardTitle>
            <CardDescription>Invoices awaiting payment with online payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unpaidInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono">{invoice.invoiceNumber}</TableCell>
                    <TableCell className="font-medium">{invoice.client}</TableCell>
                    <TableCell>{invoice.project}</TableCell>
                    <TableCell className="font-mono">${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === "Overdue" ? "destructive" : "secondary"}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handlePayOnline(invoice.id)}
                          className="bg-blue-600 text-white border border-black hover:bg-white hover:text-black transition-colors"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay Online
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => window.open(invoice.paymentLink, "_blank")}
                            className="bg-white text-black border border-black hover:bg-grey-600 hover:text-black transition-colors"

                            >
                          <ExternalLink className=" mr-2 h-4 w-4" />
                          Payment Link
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleMarkAsPaid(invoice.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Paid
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Track all completed payments and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payment history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono">{payment.invoiceNumber}</TableCell>
                    <TableCell className="font-medium">{payment.client}</TableCell>
                    <TableCell className="font-mono text-green-600">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>Configure your payment methods and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Stripe Integration</h3>
                <p className="text-sm text-gray-600">Accept credit card payments online</p>
              </div>
              <Badge variant="default">Connected</Badge>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">PayPal Integration</h3>
                <p className="text-sm text-gray-600">Accept PayPal payments</p>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Bank Transfer</h3>
                <p className="text-sm text-gray-600">Direct bank transfer details</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
