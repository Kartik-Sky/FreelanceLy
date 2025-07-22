"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Edit, Trash2, FolderOpen, Clock, DollarSign } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data
const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    client: "Acme Corp",
    clientId: 1,
    status: "Active",
    hours: 45,
    expenses: 1200,
    profit: 6800,
    progress: 75,
    budget: 10000,
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "Tech Startup",
    clientId: 2,
    status: "Active",
    hours: 120,
    expenses: 2500,
    profit: 15500,
    progress: 60,
    budget: 25000,
  },
  {
    id: 3,
    name: "Brand Identity",
    client: "Local Business",
    clientId: 3,
    status: "Completed",
    hours: 28,
    expenses: 400,
    profit: 3600,
    progress: 100,
    budget: 5000,
  },
  {
    id: 4,
    name: "E-commerce Platform",
    client: "Design Agency",
    clientId: 4,
    status: "On Hold",
    hours: 15,
    expenses: 800,
    profit: 2200,
    progress: 25,
    budget: 15000,
  },
]

const clientsData = [
  { id: 1, name: "Acme Corp" },
  { id: 2, name: "Tech Startup" },
  { id: 3, name: "Local Business" },
  { id: 4, name: "Design Agency" },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    clientId: "",
    budget: "",
    description: "",
  })

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleAddProject = () => {
    // Add project logic
    setIsAddDialogOpen(false)
    setNewProject({ name: "", clientId: "", budget: "", description: "" })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default"
      case "Completed":
        return "secondary"
      case "On Hold":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Track and manage your project portfolio</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Add a new project to track time and expenses.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="projectName"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="client" className="text-right">
                    Client
                  </Label>
                  <Select
                    value={newProject.clientId}
                    onValueChange={(value) => setNewProject({ ...newProject, clientId: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientsData.map((client) => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="budget" className="text-right">
                    Budget
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="0"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddProject}>
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">All projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.filter((p) => p.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Currently working</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.reduce((sum, project) => sum + project.hours, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${projects.reduce((sum, project) => sum + project.profit, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Project Portfolio</CardTitle>
            <CardDescription>Overview of all your projects and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.client}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={project.progress} className="w-[60px]" />
                        <span className="text-xs text-muted-foreground">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{project.hours}h</TableCell>
                    <TableCell>${project.expenses.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600 font-medium">${project.profit.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
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
