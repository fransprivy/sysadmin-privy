# Admin Center Dashboard - Project Context

## 🎯 Project Overview

This is a production-ready **Admin Center Dashboard** built from a Figma prototype. It's a Next.js/React application with a complete component library, multi-page navigation, and enterprise features for managing user accounts, documents, seals, stamps, and more.

**Live URL:** https://sysadmin-privy.vercel.app/

**Repository:** https://github.com/fransprivy/sysadmin-privy

---

## 📊 Project Status

### ✅ Completed Pages (16/16) 🎉
1. **Admin Center (Overview)** - `/` - Dashboard with stats and activity summary
2. **User and Role Management** - `/user-and-role` - Employee table with search/filter
3. **Enterprise Seal** - `/enterprise-seal` - Seal gallery with upload
4. **Enterprise Stamp** - `/enterprise-stamp` - Stamp gallery with upload
5. **Email Logo** - `/email-logo` - Toggle + logo upload + email preview
6. **Document Category** - `/document-category` - Category management table
7. **Reminder Settings** - `/reminder` - Reminder configuration and management
8. **Document Handover** - `/document-handover` - Document transfer management table
9. **Admins Management** - `/admins` - Admin accounts management table
10. **Contacts Management** - `/contacts` - Contact information management
11. **Groups Management** - `/groups` - User groups and team assignments
12. **Billing** - `/billing` - Billing information and invoice history
13. **Payment History** - `/payment-history` - Payment transactions list
14. **Reports** - `/reports` - Report generation and download
15. **PrivyPal (AI Features)** - `/privypal` - AI assistant configuration and toggle
16. **Reports Detail** - `/reports-detail` - Balance usage report with filtering and analytics

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

#### `AdminLayout.tsx` (Page Shell) — use this for every page
Wraps a page in the topbar, sidebar, breadcrumbs and the centred content column
from the Figma frame. Pages no longer define their own `Topbar` or pass
`activePage` — the sidebar derives the active item from `usePathname()`.

```tsx
import { AdminLayout, AdminSection } from '@/components/AdminLayout';

export default function Page() {
  return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Billing' }]}>
      <AdminSection title="General">{/* … */}</AdminSection>
    </AdminLayout>
  );
}
```

`width` prop:
- `"content"` (default) — the 721px reading column from the Figma Overview frame.
- `"wide"` — fills the viewport; use it for the data-table pages, where 721px
  wraps every date onto three lines.
- `"bleed"` — no padding, no max-width, no gap; the page owns its own spacing.
  Use it when a full-width element has to reach the edges of the content area,
  such as the tab bar on User and role.

#### `Sidebar.tsx` / `Topbar.tsx` / `Breadcrumbs.tsx`
Rendered by `AdminLayout`; you should not need to mount them directly. To add a
nav entry, append to `SECTIONS` in `Sidebar.tsx` — a `match` array keeps the item
highlighted on detail routes (e.g. `/reports-detail` highlights Reports).

#### `components/icons/index.tsx`
Icon components generated from the Figma exports in `public/assets/icons`.
Monochrome icons use `currentColor` so nav states can recolour them; the activity
icons keep their brand colours. Regenerate them from Figma rather than hand-editing.

---

## 🌐 Page Structure Pattern

All pages follow this pattern:

