'use client';

import React, { useState } from 'react';
import { ChevronDown, Settings, Bell, Home, Users, Shield, Clock, FileText, Stamp, Download, File, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/Sidebar';

// TODO: Replace these URLs with your own assets
// These Figma asset URLs expire in 7 days. Options:
// 1. Download and commit to /public/assets/admin-center/
// 2. Use a CDN like Cloudinary or Vercel Blob
// 3. Replace with your own icon library
const ASSETS = {
  appIcon: 'https://www.figma.com/api/mcp/asset/d19138e4-d430-4212-b7b3-c5560f1d122f.png',
  profileImage: 'https://www.figma.com/api/mcp/asset/5870fadd-2136-457c-b3c9-71ff99316ee9.png',
};

interface ListItemProps {
  label: string;
  value: string;
}

function ListItem({ label, value }: ListItemProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/50 px-3 py-2.5 last:border-b-0">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-normal text-foreground">{value}</p>
    </div>
  );
}

interface VerificationItemProps {
  label: string;
}

function VerificationItem({ label }: VerificationItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <Badge variant="outline" className="w-fit bg-green-50 border-green-200">
        <CheckCircle className="mr-1 h-3.5 w-3.5 text-green-600" />
        <span className="text-xs font-medium text-green-700">Verified</span>
      </Badge>
    </div>
  );
}

interface ActivityCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  isBadge?: boolean;
}

function ActivityCard({ icon, label, value, isBadge }: ActivityCardProps) {
  return (
    <Card className="flex h-32 flex-col items-center justify-center p-6">
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <div className="flex flex-col gap-1 items-center w-full">
          <div className="text-blue-600">{icon}</div>
          <p className="text-xs font-medium text-foreground text-center">{label}</p>
        </div>
        {isBadge ? (
          value
        ) : (
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        )}
      </div>
    </Card>
  );
}


function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-5 z-50">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded">
          {/* Replace with your logo */}
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <span className="text-lg font-semibold text-foreground">Admin Center</span>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src={ASSETS.profileImage}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </Button>
      </div>
    </div>
  );
}

export default function AdminCenterPage() {
  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="overview" />

      {/* Main Content */}
      <main className="ml-72 mt-16 flex-1 overflow-auto">
        {/* Breadcrumbs */}
        <div className="sticky top-0 border-b border-border bg-background/95 px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <a href="#" className="text-muted-foreground underline hover:text-foreground">
              PrivySign
            </a>
            <ChevronDown className="h-4 w-4 text-muted-foreground rotate-90" />
            <span className="font-semibold text-foreground">Admin Center</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="space-y-8 px-8 py-6">
          {/* General Section */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-foreground">General</h2>

            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex gap-6">
                {/* Profile Image Section */}
                <div className="flex flex-col gap-4 w-96">
                  <div className="h-24 w-24 rounded-full border-2 border-border overflow-hidden flex-shrink-0">
                    <img
                      src={ASSETS.profileImage}
                      alt="Company Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      PT Privy Identitas digital
                    </h3>
                    <p className="text-sm text-muted-foreground">Admin</p>
                  </div>
                  <Button variant="link" className="justify-start p-0 text-blue-600">
                    Edit
                  </Button>
                </div>

                {/* Status Section */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-3 pb-4 border-b border-border">
                    <ListItem label="Enterprise ID" value="KC059012" />
                    <ListItem
                      label="Address"
                      value="Jalan Lele sumargo No II Block IV Cluster melati K.H Dewantara, Sewon, Bantul, Yogyakarta, Indonesia"
                    />
                  </div>

                  {/* Verification Status */}
                  <div className="grid grid-cols-3 gap-4">
                    <VerificationItem label="NPWP" />
                    <VerificationItem label="Company deed" />
                    <VerificationItem label="Company decree" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Enterprise Plan</p>
                  <p className="text-lg font-bold text-blue-600">Active</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">e-Meterai</p>
                  <p className="text-lg font-bold text-blue-600">120,930</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Employee account</p>
                  <div className="flex items-end gap-2">
                    <p className="text-lg font-bold text-blue-600">100</p>
                    <p className="text-xs text-muted-foreground">of 212 (112 available)</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Activity Summary Section */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Activity summary</h2>
              <div className="flex gap-3">
                <Button variant="outline">
                  This month
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            {/* Activity Grid */}
            <div className="grid grid-cols-4 gap-6">
              <ActivityCard
                icon={<File className="h-6 w-6" />}
                label="Document uploaded"
                value="777"
              />
              <ActivityCard
                icon={<FileText className="h-6 w-6 text-green-600" />}
                label="Signature placed"
                value="5"
              />
              <ActivityCard
                icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
                label="Document reviewed"
                value="12"
              />
              <ActivityCard
                icon={<Stamp className="h-6 w-6 text-orange-500" />}
                label="Seal placed"
                value="21"
              />
            </div>

            {/* Second Row of Activities */}
            <div className="grid grid-cols-4 gap-6">
              <ActivityCard
                icon={<FileText className="h-6 w-6 text-purple-600" />}
                label="Document template used"
                isBadge
                value={<Badge className="bg-blue-50 text-blue-700 border-0">Coming soon</Badge>}
              />
              <ActivityCard
                icon={<Users className="h-6 w-6 text-red-600" />}
                label="Employee account added"
                value="42"
              />
              <div />
              <div />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
