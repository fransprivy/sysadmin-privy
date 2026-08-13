# Admin Center Dashboard - Project Context

## 🎯 Project Overview

This is a production-ready **Admin Center Dashboard** built from a Figma prototype. It's a Next.js/React application with a complete component library, multi-page navigation, and enterprise features for managing user accounts, documents, seals, stamps, and more.

**Live URL:** https://sysadmin-privy.vercel.app/

**Repository:** https://github.com/fransprivy/sysadmin-privy

---

## 📊 Project Status

### ✅ Completed Pages (6/10)
1. **Admin Center (Overview)** - `/` - Dashboard with stats and activity summary
2. **User and Role Management** - `/user-and-role` - Employee table with search/filter
3. **Enterprise Seal** - `/enterprise-seal` - Seal gallery with upload
4. **Enterprise Stamp** - `/enterprise-stamp` - Stamp gallery with upload
5. **Email Logo** - `/email-logo` - Toggle + logo upload + email preview
6. **Document Category** - `/document-category` - Category management table

### 📋 Remaining Pages (4/10)
- Reminder settings
- Document handover
- Admins management
- Contacts management
- Groups management
- Billing
- Payment history
- Reports

---

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 14.2 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4 + PostCSS
- **UI Components:** Custom shadcn/ui components (Button, Card, Badge)
- **Icons:** Lucide React

### Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "next": "^14.2.0",
  "tailwindcss": "^3.4.1",
  "lucide-react": "^0.294.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.3.0"
}
```

### Deployment
- **Host:** Vercel
- **Auto-deploy:** On every push to `main` branch
- **Build Command:** `next build`
- **Config:** `vercel.json` with `{"framework": "nextjs"}`

---

## 📁 Project Structure

```
/Admin Center/
├── app/
│   ├── layout.tsx              # Root layout with globals.css
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind + base styles
│   ├── user-and-role/
│   │   └── page.tsx
│   ├── enterprise-seal/
│   │   └── page.tsx
│   ├── enterprise-stamp/
│   │   └── page.tsx
│   ├── email-logo/
│   │   └── page.tsx
│   └── document-category/
│       └── page.tsx
│
├── components/
│   ├── Sidebar.tsx             # Shared navigation sidebar
│   ├── AdminCenter.tsx         # Overview/home page
│   ├── UserAndRole.tsx         # User management
│   ├── EnterpriseSeal.tsx      # Seal management
│   ├── EnterpriseStamp.tsx     # Stamp management
│   ├── EmailLogo.tsx           # Email logo settings
│   ├── DocumentCategory.tsx    # Category management
│   └── ui/
│       ├── button.tsx          # Button component
│       ├── card.tsx            # Card component
│       └── badge.tsx           # Badge component
│
├── lib/
│   └── utils.ts                # Tailwind cn() helper
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── vercel.json
├── .gitignore
└── README.md

```

---

## 🧩 Component Architecture

### Shared Components

#### `Sidebar.tsx` (Reusable Navigation)
- **Purpose:** Navigation sidebar used across all pages
- **Features:**
  - Dynamic active page detection using `usePathname()`
  - Links to all implemented pages
  - Enterprise account dropdown
  - Plan status card
  - Responsive sidebar layout

**Usage:**
```tsx
import { Sidebar } from '@/components/Sidebar';

export default function Page() {
  return (
    <>
      <Sidebar activePage="overview" />
      {/* Content */}
    </>
  );
}
```

**Available `activePage` values:**
- `'overview'` - for `/`
- `'user-and-role'` - for `/user-and-role`
- `'enterprise-seal'` - for `/enterprise-seal`
- `'enterprise-stamp'` - for `/enterprise-stamp`
- `'email-logo'` - for `/email-logo`
- `'document-category'` - for `/document-category`

#### `Button.tsx`
Shadcn/ui Button component with variants:
- `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Sizes: `default`, `sm`, `lg`, `icon`

#### `Card.tsx`
Shadcn/ui Card component for content containers.

#### `Badge.tsx`
Shadcn/ui Badge component for labels/tags.

