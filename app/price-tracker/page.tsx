"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WebSocketStatus } from "@/components/websocket-status"
import { LiveNotificationCenter } from "@/components/live-notification-center"
import { RealTimePriceTracker } from "@/components/real-time-price-tracker"
import { Search, Plus, Gift, TrendingDown, Bell, Target, Activity, ShoppingCart, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PriceTrackerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    url: "",
    targetPrice: "",
    store: "",
  })
  const [userId] = useState("user_123") // Simulate user ID

  const trackedDeals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB - Natural Titanium",
      currentPrice: 134900,
      originalPrice: 159900,
      targetPrice: 125000,
      image: "/placeholder.svg?height=150&width=150&text=iPhone+15",
      store: "Amazon",
      category: "Electronics",
      isTracking: true,
    },
    {
      id: 2,
      name: "Nike Air Max 270 Running Shoes",
      currentPrice: 7797,
      originalPrice: 12995,
      targetPrice: 7000,
      image: "/placeholder.svg?height=150&width=150&text=Nike+Shoes",
      store: "Myntra",
      category: "Fashion",
      isTracking: true,
    },
    {
      id: 3,
      name: 'Samsung 55" 4K Smart TV Crystal UHD',
      currentPrice: 54999,
      originalPrice: 89999,
      targetPrice: 50000,
      image: "/placeholder.svg?height=150&width=150&text=Samsung+TV",
      store: "Flipkart",
      category: "Electronics",
      isTracking: false,
    },
    {
      id: 4,
      name: "MacBook Air M2 13-inch 256GB",
      currentPrice: 99900,
      originalPrice: 119900,
      targetPrice: 95000,
      image: "/placeholder.svg?height=150&width=150&text=MacBook+Air",
      store: "Apple Store",
      category: "Electronics",
      isTracking: true,
    },
    {
      id: 5,
      name: "Sony WH-1000XM5 Wireless Headphones",
      currentPrice: 24990,
      originalPrice: 29990,
      targetPrice: 22000,
      image: "/placeholder.svg?height=150&width=150&text=Sony+Headphones",
      store: "Croma",
      category: "Electronics",
      isTracking: false,
    },
    {
      id: 6,
      name: "Adidas Ultraboost 22 Running Shoes",
      currentPrice: 12599,
      originalPrice: 17999,
      targetPrice: 11000,
      image: "/placeholder.svg?height=150&width=150&text=Adidas+Shoes",
      store: "Myntra",
      category: "Fashion",
      isTracking: true,
    },
  ]

  const popularProducts = [
    {
      name: "iPhone 15 Pro",
      image: "/placeholder.svg?height=60&width=60&text=iPhone",
      store: "Amazon",
      price: 124900,
    },
    {
      name: "Samsung Galaxy S24",
      image: "/placeholder.svg?height=60&width=60&text=Samsung",
      store: "Flipkart",
      price: 79999,
    },
    {
      name: "OnePlus 12",
      image: "/placeholder.svg?height=60&width=60&text=OnePlus",
      store: "OnePlus Store",
      price: 64999,
    },
    {
      name: "iPad Air",
      image: "/placeholder.svg?height=60&width=60&text=iPad",
      store: "Apple Store",
      price: 59900,
    },
  ]

  const stores = ["Amazon", "Flipkart", "Myntra", "Nykaa", "Apple Store", "Croma", "Swiggy"]

  const handleAddProduct = () => {
    // In a real app, this would add the product to tracking
    console.log("Adding product:", newProduct)
    setIsAddDialogOpen(false)
    setNewProduct({ name: "", url: "", targetPrice: "", store: "" })
  }

  const handleTrackingChange = (dealId: number, isTracking: boolean) => {
    console.log(`Deal ${dealId} tracking changed to:`, isTracking)
  }

  const filteredDeals = trackedDeals.filter(
    (deal) =>
      deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.store.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeTracking = trackedDeals.filter((deal) => deal.isTracking)
  const totalSavings = trackedDeals.reduce((sum, deal) => sum + (deal.originalPrice - deal.currentPrice), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Gift className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DealHunt
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/deals" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                All Deals
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Categories
              </Link>
              <Link href="/stores" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Stores
              </Link>
              <Link href="/price-tracker" className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1">
                Price Tracker
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <WebSocketStatus userId={userId} />
              <LiveNotificationCenter userId={userId} />
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="hover:bg-indigo-50 bg-transparent">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Price Tracker</h1>
              <p className="text-gray-600">Monitor prices and get alerts when they drop</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Product to Track</DialogTitle>
                  <DialogDescription>Enter product details to start tracking price changes</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      placeholder="e.g., iPhone 15 Pro Max"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-url">Product URL</Label>
                    <Input
                      id="product-url"
                      placeholder="https://..."
                      value={newProduct.url}
                      onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target-price">Target Price (₹)</Label>
                      <Input
                        id="target-price"
                        type="number"
                        placeholder="50000"
                        value={newProduct.targetPrice}
                        onChange={(e) => setNewProduct({ ...newProduct, targetPrice: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="store">Store</Label>
                      <Select
                        value={newProduct.store}
                        onValueChange={(value) => setNewProduct({ ...newProduct, store: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select store" />
                        </SelectTrigger>
                        <SelectContent>
                          {stores.map((store) => (
                            <SelectItem key={store} value={store}>
                              {store}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleAddProduct} className="w-full">
                    Start Tracking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{trackedDeals.length}</p>
                  </div>
                  <Target className="h-8 w-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Tracking</p>
                    <p className="text-2xl font-bold text-green-600">{activeTracking.length}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Savings</p>
                    <p className="text-2xl font-bold text-green-600">₹{totalSavings.toLocaleString()}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Alerts Set</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {trackedDeals.filter((d) => d.targetPrice).length}
                    </p>
                  </div>
                  <Bell className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="tracking" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tracking">Price Tracking</TabsTrigger>
                <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
                <TabsTrigger value="history">Price History</TabsTrigger>
              </TabsList>

              <TabsContent value="tracking" className="space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search tracked products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/80 backdrop-blur-sm"
                  />
                </div>

                {/* Real-time Price Tracker */}
                <RealTimePriceTracker deals={filteredDeals} userId={userId} onTrackingChange={handleTrackingChange} />
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Price Alerts</CardTitle>
                    <CardDescription>Products that have reached or are close to your target price</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackedDeals
                        .filter((deal) => deal.targetPrice && deal.currentPrice <= deal.targetPrice * 1.1)
                        .map((deal) => (
                          <div
                            key={deal.id}
                            className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                          >
                            <Image
                              src={deal.image || "/placeholder.svg"}
                              alt={deal.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-green-800">{deal.name}</h3>
                              <p className="text-sm text-green-600">
                                Current: ₹{deal.currentPrice.toLocaleString()} | Target: ₹
                                {deal.targetPrice?.toLocaleString()}
                              </p>
                              <p className="text-xs text-green-500">{deal.store}</p>
                            </div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Buy Now
                            </Button>
                          </div>
                        ))}

                      {trackedDeals.filter((deal) => deal.targetPrice && deal.currentPrice <= deal.targetPrice * 1.1)
                        .length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
                          <p className="text-sm">Set target prices to get notified when deals reach your budget</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Price History</CardTitle>
                    <CardDescription>Track how prices have changed over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <TrendingDown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">Price History Coming Soon</h3>
                      <p className="text-sm">We're working on detailed price history charts and analytics</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Products to Track */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Popular Products</CardTitle>
                <CardDescription>Trending products to track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {popularProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.store}</p>
                      <p className="text-sm font-bold text-green-600">₹{product.price.toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  View All Deals
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Browse Stores
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <CardHeader>
                <CardTitle className="text-lg">💡 Pro Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-indigo-100">
                  Set realistic target prices (10-20% below current price) for better chances of getting deals!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
