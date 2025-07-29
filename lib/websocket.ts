"use client"

import { toast } from "@/hooks/use-toast"

export interface PriceUpdate {
  dealId: number
  productName: string
  oldPrice: number
  newPrice: number
  discount: number
  store: string
  timestamp: Date
  type: "price_drop" | "price_increase" | "back_in_stock" | "low_stock"
}

export interface NotificationData {
  id: string
  type: "price_alert" | "deal_expiry" | "stock_alert" | "new_deal" | "target_reached"
  title: string
  message: string
  dealId?: number
  userId?: string
  timestamp: Date
  data?: any
  read?: boolean
}

// Mock WebSocket implementation
class MockWebSocket {
  public readyState = 0 // CONNECTING
  public onopen: ((event: any) => void) | null = null
  public onmessage: ((event: { data: string }) => void) | null = null
  public onclose: ((event: { code: number; reason: string }) => void) | null = null
  public onerror: ((event: any) => void) | null = null

  private updateInterval: NodeJS.Timeout | null = null
  private notificationInterval: NodeJS.Timeout | null = null
  private connected = false
  private trackedDeals = new Set<number>()
  private priceAlerts = new Map<number, number>()

  private mockDeals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      basePrice: 159900,
      currentPrice: 134900,
      store: "Amazon",
      category: "Electronics",
      volatility: 0.15,
      lastUpdate: new Date(),
    },
    {
      id: 2,
      name: "Nike Air Max Shoes",
      basePrice: 12995,
      currentPrice: 7797,
      store: "Myntra",
      category: "Fashion",
      volatility: 0.25,
      lastUpdate: new Date(),
    },
    {
      id: 3,
      name: 'Samsung 55" 4K Smart TV',
      basePrice: 89999,
      currentPrice: 54999,
      store: "Flipkart",
      category: "Electronics",
      volatility: 0.2,
      lastUpdate: new Date(),
    },
    {
      id: 4,
      name: "MacBook Air M2",
      basePrice: 114900,
      currentPrice: 99900,
      store: "Apple Store",
      category: "Electronics",
      volatility: 0.12,
      lastUpdate: new Date(),
    },
    {
      id: 5,
      name: "Sony WH-1000XM5 Headphones",
      basePrice: 29990,
      currentPrice: 24990,
      store: "Croma",
      category: "Electronics",
      volatility: 0.18,
      lastUpdate: new Date(),
    },
  ]

  constructor(private url: string) {
    // Simulate connection delay
    setTimeout(() => {
      this.readyState = 1 // OPEN
      this.connected = true
      this.onopen?.(null)
      this.startPriceUpdates()
      this.startNotifications()
    }, 1000)
  }

  send(data: string): void {
    if (this.readyState !== 1) {
      console.warn("WebSocket is not connected")
      return
    }

    try {
      const message = JSON.parse(data)
      this.handleMessage(message)
    } catch (error) {
      console.error("Error parsing message:", error)
    }
  }

  close(code = 1000, reason = "Normal closure"): void {
    this.readyState = 3 // CLOSED
    this.connected = false
    this.stopUpdates()
    this.onclose?.({ code, reason })
  }

  private handleMessage(message: any): void {
    switch (message.type) {
      case "ping":
        this.sendMessage({ type: "pong" })
        break

      case "subscribe":
        console.log("Subscribed to channels:", message.channels)
        break

      case "unsubscribe":
        console.log("Unsubscribed from channels:", message.channels)
        break

      case "track_deal":
        this.trackedDeals.add(message.dealId)
        console.log("Now tracking deal:", message.dealId)
        break

      case "untrack_deal":
        this.trackedDeals.delete(message.dealId)
        this.priceAlerts.delete(message.dealId)
        console.log("Stopped tracking deal:", message.dealId)
        break

      case "set_price_alert":
        this.priceAlerts.set(message.dealId, message.targetPrice)
        console.log(`Price alert set for deal ${message.dealId} at ₹${message.targetPrice}`)
        break
    }
  }

  private sendMessage(data: any): void {
    if (this.readyState === 1 && this.onmessage) {
      this.onmessage({ data: JSON.stringify(data) })
    }
  }

  private startPriceUpdates(): void {
    this.updateInterval = setInterval(
      () => {
        if (!this.connected) return

        // Update prices for tracked deals
        this.trackedDeals.forEach((dealId) => {
          const deal = this.mockDeals.find((d) => d.id === dealId)
          if (!deal) return

          const oldPrice = deal.currentPrice

          // Generate price change (70% chance of decrease, 30% increase)
          const isDecrease = Math.random() < 0.7
          const changePercent = Math.random() * deal.volatility * (isDecrease ? -1 : 1)
          const priceChange = Math.round(deal.currentPrice * changePercent)

          let newPrice = deal.currentPrice + priceChange

          // Keep price within reasonable bounds (50% to 100% of base price)
          const minPrice = Math.round(deal.basePrice * 0.5)
          const maxPrice = deal.basePrice
          newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice))

          // Only update if price actually changed
          if (newPrice !== oldPrice) {
            deal.currentPrice = newPrice
            deal.lastUpdate = new Date()

            const priceUpdate: PriceUpdate = {
              dealId: deal.id,
              productName: deal.name,
              oldPrice,
              newPrice,
              discount: Math.round(((deal.basePrice - newPrice) / deal.basePrice) * 100),
              store: deal.store,
              timestamp: new Date(),
              type: newPrice < oldPrice ? "price_drop" : "price_increase",
            }

            this.sendMessage({
              type: "price_update",
              payload: priceUpdate,
            })

            // Check if target price reached
            const targetPrice = this.priceAlerts.get(dealId)
            if (targetPrice && newPrice <= targetPrice) {
              const notification: NotificationData = {
                id: `alert_${dealId}_${Date.now()}`,
                type: "target_reached",
                title: "🎯 Target Price Reached!",
                message: `${deal.name} is now ₹${newPrice.toLocaleString()} (Target: ₹${targetPrice.toLocaleString()})`,
                dealId,
                timestamp: new Date(),
              }

              this.sendMessage({
                type: "notification",
                payload: notification,
              })
            }
          }
        })
      },
      Math.random() * 10000 + 5000,
    ) // Random interval between 5-15 seconds
  }

  private startNotifications(): void {
    this.notificationInterval = setInterval(
      () => {
        if (!this.connected || this.trackedDeals.size === 0) return

        // Generate random notifications
        const notifications = [
          {
            type: "new_deal",
            title: "✨ New Deal Available",
            message: "Check out the latest deals in Electronics category",
          },
          {
            type: "deal_expiry",
            title: "⏰ Deal Expiring Soon",
            message: "Some of your tracked deals expire in 2 hours",
          },
          {
            type: "stock_alert",
            title: "📦 Stock Update",
            message: "Limited stock available for tracked items",
          },
        ]

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]

        const notification: NotificationData = {
          id: `notif_${Date.now()}`,
          type: randomNotification.type as any,
          title: randomNotification.title,
          message: randomNotification.message,
          timestamp: new Date(),
        }

        this.sendMessage({
          type: "notification",
          payload: notification,
        })
      },
      Math.random() * 30000 + 20000,
    ) // Random interval between 20-50 seconds
  }

  private stopUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval)
      this.notificationInterval = null
    }
  }
}