---

## 🌐 Page Structure Pattern

All pages follow this pattern:

```tsx
'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';

function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-5 z-50">
      {/* Logo, title, and action buttons */}
    </div>
  );
}

export default function PageName() {
  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="page-id" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        {/* Breadcrumbs */}
        {/* Page Content */}
      </main>
    </div>
  );
}
```

---

## 📖 How to Add a New Page

### Step 1: Create the Component
Create `components/PageName.tsx`:

```tsx
'use client';

import React, { useState } from 'react';
import { Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';

function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-5 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <span className="text-lg font-semibold text-foreground">Admin Center</span>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            U
          </div>
        </Button>
      </div>
    </div>
  );
}

export default function PageNamePage() {
  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="page-id" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        {/* Content */}
      </main>
    </div>
  );
}
```

### Step 2: Create Page Route
Create `app/page-name/page.tsx`:

```tsx
import PageNamePage from '@/components/PageName';

export default function Page() {
  return <PageNamePage />;
}
```

### Step 3: Update Sidebar Navigation
1. Update `Sidebar.tsx` interface:
```tsx
interface SidebarProps {
  activePage?: 'overview' | 'page-id';
}
```

2. Add to `navItems`:
```tsx
{ label: 'Page Name', icon: IconName, href: '/page-name', id: 'page-id' }
```

3. Add to `isActive()` function:
```tsx
if (id === 'page-id' && pathname === '/page-name') return true;
```

### Step 4: Commit and Deploy
```bash
git add components/PageName.tsx app/page-name/page.tsx components/Sidebar.tsx
git commit -m "Add Page Name page with [features]

- Feature 1
- Feature 2

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
git push origin main
```

Vercel will auto-deploy within 2 minutes.

---

## 🎨 Styling Guide

### Tailwind Configuration
All custom colors are defined in `tailwind.config.ts`:
- `background`, `foreground` - base colors
- `card`, `card-foreground` - card colors
- `muted`, `muted-foreground` - disabled/secondary text
- `border`, `input` - borders
- `primary`, `secondary`, `destructive` - semantic colors

### Common Class Patterns
```tsx
// Text colors
className="text-foreground"           // Primary text
className="text-muted-foreground"     // Secondary text

// Card styling
className="p-6"                       // Padding
className="rounded-lg"                // Border radius
className="border border-border"      // Border

// Layout
className="flex items-center gap-3"   // Flexbox
className="grid grid-cols-3 gap-6"    // Grid
className="ml-72 mt-16"               // Sidebar + topbar offset

// States
className="hover:bg-muted"            // Hover
className="transition-colors"         // Animation
```

---

## 🚀 Development Workflow

### Local Development
```bash
cd "/Users/FR6654/Claude's Repo/Admin Center"
npm install
npm run dev
```

Open http://localhost:3000

### Making Changes
1. Edit component files in `components/`
2. Changes hot-reload automatically
3. Test locally before pushing

### Committing
```bash
git add .
git commit -m "descriptive message"
git push origin main
```

Vercel auto-deploys on every push to main.

---

## 📱 Features Implemented

### Overview Page
- Dashboard with company profile card
- Statistics (Plan, e-Meterai, Employee accounts)
- Activity summary with 6 metrics
- Download reports button
- Fixed sidebar & topbar

### User and Role Page
- Employee table with search & filtering
- Columns: Name, Position, Email, Added at, Active until
- Add employee button
- Info banner about access expiration
- Pagination ready

### Enterprise Seal Page
- Seal selection grid (4 seals)
- Upload slot for custom seals
- Premium badge
- Selection preview
- Use/Cancel buttons

### Enterprise Stamp Page
- Stamp selection grid (Original, Important, Red Seal, Confidential)
- Upload slot for custom stamps
- Selection preview
- Use/Cancel buttons

### Email Logo Page
- Toggle switch (enable/disable)
- Logo upload section
- Email preview showing logo in context
- File size limit (300KB)

### Document Category Page
- Category management table
- Search by name
- Favorite toggle (star icon)
- Pagination (10, 15, 20, 50 rows)
- Actions menu (edit/delete)
- Color-coded category indicators

