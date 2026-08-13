'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function GroupsPage() {
  const groups = [
    {
      id: 1,
      name: 'Finance Team',
      members: 5,
      description: 'Finance department members',
      created: '2023-01-15',
    },
    {
      id: 2,
      name: 'HR Department',
      members: 3,
      description: 'Human Resources team',
      created: '2023-03-20',
    },
    {
      id: 3,
      name: 'Legal Team',
      members: 4,
      description: 'Legal and compliance',
      created: '2023-05-10',
    },
  ];

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Groups' }]} width="wide">
      {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h6 font-medium mb-2 text-foreground">Groups</h1>
            <p className="text-subtle">Manage user groups and team assignments</p>
          </div>
          <Button>+ Create Group</Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-subtle" />
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-alpha border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Name</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Description</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Members</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Created</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id} className="border-b border-border hover:bg-bg-alpha transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{group.name}</td>
                  <td className="px-6 py-4 text-foreground">{group.description}</td>
                  <td className="px-6 py-4 text-foreground">{group.members}</td>
                  <td className="px-6 py-4 text-foreground">{group.created}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
    </AdminLayout>
  );
}
