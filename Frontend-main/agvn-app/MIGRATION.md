# Migration Guide: Pages Router to App Router

This guide explains how to continue migrating your Next.js app from the Pages Router to the App Router.

## What's Been Done

### 1. Core Framework Updates

- ✅ Next.js upgraded from 10.2.3 to 14.0.4
- ✅ React upgraded from 17.0.2 to 18.2.0
- ✅ TypeScript upgraded to 5.3.2
- ✅ App Router enabled

### 2. Configuration Updates

- ✅ `next.config.js` updated for App Router
- ✅ `tsconfig.json` updated with modern settings
- ✅ ESLint configuration added
- ✅ Package.json dependencies updated

### 3. Pages Migrated

- ✅ Home page (`/` → `src/app/page.tsx`)
- ✅ About page (`/about` → `src/app/about/page.tsx`)
- ✅ Sign in page (`/signin` → `src/app/auth/signin/page.tsx`)
- ✅ Policies page (`/policies` → `src/app/policies/page.tsx`)

### 4. Special Pages Created

- ✅ Root layout (`src/app/layout.tsx`)
- ✅ Loading page (`src/app/loading.tsx`)
- ✅ 404 page (`src/app/not-found.tsx`)

## Remaining Pages to Migrate

These pages still need to be migrated from `src/pages/` to `src/app/`:

### Priority 1 (Core Functionality)

- `signup.tsx` → `src/app/auth/signup/page.tsx`
- `actions.tsx` → `src/app/actions/page.tsx`
- `departments.tsx` → `src/app/departments/page.tsx`
- `vote.tsx` → `src/app/vote/page.tsx`

### Priority 2 (User Features)

- `profile/index.tsx` → `src/app/profile/page.tsx`
- `profile/edit/index.tsx` → `src/app/profile/edit/page.tsx`
- `settings.tsx` → `src/app/settings/page.tsx`
- `notifications/index.tsx` → `src/app/notifications/page.tsx`

### Priority 3 (Additional Features)

- `aeros.tsx` → `src/app/aeros/page.tsx`
- `budget.tsx` → `src/app/budget/page.tsx`
- `contribute.tsx` → `src/app/contribute/page.tsx`
- `initiatives.tsx` → `src/app/initiatives/page.tsx`
- `poll.tsx` → `src/app/poll/page.tsx`
- `results.tsx` → `src/app/results/page.tsx`
- `emails.tsx` → `src/app/emails/page.tsx`
- `landing.tsx` → `src/app/landing/page.tsx`

## Migration Steps for Each Page

### 1. Create Directory Structure

```bash
mkdir -p src/app/[route-name]
```

### 2. Create page.tsx File

```typescript
// src/app/[route-name]/page.tsx
'use client' // Add if using client-side features

import React from 'react'
import Layout from '../../components/TheLayout'
// ... other imports

export default function PageName() {
  // Component logic here
  return (
    <Layout>
      {/* Page content */}
    </Layout>
  )
}
```

### 3. Update Imports

- Change `next/router` to `next/navigation`
- Update image imports to use public paths
- Update relative imports for components

### 4. Handle Client-Side Features

Add `'use client'` directive at the top of files that use:

- `useState`, `useEffect`, `useRouter`
- Event handlers
- Browser APIs
- Third-party client libraries

### 5. Update Navigation

```typescript
// Old (Pages Router)
import { useRouter } from 'next/router'
const router = useRouter()
router.push('/path')

// New (App Router)
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/path')
```

## Common Patterns to Update

### 1. Image Imports

```typescript
// Old
import image from '../public/assets/image.png'

// New
const image = '/assets/image.png'
```

### 2. Layout Wrapper

```typescript
// Wrap all page content with Layout component
export default function PageName() {
  return (
    <Layout>
      {/* Your existing page content */}
    </Layout>
  )
}
```

### 3. Metadata (Optional)

```typescript
// Add metadata for SEO
export const metadata = {
  title: 'Page Title',
  description: 'Page description'
}
```

## Testing Migration

After migrating each page:

1. **Test the route** - Visit the URL and ensure it loads
2. **Test navigation** - Ensure links work correctly
3. **Test functionality** - Verify all features work
4. **Check console** - Look for any errors or warnings

## Clean Up

Once all pages are migrated:

1. **Remove old files** from `src/pages/`
2. **Remove `_app.tsx`** (functionality moved to `layout.tsx`)
3. **Update any remaining imports** pointing to old page locations
4. **Test the entire application** to ensure everything works

## Common Issues and Solutions

### Issue: "Cannot find module" errors

**Solution**: Update import paths to use the new structure

### Issue: Client-side features not working

**Solution**: Add `'use client'` directive

### Issue: Images not loading

**Solution**: Update image paths to use public folder references

### Issue: Routing not working

**Solution**: Ensure correct folder structure and file naming

## Need Help?

If you encounter issues during migration:

1. Check the Next.js 14 App Router documentation
2. Review the migrated pages as examples
3. Test in development mode with `npm run dev`
4. Check browser console for detailed error messages
