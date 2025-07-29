"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Share2,
  ExternalLink,
  Clock,
  TrendingDown,
  TrendingUp,
  Star,
  ShoppingCart,
  Bell,
  Gift,
  ArrowLeft,
  Check,
  AlertTriangle,
  Info,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function DealDetailPage() {
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 30, seconds: 45 })

  // Mock deal data - in real app, fetch based on params.id
  const deal = {
    id: 1,
    title: "iPhone 15 Pro Max 256GB - Natural Titanium",
    description:
      "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system. Features include 48MP main camera, 5x telephoto zoom, Action Button, and USB-C connectivity.",
    originalPrice: 159900,
    discountedPrice: 134900,
    discount: 16,
    store: "Amazon",
    storeRating: 4.2,
    category: "Electronics",
    subcategory: "Smartphones",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    badge: "Loot Deal",
    rating: 4.8,
    reviews: 1250,
    availability: "In Stock",
    shipping: "Free Delivery",
    warranty: "1 Year Apple Warranty",
    dealUrl: "https://amazon.in/iphone-15-pro-max",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    views: 15420,
    likes: 892,
    shares: 156,
    priceHistory: [
      { date: "2024-01-01", price: 159900 },
      { date: "2024-01-15", price: 155000 },
      { date: "2024-02-01", price: 149900 },
      { date: "2024-02-15", price: 145000 },
      { date: "2024-03-01", price: 134900 },
    ],
    specifications: {
      Display: "6.7-inch Super Retina XDR",
      Chip: "A17 Pro",
      Storage: "256GB",
      Camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      Battery: "Up to 29 hours video playback",
      Color: "Natural Titanium",
    },
    highlights: [
      "Titanium design with textured matte glass back",
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 5x Telephoto camera",
      "Action Button for quick access to features",
      "USB-C connector",
      "Emergency SOS via satellite",
    ],
    similarDeals: [
      {
        id: 2,
        title: "iPhone 15 Pro 128GB",
        price: 124900,
        originalPrice: 134900,
        discount: 7,
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        id: 3,
        title: "Samsung Galaxy S24 Ultra",
        price: 119999,
        originalPrice: 129999,
        discount: 8,
        image: "/placeholder.svg?height=150&width=150",
      },
    ],
  }

  const reviews = [
    {
      id: 1,
      user: "Rajesh Kumar",
      rating: 5,
      date: "2024-03-15",
      comment: "Amazing phone! The camera quality is outstanding and the titanium build feels premium.",
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      user: "Priya Sharma",
      rating: 4,
      date: "2024-03-10",
      comment: "Great deal! Saved a lot of money. Delivery was quick and packaging was perfect.",
      helpful: 18,
      verified: true,
    },
  ]

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const priceDropPercentage = ((deal.priceHistory[0].price - deal.discountedPrice) / deal.priceHistory[0].price) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/deals" className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Deals</span>
              </Link>
            </div>
            <Link href="/" className="flex items-center space-x-2">
              <Gift className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">DealHunt</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Images */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={deal.images[currentImageIndex] || "/placeholder.svg"}
                    alt={deal.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />

                  {/* Badges */}
                  <Badge
                    className="absolute top-4 left-4"
                    variant={deal.badge === "Loot Deal" ? "destructive" : "default"}
                  >
                    {deal.badge}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    {deal.discount}% OFF
                  </div>

                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {deal.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Images */}
                <div className="p-4 flex space-x-4 overflow-x-auto">
                  {deal.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? "border-indigo-500" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${deal.title} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold">{deal.title}</CardTitle>
                    <CardDescription className="text-lg">{deal.description}</CardDescription>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{deal.rating}</span>
                        <span className="text-gray-500">({deal.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline">{deal.category}</Badge>
                      <Badge variant="outline">{deal.store}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                      {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Price Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        ₹{deal.discountedPrice.toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg text-gray-500 line-through">
                          ₹{deal.originalPrice.toLocaleString()}
                        </span>
                        <Badge className="bg-green-500 text-white">
                          Save ₹{(deal.originalPrice - deal.discountedPrice).toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Price dropped by</div>
                      <div className="text-2xl font-bold text-green-600 flex items-center">
                        <TrendingDown className="h-6 w-6 mr-1" />
                        {priceDropPercentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Deal Status */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-600">Availability</div>
                      <div className="font-semibold text-green-600">{deal.availability}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Shipping</div>
                      <div className="font-semibold">{deal.shipping}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Warranty</div>
                      <div className="font-semibold">{deal.warranty}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg py-6"
                    onClick={() => window.open(deal.dealUrl, "_blank")}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Get This Deal
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsTracking(!isTracking)}
                    className="sm:w-auto py-6"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    {isTracking ? "Tracking" : "Track Price"}
                  </Button>
                </div>

                {/* Product Highlights */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {deal.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="specifications" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="price-history">Price History</TabsTrigger>
                    <TabsTrigger value="similar">Similar Deals</TabsTrigger>
                  </TabsList>

                  <TabsContent value="specifications" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Technical Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(deal.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">{key}</span>
                            <span className="text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Customer Reviews</h3>
                        <div className="flex items-center space-x-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{deal.rating}</span>
                          <span className="text-gray-500">({deal.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <Card key={review.id} className="border-l-4 border-l-indigo-500">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-semibold">{review.user}</span>
                                    {review.verified && (
                                      <Badge variant="outline" className="text-xs">
                                        <Check className="h-3 w-3 mr-1" />
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <div className="flex">
                                      {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <button className="flex items-center space-x-1 hover:text-indigo-600">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-indigo-600">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="price-history" className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Price History</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600">Lowest Price</div>
                          <div className="text-lg font-bold text-green-600">
                            ₹{Math.min(...deal.priceHistory.map((p) => p.price)).toLocaleString()}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {deal.priceHistory.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{entry.date}</span>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">₹{entry.price.toLocaleString()}</span>
                                {index > 0 && (
                                  <div className="flex items-center">
                                    {entry.price < deal.priceHistory[index - 1].price ? (
                                      <TrendingDown className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <TrendingUp className="h-4 w-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Info className="h-5 w-5 text-blue-500" />
                          <span className="font-semibold text-blue-900">Price Alert</span>
                        </div>
                        <p className="text-sm text-blue-800">
                          Set up price alerts to get notified when the price drops below your target price.
                        </p>
                        <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                          Set Price Alert
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="similar" className="p-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Similar Deals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {deal.similarDeals.map((similarDeal) => (
                          <Card key={similarDeal.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex space-x-4">
                                <Image
                                  src={similarDeal.image || "/placeholder.svg"}
                                  alt={similarDeal.title}
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-2 line-clamp-2">{similarDeal.title}</h4>
                                  <div className="space-y-1">
                                    <div className="text-lg font-bold text-green-600">
                                      ₹{similarDeal.price.toLocaleString()}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-500 line-through">
                                        ₹{similarDeal.originalPrice.toLocaleString()}
                                      </span>
                                      <Badge className="bg-green-500 text-white text-xs">
                                        {similarDeal.discount}% OFF
                                      </Badge>
                                    </div>
                                  </div>
                                  <Button size="sm" className="mt-2 w-full">
                                    View Deal
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deal Timer */}
            <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Deal Expires In</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm opacity-80">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm opacity-80">Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm opacity-80">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-sm opacity-80">Seconds</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={75} className="bg-white/20" />
                  <div className="text-xs text-center mt-2 opacity-80">75% of deal time remaining</div>
                </div>
              </CardContent>
            </Card>

            {/* Store Information */}
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{deal.store}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{deal.storeRating}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return Policy</span>
                    <span className="font-medium">30 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Service</span>
                    <span className="font-medium">24/7</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Visit Store
                </Button>
              </CardContent>
            </Card>

            {/* Deal Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-medium">{deal.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Likes</span>
                  </div>
                  <span className="font-medium">{deal.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Shares</span>
                  </div>
                  <span className="font-medium">{deal.shares}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Tracking</span>
                  </div>
                  <span className="font-medium">2.3k</span>
                </div>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-900">Safety Notice</h4>
                    <p className="text-sm text-orange-800">
                      Always verify the seller and read reviews before making a purchase. DealHunt is not responsible
                      for transactions made through external links.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <CardHeader>
                <CardTitle>Never Miss a Deal</CardTitle>
                <CardDescription className="text-indigo-100">
                  Get personalized deal alerts delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100">Subscribe to Alerts</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
