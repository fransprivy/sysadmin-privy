'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function BillingPage() {
  return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Billing' }]} width="wide">
      {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-h6 font-medium mb-2 text-foreground">Billing</h1>
          <p className="text-subtle">Manage billing and subscription details</p>
        </div>

        {/* Billing Info Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-p2 text-subtle mb-2">Current Plan</p>
            <p className="text-h6 font-bold text-foreground mb-2">Enterprise</p>
            <p className="text-p2 text-subtle">Active since Jan 15, 2023</p>
          </Card>
          <Card className="p-6">
            <p className="text-p2 text-subtle mb-2">Monthly Cost</p>
            <p className="text-h6 font-bold text-foreground mb-2">Rp 5.000.000</p>
            <p className="text-p2 text-subtle">Next billing date: May 15, 2024</p>
          </Card>
          <Card className="p-6">
            <p className="text-p2 text-subtle mb-2">Payment Method</p>
            <p className="text-p1 font-medium text-foreground mb-2">Bank Transfer</p>
            <Button variant="outline" size="sm">Update Payment</Button>
          </Card>
        </div>

        {/* Invoice History */}
        <div>
          <h2 className="text-h6 font-medium text-foreground mb-4">Invoice History</h2>
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-bg-alpha border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Date</th>
                  <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Invoice Number</th>
                  <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Amount</th>
                  <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Status</th>
                  <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-border hover:bg-bg-alpha transition-colors">
                    <td className="px-6 py-4 text-foreground">2024-04-15</td>
                    <td className="px-6 py-4 text-foreground">INV-2024-{i.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4 text-foreground">Rp 5.000.000</td>
                    <td className="px-6 py-4">
                      <span className="bg-success text-success-fg px-3 py-1 rounded-full text-p2 font-medium">
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
    </AdminLayout>
  );
}
