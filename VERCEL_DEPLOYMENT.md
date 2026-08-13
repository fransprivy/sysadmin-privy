# Deploying Admin Center to Vercel

## Prerequisites

- GitHub repository with your Next.js project
- Vercel account (free at https://vercel.com)
- Admin Center component integrated into your project

## Step 1: Prepare Your Repository

```bash
# Ensure your project is committed and pushed to GitHub
git add .
git commit -m "feat: add Admin Center dashboard with shadcn/ui"
git push origin main
```

## Step 2: Import Project to Vercel

### Option A: Automatic (Recommended)

1. Visit https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your repositories
4. Select your repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# ? Set up and deploy "~/your-project"? [Y/n]
# ? Which scope do you want to deploy to? (your-team)
# ? Link to existing project? [y/N] (first time) or [Y/n] (if exists)
# ? What's your project's name? my-admin-center
# ? In which directory is your code? ./
# ? Want to modify these settings? [y/N]
```

## Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add variables from `.env.example`:

```
NEXT_PUBLIC_ADMIN_LOGO_URL = https://your-cdn.com/logo.png
NEXT_PUBLIC_ADMIN_PROFILE_URL = https://your-cdn.com/profile.png
DATABASE_URL = your-database-url (if needed)
API_SECRET_KEY = your-secret-key
```

**Important**: Don't commit `.env.local` — use Vercel's dashboard to set secrets.

## Step 4: Configure Build Settings

Default settings usually work, but verify:

1. **Framework Preset**: Next.js ✓
2. **Build Command**: `next build` ✓
3. **Output Directory**: `.next` ✓
4. **Install Command**: `npm ci` ✓

No changes needed for most projects.

## Step 5: Deploy

After pushing to GitHub:

```bash
git push origin main
```

Vercel automatically:
1. Detects the push
2. Runs the build command
3. Deploys to production (or preview for PRs)

You'll see:
- Build logs in Vercel Dashboard
- Preview URL for testing
- Auto-generated production domain

## Step 6: Handle Assets

### If using local `/public` assets:

No action needed—Vercel serves static files automatically.

### If using external CDN:

1. Set `NEXT_PUBLIC_ADMIN_LOGO_URL` env var in Vercel
2. Update AdminCenter.tsx:

```typescript
const ASSETS = {
  appIcon: process.env.NEXT_PUBLIC_ADMIN_LOGO_URL,
  profileImage: process.env.NEXT_PUBLIC_ADMIN_PROFILE_URL,
};
```

### If using Vercel Blob Storage:

```bash
npm install @vercel/blob
```

Then create a helper:

```typescript
// lib/assets.ts
import { list } from '@vercel/blob';

export async function getAdminAssets() {
  const { blobs } = await list({
    prefix: 'admin-center/',
  });

  return {
    appIcon: blobs.find(b => b.pathname === 'admin-center/logo.png')?.url,
    profileImage: blobs.find(b => b.pathname === 'admin-center/profile.png')?.url,
  };
}
```

## Step 7: Set Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., admin.example.com)
4. Follow DNS setup instructions
5. Wait for HTTPS certificate (usually instant)

## Step 8: Monitor Performance

Vercel automatically provides:
- **Analytics**: Page performance metrics
- **Real-time Logs**: API and runtime logs
- **Build Logs**: Build step-by-step output
- **Deployment History**: Rollback to previous versions

View in Dashboard → Analytics & Settings.

## Step 9: Setup Preview Deployments (Optional)

Preview URLs are created automatically for pull requests. To customize:

1. Go to Settings → Git
2. Toggle "Vercel Preview Comments" (auto-comments PRs with URLs)
3. Toggle "Automatic Deployments" (auto-deploy on push)

## Continuous Deployment Workflow

```
Your Code
   ↓
GitHub (push to main)
   ↓
Vercel Webhook (triggered)
   ↓
Build Process
   ↓
Automated Tests (if configured)
   ↓
Deploy to Production
```

To run tests before deploy:

1. Create `vercel.json`:

```json
{
  "buildCommand": "npm run build && npm run test",
  "devCommand": "next dev"
}
```

2. Push and Vercel will run tests before deploying.

## Troubleshooting

### Build Fails

Check build logs in Vercel Dashboard:

```
Error: Module not found
→ Solution: Run `npm install` locally and check node_modules
```

### 404 on Routes

Ensure your Next.js routing is correct:

```
/app/admin/center/page.tsx → Available at /admin/center
/app/api/admin/stats/route.ts → Available at /api/admin/stats
```

### Missing Environment Variables

Error: `NEXT_PUBLIC_ADMIN_LOGO_URL is not defined`

→ Set in Vercel Dashboard → Environment Variables

### Images Not Loading

1. Check image URLs are absolute (start with `https://`)
2. Test URLs in browser directly
3. For local images, use `/assets/...` path

### Performance Issues

1. Check Analytics dashboard for slow pages
2. Verify image optimization with `next/image`
3. Use Vercel's built-in Web Vitals monitoring

## Rollback to Previous Deployment

1. Go to Deployments tab
2. Find desired deployment
3. Click "..."→ "Promote to Production"

Done! Site reverts immediately.

## Environment-Specific Configs

### Development (Local)

```bash
npm run dev
# Uses .env.local
```

### Preview (PR/Branch)

Automatic preview URL created. Uses Vercel preview env vars.

### Production (main branch)

Uses Vercel production env vars.

Set different values per environment in Vercel Dashboard.

## Performance Optimization

### Enable Caching

```js
// next.config.js
module.exports = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=60, s-maxage=3600',
          },
        ],
      },
    ];
  },
};
```

### Compress Assets

```json
// vercel.json
{
  "compress": true
}
```

### Use Edge Functions for API Routes (Optional)

```typescript
// app/api/admin/stats/route.ts
export const runtime = 'edge';

export async function GET() {
  // Faster response from edge
}
```

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Troubleshooting**: https://vercel.com/support
- **Status**: https://vercel.statuspage.io

## Monitoring & Alerts

1. Set up Slack notifications in Vercel Dashboard
2. Enable deployment alerts: Settings → Integrations
3. Monitor performance with Vercel Analytics

You're ready to deploy! 🚀
