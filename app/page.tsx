"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Star,
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
  Zap,
  Target,
  Shield,
  Clock,
  Menu,
  X,
  Smartphone,
  Shirt,
  Home,
  Gamepad2,
  Book,
  Car,
  Eye,
  Users,
  Percent,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WebSocketStatus } from "@/components/websocket-status"
import { LiveNotificationCenter } from "@/components/live-notification-center"
import { LiveDealFeed } from "@/components/live-deal-feed"
import { useWebSocket } from "@/hooks/use-websocket"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const { isConnected, notifications, unreadCount } = useWebSocket({
    userId: "user123",
    autoConnect: true,
  })

  const heroSlides = [
    {
      title: "Discover Amazing Deals",
      subtitle: "Save up to 80% on your favorite products",
      image: "/placeholder.svg?height=400&width=600&text=Hero+Image+1",
      cta: "Explore Deals",
    },
    {
      title: "Price Drop Alerts",
      subtitle: "Get notified when prices drop on items you love",
      image: "/placeholder.svg?height=400&width=600&text=Hero+Image+2",
      cta: "Set Alerts",
    },
    {
      title: "Best Brands, Best Prices",
      subtitle: "Shop from top brands at unbeatable prices",
      image: "/placeholder.svg?height=400&width=600&text=Hero+Image+3",
      cta: "Shop Now",
    },
  ]

  const featuredDeals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      originalPrice: 159900,
      price: 134900,
      discount: 16,
      store: "Amazon",
      image: "/placeholder.svg?height=200&width=200&text=iPhone+15+Pro",
      rating: 4.8,
      reviews: 2847,
      timeLeft: "2h 45m",
      category: "Electronics",
      buyUrl: "https://amazon.in/iphone-15-pro-max",
    },
    {
      id: 2,
      name: "Nike Air Max 270 Running Shoes",
      originalPrice: 12995,
      price: 7797,
      discount: 40,
      store: "Myntra",
      image: "/placeholder.svg?height=200&width=200&text=Nike+Air+Max",
      rating: 4.6,
      reviews: 1523,
      timeLeft: "5h 12m",
      category: "Fashion",
      buyUrl: "https://myntra.com/nike-air-max-270",
    },
    {
      id: 3,
      name: 'Samsung 55" 4K Smart TV',
      originalPrice: 89999,
      price: 54999,
      discount: 39,
      store: "Flipkart",
      image: "/placeholder.svg?height=200&width=200&text=Samsung+TV",
      rating: 4.4,
      reviews: 892,
      timeLeft: "1d 3h",
      category: "Electronics",
      buyUrl: "https://flipkart.com/samsung-55-4k-tv",
    },
    {
      id: 4,
      name: "Instant Pot Duo 7-in-1 Pressure Cooker",
      originalPrice: 9599,
      price: 5759,
      discount: 40,
      store: "Amazon",
      image: "/placeholder.svg?height=200&width=200&text=Instant+Pot",
      rating: 4.7,
      reviews: 3421,
      timeLeft: "8h 30m",
      category: "Home & Kitchen",
      buyUrl: "https://amazon.in/instant-pot-duo",
    },
    {
      id: 5,
      name: "Adidas Ultraboost 22 Shoes",
      originalPrice: 12599,
      price: 8819,
      discount: 30,
      store: "Myntra",
      image: "/placeholder.svg?height=200&width=200&text=Adidas+Ultraboost",
      rating: 4.5,
      reviews: 756,
      timeLeft: "4h 15m",
      category: "Fashion",
      buyUrl: "https://myntra.com/adidas-ultraboost-22",
    },
    {
      id: 6,
      name: "MacBook Air M2 13-inch",
      originalPrice: 114900,
      price: 99900,
      discount: 13,
      store: "Flipkart",
      image: "/placeholder.svg?height=200&width=200&text=MacBook+Air",
      rating: 4.9,
      reviews: 1247,
      timeLeft: "12h 45m",
      category: "Electronics",
      buyUrl: "https://flipkart.com/macbook-air-m2",
    },
  ]

  const categories = [
    {
      name: "Electronics",
      icon: Smartphone,
      count: 2847,
      trending: true,
      color: "bg-blue-500",
      products: [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Headphones",
        "Smart Watches",
        "Cameras",
        "Gaming Consoles",
        "Smart TVs",
        "Speakers",
        "Power Banks",
        "Chargers",
        "Accessories",
      ],
    },
    {
      name: "Fashion",
      icon: Shirt,
      count: 1923,
      trending: false,
      color: "bg-pink-500",
      products: [
        "Men's Clothing",
        "Women's Clothing",
        "Shoes",
        "Bags",
        "Watches",
        "Jewelry",
        "Sunglasses",
        "Belts",
        "Wallets",
        "Perfumes",
        "Accessories",
        "Kids Wear",
      ],
    },
    {
      name: "Home & Kitchen",
      icon: Home,
      count: 1456,
      trending: true,
      color: "bg-green-500",
      products: [
        "Kitchen Appliances",
        "Cookware",
        "Home Decor",
        "Furniture",
        "Bedding",
        "Storage",
        "Cleaning",
        "Garden",
        "Tools",
        "Lighting",
        "Bath",
        "Organization",
      ],
    },
    {
      name: "Sports & Fitness",
      icon: Gamepad2,
      count: 892,
      trending: false,
      color: "bg-orange-500",
      products: [
        "Fitness Equipment",
        "Sports Shoes",
        "Activewear",
        "Supplements",
        "Outdoor Gear",
        "Yoga",
        "Cycling",
        "Swimming",
        "Running",
        "Team Sports",
        "Gym Accessories",
        "Recovery",
      ],
    },
    {
      name: "Books & Media",
      icon: Book,
      count: 634,
      trending: false,
      color: "bg-purple-500",
      products: [
        "Fiction Books",
        "Non-Fiction",
        "Educational",
        "Comics",
        "Magazines",
        "E-books",
        "Audiobooks",
        "Movies",
        "Music",
        "Games",
        "Software",
        "Stationery",
      ],
    },
    {
      name: "Automotive",
      icon: Car,
      count: 445,
      trending: true,
      color: "bg-red-500",
      products: [
        "Car Accessories",
        "Bike Accessories",
        "Tools",
        "Parts",
        "Oils & Fluids",
        "Tires",
        "Electronics",
        "Cleaning",
        "Safety",
        "Navigation",
        "Audio",
        "Maintenance",
      ],
    },
  ]

  const stores = [
    { name: "Amazon", logo: "/placeholder.svg?height=40&width=40&text=A", deals: 1247 },
    { name: "Flipkart", logo: "/placeholder.svg?height=40&width=40&text=F", deals: 892 },
    { name: "Myntra", logo: "/placeholder.svg?height=40&width=40&text=M", deals: 634 },
    { name: "Nykaa", logo: "/placeholder.svg?height=40&width=40&text=N", deals: 445 },
    { name: "BigBasket", logo: "/placeholder.svg?height=40&width=40&text=B", deals: 323 },
    { name: "Zomato", logo: "/placeholder.svg?height=40&width=40&text=Z", deals: 267 },
  ]

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Real-time Price Tracking",
      description: "Get instant notifications when prices drop on your favorite products",
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "Price Alerts",
      description: "Set target prices and we'll notify you when deals reach your budget",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Verified Deals",
      description: "All deals are verified and updated in real-time from trusted stores",
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Deal Expiry Alerts",
      description: "Never miss a deal with timely expiry notifications",
    },
  ]

  // Auto-slide hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const handleViewDeal = (dealId: number) => {
    window.open(`/deals/${dealId}`, "_blank")
  }

  const handleBuyNow = (buyUrl: string) => {
    window.open(buyUrl, "_blank")
  }

  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: "https://facebook.com/dealhunt",
      twitter: "https://twitter.com/dealhunt",
      instagram: "https://instagram.com/dealhunt",
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 safe-area-inset-top">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DealHunt
                </h1>
              </div>
              <div className="hidden sm:block">
                <WebSocketStatus />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/" className="text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/deals" className="text-gray-600 hover:text-blue-600 transition-colors">
                All Deals
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                Categories
              </Link>
              <Link href="/stores" className="text-gray-600 hover:text-blue-600 transition-colors">
                Stores
              </Link>
              <Link href="/price-tracker" className="text-gray-600 hover:text-blue-600 transition-colors">
                Price Tracker
              </Link>
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="sm:hidden">
                <WebSocketStatus />
              </div>
              <LiveNotificationCenter />
              <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hidden sm:inline-flex">
                Sign Up
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link href="/" className="text-blue-600 font-medium">
                  Home
                </Link>
                <Link href="/deals" className="text-gray-600 hover:text-blue-600 transition-colors">
                  All Deals
                </Link>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Categories
                </Link>
                <Link href="/stores" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Stores
                </Link>
                <Link href="/price-tracker" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Price Tracker
                </Link>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Sign In
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 flex-1">
                    Sign Up
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Find the Best Deals
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed px-4">
              Discover amazing discounts from top brands across India. Save money on electronics, fashion, home goods,
              and more with real-time price tracking.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8 sm:mb-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for products, brands, or stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg touch-manipulation"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-sm sm:text-base text-gray-600">Active Deals</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">1M+</div>
                <div className="text-sm sm:text-base text-gray-600">Happy Users</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-pink-600 mb-2">₹100Cr+</div>
                <div className="text-sm sm:text-base text-gray-600">Money Saved</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-sm sm:text-base text-gray-600">Partner Stores</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose DealHunt?</h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Discover the features that make us the best deal hunting platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">🔥 Featured Deals</h3>
              <p className="text-gray-600">Hand-picked deals with the biggest savings</p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <span className="hidden sm:inline">View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredDeals.map((deal) => (
              <Card
                key={deal.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                    <Percent className="w-3 h-3 mr-1" />
                    {deal.discount}% OFF
                  </Badge>
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {deal.timeLeft}
                  </Badge>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {deal.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{deal.rating}</span>
                      <span className="hidden sm:inline">({deal.reviews})</span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-base sm:text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {deal.name}
                  </h4>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl sm:text-2xl font-bold text-green-600">₹{deal.price.toLocaleString()}</span>
                    <span className="text-base sm:text-lg text-gray-400 line-through">
                      ₹{deal.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/placeholder.svg?height=20&width=20&text=Store"
                        alt={deal.store}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-sm text-gray-600">{deal.store}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">234 bought</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center justify-center space-x-1 bg-transparent touch-manipulation"
                      onClick={() => handleViewDeal(deal.id)}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View Deal</span>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 flex items-center justify-center space-x-1 bg-gradient-to-r from-green-600 to-green-700 touch-manipulation"
                      onClick={() => handleBuyNow(deal.buyUrl)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">Buy Now</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">🛍️ Shop by Category</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore thousands of deals across all your favorite categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.name}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden touch-manipulation"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">{category.count} deals</p>
                    {category.trending && (
                      <Badge className="bg-orange-100 text-orange-600 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}

                    {/* Hover overlay with products - Hidden on mobile */}
                    {hoveredCategory === category.name && (
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-4 flex flex-col justify-center animate-in fade-in-0 duration-200 hidden lg:flex">
                        <div className="text-xs space-y-1">
                          {category.products.slice(0, 6).map((product, index) => (
                            <div key={index} className="text-gray-600 hover:text-blue-600 cursor-pointer">
                              {product}
                            </div>
                          ))}
                          {category.products.length > 6 && (
                            <div className="text-blue-600 font-medium">+{category.products.length - 6} more</div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Live Deal Feed */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">⚡ Live Deal Feed</h3>
              <p className="text-gray-600">Real-time price updates and new deals</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
              <span className="text-sm text-gray-600">{isConnected ? "Live" : "Offline"}</span>
            </div>
          </div>
          <LiveDealFeed />
        </div>
      </section>

      {/* Partner Stores */}
      <section className="py-12 sm:py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">🏪 Partner Stores</h3>
            <p className="text-gray-600">We partner with India's top retailers to bring you the best deals</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {stores.map((store) => (
              <Card
                key={store.name}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm touch-manipulation"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <Image
                    src={store.logo || "/placeholder.svg"}
                    alt={store.name}
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h4 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-blue-600 transition-colors">
                    {store.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">{store.deals} deals</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 safe-area-inset-bottom">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">DealHunt</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Your ultimate destination for finding the best deals and discounts across India's top retailers.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2 touch-manipulation"
                  onClick={() => handleSocialClick("facebook")}
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2 touch-manipulation"
                  onClick={() => handleSocialClick("twitter")}
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2 touch-manipulation"
                  onClick={() => handleSocialClick("instagram")}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/deals" className="hover:text-white transition-colors">
                    All Deals
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="hover:text-white transition-colors">
                    Stores
                  </Link>
                </li>
                <li>
                  <Link href="/price-tracker" className="hover:text-white transition-colors">
                    Price Tracker
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/categories/electronics" className="hover:text-white transition-colors">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/categories/fashion" className="hover:text-white transition-colors">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/categories/home" className="hover:text-white transition-colors">
                    Home & Kitchen
                  </Link>
                </li>
                <li>
                  <Link href="/categories/sports" className="hover:text-white transition-colors">
                    Sports & Fitness
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 DealHunt. All rights reserved. Made with ❤️ in India.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
