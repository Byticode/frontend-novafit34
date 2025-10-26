# 🏋️ Novafit34 - Setup Guide

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <repository-url>
cd frontend-novafit34
npm install
# or
pnpm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local
```

### 3. Convex Setup
```bash
# Initialize Convex (first time only)
npx convex dev

# Setup authentication
npx @convex-dev/auth
```

### 4. Start Development
```bash
npm run dev
# or  
pnpm dev
```

## 🔧 Environment Variables

| Variable | Description | Required | Auto-Generated |
|----------|-------------|----------|----------------|
| `CONVEX_DEPLOYMENT` | Convex deployment name | ✅ | ✅ |
| `VITE_CONVEX_URL` | Convex app URL | ✅ | ✅ |
| `SITE_URL` | Your app URL for auth callbacks | ✅ | ❌ |
| `NODE_ENV` | Environment mode | ❌ | ❌ |
| `VITE_APP_NAME` | Application name | ❌ | ❌ |

## 🔐 Authentication

This app uses **Convex Auth** with:
- Email/Password authentication
- Session persistence
- Automatic redirects
- Role-based access (admin/coach/client)

### Default Test Users
After setting up, you can create users through the sign-up form.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── admin/         # Admin dashboard components
│   └── ui/            # Reusable UI components
├── hooks/
│   └── UseConvexAuth.tsx  # Authentication hook
├── pages/
│   ├── auth/          # Auth pages (login/signup)
│   └── admin/         # Admin pages
├── routes/
│   └── routes.tsx     # App routing configuration
└── styles/
    └── global.css     # Global styles & Tailwind

convex/
├── auth.ts           # Auth configuration
├── users.ts          # User queries
├── schema.ts         # Database schema
└── _generated/       # Auto-generated files
```

## 🎨 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Radix UI
- **Backend**: Convex (Database + Auth)
- **Icons**: Lucide React
- **Routing**: React Router v7

## 🚨 Troubleshooting

### Convex Connection Issues
```bash
# Reset Convex setup
rm -rf convex/_generated
npx convex dev
```

### Authentication Issues
```bash
# Reconfigure auth
npx @convex-dev/auth
```

### Environment Issues
```bash
# Check your .env.local file exists and has correct values
cat .env.local
```

## 📝 Development Notes

- The app uses Spanish language by default
- Dark theme with custom color scheme
- Mobile-responsive design
- Real-time data updates via Convex
- Session persistence across browser refreshes

## 🔗 Useful Links

- [Convex Documentation](https://docs.convex.dev)
- [Convex Auth Guide](https://docs.convex.dev/auth)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
