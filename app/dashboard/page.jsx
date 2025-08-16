import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { DollarSign, TrendingUp, Clock, FileText, AlertCircle, Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data
const dashboardData = {
  summary: {
    profitYTD: 45000,
    invoiced: 68000,
    expenses: 23000,
    unbilledHours: 12,
  },
  recentActivities: {
    timeEntries: [
      { id: 1, project: "Acme Website", hours: 3, date: "2024-01-20" },
      { id: 2, project: "Brand Design", hours: 2.5, date: "2024-01-19" },
      { id: 3, project: "Mobile App", hours: 4, date: "2024-01-18" },
    ],
    expenses: [
      { id: 1, project: "Acme Website", amount: 45, category: "Software", date: "2024-01-20" },
      { id: 2, project: "Brand Design", amount: 120, category: "Stock Photos", date: "2024-01-19" },
    ],
    invoices: [
      { id: 1, client: "Acme Corp", amount: 2400, status: "Sent", date: "2024-01-18" },
      { id: 2, client: "Tech Startup", amount: 1800, status: "Paid", date: "2024-01-15" },
    ],
  },
  unpaidInvoices: [
    { id: 1, client: "Acme Corp", amount: 2400, dueDate: "2024-02-01", overdue: false },
    { id: 2, client: "Local Business", amount: 950, dueDate: "2024-01-25", overdue: true },
  ],
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/time-tracking?create=true">
              <Button className="hover:bg-gray-100">
                <Plus className="mr-2 h-4 w-4" />
                Log Time
              </Button>
            </Link>
            <Link href="/invoices?create=true">
              <Button variant="outline" className="hover:bg-gray-100">
                <FileText className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit YTD</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${dashboardData.summary.profitYTD.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardData.summary.invoiced.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${dashboardData.summary.expenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unbilled Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{dashboardData.summary.unbilledHours}</div>
              <p className="text-xs text-muted-foreground">Ready to invoice</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Action Required</p>
                <p className="text-sm text-orange-700">
                  You have {dashboardData.summary.unbilledHours} unbilled hours and 1 overdue invoice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest time entries and expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Time Entries</h4>
                <div className="space-y-2">
                  {dashboardData.recentActivities.timeEntries.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">{entry.project}</span>
                        <span className="text-gray-500 ml-2">{entry.date}</span>
                      </div>
                      <Badge variant="secondary">{entry.hours}h</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recent Expenses</h4>
                <div className="space-y-2">
                  {dashboardData.recentActivities.expenses.map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">{expense.category}</span>
                        <span className="text-gray-500 ml-2">{expense.project}</span>
                      </div>
                      <span className="font-medium">${expense.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unpaid Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Unpaid Invoices</CardTitle>
              <CardDescription>Invoices awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.unpaidInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.client}</p>
                      <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${invoice.amount}</p>
                      <Badge variant={invoice.overdue ? "destructive" : "secondary"}>
                        {invoice.overdue ? "Overdue" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-transparent" variant="outline">
                View All Invoices
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to keep your business running</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent hover:bg-gray-200">
                <Clock className="h-6 w-6" />
                <span>Log Time</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent hover:bg-gray-200">
                <DollarSign className="h-6 w-6" />
                <span>Add Expense</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent hover:bg-gray-200">
                <FileText className="h-6 w-6" />
                <span>Create Invoice</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
