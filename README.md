# DealHunt - Best Deals Online

A modern, responsive web application for finding the best deals and discounts from top online stores. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- 🔥 **Real-time Price Tracking**: Get instant notifications when prices drop
- 📱 **Mobile-First Design**: Optimized for iOS, Android, and desktop
- 🎯 **Price Alerts**: Set target prices and get notified when reached
- 🛍️ **Multi-Store Support**: Deals from Amazon, Flipkart, Myntra, and more
- ⚡ **Live Updates**: WebSocket-powered real-time deal feed
- 🔔 **Smart Notifications**: Never miss a deal with intelligent alerts
- 🎨 **Modern UI**: Beautiful, accessible interface with smooth animations
- 📊 **Deal Analytics**: Track savings and price history

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Real-time**: WebSocket (Mock implementation)
- **Date Handling**: date-fns

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd dealhunt-app
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Install shadcn/ui components

\`\`\`bash
npx shadcn@latest init
npx shadcn@latest add button card input label badge tabs dialog select checkbox switch progress popover scroll-area separator toast table
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
dealhunt-app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── ...               # Other pages
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── websocket-status.tsx
│   ├── live-notification-center.tsx
│   └── ...
├── hooks/                # Custom React hooks
│   ├── use-websocket.ts  # WebSocket hook
│   └── use-toast.ts      # Toast notifications
├── public/               # Static assets
│   ├── manifest.json     # PWA manifest
│   └── ...
└── ...
\`\`\`

## 🔧 Key Components

### WebSocket Integration

- Real-time price updates
- Live notifications
- Connection status monitoring
- Auto-reconnection with exponential backoff

### Price Tracking

- Track multiple products simultaneously
- Set custom price alerts
- Historical price data
- Deal expiry notifications

### Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-optimized interactions
- Cross-platform compatibility

## Mobile Compatibility

### iOS Support

- Safari mobile optimized
- PWA support with app-like experience
- Touch-friendly interface with 44px minimum touch targets
- Safe area support for notched devices
- Smooth scrolling and animations

### Android Support

- Chrome mobile optimized
- Material Design principles
- Responsive breakpoints for all screen sizes
- Touch gesture support
- Hardware acceleration

### Desktop Support

- Responsive design for all screen sizes
- Keyboard navigation support
- Mouse hover effects
- High-DPI display support

## 🔒 Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:8080
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🌟 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Efficient re-rendering with React hooks
- Optimized bundle size
- Service worker for offline support

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@dealhunt.com or create an issue in the repository.
# deal_hunt