export class WebSocketManager {
  private ws: MockWebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private heartbeatInterval: NodeJS.Timeout | null = null
  private isConnecting = false
  private listeners: Map<string, Set<Function>> = new Map()

  constructor(private userId?: string) {
    this.connect()
  }

  private async connect() {
    if (this.isConnecting || (this.ws && this.ws.readyState === 1)) {
      return
    }

    this.isConnecting = true

    try {
      // Use mock WebSocket connection
      const wsUrl = `mock://localhost:8080/ws${this.userId ? `?userId=${this.userId}` : ""}`
      this.ws = new MockWebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log("Mock WebSocket connected")
        this.isConnecting = false
        this.reconnectAttempts = 0
        this.startHeartbeat()
        this.emit("connected", null)

        // Subscribe to user-specific updates if userId is provided
        if (this.userId) {
          this.send({
            type: "subscribe",
            channels: ["price_updates", "notifications", `user_${this.userId}`],
          })
        } else {
          this.send({
            type: "subscribe",
            channels: ["price_updates", "general_notifications"],
          })
        }
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      }

      this.ws.onclose = (event) => {
        console.log("Mock WebSocket disconnected:", event.code, event.reason)
        this.isConnecting = false
        this.stopHeartbeat()
        this.emit("disconnected", { code: event.code, reason: event.reason })

        // Attempt to reconnect unless it was a clean close
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => this.reconnect(), this.reconnectDelay * Math.pow(2, this.reconnectAttempts))
        }
      }

      this.ws.onerror = (error) => {
        console.error("Mock WebSocket error:", error)
        this.isConnecting = false
        this.emit("error", error)
      }
    } catch (error) {
      console.error("Error creating WebSocket connection:", error)
      this.isConnecting = false
    }
  }

  private reconnect() {
    this.reconnectAttempts++
    console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
    this.connect()
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === 1) {
        this.send({ type: "ping" })
      }
    }, 30000) // Send ping every 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private handleMessage(data: any) {
    switch (data.type) {
      case "pong":
        // Heartbeat response - do nothing
        break

      case "price_update":
        this.handlePriceUpdate(data.payload as PriceUpdate)
        break

      case "notification":
        this.handleNotification(data.payload as NotificationData)
        break

      case "deal_expiry_warning":
        this.handleDealExpiryWarning(data.payload)
        break

      case "stock_update":
        this.handleStockUpdate(data.payload)
        break

      default:
        console.log("Unknown message type:", data.type)
    }
  }

  private handlePriceUpdate(update: PriceUpdate) {
    this.emit("priceUpdate", update)

    // Show toast notification for significant price drops
    const priceDropPercent = ((update.oldPrice - update.newPrice) / update.oldPrice) * 100

    if (update.type === "price_drop" && priceDropPercent > 5) {
      toast({
        title: "🔥 Price Drop Alert!",
        description: `${update.productName} is now ₹${update.newPrice.toLocaleString()} (${priceDropPercent.toFixed(0)}% off)`,
        duration: 5000,
      })
    }
  }

  private handleNotification(notification: NotificationData) {
    this.emit("notification", notification)

    // Show different types of notifications
    switch (notification.type) {
      case "target_reached":
        toast({
          title: "🎯 Target Price Reached!",
          description: notification.message,
          duration: 7000,
        })
        break

      case "deal_expiry":
        toast({
          title: "⏰ Deal Expiring Soon",
          description: notification.message,
          duration: 6000,
        })
        break

      case "new_deal":
        toast({
          title: "✨ New Deal Available",
          description: notification.message,
          duration: 4000,
        })
        break

      default:
        toast({
          title: notification.title,
          description: notification.message,
          duration: 5000,
        })
    }
  }

  private handleDealExpiryWarning(data: any) {
    this.emit("dealExpiryWarning", data)

    toast({
      title: "⚠️ Deal Expiring Soon",
      description: `${data.productName} deal expires in ${data.timeLeft}`,
      duration: 8000,
    })
  }

  private handleStockUpdate(data: any) {
    this.emit("stockUpdate", data)

    if (data.status === "back_in_stock") {
      toast({
        title: "📦 Back in Stock!",
        description: `${data.productName} is now available`,
        duration: 5000,
      })
    } else if (data.status === "low_stock") {
      toast({
        title: "⚠️ Low Stock Alert",
        description: `Only ${data.quantity} left for ${data.productName}`,
        duration: 4000,
      })
    }
  }

  public send(data: any) {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.warn("WebSocket is not connected. Message not sent:", data)
    }
  }

  public subscribe(channel: string, callback: Function) {
    this.send({
      type: "subscribe",
      channels: [channel],
    })
    this.on(channel, callback)
  }

  public unsubscribe(channel: string, callback?: Function) {
    this.send({
      type: "unsubscribe",
      channels: [channel],
    })
    if (callback) {
      this.off(channel, callback)
    }
  }

  public on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
  }

  public off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.delete(callback)
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach((callback) => {
        try {
          callback(data)
        } catch (error) {
          console.error("Error in WebSocket event callback:", error)
        }
      })
    }
  }

  public trackDeal(dealId: number) {
    this.send({
      type: "track_deal",
      dealId,
    })
  }

  public untrackDeal(dealId: number) {
    this.send({
      type: "untrack_deal",
      dealId,
    })
  }

  public setPriceAlert(dealId: number, targetPrice: number) {
    this.send({
      type: "set_price_alert",
      dealId,
      targetPrice,
    })
  }

  public getConnectionStatus(): "connecting" | "connected" | "disconnected" | "error" {
    if (!this.ws) return "disconnected"

    switch (this.ws.readyState) {
      case 0:
        return "connecting"
      case 1:
        return "connected"
      case 2:
      case 3:
        return "disconnected"
      default:
        return "error"
    }
  }

  public disconnect() {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close(1000, "Client disconnect")
      this.ws = null
    }
    this.listeners.clear()
  }
}

// Singleton instance
let wsManager: WebSocketManager | null = null

export function getWebSocketManager(userId?: string): WebSocketManager {
  if (!wsManager) {
    wsManager = new WebSocketManager(userId)
  }
  return wsManager
}

export function disconnectWebSocket() {
  if (wsManager) {
    wsManager.disconnect()
    wsManager = null
  }
}
