"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingDown, TrendingUp, Clock, ShoppingCart, Eye } from "lucide-react"
import { useWebSocket } from "@/hooks/use-websocket"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"

interface DealUpdate {
  id: number
  name: string
  price: number
  originalPrice: number
  discount: number
  store: string
  image: string
  timestamp: number
  type?: "price_drop" | "price_increase" | "new_deal"
}

export function LiveDealFeed() {
  const [dealUpdates, setDealUpdates] = useState<DealUpdate[]>([])
  const { isConnected, lastPriceUpdate } = useWebSocket({
    autoConnect: true,
    onPriceUpdate: (update) => {
      // Convert price update to deal update format
      const dealUpdate: DealUpdate = {
        id: update.dealId,
        name: update.productName,
        price: update.newPrice,
        originalPrice: update.oldPrice,
        discount: update.discount,
        store: update.store,
        image: "/placeholder.svg?height=60&width=60&text=Deal",
        timestamp: Date.now(),
        type: update.type === "price_drop" ? "price_drop" : "price_increase",
      }

      setDealUpdates((prev) => [dealUpdate, ...prev].slice(0, 20))
    },
  })

  // Mock some initial deal updates for demonstration
  useEffect(() => {
    const mockDeals: DealUpdate[] = [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        price: 134900,
        originalPrice: 159900,
        discount: 16,
        store: "Amazon",
        image: "/placeholder.svg?height=60&width=60&text=iPhone",
        timestamp: Date.now() - 300000,
        type: "price_drop",
      },
      {
        id: 2,
        name: "Nike Air Max 270 Shoes",
        price: 7797,
        originalPrice: 12995,
        discount: 40,
        store: "Myntra",
        image: "/placeholder.svg?height=60&width=60&text=Nike",
        timestamp: Date.now() - 600000,
        type: "new_deal",
      },
      {
        id: 3,
        name: 'Samsung 55" 4K Smart TV',
        price: 54999,
        originalPrice: 89999,
        discount: 39,
        store: "Flipkart",
        image: "/placeholder.svg?height=60&width=60&text=Samsung",
        timestamp: Date.now() - 900000,
        type: "price_drop",
      },
    ]

    setDealUpdates(mockDeals)
  }, [])

  const handleViewDeal = (dealId: number) => {
    window.open(`/deals/${dealId}`, "_blank")
  }

  const handleBuyNow = (dealId: number) => {
    // In a real app, this would redirect to the store's product page
    window.open(`https://example.com/deal/${dealId}`, "_blank")
  }

  const getPriceChangeIcon = (type?: string) => {
    switch (type) {
      case "price_drop":
        return <TrendingDown className="w-4 h-4 text-green-600" />
      case "price_increase":
        return <TrendingUp className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-blue-600" />
    }
  }

  const getPriceChangeColor = (type?: string) => {
    switch (type) {
      case "price_drop":
        return "text-green-600"
      case "price_increase":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
            <span className="font-medium text-sm sm:text-base">Live Updates</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {dealUpdates.length} recent updates
          </Badge>
        </div>

        <ScrollArea className="h-80 sm:h-96">
          {dealUpdates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No recent updates</p>
              <p className="text-sm">Live deal updates will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dealUpdates.map((deal, index) => (
                <div
                  key={`${deal.id}-${deal.timestamp}`}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                >
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getPriceChangeIcon(deal.type)}
                      <h4 className="font-medium text-sm truncate">{deal.name}</h4>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`font-bold text-sm sm:text-base ${getPriceChangeColor(deal.type)}`}>
                        ₹{deal.price.toLocaleString()}
                      </span>
                      {deal.originalPrice !== deal.price && (
                        <>
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            ₹{deal.originalPrice.toLocaleString()}
                          </span>
                          <Badge className="bg-red-100 text-red-600 text-xs">{deal.discount}% OFF</Badge>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{deal.store}</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(deal.timestamp, { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1 h-auto bg-transparent touch-manipulation"
                      onClick={() => handleViewDeal(deal.id)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button
                      size="sm"
                      className="text-xs px-2 py-1 h-auto bg-green-600 hover:bg-green-700 touch-manipulation"
                      onClick={() => handleBuyNow(deal.id)}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Buy</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
