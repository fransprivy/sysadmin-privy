'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

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
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Reports' }]} width="wide">
      {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h6 font-medium mb-2 text-foreground">Reports</h1>
            <p className="text-subtle">View and download generated reports</p>
          </div>
          <Button>+ Generate Report</Button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-p1 font-medium text-foreground mb-1">{report.name}</h3>
                  <p className="text-p2 text-subtle mb-2">{report.description}</p>
                  <div className="flex gap-4 text-p2 text-subtle">
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
    </AdminLayout>
  );
}
