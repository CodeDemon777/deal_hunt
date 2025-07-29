"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Gift,
  Star,
  ExternalLink,
  TrendingUp,
  ShoppingBag,
  Percent,
  Clock,
  Users,
  Award,
  Filter,
  SortAsc,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const stores = [
    {
      id: 1,
      name: "Amazon",
      logo: "/placeholder.svg?height=80&width=80",
      description: "World's largest online marketplace with everything you need",
      rating: 4.2,
      reviews: 125000,
      activeDeals: 3500,
      avgDiscount: 25,
      categories: ["Electronics", "Books", "Home & Kitchen", "Fashion"],
      website: "https://amazon.in",
      founded: "1994",
      headquarters: "Seattle, USA",
      deliveryTime: "1-2 days",
      returnPolicy: "30 days",
      paymentMethods: ["Credit Card", "Debit Card", "UPI", "COD"],
      specialOffers: ["Prime Membership", "Lightning Deals", "Subscribe & Save"],
      topDeals: [
        { name: "iPhone 15 Pro Max", price: 134900, discount: 16 },
        { name: "Echo Dot", price: 2999, discount: 40 },
        { name: "Fire TV Stick", price: 2999, discount: 25 },
      ],
      verified: true,
      trending: true,
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: 2,
      name: "Flipkart",
      logo: "/placeholder.svg?height=80&width=80",
      description: "India's leading e-commerce platform for all your shopping needs",
      rating: 4.1,
      reviews: 98000,
      activeDeals: 2800,
      avgDiscount: 30,
      categories: ["Electronics", "Fashion", "Home & Kitchen", "Books"],
      website: "https://flipkart.com",
      founded: "2007",
      headquarters: "Bangalore, India",
      deliveryTime: "2-4 days",
      returnPolicy: "7-30 days",
      paymentMethods: ["Credit Card", "Debit Card", "UPI", "COD", "EMI"],
      specialOffers: ["Flipkart Plus", "Big Billion Days", "No Cost EMI"],
      topDeals: [
        { name: "Samsung Galaxy S24", price: 79999, discount: 20 },
        { name: "MacBook Air M2", price: 99900, discount: 17 },
        { name: "OnePlus 12", price: 64999, discount: 15 },
      ],
      verified: true,
      trending: true,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      name: "Myntra",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Fashion and lifestyle destination with latest trends",
      rating: 4.3,
      reviews: 75000,
      activeDeals: 1200,
      avgDiscount: 45,
      categories: ["Fashion", "Beauty", "Accessories", "Footwear"],
      website: "https://myntra.com",
      founded: "2007",
      headquarters: "Bangalore, India",
      deliveryTime: "3-5 days",
      returnPolicy: "30 days",
      paymentMethods: ["Credit Card", "Debit Card", "UPI", "COD"],
      specialOffers: ["End of Reason Sale", "Right to Fashion", "Myntra Insider"],
      topDeals: [
        { name: "Nike Air Max", price: 7797, discount: 40 },
        { name: "Adidas Ultraboost", price: 12599, discount: 30 },
        { name: "Puma T-Shirt", price: 899, discount: 55 },
      ],
      verified: true,
      trending: false,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 4,
      name: "Nykaa",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Beauty and wellness products from top brands",
      rating: 4.4,
      reviews: 45000,
      activeDeals: 800,
      avgDiscount: 35,
      categories: ["Beauty", "Skincare", "Makeup", "Wellness"],
      website: "https://nykaa.com",
      founded: "2012",
      headquarters: "Mumbai, India",
      deliveryTime: "2-5 days",
      returnPolicy: "15 days",
      paymentMethods: ["Credit Card", "Debit Card", "UPI", "COD"],
      specialOffers: ["Nykaa Sale", "Pink Friday", "Beauty Bonanza"],
      topDeals: [
        { name: "Lakme Lipstick", price: 599, discount: 25 },
        { name: "Skincare Kit", price: 2499, discount: 45 },
        { name: "Perfume Set", price: 1999, discount: 30 },
      ],
      verified: true,
      trending: true,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      name: "MakeMyTrip",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Complete travel solution for flights, hotels and packages",
      rating: 4.0,
      reviews: 32000,
      activeDeals: 450,
      avgDiscount: 25,
      categories: ["Travel", "Hotels", "Flights", "Packages"],
      website: "https://makemytrip.com",
      founded: "2000",
      headquarters: "Gurgaon, India",
      deliveryTime: "Instant booking",
      returnPolicy: "As per policy",
      paymentMethods: ["Credit Card", "Debit Card", "UPI", "Net Banking"],
      specialOffers: ["Travel Sale", "Mega Travel Sale", "Wallet Offers"],
      topDeals: [
        { name: "Goa Package", price: 15999, discount: 35 },
        { name: "Delhi-Mumbai Flight", price: 4999, discount: 25 },
        { name: "Hotel Booking", price: 2999, discount: 40 },
      ],
      verified: true,
      trending: false,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 6,
      name: "Swiggy",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Food delivery and grocery shopping made easy",
      rating: 4.2,
      reviews: 89000,
      activeDeals: 2000,
      avgDiscount: 50,
      categories: ["Food", "Groceries", "Restaurants", "Beverages"],
      website: "https://swiggy.com",
      founded: "2014",
      headquarters: "Bangalore, India",
      deliveryTime: "30-45 mins",
      returnPolicy: "Refund policy",
      paymentMethods: ["Credit Card", "Debit Card", "UPI", "COD", "Wallet"],
      specialOffers: ["Swiggy Super", "Free Delivery", "Cashback Offers"],
      topDeals: [
        { name: "Pizza Combo", price: 399, discount: 50 },
        { name: "Biryani Special", price: 299, discount: 40 },
        { name: "Grocery Bundle", price: 1999, discount: 30 },
      ],
      verified: true,
      trending: true,
      color: "from-orange-500 to-yellow-500",
    },
  ]

  const categories = ["all", "Electronics", "Fashion", "Beauty", "Travel", "Food", "Books"]

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || store.categories.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  const trendingStores = stores.filter((store) => store.trending)
  const topRatedStores = [...stores].sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">DealHunt</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/deals" className="text-gray-700 hover:text-indigo-600">
                All Deals
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-indigo-600">
                Categories
              </Link>
              <Link href="/stores" className="text-indigo-600 font-medium">
                Stores
              </Link>
              <Link href="/price-tracker" className="text-gray-700 hover:text-indigo-600">
                Price Tracker
              </Link>
            </nav>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partner{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Stores</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Discover deals from India's most trusted online stores</p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "all" ? "All Stores" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Store Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <ShoppingBag className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stores.length}+</div>
              <div className="text-gray-600">Partner Stores</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {stores.reduce((sum, store) => sum + store.activeDeals, 0).toLocaleString()}+
              </div>
              <div className="text-gray-600">Active Deals</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Percent className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(stores.reduce((sum, store) => sum + store.avgDiscount, 0) / stores.length)}%
              </div>
              <div className="text-gray-600">Avg. Discount</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {(stores.reduce((sum, store) => sum + store.reviews, 0) / 1000).toFixed(0)}K+
              </div>
              <div className="text-gray-600">User Reviews</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Stores</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">All Partner Stores ({filteredStores.length})</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStores.map((store) => (
                <Card
                  key={store.id}
                  className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${store.color}`}></div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Image
                            src={store.logo || "/placeholder.svg"}
                            alt={store.name}
                            width={60}
                            height={60}
                            className="rounded-xl object-cover group-hover:scale-110 transition-transform"
                          />
                          {store.verified && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <Award className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                            {store.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{store.rating}</span>
                              <span className="text-sm text-gray-500">({store.reviews.toLocaleString()})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {store.trending && (
                          <Badge className="bg-orange-100 text-orange-600 animate-pulse">🔥 Trending</Badge>
                        )}
                        {store.verified && <Badge className="bg-green-100 text-green-600">✓ Verified</Badge>}
                      </div>
                    </div>
                    <CardDescription className="text-base mt-2">{store.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-xl font-bold text-indigo-600">{store.activeDeals.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Active Deals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">{store.avgDiscount}%</div>
                        <div className="text-xs text-gray-600">Avg. Discount</div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
                      <div className="flex flex-wrap gap-1">
                        {store.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Delivery
                        </span>
                        <span className="font-medium">{store.deliveryTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Founded
                        </span>
                        <span className="font-medium">{store.founded}</span>
                      </div>
                    </div>

                    {/* Top Deals Preview */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Top Deals</div>
                      <div className="space-y-1">
                        {store.topDeals.slice(0, 2).map((deal, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 truncate">{deal.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">₹{deal.price.toLocaleString()}</span>
                              <Badge className="bg-green-500 text-white text-xs">{deal.discount}% OFF</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link href={`/stores/${store.name.toLowerCase()}`} className="flex-1">
                        <Button className="w-full group-hover:bg-indigo-600 transition-colors">View Store</Button>
                      </Link>
                      <Button variant="outline" size="sm" onClick={() => window.open(store.website, "_blank")}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-8">
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">Trending Stores</h2>
              <Badge className="bg-orange-500 text-white">Hot</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingStores.map((store) => (
                <Card
                  key={store.id}
                  className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-orange-200"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={store.logo || "/placeholder.svg"}
                          alt={store.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{store.name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{store.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-600 animate-pulse">🔥 Trending</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-lg font-bold text-orange-600">{store.activeDeals}</div>
                        <div className="text-xs text-gray-600">Deals</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{store.avgDiscount}%</div>
                        <div className="text-xs text-gray-600">Discount</div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Explore Trending Deals
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="top-rated" className="space-y-8">
            <div className="flex items-center space-x-2 mb-8">
              <Award className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Top Rated Stores</h2>
              <Badge className="bg-yellow-500 text-white">⭐ Best</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRatedStores.map((store, index) => (
                <Card
                  key={store.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer text-center relative"
                >
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-100 text-yellow-600 font-bold">#{index + 1}</Badge>
                  </div>

                  <CardContent className="p-6">
                    <Image
                      src={store.logo || "/placeholder.svg"}
                      alt={store.name}
                      width={60}
                      height={60}
                      className="rounded-xl object-cover mx-auto mb-4 group-hover:scale-110 transition-transform"
                    />
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{store.name}</h3>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold text-yellow-600">{store.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">{store.reviews.toLocaleString()} reviews</div>
                    <Button size="sm" className="w-full">
                      View Store
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <section className="mt-16 text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Want to Partner With Us?</h2>
          <p className="text-xl text-indigo-100 mb-8">Join thousands of stores already benefiting from our platform</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Mail className="mr-2 h-5 w-5" />
              Partner With Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-600 bg-transparent"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
