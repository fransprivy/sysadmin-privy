'use client';

import React from 'react';
import { Bell, Settings, Download } from 'lucide-react';
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

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: 'Monthly Activity Report',
      description: 'Summary of all user activities',
      generated: '2024-05-01',
      type: 'PDF',
    },
    {
      id: 2,
      name: 'User Analytics',
      description: 'User engagement and statistics',
      generated: '2024-04-30',
      type: 'Excel',
    },
    {
      id: 3,
      name: 'Document Usage Report',
      description: 'Document upload and usage metrics',
      generated: '2024-04-25',
      type: 'PDF',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="reports" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">PrivySign</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">Reports</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-2 text-foreground">Reports</h1>
              <p className="text-muted-foreground">View and download generated reports</p>
            </div>
            <Button>+ Generate Report</Button>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{report.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Generated: {report.generated}</span>
                      <span>Type: {report.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
