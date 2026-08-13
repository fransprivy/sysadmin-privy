'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function ReportsDetailPage() {
  return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Reports detail' }]} width="wide">
      {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-h6 font-medium mb-2 text-foreground">Balance Usage Report</h1>
          <p className="text-subtle">Detailed analysis of your e-Meterai balance consumption</p>
        </div>

        {/* Filter Section */}
        <Card className="p-6 mb-8">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-p2 font-medium text-foreground mb-2">Period</label>
              <input type="date" className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
            <div className="flex-1">
              <label className="block text-p2 font-medium text-foreground mb-2">To Date</label>
              <input type="date" className="w-full px-3 py-2 border border-border rounded-lg" />
            </div>
            <Button>Filter</Button>
          </div>
        </Card>

        {/* Report Data Table */}
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-alpha border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Date</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Document</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Balance Used</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Remaining Balance</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Type</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-border hover:bg-bg-alpha transition-colors">
                  <td className="px-6 py-4 text-foreground">2024-05-{String(i).padStart(2, '0')}</td>
                  <td className="px-6 py-4 text-foreground">Document {i}</td>
                  <td className="px-6 py-4 text-foreground">{100 + i * 10}</td>
                  <td className="px-6 py-4 text-foreground">{120000 - (100 + i * 10)}</td>
                  <td className="px-6 py-4">
                    <span className="bg-info text-accent px-3 py-1 rounded-full text-p2 font-medium">
                      Signature
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <Card className="p-6">
            <p className="text-p2 text-subtle mb-2">Total Used This Month</p>
            <p className="text-h6 font-bold text-foreground">5,250</p>
          </Card>
          <Card className="p-6">
            <p className="text-p2 text-subtle mb-2">Remaining Balance</p>
            <p className="text-h6 font-bold text-foreground">114,750</p>
          </Card>
          <Card className="p-6">
            <p className="text-p2 text-subtle mb-2">Usage Rate</p>
            <p className="text-h6 font-bold text-foreground">4.36%</p>
          </Card>
        </div>
    </AdminLayout>
  );
}
