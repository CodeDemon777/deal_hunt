"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingDown, Target, Edit, Trash2, ShoppingCart, Eye } from "lucide-react"
import { useWebSocket } from "@/hooks/use-websocket"
import Image from "next/image"

interface Deal {
  id: number
  name: string
  currentPrice: number
  originalPrice: number
  targetPrice?: number
  image: string
  store: string
  category: string
  isTracking: boolean
}

interface RealTimePriceTrackerProps {
  deals: Deal[]
  userId?: string
  onTrackingChange?: (dealId: number, isTracking: boolean) => void
}

export function RealTimePriceTracker({ deals, userId, onTrackingChange }: RealTimePriceTrackerProps) {
  const [editingTarget, setEditingTarget] = useState<number | null>(null)
  const [newTargetPrice, setNewTargetPrice] = useState("")

  const { isConnected, trackDeal, untrackDeal, setPriceAlert, lastPriceUpdate } = useWebSocket({
    userId,
    autoConnect: true,
  })

  const handleToggleTracking = (dealId: number, currentlyTracking: boolean) => {
    const newTrackingState = !currentlyTracking

    if (newTrackingState) {
      trackDeal(dealId)
    } else {
      untrackDeal(dealId)
    }

    onTrackingChange?.(dealId, newTrackingState)
  }

  const handleUpdateTargetPrice = (dealId: number) => {
    const price = Number.parseFloat(newTargetPrice)
    if (price > 0) {
      setPriceAlert(dealId, price)
      setEditingTarget(null)
      setNewTargetPrice("")
    }
  }

  const getPriceChangePercentage = (current: number, original: number) => {
    return Math.round(((original - current) / original) * 100)
  }

  const getPriceChangeIcon = (current: number, target?: number) => {
    if (target && current <= target) {
      return <Target className="w-4 h-4 text-green-600" />
    }
    return <TrendingDown className="w-4 h-4 text-blue-600" />
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {deals.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardContent className="p-8 sm:p-12 text-center">
            <Target className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No products tracked yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your favorite products to get notified when prices drop</p>
            <Button>Add Your First Product</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0 mx-auto sm:mx-0"
                  />

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="mb-2 sm:mb-0">
                        <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2">{deal.name}</h3>
                        <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-gray-600">
                          <span>{deal.store}</span>
                          <span>•</span>
                          <span>{deal.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center sm:justify-end space-x-2">
                        {deal.targetPrice && deal.currentPrice <= deal.targetPrice && (
                          <Badge className="bg-green-100 text-green-600">
                            <Target className="w-3 h-3 mr-1" />
                            Target Reached
                          </Badge>
                        )}
                        <Badge
                          variant={deal.isTracking ? "default" : "secondary"}
                          className={deal.isTracking ? "bg-blue-100 text-blue-600" : ""}
                        >
                          {deal.isTracking ? "Tracking" : "Paused"}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="text-center sm:text-left">
                        <Label className="text-xs text-gray-500">Current Price</Label>
                        <div className="flex items-center justify-center sm:justify-start space-x-2">
                          <span className="text-xl sm:text-2xl font-bold text-blue-600">
                            ₹{deal.currentPrice.toLocaleString()}
                          </span>
                          {getPriceChangeIcon(deal.currentPrice, deal.targetPrice)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getPriceChangePercentage(deal.currentPrice, deal.originalPrice)}% off from original
                        </div>
                      </div>

                      <div className="text-center sm:text-left">
                        <Label className="text-xs text-gray-500">Target Price</Label>
                        {editingTarget === deal.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={newTargetPrice}
                              onChange={(e) => setNewTargetPrice(e.target.value)}
                              className="h-8 text-sm"
                              placeholder="Enter target price"
                            />
                            <Button size="sm" onClick={() => handleUpdateTargetPrice(deal.id)} className="h-8 px-2">
                              Save
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center sm:justify-start space-x-2">
                            <div className="text-lg sm:text-xl font-semibold text-green-600">
                              ₹{deal.targetPrice?.toLocaleString() || "Not set"}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingTarget(deal.id)
                                setNewTargetPrice(deal.targetPrice?.toString() || "")
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        {deal.targetPrice && (
                          <div className="text-sm text-gray-500">
                            {deal.currentPrice > deal.targetPrice
                              ? `₹${(deal.currentPrice - deal.targetPrice).toLocaleString()} to go`
                              : "Target achieved!"}
                          </div>
                        )}
                      </div>

                      <div className="text-center sm:text-left">
                        <Label className="text-xs text-gray-500">Original Price</Label>
                        <div className="text-base sm:text-lg text-gray-400 line-through">
                          ₹{deal.originalPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-2 order-2 sm:order-1">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={deal.isTracking}
                            onCheckedChange={() => handleToggleTracking(deal.id, deal.isTracking)}
                          />
                          <Label className="text-sm">{deal.isTracking ? "Tracking Active" : "Tracking Paused"}</Label>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent touch-manipulation">
                          <Eye className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 touch-manipulation">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Buy Now</span>
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 order-1 sm:order-2">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                          <span>{isConnected ? "Live tracking" : "Offline"}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 touch-manipulation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
