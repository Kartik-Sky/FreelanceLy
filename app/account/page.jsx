"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Building, CreditCard, Trash2, Upload, Save } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john@example.com",
  business: "Doe Design Studio",
  address: "123 Main Street, City, State 12345",
  profileImage: "/placeholder.svg",
  subscription: {
    plan: "Professional",
    nextBilling: "2024-02-20",
    amount: 29,
  },
}

export default function AccountPage() {
  const [profile, setProfile] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your profile and account preferences</p>
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>Update your personal information and profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Business Information</span>
            </CardTitle>
            <CardDescription>Information used for invoices and business documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business">Business Name</Label>
              <Input
                id="business"
                value={profile.business}
                onChange={(e) => setProfile({ ...profile, business: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Business Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Subscription</span>
            </CardTitle>
            <CardDescription>Manage your billing and subscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{profile.subscription.plan} Plan</h3>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-gray-600">Next billing: {profile.subscription.nextBilling}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${profile.subscription.amount}</p>
                <p className="text-sm text-gray-600">per month</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">View Billing History</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-gray-600">Last changed 3 months ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
