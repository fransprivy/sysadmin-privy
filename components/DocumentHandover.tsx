'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function DocumentHandoverPage() {
  const [handovers] = useState([
    {
      id: 1,
      document: 'Q4 Financial Report',
      from: 'John Doe',
      to: 'Jane Smith',
      date: '2024-04-15',
      status: 'Completed',
    },
    {
      id: 2,
      document: 'Company Policies',
      from: 'Jane Smith',
      to: 'Mike Johnson',
      date: '2024-04-20',
      status: 'In Progress',
    },
    {
      id: 3,
      document: 'Board Minutes',
      from: 'Mike Johnson',
      to: 'Sarah Wilson',
      date: '2024-04-25',
      status: 'Pending',
    },
  ]);

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Document handover' }]} width="wide">
      {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h6 font-medium mb-2 text-foreground">Document Handover</h1>
            <p className="text-subtle">Manage document transfers between users</p>
          </div>
          <Button>+ New Handover</Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-subtle" />
            <input
              type="text"
              placeholder="Search handovers..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-alpha border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Document</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">From</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">To</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Date</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Status</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {handovers.map((handover) => (
                <tr key={handover.id} className="border-b border-border hover:bg-bg-alpha transition-colors">
                  <td className="px-6 py-4 text-foreground">{handover.document}</td>
                  <td className="px-6 py-4 text-foreground">{handover.from}</td>
                  <td className="px-6 py-4 text-foreground">{handover.to}</td>
                  <td className="px-6 py-4 text-foreground">{handover.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-p2 font-medium ${
                      handover.status === 'Completed'
                        ? 'bg-success text-success-fg'
                        : handover.status === 'In Progress'
                        ? 'bg-info text-accent'
                        : 'bg-orange40/10 text-orange40'
                    }`}>
                      {handover.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
    </AdminLayout>
  );
}
