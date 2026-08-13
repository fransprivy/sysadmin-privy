'use client';

import React, { useState, useEffect } from 'react';
import AdminCenterPage from '@/components/AdminCenter';

/**
 * Example: Integrating AdminCenter with real data
 * This shows how to:
 * 1. Fetch data from your API
 * 2. Pass data to the component
 * 3. Handle loading/error states
 */

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  profileImage: string;
  enterpriseId: string;
  address: string;
  admin: string;
  plan: {
    name: string;
    status: 'active' | 'inactive' | 'expiring';
    expiresAt: string;
  };
}

interface ActivityStats {
  documentsUploaded: number;
  signaturesPlaced: number;
  documentsReviewed: number;
  sealsPlaced: number;
  templatesUsed: number;
  employeeAccountsAdded: number;
}

interface CompanyStats {
  emeterai: number;
  employeeAccounts: number;
  totalEmployees: number;
}

export default function AdminCenterPage() {
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [activity, setActivity] = useState<ActivityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch company data
        const companyRes = await fetch('/api/admin/company');
        const companyData = await companyRes.json();
        setCompany(companyData);

        // Fetch statistics
        const statsRes = await fetch('/api/admin/stats');
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch activity metrics
        const activityRes = await fetch('/api/admin/activity');
        const activityData = await activityRes.json();
        setActivity(activityData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-2">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          <p className="text-sm text-muted-foreground">Loading admin center...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-destructive">Error loading data</p>
          <p className="text-xs text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminCenterPage
      company={company!}
      stats={stats!}
      activity={activity!}
    />
  );
}

/**
 * API Endpoints Example
 * Create these in your API route (e.g., app/api/admin/*)
 */

/*
// app/api/admin/company/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with your database query
  const company = {
    id: '1',
    name: 'PT Privy Identitas digital',
    logo: '/assets/admin-center/logo.png',
    profileImage: '/assets/admin-center/profile.png',
    enterpriseId: 'KC059012',
    address: 'Jalan Lele sumargo No II Block IV Cluster melati K.H Dewantara, Sewon, Bantul, Yogyakarta, Indonesia',
    admin: 'Admin',
    plan: {
      name: 'Enterprise Plan',
      status: 'active',
      expiresAt: '2024-04-04',
    },
  };

  return NextResponse.json(company);
}

// app/api/admin/stats/route.ts
export async function GET() {
  const stats = {
    emeterai: 120930,
    employeeAccounts: 100,
    totalEmployees: 212,
  };

  return NextResponse.json(stats);
}

// app/api/admin/activity/route.ts
export async function GET() {
  const activity = {
    documentsUploaded: 777,
    signaturesPlaced: 5,
    documentsReviewed: 12,
    sealsPlaced: 21,
    templatesUsed: 0,
    employeeAccountsAdded: 42,
  };

  return NextResponse.json(activity);
}
*/

/**
 * Updated AdminCenter Component Props
 *
 * Modify AdminCenter.tsx interface to accept these props:
 *
 * interface AdminCenterProps {
 *   company: CompanyData;
 *   stats: CompanyStats;
 *   activity: ActivityStats;
 * }
 *
 * Then replace hardcoded values with:
 * - company.name
 * - company.enterpriseId
 * - stats.emeterai
 * - activity.documentsUploaded
 * etc.
 */
