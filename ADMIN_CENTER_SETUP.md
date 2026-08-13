# Admin Center Dashboard - Setup Guide

## Quick Start

The `AdminCenter.tsx` component is ready to integrate into your Next.js/React project with shadcn/ui.

### 1. Install Required shadcn/ui Components

Run these commands in your project:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
```

### 2. Add Component to Your Project

```bash
# Copy the component to your app
cp AdminCenter.tsx src/components/AdminCenter.tsx

# Or place in your routes
cp AdminCenter.tsx app/admin/center/page.tsx  # for Next.js App Router
```

### 3. Handle Assets

The component references two image assets that currently use Figma's temporary URLs (7-day expiration). Choose one approach:

#### Option A: Download and Commit Assets (Recommended)

```bash
# Create assets directory
mkdir -p public/assets/admin-center

# Download the images (save them manually from Figma or use these URLs)
# Profile image: https://www.figma.com/api/mcp/asset/5870fadd-2136-457c-b3c9-71ff99316ee9.png
# Logo: https://www.figma.com/api/mcp/asset/d19138e4-d430-4212-b7b3-c5560f1d122f.png
```

Then update `AdminCenter.tsx`:

```typescript
const ASSETS = {
  appIcon: '/assets/admin-center/logo.png',
  profileImage: '/assets/admin-center/profile.png',
};
```

#### Option B: Use Vercel Blob or Cloudinary

Replace the asset URLs with your CDN URLs:

```typescript
const ASSETS = {
  appIcon: process.env.NEXT_PUBLIC_ADMIN_LOGO_URL,
  profileImage: process.env.NEXT_PUBLIC_ADMIN_PROFILE_URL,
};
```

#### Option C: Replace with Your Own Images

Simply replace the URLs with paths to your company's actual logo and profile image.

### 4. Update Component Content

Replace placeholder content with real data:

```typescript
// Example: Make it dynamic with props
interface AdminCenterProps {
  company: {
    name: string;
    logo: string;
    enterpriseId: string;
    address: string;
    admin: string;
    // ... other fields
  };
  stats: {
    plan: string;
    emeterai: number;
    employeeAccounts: number;
    // ... other stats
  };
}

export default function AdminCenterPage({ company, stats }: AdminCenterProps) {
  // Use props instead of hardcoded values
}
```

### 5. Styling Adjustments

The component uses Tailwind's default shadcn/ui colors. Customize by:

1. **Update Tailwind config** if you want different colors:

```js
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          accent: '#0065D1', // Privy blue
        },
      },
    },
  },
}
```

2. **Replace hardcoded colors** in the component:

```typescript
// Before
<p className="text-lg font-semibold text-blue-600">Active</p>

// After
<p className="text-lg font-semibold text-brand-accent">Active</p>
```

### 6. Icons

The component uses icons from `lucide-react` (already included with shadcn/ui). All icons are properly imported at the top of the file.

### 7. Responsive Design

The sidebar is currently fixed at 288px. For mobile responsiveness:

```typescript
// Add a hamburger menu and toggle state
const [sidebarOpen, setSidebarOpen] = useState(false);

// Adjust breakpoints:
<Sidebar className="md:flex hidden" />
<MobileSidebar open={sidebarOpen} />
```

### 8. Deploy to Vercel

Simply push to GitHub and Vercel will auto-deploy:

```bash
git add .
git commit -m "feat: add Admin Center dashboard"
git push origin main
```

No additional configuration needed—Vercel handles Next.js projects automatically.

---

## Component Structure

```
AdminCenter.tsx
├── Topbar
│   ├── Logo & Title
│   ├── Notification Icon
│   ├── Settings Icon
│   └── Profile Avatar
├── Sidebar
│   ├── Enterprise Account Dropdown
│   ├── Navigation Sections
│   │   ├── General (Overview, User and role, etc.)
│   │   ├── User Management (Admins, Contacts, Groups)
│   │   └── Other (Billing, Payment history, Reports)
│   └── Plan Status Card
└── Main Content
    ├── Breadcrumbs
    ├── General Section
    │   ├── Profile Card
    │   ├── Verification Status
    │   └── Statistics Cards
    └── Activity Summary Section
        └── Activity Grid (6 metrics)
```

## Customization Guide

### Adding a New Sidebar Menu Item

```typescript
<SidebarSection
  title="New Section"
  items={[
    { 
      label: 'New Item', 
      icon: <IconComponent className="h-5 w-5" />,
      active: false 
    },
  ]}
/>
```

### Adding a New Activity Card

```typescript
<ActivityCard
  icon={<IconComponent className="h-6 w-6 text-color-500" />}
  label="Metric Label"
  value="123"
/>
```

### Connecting to Real Data

Replace hardcoded values with API calls:

```typescript
const [data, setData] = useState(null);

useEffect(() => {
  fetch('/api/admin/stats')
    .then(res => res.json())
    .then(setData);
}, []);

// Then use data.companyName, data.stats, etc.
```

---

## Performance Tips

1. **Image Optimization**: Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src={ASSETS.profileImage}
  alt="Profile"
  width={40}
  height={40}
  className="rounded-full"
/>
```

2. **Lazy Load Sidebar**: The sidebar is fixed—consider virtualizing menu items if you have 50+ items.

3. **Memoize Components**: Wrap sub-components in `React.memo()` to prevent unnecessary re-renders.

---

## Known Limitations & TODOs

- [ ] Sidebar items are not currently clickable—wire up routing with `next/link`
- [ ] Statistics use hardcoded data—connect to your API
- [ ] Activity metrics need real-time data integration
- [ ] Mobile menu hamburger needs implementation
- [ ] Breadcrumbs are not functional—add routing

---

## Support

For questions about shadcn/ui components, see: https://ui.shadcn.com/
For Tailwind classes, see: https://tailwindcss.com/docs