```tsx
'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';

export default function PageName() {
  return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Page name' }]}>
      {/* Page content — the shell supplies topbar, sidebar and breadcrumbs */}
    </AdminLayout>
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
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function PageNamePage() {
  return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Page name' }]}>
      {/* Content — topbar, sidebar and breadcrumbs come from the shell.
          Add width="wide" if the page holds a data table. */}
    </AdminLayout>
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

### Step 3: Add the Sidebar Entry
Append to the relevant group in `SECTIONS` in `Sidebar.tsx`. Active state is
derived from the route, so there is nothing else to wire up:

```tsx
{ label: 'Page Name', href: '/page-name', icon: NavPageNameIcon }
```

Use an icon from `components/icons` (exported from Figma). If the page has detail
routes that should keep it highlighted, add `match: ['/page-name-detail']`.

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
AdminLayout handles the sidebar + topbar offset for you

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

### Reminder Settings Page
- Reminder list with enable/disable toggles
- Frequency configuration
- Add reminder functionality
- Edit reminder options

### Document Handover Page
- Document handover tracking table
- Handover status (Completed, In Progress, Pending)
- Search/filter functionality
- From/To user tracking
- Handover dates

### Admins Management Page
- Admin accounts management table
- Admin role display
- Join date tracking
- Edit admin options

### Contacts Management Page
- Contact information table
- Department assignment
- Phone and email information
- Add contact functionality

### Groups Management Page
- User groups table
- Member count display
- Group description
- Create group functionality

### Billing Page
- Current plan display
- Monthly cost information
- Payment method management
- Invoice history table
- Download invoice option

### Payment History Page
- Payment transactions table
- Invoice number tracking
- Payment method display
- Payment status
- Download receipt option

### Reports Page
- Report cards with metadata
- Report type indication
- Generated date display
- Download reports functionality
- Generate new report option

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

### All Pages Implemented! 🎉
All 14 admin pages from the Figma prototype have been successfully implemented.

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
11. Data persistence with backend
12. Advanced filtering and sorting
13. Bulk operations support
14. Export functionality (CSV, PDF)

---

## 🎨 Design System

Tokens come from the Figma library (file `7ziFoWatKsolh3Hak3AlkI`) and are declared
as CSS variables in `app/globals.css`, then surfaced as Tailwind utilities in
`tailwind.config.ts`. Use the token classes — not raw Tailwind palette colours.

| Figma variable | CSS variable | Tailwind class |
| --- | --- | --- |
| `bg/default` | `--bg-default` | `bg-background` |
| `bg/defaultAlpha` | `--bg-default-alpha` | `bg-bg-alpha` |
| `bg/info` / `bg/success` | `--bg-info` / `--bg-success` | `bg-info` / `bg-success` |
| `bg/ground` | `--bg-ground` | `bg-ground` |
| `fg/default` | `--fg-default` | `text-foreground` |
| `fg/subtle` | `--fg-subtle` | `text-subtle` |
| `fg/subtlest` | `--fg-subtlest` | `text-subtlest` |
| `fg/link` | `--fg-link` | `text-link` |
| `fg/success` | `--fg-success` | `text-success-fg` |
| `fg/muted` | `--fg-muted` | `text-muted` |
| `border/default` | `--border-default` | `border-border` |
| `border/muted` | `--border-muted` | `border-border-muted` |
| `brand/accent` | `--brand-accent` | `text-accent` / `bg-accent` |
| `brand/logo` | `--brand-logo` | `bg-logo` |

**Type ramp** (DM Sans, loaded via `next/font`): `text-caption2` (11), `text-caption1`
(12), `text-p2` (14), `text-p1` (16), `text-b1` (16/0.4), `text-h6` (20). Only weights
400/500/700 are loaded — use `font-medium`, not `font-semibold`.

> `lib/utils.ts` extends `tailwind-merge` so these custom sizes are not mistaken for
> text colours. Without it, `cn('text-link', 'text-p2')` silently drops the colour.

**Buttons:** the primary CTA is the **brand red** `#E42E2C` (`variant="primary"`),
confirmed by "Add employee" on the User and role frame. Blue `brand/accent` is for
links, toggles and status — use `variant="accent"` if you need a blue button.
`variant="default"` is the neutral grey button (Overview's "Download").

**Elevation:** `shadow-small`, `shadow-medium`. **Radii:** `rounded-sm` (6px),
`rounded-md` (8px), `rounded-lg` (12px).

> **Squashed CTAs in Figma.** The Position / Department / Branch frames contain
> `Button / Text` instances that were accidentally resized — 19.7px, 23.1px and
> similar heights inside a 32px toolbar, with fractional widths and clipped
> labels. They are layout accidents, not a spec. Render CTAs at the component's
> real 32px `size="sm"`; do not reproduce the clipping.

> The Figma file contains two generations of the token library. Some frames show
> literal fallbacks from the older set (e.g. `#5b6778` for `fg/subtle`), but the
> **bound variables** resolve to the values above — those are what the app uses.

**Layout constants** (from the Figma frame): 60px topbar, 285px sidebar, 721px
content column — exposed as `h-topbar`, `w-sidebar`, `max-w-content`.


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
- Check the `href` in `SECTIONS` (Sidebar.tsx) matches the route exactly
- Verify `isActive()` function checks correct pathname
- Ensure route matches `href` in navItems

---

## 📞 Contact & Support

**Built with:** Claude AI (claude-opus-5)
**Last Updated:** 2026-08-13
**Status:** Production Ready

For questions, refer to the component files or check the Figma prototype for design reference.
