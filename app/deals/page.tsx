"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { WebSocketStatus } from "@/components/websocket-status"
import { LiveNotificationCenter } from "@/components/live-notification-center"
import { LiveDealFeed } from "@/components/live-deal-feed"
import { Search, Heart, ExternalLink, Gift, SlidersHorizontal, TrendingDown, Activity } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStores, setSelectedStores] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [userId] = useState("user_123") // Simulate user ID

  const deals = [
    {
      id: 1,
      title: "iPhone 15 Pro Max 256GB",
      description: "Latest iPhone with titanium design and advanced camera system",
      originalPrice: 159900,
      discountedPrice: 134900,
      discount: 16,
      store: "Amazon",
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
      badge: "Loot Deal",
      rating: 4.8,
      reviews: 1250,
      expiresIn: "2 days",
      isFavorite: false,
    },
    {
      id: 2,
      title: "Nike Air Max 270 Running Shoes",
      description: "Comfortable running shoes with air cushioning technology",
      originalPrice: 12995,
      discountedPrice: 7797,
      discount: 40,
      store: "Myntra",
      category: "Fashion",
      image: "/placeholder.svg?height=200&width=200",
      badge: "Best Deal",
      rating: 4.5,
      reviews: 890,
      expiresIn: "5 hours",
      isFavorite: true,
    },
    {
      id: 3,
      title: 'Samsung 55" 4K Smart TV',
      description: "Crystal UHD 4K TV with HDR and smart features",
      originalPrice: 89999,
      discountedPrice: 54999,
      discount: 39,
      store: "Flipkart",
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
      badge: "Just In",
      rating: 4.3,
      reviews: 567,
      expiresIn: "1 day",
      isFavorite: false,
    },
    {
      id: 4,
      title: "Instant Pot Duo 7-in-1 Pressure Cooker",
      description: "Multi-functional electric pressure cooker for quick cooking",
      originalPrice: 15999,
      discountedPrice: 9599,
      discount: 40,
      store: "Amazon",
      category: "Home & Kitchen",
      image: "/placeholder.svg?height=200&width=200",
      badge: "Best Deal",
      rating: 4.6,
      reviews: 2340,
      expiresIn: "3 days",
      isFavorite: false,
    },
    {
      id: 5,
      title: "Adidas Ultraboost 22 Shoes",
      description: "Premium running shoes with boost technology",
      originalPrice: 17999,
      discountedPrice: 12599,
      discount: 30,
      store: "Myntra",
      category: "Fashion",
      image: "/placeholder.svg?height=200&width=200",
      badge: "Just In",
      rating: 4.7,
      reviews: 445,
      expiresIn: "6 hours",
      isFavorite: true,
    },
    {
      id: 6,
      title: "MacBook Air M2 13-inch",
      description: "Apple MacBook Air with M2 chip and 8GB RAM",
      originalPrice: 119900,
      discountedPrice: 99900,
      discount: 17,
      store: "Flipkart",
      category: "Electronics",
      image: "/placeholder.svg?height=200&width=200",
      badge: "Loot Deal",
      rating: 4.9,
      reviews: 789,
      expiresIn: "4 days",
      isFavorite: false,
    },
  ]

  const categories = ["Electronics", "Fashion", "Home & Kitchen", "Books", "Travel", "Food"]
  const stores = ["Amazon", "Flipkart", "Myntra", "Nykaa", "MakeMyTrip", "Swiggy"]

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(deal.category)
    const matchesStore = selectedStores.length === 0 || selectedStores.includes(deal.store)
    const matchesPrice =
      (!priceRange.min || deal.discountedPrice >= Number.parseInt(priceRange.min)) &&
      (!priceRange.max || deal.discountedPrice <= Number.parseInt(priceRange.max))

    return matchesSearch && matchesCategory && matchesStore && matchesPrice
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleStoreChange = (store: string, checked: boolean) => {
    if (checked) {
      setSelectedStores([...selectedStores, store])
    } else {
      setSelectedStores(selectedStores.filter((s) => s !== store))
    }
  }

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
              <Link href="/deals" className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1">
                All Deals
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Categories
              </Link>
              <Link href="/stores" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Stores
              </Link>
              <Link href="/price-tracker" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search and Filter Bar */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search for deals, products, or brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                  <Select defaultValue="latest">
                    <SelectTrigger className="w-48 bg-white/80 backdrop-blur-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest Deals</SelectItem>
                      <SelectItem value="discount">Highest Discount</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Categories */}
                      <div>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                              />
                              <label htmlFor={category} className="text-sm">
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stores */}
                      <div>
                        <h3 className="font-semibold mb-3">Stores</h3>
                        <div className="space-y-2">
                          {stores.map((store) => (
                            <div key={store} className="flex items-center space-x-2">
                              <Checkbox
                                id={store}
                                checked={selectedStores.includes(store)}
                                onCheckedChange={(checked) => handleStoreChange(store, checked as boolean)}
                              />
                              <label htmlFor={store} className="text-sm">
                                {store}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div>
                        <h3 className="font-semibold mb-3">Price Range</h3>
                        <div className="space-y-2">
                          <Input
                            type="number"
                            placeholder="Min price"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                          />
                          <Input
                            type="number"
                            placeholder="Max price"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Discount Range */}
                      <div>
                        <h3 className="font-semibold mb-3">Discount</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="discount-10" />
                            <label htmlFor="discount-10" className="text-sm">
                              10% and above
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="discount-25" />
                            <label htmlFor="discount-25" className="text-sm">
                              25% and above
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="discount-50" />
                            <label htmlFor="discount-50" className="text-sm">
                              50% and above
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Deals</h1>
                <p className="text-gray-600">{filteredDeals.length} deals found</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                  {filteredDeals.length} results
                </Badge>
              </div>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredDeals.map((deal) => (
                <Card
                  key={deal.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white/80 backdrop-blur-sm"
                >
                  <div className="relative">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className="absolute top-3 left-3"
                      variant={
                        deal.badge === "Loot Deal"
                          ? "destructive"
                          : deal.badge === "Best Deal"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {deal.badge}
                    </Badge>
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {deal.discount}% OFF
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={`h-4 w-4 ${deal.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Expires in {deal.expiresIn}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{deal.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{deal.description}</CardDescription>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{deal.store}</span>
                      <span>•</span>
                      <span>{deal.category}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{deal.rating}</span>
                        <span>({deal.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{deal.discountedPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{deal.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600 font-medium">
                          Save ₹{(deal.originalPrice - deal.discountedPrice).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      <span>View Deal</span>
                      <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {filteredDeals.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm">
                  Load More Deals
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredDeals.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategories([])
                    setSelectedStores([])
                    setPriceRange({ min: "", max: "" })
                  }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Deal Feed */}
            <LiveDealFeed userId={userId} maxItems={8} />

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/price-tracker">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Price Tracker
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Gift className="h-4 w-4 mr-2" />
                    Browse Categories
                  </Button>
                </Link>
                <Link href="/stores">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    All Stores
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Popular Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {Math.floor(Math.random() * 100) + 10}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
