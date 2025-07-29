"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  type: "price_alert" | "deal_expiry" | "stock_alert" | "new_deal" | "target_reached"
  timestamp: Date
  read: boolean
}

export interface PriceUpdate {
  dealId: number
  productName: string
  oldPrice: number
  newPrice: number
  discount: number
  store: string
  type: "price_drop" | "price_increase"
}

interface UseWebSocketOptions {
  userId?: string
  autoConnect?: boolean
  onPriceUpdate?: (update: PriceUpdate) => void
  onNotification?: (notification: Notification) => void
}

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error"

// Mock WebSocket implementation for demo purposes
class MockWebSocket {
  private listeners: { [key: string]: Function[] } = {}
  private intervalId: NodeJS.Timeout | null = null
  private isConnected = false

  constructor(private url: string) {
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true
      this.emit("open")
      this.startMockUpdates()
    }, 1000)
  }

  addEventListener(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  removeEventListener(event: string, callback: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
    }
  }

  private emit(event: string, data?: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data))
    }
  }

  private startMockUpdates() {
    this.intervalId = setInterval(
      () => {
        if (this.isConnected) {
          // Generate random price updates
          const mockUpdate: PriceUpdate = {
            dealId: Math.floor(Math.random() * 6) + 1,
            productName: ["iPhone 15 Pro", "Nike Shoes", "Samsung TV", "MacBook Air", "Sony Headphones"][
              Math.floor(Math.random() * 5)
            ],
            oldPrice: 50000 + Math.random() * 100000,
            newPrice: 40000 + Math.random() * 80000,
            discount: Math.floor(Math.random() * 50) + 10,
            store: ["Amazon", "Flipkart", "Myntra", "Croma"][Math.floor(Math.random() * 4)],
            type: Math.random() > 0.8 ? "price_increase" : "price_drop",
          }

          this.emit("message", { data: JSON.stringify({ type: "price_update", data: mockUpdate }) })

          // Occasionally send notifications
          if (Math.random() > 0.7) {
            const mockNotification: Notification = {
              id: Date.now().toString(),
              title: "Price Alert",
              message: `${mockUpdate.productName} price dropped to ₹${mockUpdate.newPrice.toLocaleString()}`,
              type: "price_alert",
              timestamp: new Date(),
              read: false,
            }

            this.emit("message", { data: JSON.stringify({ type: "notification", data: mockNotification }) })
          }
        }
      },
      5000 + Math.random() * 10000,
    ) // Random interval between 5-15 seconds
  }

  close() {
    this.isConnected = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    this.emit("close")
  }

  send(data: string) {
    // Mock send functionality
    console.log("Sending:", data)
  }
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { userId, autoConnect = false, onPriceUpdate, onNotification } = options

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [lastPriceUpdate, setLastPriceUpdate] = useState<PriceUpdate | null>(null)
  const [isReconnecting, setIsReconnecting] = useState(false)

  const wsRef = useRef<MockWebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef(0)
  const maxReconnectAttempts = 5

  const connect = useCallback(() => {
    if (wsRef.current?.isConnected) return

    setConnectionStatus("connecting")

    try {
      const ws = new MockWebSocket(`ws://localhost:8080?userId=${userId || "anonymous"}`)
      wsRef.current = ws

      ws.addEventListener("open", () => {
        setConnectionStatus("connected")
        setIsReconnecting(false)
        reconnectAttemptsRef.current = 0
      })

      ws.addEventListener("message", (event: any) => {
        try {
          const message = JSON.parse(event.data)

          if (message.type === "price_update") {
            setLastPriceUpdate(message.data)
            onPriceUpdate?.(message.data)
          } else if (message.type === "notification") {
            const notification = {
              ...message.data,
              timestamp: new Date(message.data.timestamp),
            }
            setNotifications((prev) => [notification, ...prev])
            onNotification?.(notification)
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      })

      ws.addEventListener("close", () => {
        setConnectionStatus("disconnected")
        wsRef.current = null

        // Auto-reconnect logic
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          setIsReconnecting(true)
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++
            connect()
          }, Math.pow(2, reconnectAttemptsRef.current) * 1000) // Exponential backoff
        }
      })

      ws.addEventListener("error", () => {
        setConnectionStatus("error")
      })
    } catch (error) {
      setConnectionStatus("error")
      console.error("WebSocket connection error:", error)
    }
  }, [userId, onPriceUpdate, onNotification])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }

    setConnectionStatus("disconnected")
    setIsReconnecting(false)
    reconnectAttemptsRef.current = 0
  }, [])

  const trackDeal = useCallback(
    (dealId: number) => {
      if (wsRef.current && connectionStatus === "connected") {
        wsRef.current.send(JSON.stringify({ type: "track_deal", dealId }))
      }
    },
    [connectionStatus],
  )

  const untrackDeal = useCallback(
    (dealId: number) => {
      if (wsRef.current && connectionStatus === "connected") {
        wsRef.current.send(JSON.stringify({ type: "untrack_deal", dealId }))
      }
    },
    [connectionStatus],
  )

  const setPriceAlert = useCallback(
    (dealId: number, targetPrice: number) => {
      if (wsRef.current && connectionStatus === "connected") {
        wsRef.current.send(JSON.stringify({ type: "set_price_alert", dealId, targetPrice }))
      }
    },
    [connectionStatus],
  )

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [autoConnect, connect, disconnect])

  const unreadCount = notifications.filter((n) => !n.read).length
  const isConnected = connectionStatus === "connected"

  return {
    connectionStatus,
    isConnected,
    isReconnecting,
    notifications,
    unreadCount,
    lastPriceUpdate,
    connect,
    disconnect,
    trackDeal,
    untrackDeal,
    setPriceAlert,
    markNotificationAsRead,
    clearNotifications,
  }
}
