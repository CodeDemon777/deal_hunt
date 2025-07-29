"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Smartphone, Mail, MessageSquare, Settings, Gift, Check, X } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "🔥 iPhone 15 Pro Max - Massive Discount!",
      message: "Get 16% off on iPhone 15 Pro Max. Limited time offer!",
      type: "deal",
      time: "2 minutes ago",
      read: false,
      category: "Electronics",
    },
    {
      id: 2,
      title: "⚡ Flash Sale Alert - Nike Shoes",
      message: "40% off on Nike Air Max shoes. Hurry, only few left!",
      type: "flash",
      time: "15 minutes ago",
      read: false,
      category: "Fashion",
    },
    {
      id: 3,
      title: "💰 Your Savings Update",
      message: "You've saved ₹45,000 this month with DealHunt!",
      type: "savings",
      time: "1 hour ago",
      read: true,
      category: "Account",
    },
    {
      id: 4,
      title: "🎯 Deals in Your Favorite Category",
      message: "New electronics deals matching your preferences",
      type: "personalized",
      time: "3 hours ago",
      read: true,
      category: "Electronics",
    },
    {
      id: 5,
      title: "⏰ Deal Expiring Soon",
      message: "MacBook Air M2 deal expires in 2 hours!",
      type: "expiry",
      time: "5 hours ago",
      read: false,
      category: "Electronics",
    },
  ])

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    telegramNotifications: true,
    dealAlerts: true,
    priceDrops: true,
    flashSales: true,
    weeklyDigest: true,
    personalizedDeals: true,
  })

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deal":
        return "🏷️"
      case "flash":
        return "⚡"
      case "savings":
        return "💰"
      case "personalized":
        return "🎯"
      case "expiry":
        return "⏰"
      default:
        return "🔔"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">DealHunt</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Manage your alerts and notification preferences</p>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Recent Notifications</h2>
                <p className="text-gray-600">{unreadCount} unread notifications</p>
              </div>
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`${!notification.read ? "border-l-4 border-l-indigo-500 bg-indigo-50/30" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <Badge variant="secondary" className="text-xs">
                              {notification.category}
                            </Badge>
                            {!notification.read && (
                              <Badge variant="destructive" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button onClick={() => markAsRead(notification.id)} variant="ghost" size="sm">
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button onClick={() => deleteNotification(notification.id)} variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {notifications.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up! New notifications will appear here.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
              <p className="text-gray-600 mb-6">Choose how you want to receive notifications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Notification Channels */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5" />
                    <span>Notification Channels</span>
                  </CardTitle>
                  <CardDescription>Select how you want to receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="push">Push Notifications</Label>
                    </div>
                    <Switch
                      id="push"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="email">Email Notifications</Label>
                    </div>
                    <Switch
                      id="email"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="sms">SMS Notifications</Label>
                    </div>
                    <Switch
                      id="sms"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                    </div>
                    <Switch
                      id="whatsapp"
                      checked={settings.whatsappNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, whatsappNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="telegram">Telegram</Label>
                    </div>
                    <Switch
                      id="telegram"
                      checked={settings.telegramNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, telegramNotifications: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Types</CardTitle>
                  <CardDescription>Choose what types of deals to get notified about</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dealAlerts">Deal Alerts</Label>
                      <p className="text-sm text-gray-500">New deals in your categories</p>
                    </div>
                    <Switch
                      id="dealAlerts"
                      checked={settings.dealAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, dealAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="priceDrops">Price Drops</Label>
                      <p className="text-sm text-gray-500">When prices drop on saved items</p>
                    </div>
                    <Switch
                      id="priceDrops"
                      checked={settings.priceDrops}
                      onCheckedChange={(checked) => setSettings({ ...settings, priceDrops: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="flashSales">Flash Sales</Label>
                      <p className="text-sm text-gray-500">Limited time flash sales</p>
                    </div>
                    <Switch
                      id="flashSales"
                      checked={settings.flashSales}
                      onCheckedChange={(checked) => setSettings({ ...settings, flashSales: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                      <p className="text-sm text-gray-500">Weekly summary of best deals</p>
                    </div>
                    <Switch
                      id="weeklyDigest"
                      checked={settings.weeklyDigest}
                      onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="personalized">Personalized Deals</Label>
                      <p className="text-sm text-gray-500">Deals based on your preferences</p>
                    </div>
                    <Switch
                      id="personalized"
                      checked={settings.personalizedDeals}
                      onCheckedChange={(checked) => setSettings({ ...settings, personalizedDeals: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
