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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Clock, Calendar, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useSearchParams, useRouter} from 'next/navigation'

// Mock data
const timeEntriesData = [
  {
    id: 1,
    date: "2024-01-20",
    project: "Website Redesign",
    client: "Acme Corp",
    startTime: "09:00",
    endTime: "13:30",
    hours: 4.5,
    notes: "Worked on homepage layout and responsive design",
    billable: true,
  },
  {
    id: 2,
    date: "2024-01-19",
    project: "Mobile App",
    client: "Tech Startup",
    startTime: "10:00",
    endTime: "16:00",
    hours: 6,
    notes: "Implemented user authentication flow",
    billable: true,
  },
  {
    id: 3,
    date: "2024-01-19",
    project: "Brand Identity",
    client: "Local Business",
    startTime: "14:00",
    endTime: "16:30",
    hours: 2.5,
    notes: "Logo design iterations and color palette",
    billable: true,
  },
  {
    id: 4,
    date: "2024-01-18",
    project: "Internal",
    client: "BusinessFlow",
    startTime: "09:00",
    endTime: "10:00",
    hours: 1,
    notes: "Administrative tasks and invoicing",
    billable: false,
  },
]

const projectsData = [
  { id: 1, name: "Website Redesign", client: "Acme Corp" },
  { id: 2, name: "Mobile App", client: "Tech Startup" },
  { id: 3, name: "Brand Identity", client: "Local Business" },
  { id: 4, name: "Internal", client: "BusinessFlow" },
]

export default function TimeTrackingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [timeEntries, setTimeEntries] = useState(timeEntriesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    projectId: "",
    startTime: "",
    endTime: "",
    notes: "",
    billable: true,
  })

  const calculateHours = (startTime, endTime) => {
    if (!startTime || !endTime) return 0
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    const diffMs = end.getTime() - start.getTime()
    return Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100
  }

  const handleAddEntry = () => {
    const selectedProject = projectsData.find((p) => p.id.toString() === newEntry.projectId)
    const hours = calculateHours(newEntry.startTime, newEntry.endTime)

    const newTimeEntry = {
      id: timeEntries.length + 1,
      date: newEntry.date,
      project: selectedProject?.name || "",
      client: selectedProject?.client || "",
      startTime: newEntry.startTime,
      endTime: newEntry.endTime,
      hours: hours,
      notes: newEntry.notes,
      billable: newEntry.billable,
    }

    setTimeEntries([...timeEntries, newTimeEntry])
    setIsAddDialogOpen(false)
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      projectId: "",
      startTime: "",
      endTime: "",
      notes: "",
      billable: true,
    })
  }

  const handleEditEntry = (entry) => {
    setEditingEntry(entry)
    setNewEntry({
      date: entry.date,
      projectId: projectsData.find((p) => p.name === entry.project)?.id.toString() || "",
      startTime: entry.startTime,
      endTime: entry.endTime,
      notes: entry.notes,
      billable: entry.billable,
    })
    setIsAddDialogOpen(true)
  }

  const handleUpdateEntry = () => {
    if (!editingEntry) return

    const selectedProject = projectsData.find((p) => p.id.toString() === newEntry.projectId)
    const hours = calculateHours(newEntry.startTime, newEntry.endTime)

    const updatedEntries = timeEntries.map((entry) =>
      entry.id === editingEntry.id
        ? {
            ...entry,
            date: newEntry.date,
            project: selectedProject?.name || "",
            client: selectedProject?.client || "",
            startTime: newEntry.startTime,
            endTime: newEntry.endTime,
            hours: hours,
            notes: newEntry.notes,
            billable: newEntry.billable,
          }
        : entry,
    )

    setTimeEntries(updatedEntries)
    setIsAddDialogOpen(false)
    setEditingEntry(null)
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      projectId: "",
      startTime: "",
      endTime: "",
      notes: "",
      billable: true,
    })
  }

  const handleDeleteEntry = (id) => {
    setTimeEntries(timeEntries.filter((entry) => entry.id !== id))
  }

  const filteredEntries = timeEntries.filter(
    (entry) =>
      entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.notes.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0)
  const billableHours = timeEntries.filter((entry) => entry.billable).reduce((sum, entry) => sum + entry.hours, 0)
    useEffect(() => {
      const shouldOpen = searchParams.get("create") === "true"
      if (shouldOpen) {
        setIsAddDialogOpen(true)
        // Clean URL so it doesn’t reopen on refresh
        router.replace('/time-tracking', { scroll: false })
      }
    }, [searchParams])
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
            <p className="text-gray-600">Manage your timesheet and track work hours</p>
          </div>
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) {
                setEditingEntry(null)
                setNewEntry({
                  date: new Date().toISOString().split("T")[0],
                  projectId: "",
                  startTime: "",
                  endTime: "",
                  notes: "",
                  billable: true,
                })
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Time Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-white">
              <DialogHeader>
                <DialogTitle>{editingEntry ? "Edit Time Entry" : "Add Time Entry"}</DialogTitle>
                <DialogDescription>
                  {editingEntry ? "Update your time entry details" : "Add a new time entry to your timesheet"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project" className="text-right">
                    Project
                  </Label>
                  <Select
                    value={newEntry.projectId}
                    onValueChange={(value) => setNewEntry({ ...newEntry, projectId: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {projectsData.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()} className="hover:bg-gray-200">
                          {project.name} - {project.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startTime" className="text-right">
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEntry.startTime}
                    onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEntry.endTime}
                    onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                {newEntry.startTime && newEntry.endTime && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Total Hours</Label>
                    <div className="col-span-3 text-sm text-gray-600">
                      {calculateHours(newEntry.startTime, newEntry.endTime)} hours
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="What did you work on?"
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="billable" className="text-right">
                    Billable
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={newEntry.billable.toString()}
                      onValueChange={(value) => setNewEntry({ ...newEntry, billable: value === "true" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Billable</SelectItem>
                        <SelectItem value="false">Non-billable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={editingEntry ? handleUpdateEntry : handleAddEntry}
                  disabled={!newEntry.projectId || !newEntry.startTime || !newEntry.endTime}
                >
                  {editingEntry ? "Update Entry" : "Add Entry"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">This period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{billableHours.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">Ready to invoice</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalHours > 0 ? ((billableHours / totalHours) * 100).toFixed(0) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Billable ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Timesheet */}
        <Card>
          <CardHeader>
            <CardTitle>Timesheet</CardTitle>
            <CardDescription>View and manage your time entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search time entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Billable</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{entry.project}</div>
                        <div className="text-sm text-muted-foreground">{entry.client}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {entry.startTime} - {entry.endTime}
                    </TableCell>
                    <TableCell className="font-mono">{entry.hours}h</TableCell>
                    <TableCell className="max-w-xs truncate">{entry.notes}</TableCell>
                    <TableCell>
                      <Badge variant={entry.billable ? "default" : "secondary"}>
                        {entry.billable ? "Billable" : "Non-billable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditEntry(entry)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
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