---

## 🔄 Navigation System

The `Sidebar.tsx` component handles all navigation:

1. **usePathname()** - detects current page
2. **isActive()** - highlights current nav item
3. **Links** - use Next.js `Link` component
4. **Dynamic highlighting** - based on pathname

To add a new link:
- Update `navItems` array
- Update `isActive()` function
- Make sure component exists at the route

---

## 🌍 Deployment

### Vercel Configuration
- **File:** `vercel.json`
```json
{
  "framework": "nextjs"
}
```

### Auto-Deploy
- Push to `main` branch → automatic deployment
- Build time: ~2 minutes
- URL: https://sysadmin-privy.vercel.app/

### Build/Start Locally
```bash
npm run build    # Build for production
npm run start    # Start production server
```

---

## 🧪 Testing Checklist

When adding a new page:
- [ ] Page loads at correct route
- [ ] Sidebar link works and highlights
- [ ] Breadcrumbs display correctly
- [ ] All buttons/inputs functional
- [ ] Responsive layout works
- [ ] No console errors
- [ ] Deployed to Vercel successfully

---

## 📝 Git Commit Template

All commits use this template:

```
[Feature/Fix] Brief description

- Bullet point 1
- Bullet point 2

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

Examples:
```
Add User and Role page with employee management table

- Create UserAndRole component with employee table
- Implement filtering and search functionality
- Add tabbed interface for different views
- Include sidebar navigation and topbar

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## 🎯 Next Steps

### Remaining Pages to Build (from Figma)
1. **Reminder** - Reminder settings page
2. **Document Handover** - Document transfer management
3. **User Management Section:**
   - Admins management
   - Contacts management
   - Groups management
4. **Other Section:**
   - Billing
   - Payment history
   - Reports

### Enhancement Opportunities
1. Add animations/transitions
2. Implement actual API integrations
3. Add form validation
4. Add error handling
5. Add loading states
6. Add modal dialogs
7. Add notifications/toasts
8. Dark mode toggle
9. Responsive mobile menu
10. User authentication flow

---

## 🔗 Quick Links

- **Live App:** https://sysadmin-privy.vercel.app/
- **GitHub Repo:** https://github.com/fransprivy/sysadmin-privy
- **Figma Prototype:** https://www.figma.com/design/7ziFoWatKsolh3Hak3AlkI/SysAdmin-Prototype
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 📚 Component Library Cheatsheet

### Importing Components
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/Sidebar';
```

### Button Variants
```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Card Usage
```tsx
<Card className="p-6">
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Title</h3>
    <p className="text-sm text-muted-foreground">Description</p>
  </div>
</Card>
```

### Badge Usage
```tsx
<Badge>Default</Badge>
<Badge variant="outline">Outline</Badge>
<Badge className="bg-blue-50 text-blue-700">Custom</Badge>
```

---

## ⚡ Performance Tips

1. Use `'use client'` for client components (all pages are interactive)
2. Use Tailwind's built-in responsive utilities (`sm:`, `md:`, `lg:`)
3. Memoize heavy components with `React.memo()`
4. Use `useState` for local component state
5. Keep component files under 500 lines for readability

---

## 🐛 Common Issues & Solutions

### Page not showing after push
- Wait 2-3 minutes for Vercel to build
- Check browser cache (hard refresh with Ctrl+Shift+R)
- Verify route path matches `href` in Sidebar

### Styling not applying
- Ensure Tailwind classes are spelled correctly
- Check `tailwind.config.ts` for CSS variable names
- Verify `globals.css` is imported in `app/layout.tsx`

### Sidebar link not highlighting
- Check `activePage` prop matches ID in `navItems`
- Verify `isActive()` function checks correct pathname
- Ensure route matches `href` in navItems

---

## 📞 Contact & Support

**Built with:** Claude AI (claude-opus-5)
**Last Updated:** 2026-08-13
**Status:** Production Ready

For questions, refer to the component files or check the Figma prototype for design reference.
