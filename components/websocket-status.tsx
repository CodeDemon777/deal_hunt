"use client"

import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Loader2 } from "lucide-react"
import { useWebSocket } from "@/hooks/use-websocket"

export function WebSocketStatus() {
  const { connectionStatus, isReconnecting } = useWebSocket({
    autoConnect: true,
  })

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case "connected":
        return {
          icon: Wifi,
          text: "Live",
          variant: "default" as const,
          className: "bg-green-500 text-white",
        }
      case "connecting":
        return {
          icon: Loader2,
          text: "Connecting",
          variant: "secondary" as const,
          className: "bg-yellow-500 text-white animate-pulse",
        }
      case "disconnected":
        return {
          icon: WifiOff,
          text: isReconnecting ? "Reconnecting" : "Offline",
          variant: "destructive" as const,
          className: "bg-red-500 text-white",
        }
      case "error":
        return {
          icon: WifiOff,
          text: "Error",
          variant: "destructive" as const,
          className: "bg-red-600 text-white",
        }
      default:
        return {
          icon: WifiOff,
          text: "Unknown",
          variant: "secondary" as const,
          className: "bg-gray-500 text-white",
        }
    }
  }

  const config = getStatusConfig()
  const IconComponent = config.icon

  return (
    <Badge className={`flex items-center space-x-1 ${config.className} touch-manipulation`}>
      <IconComponent className={`w-3 h-3 ${connectionStatus === "connecting" ? "animate-spin" : ""}`} />
      <span className="text-xs font-medium">{config.text}</span>
    </Badge>
  )
}
