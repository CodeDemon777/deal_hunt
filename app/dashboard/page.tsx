"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Bell, Heart, User, Gift, Filter, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const recentDeals = [
    {
      id: 1,
      title: "MacBook Air M2",
      originalPrice: 119900,
      discountedPrice: 99900,
      discount: 17,
      store: "Amazon",
      category: "Electronics",
      image: "/placeholder.svg?height=150&width=150",
      badge: "Loot Deal",
      isFavorite: true,
    },
    {
      id: 2,
      title: "Adidas Running Shoes",
      originalPrice: 8999,
      discountedPrice: 4499,
      discount: 50,
      store: "Myntra",
      category: "Fashion",
      image: "/placeholder.svg?height=150&width=150",
      badge: "Best Deal",
      isFavorite: false,
    },
    {
      id: 3,
      title: "OnePlus 12 Pro",
      originalPrice: 69999,
      discountedPrice: 59999,
      discount: 14,
      store: "Flipkart",
      category: "Electronics",
      image: "/placeholder.svg?height=150&width=150",
      badge: "Just In",
      isFavorite: true,
    },
  ]

  const categories = [
    { name: "Electronics", count: 2500, icon: "📱" },
    { name: "Fashion", count: 3200, icon: "👕" },
    { name: "Home & Kitchen", count: 1800, icon: "🏠" },
    { name: "Books", count: 900, icon: "📚" },
    { name: "Travel", count: 600, icon: "✈️" },
    { name: "Food", count: 1200, icon: "🍕" },
  ]

  const userStats = {
    totalSavings: 45000,
    dealsClicked: 127,
    favoriteDeals: 23,
    notificationsEnabled: true,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Gift className="h-8 w-8 text-indigo-600" />
                <span className="text-2xl font-bold text-gray-900">DealHunt</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Savings</span>
                  <span className="font-bold text-green-600">₹{userStats.totalSavings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Deals Clicked</span>
                  <span className="font-bold">{userStats.dealsClicked}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Favorites</span>
                  <span className="font-bold">{userStats.favoriteDeals}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h1>
              <p className="text-gray-600">Discover the latest deals and offers</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Deals</TabsTrigger>
                <TabsTrigger value="loot">Loot Deals</TabsTrigger>
                <TabsTrigger value="best">Best Deals</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <div className="flex items-center justify-between my-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Badge variant="secondary">{recentDeals.length} deals found</Badge>
                </div>
                <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                  <option>Sort by Latest</option>
                  <option>Sort by Discount</option>
                  <option>Sort by Price</option>
                  <option>Sort by Popularity</option>
                </select>
              </div>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recentDeals.map((deal) => (
                    <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <Image
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.title}
                          width={300}
                          height={150}
                          className="w-full h-40 object-cover"
                        />
                        <Badge
                          className="absolute top-2 left-2"
                          variant={deal.badge === "Loot Deal" ? "destructive" : "default"}
                        >
                          {deal.badge}
                        </Badge>
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                          {deal.discount}% OFF
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
                        >
                          <Heart className={`h-4 w-4 ${deal.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{deal.title}</CardTitle>
                        <CardDescription>
                          {deal.store} • {deal.category}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-xl font-bold text-green-600">
                              ₹{deal.discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{deal.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Button className="w-full">View Deal</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="loot" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recentDeals
                    .filter((deal) => deal.badge === "Loot Deal")
                    .map((deal) => (
                      <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <Image
                            src={deal.image || "/placeholder.svg"}
                            alt={deal.title}
                            width={300}
                            height={150}
                            className="w-full h-40 object-cover"
                          />
                          <Badge className="absolute top-2 left-2" variant="destructive">
                            {deal.badge}
                          </Badge>
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                            {deal.discount}% OFF
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{deal.title}</CardTitle>
                          <CardDescription>
                            {deal.store} • {deal.category}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-xl font-bold text-green-600">
                                ₹{deal.discountedPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{deal.originalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <Button className="w-full">View Deal</Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="best" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recentDeals
                    .filter((deal) => deal.badge === "Best Deal")
                    .map((deal) => (
                      <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <Image
                            src={deal.image || "/placeholder.svg"}
                            alt={deal.title}
                            width={300}
                            height={150}
                            className="w-full h-40 object-cover"
                          />
                          <Badge className="absolute top-2 left-2">{deal.badge}</Badge>
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                            {deal.discount}% OFF
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{deal.title}</CardTitle>
                          <CardDescription>
                            {deal.store} • {deal.category}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-xl font-bold text-green-600">
                                ₹{deal.discountedPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{deal.originalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <Button className="w-full">View Deal</Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recentDeals
                    .filter((deal) => deal.isFavorite)
                    .map((deal) => (
                      <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <Image
                            src={deal.image || "/placeholder.svg"}
                            alt={deal.title}
                            width={300}
                            height={150}
                            className="w-full h-40 object-cover"
                          />
                          <Badge
                            className="absolute top-2 left-2"
                            variant={deal.badge === "Loot Deal" ? "destructive" : "default"}
                          >
                            {deal.badge}
                          </Badge>
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                            {deal.discount}% OFF
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{deal.title}</CardTitle>
                          <CardDescription>
                            {deal.store} • {deal.category}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-xl font-bold text-green-600">
                                ₹{deal.discountedPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{deal.originalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <Button className="w-full">View Deal</Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
