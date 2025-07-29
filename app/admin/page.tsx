"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalUsers: 15420,
    activeDeals: 8750,
    totalClicks: 125000,
    pendingApprovals: 23,
  }

  const recentDeals = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      store: "Amazon",
      discount: 16,
      status: "pending",
      submittedBy: "admin@dealhunt.com",
      submittedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Nike Air Jordan",
      store: "Myntra",
      discount: 45,
      status: "approved",
      submittedBy: "deals@dealhunt.com",
      submittedAt: "2024-01-14",
    },
    {
      id: 3,
      title: "MacBook Air M2",
      store: "Flipkart",
      discount: 12,
      status: "rejected",
      submittedBy: "admin@dealhunt.com",
      submittedAt: "2024-01-13",
    },
  ]

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-10",
      status: "active",
      totalSavings: 15000,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-01-08",
      status: "active",
      totalSavings: 8500,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joinDate: "2024-01-05",
      status: "inactive",
      totalSavings: 3200,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDeals.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+25% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deals">Deal Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New deal approved</p>
                        <p className="text-xs text-gray-500">iPhone 15 Pro Max - 2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-gray-500">john.doe@example.com - 5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Deal expired</p>
                        <p className="text-xs text-gray-500">Samsung Galaxy S24 - 10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Deal
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Review Pending Deals
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Deal Management</h2>
                <p className="text-gray-600">Manage and moderate deals</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Deal
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Deals</CardTitle>
                <CardDescription>Latest deals submitted for review</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deal Title</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDeals.map((deal) => (
                      <TableRow key={deal.id}>
                        <TableCell className="font-medium">{deal.title}</TableCell>
                        <TableCell>{deal.store}</TableCell>
                        <TableCell>{deal.discount}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              deal.status === "approved"
                                ? "default"
                                : deal.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {deal.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{deal.submittedBy}</TableCell>
                        <TableCell>{deal.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-gray-600">Manage registered users</p>
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Search users..." className="w-64" />
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>All users registered on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Savings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>₹{user.totalSavings.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics & Reports</h2>
              <p className="text-gray-600">Performance insights and user behavior</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deal Performance</CardTitle>
                  <CardDescription>Top performing deals this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">iPhone 15 Pro Max</p>
                        <p className="text-sm text-gray-500">Amazon • Electronics</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">2,450 clicks</p>
                        <p className="text-sm text-green-600">+15%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nike Air Jordan</p>
                        <p className="text-sm text-gray-500">Myntra • Fashion</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">1,890 clicks</p>
                        <p className="text-sm text-green-600">+8%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">MacBook Air M2</p>
                        <p className="text-sm text-gray-500">Flipkart • Electronics</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">1,650 clicks</p>
                        <p className="text-sm text-red-600">-3%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>User activity metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-bold">3,240</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Session Duration</span>
                      <span className="font-bold">4m 32s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Click-through Rate</span>
                      <span className="font-bold">12.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">User Retention (7-day)</span>
                      <span className="font-bold">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Deal performance by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">📱</div>
                    <h3 className="font-semibold mt-2">Electronics</h3>
                    <p className="text-2xl font-bold mt-1">45,230</p>
                    <p className="text-sm text-gray-500">Total clicks</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">👕</div>
                    <h3 className="font-semibold mt-2">Fashion</h3>
                    <p className="text-2xl font-bold mt-1">32,180</p>
                    <p className="text-sm text-gray-500">Total clicks</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">🏠</div>
                    <h3 className="font-semibold mt-2">Home & Kitchen</h3>
                    <p className="text-2xl font-bold mt-1">18,950</p>
                    <p className="text-sm text-gray-500">Total clicks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
