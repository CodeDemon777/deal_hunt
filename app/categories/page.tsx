"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Gift,
  TrendingUp,
  Smartphone,
  Home,
  Book,
  Plane,
  UtensilsCrossed,
  Shirt,
  Heart,
  Dumbbell,
} from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      id: 1,
      name: "Electronics",
      icon: Smartphone,
      description: "Smartphones, laptops, gadgets and electronic devices",
      dealCount: 2500,
      avgDiscount: 25,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      subcategories: ["Smartphones", "Laptops", "Tablets", "Headphones", "Cameras"],
      featuredDeals: [
        { name: "iPhone 15 Pro Max", price: 134900, discount: 16 },
        { name: "MacBook Air M2", price: 99900, discount: 17 },
        { name: "Samsung Galaxy S24", price: 79999, discount: 20 },
      ],
      trending: true,
    },
    {
      id: 2,
      name: "Fashion",
      icon: Shirt,
      description: "Clothing, shoes, accessories and fashion items",
      dealCount: 3200,
      avgDiscount: 40,
      color: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
      subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Watches"],
      featuredDeals: [
        { name: "Nike Air Max", price: 7797, discount: 40 },
        { name: "Adidas Ultraboost", price: 12599, discount: 30 },
        { name: "Levi's Jeans", price: 2499, discount: 50 },
      ],
      trending: true,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      icon: Home,
      description: "Home appliances, kitchen items and furniture",
      dealCount: 1800,
      avgDiscount: 35,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
      subcategories: ["Kitchen Appliances", "Furniture", "Home Decor", "Cleaning", "Storage"],
      featuredDeals: [
        { name: "Instant Pot Duo", price: 9599, discount: 40 },
        { name: "Dyson V15", price: 45999, discount: 25 },
        { name: "IKEA Sofa Set", price: 29999, discount: 30 },
      ],
      trending: false,
    },
    {
      id: 4,
      name: "Books & Education",
      icon: Book,
      description: "Books, e-books and educational materials",
      dealCount: 900,
      avgDiscount: 20,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      subcategories: ["Fiction", "Non-Fiction", "Textbooks", "Children's Books", "E-books"],
      featuredDeals: [
        { name: "Bestseller Collection", price: 299, discount: 60 },
        { name: "Programming Books", price: 1999, discount: 40 },
        { name: "Kids Story Books", price: 499, discount: 50 },
      ],
      trending: false,
    },
    {
      id: 5,
      name: "Travel & Tourism",
      icon: Plane,
      description: "Flight tickets, hotels and travel packages",
      dealCount: 600,
      avgDiscount: 30,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
      subcategories: ["Flights", "Hotels", "Packages", "Car Rentals", "Activities"],
      featuredDeals: [
        { name: "Goa Package", price: 15999, discount: 35 },
        { name: "Delhi-Mumbai Flight", price: 4999, discount: 25 },
        { name: "Luxury Hotel Stay", price: 8999, discount: 40 },
      ],
      trending: true,
    },
    {
      id: 6,
      name: "Food & Dining",
      icon: UtensilsCrossed,
      description: "Food delivery, restaurants and grocery items",
      dealCount: 1200,
      avgDiscount: 45,
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
      subcategories: ["Restaurants", "Groceries", "Beverages", "Snacks", "Organic"],
      featuredDeals: [
        { name: "Pizza Combo", price: 399, discount: 50 },
        { name: "Grocery Bundle", price: 1999, discount: 30 },
        { name: "Premium Coffee", price: 899, discount: 40 },
      ],
      trending: false,
    },
    {
      id: 7,
      name: "Health & Beauty",
      icon: Heart,
      description: "Skincare, makeup, health supplements and wellness",
      dealCount: 1500,
      avgDiscount: 35,
      color: "bg-rose-500",
      gradient: "from-rose-500 to-rose-600",
      subcategories: ["Skincare", "Makeup", "Hair Care", "Supplements", "Fitness"],
      featuredDeals: [
        { name: "Skincare Kit", price: 2499, discount: 45 },
        { name: "Protein Powder", price: 1899, discount: 30 },
        { name: "Makeup Palette", price: 1299, discount: 50 },
      ],
      trending: true,
    },
    {
      id: 8,
      name: "Sports & Fitness",
      icon: Dumbbell,
      description: "Sports equipment, fitness gear and outdoor activities",
      dealCount: 800,
      avgDiscount: 30,
      color: "bg-teal-500",
      gradient: "from-teal-500 to-teal-600",
      subcategories: ["Gym Equipment", "Sports Gear", "Outdoor", "Yoga", "Running"],
      featuredDeals: [
        { name: "Gym Equipment Set", price: 12999, discount: 35 },
        { name: "Running Shoes", price: 4999, discount: 40 },
        { name: "Yoga Mat Premium", price: 1499, discount: 25 },
      ],
      trending: false,
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const trendingCategories = categories.filter((cat) => cat.trending)
  const topCategories = [...categories].sort((a, b) => b.dealCount - a.dealCount).slice(0, 4)

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
              <Link href="/categories" className="text-indigo-600 font-medium">
                Categories
              </Link>
              <Link href="/stores" className="text-gray-700 hover:text-indigo-600">
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
            Shop by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Category
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Discover amazing deals across all your favorite categories</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
            />
          </div>
        </div>

        {/* Trending Categories */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Trending Categories</h2>
            <Badge className="bg-orange-500 text-white">Hot</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                    ></div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-orange-100 text-orange-600 animate-pulse">🔥 Trending</Badge>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Deals Available</span>
                          <span className="font-bold text-indigo-600">{category.dealCount.toLocaleString()}+</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Avg. Discount</span>
                          <span className="font-bold text-green-600">{category.avgDiscount}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* All Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <Link href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        {category.trending && <Badge className="bg-orange-100 text-orange-600">🔥 Hot</Badge>}
                      </div>
                      <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-base">{category.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600">
                            {category.dealCount.toLocaleString()}+
                          </div>
                          <div className="text-xs text-gray-600">Active Deals</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{category.avgDiscount}%</div>
                          <div className="text-xs text-gray-600">Avg. Discount</div>
                        </div>
                      </div>

                      {/* Subcategories */}
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Popular Subcategories</div>
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <Badge key={sub} variant="outline" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                          {category.subcategories.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.subcategories.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Featured Deals */}
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Featured Deals</div>
                        <div className="space-y-2">
                          {category.featuredDeals.slice(0, 2).map((deal, index) => (
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

                      <Button className="w-full group-hover:bg-indigo-600 transition-colors">
                        Explore {category.name}
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Top Categories by Deals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Most Popular Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={category.id} href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-indigo-100 text-indigo-600 font-bold">#{index + 1}</Badge>
                    </div>
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {category.name}
                      </h3>
                      <div className="text-2xl font-bold text-indigo-600 mb-1">
                        {category.dealCount.toLocaleString()}+
                      </div>
                      <div className="text-sm text-gray-600">Active Deals</div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-indigo-100 mb-8">Browse all deals or set up price alerts for specific products</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/deals">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Browse All Deals
              </Button>
            </Link>
            <Link href="/price-tracker">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-indigo-600 bg-transparent"
              >
                Set Price Alerts
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
