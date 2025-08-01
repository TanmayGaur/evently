# Evently

Tier-Based Event Showcase – A responsive Next.js app where authenticated users view events based on their subscription tier, integrated with Clerk for authentication & billing, and Supabase for database & RLS policies.

## ✨ Features

- **🔐 Secure Authentication** - Powered by Clerk with complete user management
- **🎯 Tiered Access System** - Four membership levels (Free, Silver, Gold, Platinum)
- **🎫 Event Management** - Browse, search, and book premium events
- **📱 Responsive Design** - Mobile-first design with Tailwind CSS
- **🔍 Advanced Search** - Filter events by title and description
- **🎨 Modern UI** - Beautiful gradient designs with smooth animations
- **⚡ Performance Optimized** - Next.js 15 with App Router and optimized images
- **🔔 Real-time Notifications** - Toast notifications with Sonner
- **📊 Error Handling** - Comprehensive error boundaries

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Lucide React icons
- **Notifications**: Sonner
- **Language**: TypeScript
- **Deployment Ready**: Vercel optimized

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Clerk account

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd evently
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```env
   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   ```

4. **Set up Supabase Database**

   Run the SQL setup script in your Supabase SQL editor:

   ```sql
   -- See supabase-setup.sql for the complete schema
   ```

5. **Configure Clerk**
   - Set up your Clerk application
   - Integrate Clerk with Supabase

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
evently/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── events/            # Events page
│   │   ├── sign-in/           # Authentication pages
│   │   ├── sign-up/
│   │   ├── error.tsx          # Global error boundary
│   │   ├── loading.tsx        # Global loading component
│   │   ├── not-found.tsx      # 404 page
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Home page
│   │   ├── robots.ts          # SEO robots.txt
│   │   └── sitemap.ts         # SEO sitemap
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── EventCard.tsx     # Event display component
│   │   ├── EventsClient.tsx  # Main events interface
│   │   ├── Header.tsx        # Navigation header
│   │   └── Footer.tsx        # Site footer
│   ├── contexts/             # React contexts
│   │   └── SupabaseContext.tsx
│   ├── hooks/                # Custom React hooks
│   │   └── useEventService.ts
│   └── types/                # TypeScript definitions
│       └── events.ts
├── public/                   # Static assets
├── middleware.ts            # Clerk auth middleware
└── supabase-setup.sql      # Database schema
```

## 🎯 Membership Tiers

| Tier         | Access Level         | Features                                                 |
| ------------ | -------------------- | -------------------------------------------------------- |
| **Free**     | Basic events         | Access to free tier events only                          |
| **Silver**   | Free + Silver        | Access to free and silver tier events                    |
| **Gold**     | Free + Silver + Gold | Access to free, silver, and gold tier events             |
| **Platinum** | All events           | Full platform access including exclusive platinum events |

## 🔧 Key Features Explained

### Authentication & Authorization

- Clerk handles all user authentication
- JWT tokens are used for Supabase Row Level Security
- User subscription plans are stored in Clerk metadata

### Event Access Control

- Events are categorized by tiers (free, silver, gold, platinum)
- User access is controlled based on their subscription level
- Visual indicators show which events users can access

### Database Schema

- **Events table**: Stores all event information with tier-based access
- **Row Level Security**: Ensures users only see events they have access to
- **Optimized queries**: Efficient data fetching with proper indexing

### Performance Optimizations

- **Image optimization**: Next.js Image component for optimized loading
- **Code splitting**: Automatic code splitting with App Router
- **Caching**: Proper caching strategies for static and dynamic content
- **Error boundaries**: Graceful error handling throughout the app

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel automatically builds and deploys

### Manual Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📈 SEO & Performance

- **Metadata API**: Comprehensive SEO metadata
- **Open Graph**: Social media sharing optimization
- **Sitemap**: Auto-generated sitemap for search engines
- **Robots.txt**: Search engine crawling configuration
- **Core Web Vitals**: Optimized for Google's performance metrics

## 🐛 Error Handling

- **Global Error Boundary**: Catches and displays application errors
- **404 Page**: Custom not found page with navigation
- **Loading States**: Skeleton loaders for better UX
- **Toast Notifications**: User-friendly error and success messages
- **Retry Mechanisms**: Automatic and manual retry options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js** - The React framework for production
- **Clerk** - Authentication and user management
- **Supabase** - Backend-as-a-Service platform
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

---

**Built with ❤️ for premium event experiences**
