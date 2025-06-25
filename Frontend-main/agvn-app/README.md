# AGVN - Australian Government Virtual Network

A modern Next.js 14 application for citizen engagement with Australian government initiatives, built with the App Router and latest React features.

## 🚀 Features

- **Modern Next.js 14** with App Router
- **React 18** with latest features
- **Chakra UI** for modern, accessible components
- **TypeScript** for type safety
- **Responsive Design** with mobile-first approach
- **3D Visualizations** with Three.js and React Three Fiber
- **Real-time Data** with axios and modern data fetching
- **Authentication** system with cookies
- **Interactive Charts** with Chart.js and Recharts

## 📁 Project Structure

```
src/
├── app/                    # App Router pages (Next.js 14)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading UI
│   ├── not-found.tsx      # 404 page
│   ├── about/             # About page
│   ├── actions/           # Government actions
│   ├── policies/          # Policy management
│   ├── departments/       # Department listings
│   └── auth/              # Authentication
│       ├── signin/        # Sign in page
│       └── signup/        # Sign up page
├── components/            # Reusable components
├── pages/                 # Legacy pages (being migrated)
├── public/               # Static assets
└── styles/               # Global styles
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agvn-app
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📦 Key Updates Made

### Framework Modernization
- **Next.js**: Upgraded from 10.2.3 to 14.0.4 with App Router
- **React**: Upgraded from 17.0.2 to 18.2.0
- **TypeScript**: Upgraded from 4.3.2 to 5.3.2

### UI & Styling
- **Chakra UI**: Upgraded from 1.6.3 to 2.8.2
- **Material-UI**: Migrated to @mui/material 5.15.0
- **Bootstrap**: Upgraded from 5.0.2 to 5.3.2

### 3D & Graphics
- **Three.js**: Upgraded from 0.130.1 to 0.158.0
- **React Three Fiber**: Upgraded from 7.0.6 to 8.15.0

## 🔄 Migration Status

### Completed:
- ✅ Package.json modernization
- ✅ Next.js configuration for App Router
- ✅ TypeScript configuration updates
- ✅ Root layout with providers
- ✅ Home page migration
- ✅ About page migration
- ✅ Sign in page migration
- ✅ Policies page migration
- ✅ Loading and 404 pages
- ✅ ESLint configuration

### In Progress:
- 🔄 Migrating remaining pages from pages/ to app/
- 🔄 Updating component imports and paths
- 🔄 Testing all functionality

## 🎯 Next Steps

To complete the modernization:

1. **Migrate Remaining Pages**: Move all pages from `src/pages/` to `src/app/`
2. **Update Components**: Ensure all components work with React 18
3. **Test API Integration**: Verify backend connectivity
4. **Performance Optimization**: Implement proper loading states
5. **Remove Legacy**: Clean up old pages directory once migration is complete

The app is now running on modern Next.js 14 with App Router! 🎉

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
