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
import { Play, Pause, Square, Plus, Edit, Trash2, Clock, Calendar } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data
const timeEntriesData = [
  {
    id: 1,
    date: "2024-01-20",
    project: "Website Redesign",
    client: "Acme Corp",
    hours: 4.5,
    notes: "Worked on homepage layout and responsive design",
    billable: true,
  },
  {
    id: 2,
    date: "2024-01-19",
    project: "Mobile App",
    client: "Tech Startup",
    hours: 6,
    notes: "Implemented user authentication flow",
    billable: true,
  },
  {
    id: 3,
    date: "2024-01-19",
    project: "Brand Identity",
    client: "Local Business",
    hours: 2.5,
    notes: "Logo design iterations and color palette",
    billable: true,
  },
  {
    id: 4,
    date: "2024-01-18",
    project: "Internal",
    client: "BusinessFlow",
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
  const [timeEntries, setTimeEntries] = useState(timeEntriesData)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentProject, setCurrentProject] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    projectId: "",
    hours: "",
    notes: "",
    billable: true,
  })

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setCurrentTime((time) => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    if (currentProject) {
      setIsTimerRunning(true)
    }
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
    if (currentTime > 0) {
      // Save time entry
      const hours = currentTime / 3600
      // Add to time entries
    }
    setCurrentTime(0)
    setCurrentProject("")
  }

  const handleAddEntry = () => {
    // Add time entry logic
    setIsAddDialogOpen(false)
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      projectId: "",
      hours: "",
      notes: "",
      billable: true,
    })
  }

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0)
  const billableHours = timeEntries.filter((entry) => entry.billable).reduce((sum, entry) => sum + entry.hours, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
            <p className="text-gray-600">Track your work hours and manage time entries</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Time Entry</DialogTitle>
                <DialogDescription>Manually add a time entry for completed work.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
                    <SelectContent>
                      {projectsData.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name} - {project.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hours" className="text-right">
                    Hours
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    step="0.25"
                    placeholder="0.00"
                    value={newEntry.hours}
                    onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })}
                    className="col-span-3"
                  />
                </div>
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
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddEntry}>
                  Add Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Timer Widget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Current Timer</span>
            </CardTitle>
            <CardDescription>Track time in real-time for your current task</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-mono font-bold">{formatTime(currentTime)}</div>
                <div className="space-y-2">
                  <Select value={currentProject} onValueChange={setCurrentProject}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select project to track" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectsData.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name} - {project.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-2">
                {!isTimerRunning ? (
                  <Button onClick={startTimer} disabled={!currentProject}>
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={pauseTimer} variant="outline">
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                )}
                <Button onClick={stopTimer} variant="destructive" disabled={currentTime === 0}>
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">This week</p>
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
              <div className="text-2xl font-bold">{((billableHours / totalHours) * 100).toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Billable ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Entries Table */}
        <Card>
          <CardHeader>
            <CardTitle>Time Entries</CardTitle>
            <CardDescription>View and manage your recorded time entries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Billable</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{entry.project}</div>
                        <div className="text-sm text-muted-foreground">{entry.client}</div>
                      </div>
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
