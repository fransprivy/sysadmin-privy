'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminsPage() {
  const [admins] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@privy.id',
      role: 'Super Admin',
      joinDate: '2023-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@privy.id',
      role: 'Admin',
      joinDate: '2023-06-20',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@privy.id',
      role: 'Admin',
      joinDate: '2024-01-10',
    },
  ]);

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Admins' }]} width="wide">
      {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h6 font-medium mb-2 text-foreground">Admin Management</h1>
            <p className="text-subtle">Manage administrator accounts</p>
          </div>
          <Button>+ Add Admin</Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-subtle" />
            <input
              type="text"
              placeholder="Search admins..."
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
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Email</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Role</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Join Date</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b border-border hover:bg-bg-alpha transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{admin.name}</td>
                  <td className="px-6 py-4 text-foreground">{admin.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-info text-accent px-3 py-1 rounded-full text-p2 font-medium">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground">{admin.joinDate}</td>
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
