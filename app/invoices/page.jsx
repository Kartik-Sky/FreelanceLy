"use client"

import { useState, useEffect } from "react"
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
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, FileText, Send, Download, Search, Eye, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useSearchParams, useRouter} from 'next/navigation'


// Mock data
const invoicesData = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    client: "Acme Corp",
    project: "Website Redesign",
    amount: 2400.0,
    status: "Sent",
    dueDate: "2024-02-15",
    createdDate: "2024-01-15",
    items: [
      {name:"Designing", description: "Website Design", quantity: 1, rate: 1500, amount: 1500 },
      {name:"Develop The work", description: "Development", quantity: 1, rate: 900, amount: 900 },
    ],
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    client: "Tech Startup",
    project: "Mobile App",
    amount: 3600.0,
    status: "Paid",
    dueDate: "2024-02-01",
    createdDate: "2024-01-01",
    items: [{ description: "App Development", quantity: 1, rate: 3600, amount: 3600 }],
  },
  {
    id: 3,
    invoiceNumber: "INV-003",
    client: "Local Business",
    project: "Brand Identity",
    amount: 1200.0,
    status: "Draft",
    dueDate: "2024-02-20",
    createdDate: "2024-01-20",
    items: [
      { description: "Logo Design", quantity: 1, rate: 800, amount: 800 },
      { description: "Brand Guidelines", quantity: 1, rate: 400, amount: 400 },
    ],
  },
  {
    id: 4,
    invoiceNumber: "INV-004",
    client: "Design Agency",
    project: "E-commerce Platform",
    amount: 4800.0,
    status: "Overdue",
    dueDate: "2024-01-30",
    createdDate: "2024-01-10",
    items: [{ description: "Platform Development", quantity: 1, rate: 4800, amount: 4800 }],
  },
]

const clientsData = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "Tech Startup" },
  { id: 3, name: "Local Business" },
  { id: 4, name: "Design Agency" },
]

const projectsData = [
  { id: 1, name: "Website Redesign", client: "Acme Corp" },
  { id: 2, name: "Mobile App", client: "Tech Startup" },
  { id: 3, name: "Brand Identity", client: "Local Business" },
  { id: 4, name: "E-commerce Platform", client: "Design Agency" },
]

