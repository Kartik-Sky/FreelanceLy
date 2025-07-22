import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Play, Plus, Edit, Trash2, AlertCircle, CheckCircle, Info, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ComponentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">UI Components</h1>
          <p className="text-gray-600">A showcase of all available UI components for development and testing</p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>
                <Play className="mr-2 h-4 w-4" />
                With Icon
              </Button>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input fields, selects, and form controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Text Input</Label>
                <Input id="text-input" placeholder="Enter text here" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-input">Email Input</Label>
                <Input id="email-input" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-input">Password Input</Label>
                <Input id="password-input" type="password" placeholder="Password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number-input">Number Input</Label>
                <Input id="number-input" type="number" placeholder="0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Enter your message here..." />
            </div>

            <div className="space-y-2">
              <Label>Select Dropdown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox1" />
                <Label htmlFor="checkbox1">Checkbox option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox2" />
                <Label htmlFor="checkbox2">Checkbox option 2</Label>
              </div>
            </div>

            <RadioGroup defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="radio1" />
                <Label htmlFor="radio1">Radio option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="radio2" />
                <Label htmlFor="radio2">Radio option 2</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center space-x-2">
              <Switch id="switch" />
              <Label htmlFor="switch">Toggle switch</Label>
            </div>
          </CardContent>
        </Card>

        {/* Tables */}
        <Card>
          <CardHeader>
            <CardTitle>Tables</CardTitle>
            <CardDescription>Data tables with sorting and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Project Alpha</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                  <TableCell>$2,500</TableCell>
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
                <TableRow>
                  <TableCell className="font-medium">Project Beta</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Completed</Badge>
                  </TableCell>
                  <TableCell>$1,800</TableCell>
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Badges and Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & Progress</CardTitle>
            <CardDescription>Status indicators and progress bars</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress Example</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Another Progress</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Different types of alert messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>This is an informational alert message.</AlertDescription>
            </Alert>

            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">Your action was completed successfully.</AlertDescription>
            </Alert>

            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Warning</AlertTitle>
              <AlertDescription className="text-yellow-700">Please review this information carefully.</AlertDescription>
            </Alert>

            <Alert className="border-red-200 bg-red-50">
              <X className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error</AlertTitle>
              <AlertDescription className="text-red-700">Something went wrong. Please try again.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Modals and Tooltips */}
        <Card>
          <CardHeader>
            <CardTitle>Modals & Tooltips</CardTitle>
            <CardDescription>Interactive overlays and help text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Modal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Example Modal</DialogTitle>
                    <DialogDescription>This is an example modal dialog with content.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Modal content goes here...</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover for Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a helpful tooltip message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* Separators */}
        <Card>
          <CardHeader>
            <CardTitle>Separators</CardTitle>
            <CardDescription>Visual dividers for content sections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>Content above separator</div>
            <Separator />
            <div>Content below separator</div>
            <div className="flex items-center space-x-4">
              <div>Left content</div>
              <Separator orientation="vertical" className="h-4" />
              <div>Right content</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
