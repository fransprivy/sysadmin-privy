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

export default function ReportsDetailPage() {
  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="reports" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">Admin Center</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Reports</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">Balance Usage</span>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2 text-foreground">Balance Usage Report</h1>
            <p className="text-muted-foreground">Detailed analysis of your e-Meterai balance consumption</p>
          </div>

          {/* Filter Section */}
          <Card className="p-6 mb-8">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Period</label>
                <input type="date" className="w-full px-3 py-2 border border-border rounded-lg" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
                <input type="date" className="w-full px-3 py-2 border border-border rounded-lg" />
              </div>
              <Button>Filter</Button>
            </div>
          </Card>

          {/* Report Data Table */}
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Document</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Balance Used</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Remaining Balance</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Type</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="px-6 py-4 text-foreground">2024-05-{String(i).padStart(2, '0')}</td>
                    <td className="px-6 py-4 text-foreground">Document {i}</td>
                    <td className="px-6 py-4 text-foreground">{100 + i * 10}</td>
                    <td className="px-6 py-4 text-foreground">{120000 - (100 + i * 10)}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
              <p className="text-sm text-muted-foreground mb-2">Total Used This Month</p>
              <p className="text-3xl font-bold text-foreground">5,250</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Remaining Balance</p>
              <p className="text-3xl font-bold text-foreground">114,750</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Usage Rate</p>
              <p className="text-3xl font-bold text-foreground">4.36%</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
