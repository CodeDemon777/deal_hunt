"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, X, Clock, Tag, AlertCircle, Gift, Trash2 } from "lucide-react"
import { useWebSocket } from "@/hooks/use-websocket"
import { formatDistanceToNow } from "date-fns"

export function LiveNotificationCenter() {
  const { notifications, unreadCount, markNotificationAsRead, clearNotifications } = useWebSocket({
    autoConnect: true,
  })
  const [isOpen, setIsOpen] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "price_alert":
      case "target_reached":
        return <Tag className="w-4 h-4 text-green-600" />
      case "deal_expiry":
        return <Clock className="w-4 h-4 text-orange-600" />
      case "stock_alert":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "new_deal":
        return <Gift className="w-4 h-4 text-blue-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId)
  }

  const handleClearAll = () => {
    clearNotifications()
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative touch-manipulation">
          <Bell className="w-4 sm:w-5 sm:h-5 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleClearAll} className="touch-manipulation">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="touch-manipulation">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {unreadCount > 0 && <p className="text-sm text-gray-600">{unreadCount} unread notifications</p>}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No notifications yet</p>
                  <p className="text-sm">We'll notify you about price drops and deals</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors touch-manipulation ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-400">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
