'use client';

import React from 'react';
import { Bell, Settings } from 'lucide-react';
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

export default function BillingPage() {
  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="billing" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">PrivySign</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">Billing</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2 text-foreground">Billing</h1>
            <p className="text-muted-foreground">Manage billing and subscription details</p>
          </div>

          {/* Billing Info Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Current Plan</p>
              <p className="text-2xl font-bold text-foreground mb-2">Enterprise</p>
              <p className="text-sm text-muted-foreground">Active since Jan 15, 2023</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Monthly Cost</p>
              <p className="text-2xl font-bold text-foreground mb-2">Rp 5.000.000</p>
              <p className="text-sm text-muted-foreground">Next billing date: May 15, 2024</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Payment Method</p>
              <p className="text-lg font-semibold text-foreground mb-2">Bank Transfer</p>
              <Button variant="outline" size="sm">Update Payment</Button>
            </Card>
          </div>

          {/* Invoice History */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Invoice History</h2>
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Date</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Invoice Number</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Amount</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Status</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="px-6 py-4 text-foreground">2024-04-15</td>
                      <td className="px-6 py-4 text-foreground">INV-2024-{i.toString().padStart(4, '0')}</td>
                      <td className="px-6 py-4 text-foreground">Rp 5.000.000</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">Download</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