export default function InvoicesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [invoices, setInvoices] = useState(invoicesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)
  const [newInvoice, setNewInvoice] = useState({
    clientId: "",
    projectId: "",
    dueDate: "",
    items: [{name:"", description: "", quantity: 1, rate: 0 }],
    notes: "",
  })

  const calculateItemAmount = (quantity, rate) => quantity * rate

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + calculateItemAmount(item.quantity, item.rate), 0)
  }

  const handleAddInvoice = () => {
    const selectedClient = clientsData.find((c) => c.id.toString() === newInvoice.clientId)
    const selectedProject = projectsData.find((p) => p.id.toString() === newInvoice.projectId)

    const invoiceItems = newInvoice.items.map((item) => ({
      ...item,
      amount: calculateItemAmount(item.quantity, item.rate),
    }))

    const newInvoiceData = {
      id: invoices.length + 1,
      invoiceNumber: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      client: selectedClient?.name || "",
      project: selectedProject?.name || "",
      amount: calculateTotal(newInvoice.items),
      status: "Draft",
      dueDate: newInvoice.dueDate,
      createdDate: new Date().toISOString().split("T")[0],
      items: invoiceItems,
    }

    setInvoices([...invoices, newInvoiceData])
    setIsAddDialogOpen(false)
    setNewInvoice({
      clientId: "",
      projectId: "",
      dueDate: "",
      items: [{name:"", description: "", quantity: 1, rate: 0 }],
      notes: "",
    })
  }

  const handleAddItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, {name:"", description: "", quantity: 1, rate: 0 }],
    })
  }

  const handleRemoveItem = (index) => {
    if (newInvoice.items.length > 1) {
      const updatedItems = newInvoice.items.filter((_, i) => i !== index)
      setNewInvoice({ ...newInvoice, items: updatedItems })
    }
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = newInvoice.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setNewInvoice({ ...newInvoice, items: updatedItems })
  }

  const handleStatusChange = (invoiceId, newStatus) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice,
    )
    setInvoices(updatedInvoices)
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Sent":
        return "secondary"
      case "Draft":
        return "outline"
      case "Overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidInvoices = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingInvoices = invoices
    .filter((invoice) => invoice.status === "Sent")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
    
    
    useEffect(() => {
      const shouldOpen = searchParams.get("create") === "true"
      if (shouldOpen) {
        setIsAddDialogOpen(true)
        // Clean URL so it doesn’t reopen on refresh
        router.replace('/invoices', { scroll: false })
      }
    }, [searchParams])
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-600">Create, send, and track your invoices</p>
          </div>
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) {
                setEditingInvoice(null)
                setNewInvoice({
                  clientId: "",
                  projectId: "",
                  dueDate: "",
                  items: [{name:"", description: "", quantity: 1, rate: 0 }],
                  notes: "",
                })
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1200px] max-h-[80vh] overflow-y-auto bg-white">

              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Create a new invoice for your client</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right">
                    Client
                  </Label>
                  <Select
                    value={newInvoice.clientId}
                    onValueChange={(value) => setNewInvoice({ ...newInvoice, clientId: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50 ">
                      {clientsData.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()} className="hover:bg-gray-200">
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project" className="text-right">
                    Project
                  </Label>
                  <Select
                    value={newInvoice.projectId}
                    onValueChange={(value) => setNewInvoice({ ...newInvoice, projectId: value })}
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
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                {/* Invoice Items */}
                <div className="col-span-4">
                  <Label className="text-sm font-medium mb-4">Invoice Items</Label>
                  <div className="space-y-2 mt-2">
                    {/* Header Row */}
                    <div className="grid grid-cols-13 gap-2 text-xs text-muted-foreground font-medium px-1">
                      <div className="col-span-2">Item</div>
                      <div className="col-span-4">Description</div>
                      <div className="col-span-2">Qty</div>
                      <div className="col-span-2">Rate</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-2"></div>
                    </div>

                    {newInvoice.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-13 gap-2 items-center">
                        <Input
                          placeholder="Item Name"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, "name", e.target.value)}
                          className="col-span-2"
                        />
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          className="col-span-4"
                        />
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value) || 1)}
                          className="col-span-2"
                        />
                        <Input
                          type="number"
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, "rate", Number.parseFloat(e.target.value) || 0)}
                          className="col-span-2"
                        />
                        <div className="col-span-2 text-sm font-mono">
                          ${calculateItemAmount(item.quantity, item.rate).toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                          disabled={newInvoice.items.length === 1}
                          className="col-span-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                    ))}

                    <Button variant="outline" size="sm" onClick={handleAddItem} className = "mt-3">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                </div>


                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Total</Label>
                  <div className="col-span-3 text-lg font-bold">${calculateTotal(newInvoice.items).toFixed(2)}</div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes or terms"
                    value={newInvoice.notes}
                    onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                    className="col-span-6"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleAddInvoice}
                  disabled={
                    !newInvoice.clientId ||
                    !newInvoice.projectId ||
                    !newInvoice.dueDate ||
                    newInvoice.items.some((item) => !item.description || item.rate <= 0)
                  }
                >
                  Create Invoice
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvoiced.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${paidInvoices.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Received payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${pendingInvoices.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                $
                {invoices
                  .filter((i) => i.status === "Overdue")
                  .reduce((sum, i) => sum + i.amount, 0)
                  .toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Past due</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
            <CardDescription>Manage all your invoices and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono">{invoice.invoiceNumber}</TableCell>
                    <TableCell className="font-medium">{invoice.client}</TableCell>
                    <TableCell>{invoice.project}</TableCell>
                    <TableCell className="font-mono">${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status !== "Paid" && (
                          <Button variant="ghost" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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
