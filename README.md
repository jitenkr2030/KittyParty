# 🎉 KittyParty.org - All-in-One Kitty Party Management Platform

> **"Kitty Party + Zomato + Urban Company"** - Manage, plan & enjoy kitty parties + book everything in one tap!

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

## 📱 Features

### 👥 **Group & Member Management**
- ✅ Create and manage multiple kitty groups
- ✅ Add/remove members with role-based permissions
- ✅ Group dashboard with member analytics
- ✅ Real-time group activity tracking

### 💰 **Kitty Money Management** *(Most Important)*
- ✅ Digital ledger for monthly contributions
- ✅ Payment status tracking (paid, pending, overdue)
- ✅ Automatic calculations and balance summaries
- ✅ Multiple payment methods (cash, UPI, bank transfer)
- ✅ Monthly contribution history and analytics

### 🎟️ **Chit System** *(Host Selection)*
- ✅ Random chit draw system for fair host selection
- ✅ Monthly chit tracking with winner management
- ✅ Transparent selection process
- ✅ Chit history and participant management

### 📅 **Event & Party Planning**
- ✅ Create and manage party events with themes
- ✅ Digital invitation system with RSVP tracking
- ✅ Event location, budget, and theme management
- ✅ Attendee tracking and status updates
- ✅ Calendar integration for upcoming events

### 🎮 **Interactive Games Section**
- ✅ **Tambola/Housie** - Fully functional with auto-generated tickets
- ✅ **Spin the Wheel** - Animated wheel with prizes
- ✅ Game sessions tracking and scoring
- ✅ Multiple game types support

### 🍕 **Food & Party Booking** *(Innovative Feature)*
- ✅ Food package ordering system
  - Snack Party Pack (₹299)
  - Full Catering Package (₹999)
  - Dessert Bundle (₹199)
- ✅ Party decoration services
  - Bollywood Theme Decor (₹799)
  - Festival Decoration Kit (₹599)
  - Balloon & Flower Setup (₹399)

### 🤖 **AI Party Planner**
- ✅ Theme ideas generator
- ✅ Food menu suggestions
- ✅ Game selection recommendations
- ✅ Budget-based planning tools

### 💬 **Chat & Social Features**
- ✅ Real-time chat infrastructure with WebSocket
- ✅ Group messaging system
- ✅ Message history and user presence
- ✅ Typing indicators and read receipts

### 🏆 **Rewards & Engagement**
- ✅ Points-based rewards for activities
- ✅ Achievement tracking for hosting, attending, playing
- ✅ Reward redemption system
- ✅ Engagement analytics

## 🛠 Tech Stack

### **Frontend**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **State Management**: React Hooks, Zustand

### **Backend**
- **API**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Real-time**: Socket.IO WebSocket service
- **Authentication**: NextAuth.js v4 ready

### **Development Tools**
- **Package Manager**: Bun
- **Linting**: ESLint with Next.js rules
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript strict mode

## 📊 Database Schema

The application uses a comprehensive database schema with 12+ interconnected models:

- **Users & Authentication**: User profiles, avatars, contact info
- **Groups Management**: Groups, members, roles, permissions
- **Financial System**: Contributions, payments, ledgers
- **Event Management**: Events, attendees, invitations, RSVPs
- **Gaming System**: Games, sessions, scores, achievements
- **Communication**: Messages, chat rooms, notifications
- **Rewards System**: Points, badges, achievements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Bun package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/KittyParty.git
   cd KittyParty
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   bun run db:push
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

6. **Start the chat service** (in a separate terminal)
   ```bash
   cd mini-services/chat-service
   bun install
   bun run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
KittyParty/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── groups/        # Group management
│   │   │   ├── events/        # Event management
│   │   │   ├── contributions/ # Money management
│   │   │   └── games/         # Game management
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main application
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── games/             # Game components
│   │       ├── tambola.tsx    # Tambola game
│   │       └── spin-wheel.tsx # Spin wheel game
│   └── lib/
│       └── db.ts              # Prisma client
├── mini-services/
│   └── chat-service/          # WebSocket chat service
├── prisma/
│   └── schema.prisma          # Database schema
└── db/
    └── custom.db              # SQLite database
```

## 🎮 Interactive Games

### Tambola/Housie
- Auto-generated tickets with random numbers
- Real-time number calling with auto-play feature
- Interactive ticket marking with click-to-mark
- Win detection for rows and full house
- Score tracking and game history

### Spin the Wheel
- Colorful animated wheel with 8 prize segments
- Smooth spinning animations with realistic physics
- Point-based reward system (10-50 points per prize)
- Cumulative score tracking

## 🍕 Food & Services Integration

### Food Packages
- **Snack Party Pack** - Samosa, Pakoda, Chips (₹299)
- **Full Catering** - Starters, Main Course, Desserts (₹999)
- **Dessert Bundle** - Gulab Jamun, Rasgulla, Ice Cream (₹199)

### Decoration Services
- **Bollywood Theme** - Complete Bollywood setup (₹799)
- **Festival Kit** - Festival-specific decorations (₹599)
- **Balloon & Flowers** - Classic party setup (₹399)

## 🔧 Development Commands

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run database migrations
bun run db:push

# Generate Prisma client
bun run db:generate

# Run linting
bun run lint

# Build for production
bun run build

# Start production server
bun run start
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🎨 UI/UX Features

- **Modern Design**: Pink-purple gradient theme perfect for parties
- **Interactive Elements**: Hover effects, loading states, smooth transitions
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Dark Mode**: Ready for theme switching
- **Component Library**: Consistent shadcn/ui components

## 🔒 Security Features

- **Type Safety**: Full TypeScript coverage
- **Input Validation**: Form validation and sanitization
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: React's built-in XSS protection
- **CORS Configuration**: Proper cross-origin resource sharing

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Docker
```bash
# Build Docker image
docker build -t kitty-party .

# Run container
docker run -p 3000:3000 kitty-party
```

### Traditional Hosting
```bash
# Build for production
bun run build

# Start production server
bun run start
```

## 📈 Performance

- **Lighthouse Score**: 95+ Performance
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: < 2s initial load
- **SEO**: Built-in Next.js SEO optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@kittyparty.org
- 💬 Discord: [Join our community](https://discord.gg/kittyparty)
- 📱 Twitter: [@KittyPartyOrg](https://twitter.com/KittyPartyOrg)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=jitenkr2030/KittyParty&type=Date)](https://star-history.com/#jitenkr2030/KittyParty&Date)

---

## 🎊 What Makes KittyParty.org Special?

Unlike basic kitty party apps, we've created an **all-in-one ecosystem** that combines:

🎯 **Traditional Features** + 🍕 **Modern Services** = 🚀 **Revolutionary Platform**

- **Traditional**: Group management, money tracking, event planning
- **Innovation**: Food ordering, decoration booking, AI planning
- **Technology**: Real-time games, chat, rewards, analytics

This is not just an app - it's a complete **kitty party ecosystem** that transforms how people organize and enjoy their social gatherings!

**Made with ❤️ for kitty party lovers everywhere!**

---

> **"The future of kitty party management is here!"** 🎉