interface MockWebSocketConnection {
  id: string
  userId: string
  ws: MockWebSocket
  trackedDeals: Set<number>
  priceAlerts: Map<number, number> // dealId -> targetPrice
}

interface MockDeal {
  id: number
  name: string
  basePrice: number
  currentPrice: number
  store: string
  category: string
  image: string
  volatility: number // How much the price can fluctuate
}

class MockWebSocketServer {
  private static instance: MockWebSocketServer
  private connections: Map<string, MockWebSocketConnection> = new Map()
  private deals: Map<number, MockDeal> = new Map()
  private priceUpdateInterval: NodeJS.Timeout | null = null
  private notificationInterval: NodeJS.Timeout | null = null

  static getInstance(): MockWebSocketServer {
    if (!MockWebSocketServer.instance) {
      MockWebSocketServer.instance = new MockWebSocketServer()
    }
    return MockWebSocketServer.instance
  }

  constructor() {
    this.initializeDeals()
    this.startPriceUpdates()
    this.startNotifications()
  }

  private initializeDeals(): void {
    const mockDeals: MockDeal[] = [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        basePrice: 134900,
        currentPrice: 134900,
        store: "Amazon",
        category: "Electronics",
        image: "/placeholder.svg?height=200&width=200",
        volatility: 0.05,
      },
      {
        id: 2,
        name: "Nike Air Max 270 Running Shoes",
        basePrice: 7797,
        currentPrice: 7797,
        store: "Myntra",
        category: "Fashion",
        image: "/placeholder.svg?height=200&width=200",
        volatility: 0.08,
      },
      {
        id: 3,
        name: 'Samsung 55" 4K Smart TV',
        basePrice: 54999,
        currentPrice: 54999,
        store: "Flipkart",
        category: "Electronics",
        image: "/placeholder.svg?height=200&width=200",
        volatility: 0.06,
      },
      {
        id: 4,
        name: "Instant Pot Duo 7-in-1 Pressure Cooker",
        basePrice: 9599,
        currentPrice: 9599,
        store: "Amazon",
        category: "Home & Kitchen",
        image: "/placeholder.svg?height=200&width=200",
        volatility: 0.04,
      },
      {
        id: 5,
        name: "Adidas Ultraboost 22 Shoes",
        basePrice: 12599,
        currentPrice: 12599,
        store: "Myntra",
        category: "Fashion",
        image: "/placeholder.svg?height=200&width=200",
        volatility: 0.07,
      },
      {
        id: 6,
        name: "MacBook Air M2 13-inch",
        basePrice: 99900,
        currentPrice: 99900,
        store: "Flipkart",
        category: "Electronics",
        image: "/placeholder.svg?height=200&width=200",
        volatility: 0.03,
      },
    ]

