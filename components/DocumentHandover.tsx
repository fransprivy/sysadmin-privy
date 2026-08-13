'use client';

import React, { useState } from 'react';
import { Bell, Settings, Search } from 'lucide-react';
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
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="document-handover" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">PrivySign</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">Document Handover</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-2 text-foreground">Document Handover</h1>
              <p className="text-muted-foreground">Manage document transfers between users</p>
            </div>
            <Button>+ New Handover</Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
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
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Document</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">From</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">To</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {handovers.map((handover) => (
                  <tr key={handover.id} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="px-6 py-4 text-foreground">{handover.document}</td>
                    <td className="px-6 py-4 text-foreground">{handover.from}</td>
                    <td className="px-6 py-4 text-foreground">{handover.to}</td>
                    <td className="px-6 py-4 text-foreground">{handover.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        handover.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : handover.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
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
        </div>
      </main>
    </div>
  );
}
