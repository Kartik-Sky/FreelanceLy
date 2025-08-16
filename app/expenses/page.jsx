"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, DollarSign, Upload, Search, Filter } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data
const expensesData = [
  {
    id: 1,
    date: "2024-01-20",
    project: "Website Redesign",
    client: "Acme Corp",
    amount: 45.99,
    category: "Software",
    description: "Figma Pro subscription",
    receipt: "receipt_001.pdf",
    billable: true,
  },
  {
    id: 2,
    date: "2024-01-19",
    project: "Mobile App",
    client: "Tech Startup",
    amount: 120.0,
    category: "Stock Photos",
    description: "Premium stock photo bundle",
    receipt: "receipt_002.pdf",
    billable: true,
  },
  {
    id: 3,
    date: "2024-01-18",
    project: "Brand Identity",
    client: "Local Business",
    amount: 25.5,
    category: "Office Supplies",
    description: "Printing and materials",
    receipt: null,
    billable: true,
  },
  {
    id: 4,
    date: "2024-01-17",
    project: "Internal",
    client: "BusinessFlow",
    amount: 89.99,
    category: "Software",
    description: "Adobe Creative Suite",
    receipt: "receipt_004.pdf",
    billable: false,
  },
]

const projectsData = [
  { id: 1, name: "Website Redesign", client: "Acme Corp" },
  { id: 2, name: "Mobile App", client: "Tech Startup" },
  { id: 3, name: "Brand Identity", client: "Local Business" },
  { id: 4, name: "Internal", client: "BusinessFlow" },
]

const categories = [
  "Software",
  "Hardware",
  "Office Supplies",
  "Travel",
  "Meals",
  "Stock Photos",
  "Marketing",
  "Professional Services",
  "Other",
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(expensesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split("T")[0],
    projectId: "",
    amount: "",
    category: "",
    description: "",
    billable: true,
  })

  const handleAddExpense = () => {
    const selectedProject = projectsData.find((p) => p.id.toString() === newExpense.projectId)

    const newExpenseData = {
      id: expenses.length + 1,
      date: newExpense.date,
      project: selectedProject?.name || "",
      client: selectedProject?.client || "",
      amount: Number.parseFloat(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description,
      receipt: null,
      billable: newExpense.billable,
    }

    setExpenses([...expenses, newExpenseData])
    setIsAddDialogOpen(false)
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      projectId: "",
      amount: "",
      category: "",
      description: "",
      billable: true,
    })
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
    setNewExpense({
      date: expense.date,
      projectId: projectsData.find((p) => p.name === expense.project)?.id.toString() || "",
      amount: expense.amount.toString(),
      category: expense.category,
      description: expense.description,
      billable: expense.billable,
    })
    setIsAddDialogOpen(true)
  }

  const handleUpdateExpense = () => {
    if (!editingExpense) return

    const selectedProject = projectsData.find((p) => p.id.toString() === newExpense.projectId)

    const updatedExpenses = expenses.map((expense) =>
      expense.id === editingExpense.id
        ? {
            ...expense,
            date: newExpense.date,
            project: selectedProject?.name || "",
            client: selectedProject?.client || "",
            amount: Number.parseFloat(newExpense.amount),
            category: newExpense.category,
            description: newExpense.description,
            billable: newExpense.billable,
          }
        : expense,
    )

    setExpenses(updatedExpenses)
    setIsAddDialogOpen(false)
    setEditingExpense(null)
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      projectId: "",
      amount: "",
      category: "",
      description: "",
      billable: true,
    })
  }

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const billableExpenses = expenses
    .filter((expense) => expense.billable)
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-600">Track and manage your business expenses</p>
          </div>
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) {
                setEditingExpense(null)
                setNewExpense({
                  date: new Date().toISOString().split("T")[0],
                  projectId: "",
                  amount: "",
                  category: "",
                  description: "",
                  billable: true,
                })
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-white">
              <DialogHeader>
                <DialogTitle>{editingExpense ? "Edit Expense" : "Add Expense"}</DialogTitle>
                <DialogDescription>
                  {editingExpense ? "Update your expense details" : "Add a new business expense"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project" className="text-right">
                    Project
                  </Label>
                  <Select
                    value={newExpense.projectId}
                    onValueChange={(value) => setNewExpense({ ...newExpense, projectId: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50 ">
                      {projectsData.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()} className="hover:bg-gray-200">
                          {project.name} - {project.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50 ">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="hover:bg-gray-200">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="What was this expense for?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Receipt</Label>
                  <div className="col-span-3">
                    <Button variant="outline" size="sm" onClick={()=>{console.log("Upload")}}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Receipt
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="billable" className="text-right">
                    Billable
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={newExpense.billable.toString()}
                      onValueChange={(value) => setNewExpense({ ...newExpense, billable: value === "true" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50 ">
                        <SelectItem value="true"  className ="hover:bg-gray-200">Billable</SelectItem>
                        <SelectItem value="false" className ="hover:bg-gray-200">Non-billable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={editingExpense ? handleUpdateExpense : handleAddExpense}
                  disabled={!newExpense.projectId || !newExpense.amount || !newExpense.category}
                >
                  {editingExpense ? "Update Expense" : "Add Expense"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billable Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${billableExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Can be invoiced</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(expenses.map((e) => e.category)).size}</div>
              <p className="text-xs text-muted-foreground">Expense categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Records</CardTitle>
            <CardDescription>View and manage all your business expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Billable</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{expense.project}</div>
                        <div className="text-sm text-muted-foreground">{expense.client}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{expense.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{expense.description}</TableCell>
                    <TableCell className="font-mono">${expense.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {expense.receipt ? (
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={expense.billable ? "default" : "secondary"}>
                        {expense.billable ? "Billable" : "Non-billable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditExpense(expense)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteExpense(expense.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