    mockDeals.forEach((deal) => {
      this.deals.set(deal.id, deal)
    })
  }

  addConnection(ws: MockWebSocket, userId: string): string {
    const connectionId = Math.random().toString(36).substr(2, 9)

    const connection: MockWebSocketConnection = {
      id: connectionId,
      userId,
      ws,
      trackedDeals: new Set(),
      priceAlerts: new Map(),
    }

    this.connections.set(connectionId, connection)

    // Send welcome message
    ws.send(
      JSON.stringify({
        type: "connection_status",
        data: { status: "connected", connectionId },
        timestamp: Date.now(),
      }),
    )

    return connectionId
  }

  removeConnection(connectionId: string): void {
    this.connections.delete(connectionId)
  }

  handleMessage(connectionId: string, message: any): void {
    const connection = this.connections.get(connectionId)
    if (!connection) return

    try {
      const parsedMessage = typeof message === "string" ? JSON.parse(message) : message

      switch (parsedMessage.type) {
        case "price_update":
          this.handlePriceUpdateMessage(connection, parsedMessage.data)
          break
        case "connection_status":
          if (parsedMessage.data.type === "ping") {
            connection.ws.send(
              JSON.stringify({
                type: "connection_status",
                data: { type: "pong" },
                timestamp: Date.now(),
              }),
            )
          }
          break
      }
    } catch (error) {
      console.error("Error handling message:", error)
    }
  }

  private handlePriceUpdateMessage(connection: MockWebSocketConnection, data: any): void {
    switch (data.action) {
      case "track":
        connection.trackedDeals.add(data.dealId)
        break
      case "untrack":
        connection.trackedDeals.delete(data.dealId)
        connection.priceAlerts.delete(data.dealId)
        break
      case "set_alert":
        connection.priceAlerts.set(data.dealId, data.targetPrice)
        break
    }
  }

  private startPriceUpdates(): void {
    this.priceUpdateInterval = setInterval(() => {
      this.updatePrices()
    }, 5000) // Update prices every 5 seconds
  }

  private startNotifications(): void {
    this.notificationInterval = setInterval(() => {
      this.sendRandomNotifications()
    }, 15000) // Send notifications every 15 seconds
  }

  private updatePrices(): void {
    this.deals.forEach((deal, dealId) => {
      // Simulate price volatility
      const changePercent = (Math.random() - 0.5) * deal.volatility
      const priceChange = Math.round(deal.basePrice * changePercent)
      const oldPrice = deal.currentPrice
      deal.currentPrice = Math.max(deal.basePrice + priceChange, deal.basePrice * 0.7)

      // Only send updates if price actually changed
      if (oldPrice !== deal.currentPrice) {
        const priceUpdate = {
          dealId,
          productName: deal.name,
          store: deal.store,
          oldPrice,
          newPrice: deal.currentPrice,
          timestamp: Date.now(),
        }

        // Send to all connections tracking this deal
        this.connections.forEach((connection) => {
          if (connection.trackedDeals.has(dealId)) {
            connection.ws.send(
              JSON.stringify({
                type: "price_update",
                data: priceUpdate,
                timestamp: Date.now(),
              }),
            )

            // Check price alerts
            const targetPrice = connection.priceAlerts.get(dealId)
            if (targetPrice && deal.currentPrice <= targetPrice) {
              connection.ws.send(
                JSON.stringify({
                  type: "notification",
                  data: {
                    id: Math.random().toString(36).substr(2, 9),
                    type: "price_drop",
                    title: "Price Alert!",
                    message: `${deal.name} has dropped to ₹${deal.currentPrice.toLocaleString()}`,
                    dealId,
                    timestamp: Date.now(),
                    read: false,
                  },
                  timestamp: Date.now(),
                }),
              )
            }
          }
        })

        // Send deal updates to all connections for live feed
        this.connections.forEach((connection) => {
          connection.ws.send(
            JSON.stringify({
              type: "deal_update",
              data: {
                id: dealId,
                name: deal.name,
                price: deal.currentPrice,
                originalPrice: deal.basePrice,
                discount: Math.round(((deal.basePrice - deal.currentPrice) / deal.basePrice) * 100),
                store: deal.store,
                image: deal.image,
                timestamp: Date.now(),
              },
              timestamp: Date.now(),
            }),
          )
        })
      }
    })
  }

  private sendRandomNotifications(): void {
    const notificationTypes = [
      {
        type: "new_deal",
        title: "New Deal Alert!",
        messages: [
          "New iPhone deal just dropped!",
          "Flash sale on electronics started!",
          "Limited time offer on fashion items!",
          "Exclusive deal on home appliances!",
        ],
      },
      {
        type: "deal_expiry",
        title: "Deal Expiring Soon!",
        messages: [
          "Your tracked deal expires in 2 hours!",
          "Limited time left on this amazing offer!",
          "Deal ending soon - grab it now!",
          "Last chance to get this discount!",
        ],
      },
      {
        type: "stock_alert",
        title: "Stock Update",
        messages: [
          "Item back in stock!",
          "Limited stock remaining!",
          "High demand - order quickly!",
          "Stock running low!",
        ],
      },
    ]

    this.connections.forEach((connection) => {
      if (Math.random() < 0.3) {
        const notificationType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
        const message = notificationType.messages[Math.floor(Math.random() * notificationType.messages.length)]

        connection.ws.send(
          JSON.stringify({
            type: "notification",
            data: {
              id: Math.random().toString(36).substr(2, 9),
              type: notificationType.type,
              title: notificationType.title,
              message,
              timestamp: Date.now(),
              read: false,
            },
            timestamp: Date.now(),
          }),
        )
      }
    })
  }

  stop(): void {
    if (this.priceUpdateInterval) {
      clearInterval(this.priceUpdateInterval)
      this.priceUpdateInterval = null
    }
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval)
      this.notificationInterval = null
    }
  }
}

// Mock WebSocket implementation
class MockWebSocket {
  private server: MockWebSocketServer
  private connectionId: string
  public readyState: number = WebSocket.CONNECTING
  public onopen: ((event: Event) => void) | null = null
  public onclose: ((event: CloseEvent) => void) | null = null
  public onmessage: ((event: MessageEvent) => void) | null = null
  public onerror: ((event: Event) => void) | null = null

  constructor(url: string) {
    this.server = MockWebSocketServer.getInstance()

    // Extract userId from URL
    const urlParams = new URLSearchParams(url.split("?")[1])
    const userId = urlParams.get("userId") || "anonymous"

    // Simulate connection delay
    setTimeout(() => {
      this.readyState = WebSocket.OPEN
      this.connectionId = this.server.addConnection(this, userId)

      if (this.onopen) {
        this.onopen(new Event("open"))
      }
    }, 100)
  }

  send(data: string): void {
    if (this.readyState === WebSocket.OPEN) {
      this.server.handleMessage(this.connectionId, data)
    }
  }

  close(): void {
    this.readyState = WebSocket.CLOSED
    this.server.removeConnection(this.connectionId)

    if (this.onclose) {
      this.onclose(new CloseEvent("close"))
    }
  }
}

// Make MockWebSocket available globally
if (typeof window !== "undefined") {
  ;(window as any).MockWebSocket = MockWebSocket
}

export { MockWebSocketServer, MockWebSocket }
