'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function ContactsPage() {
  const contacts = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+62 812-3456-7890',
      department: 'Finance',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '+62 812-1234-5678',
      department: 'IT',
    },
  ];

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Contacts' }]} width="wide">
      {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-h6 font-medium mb-2 text-foreground">Contacts</h1>
            <p className="text-subtle">Manage contact information</p>
          </div>
          <Button>+ Add Contact</Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-subtle" />
            <input
              type="text"
              placeholder="Search contacts..."
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
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Phone</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Department</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-border hover:bg-bg-alpha transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{contact.name}</td>
                  <td className="px-6 py-4 text-foreground">{contact.email}</td>
                  <td className="px-6 py-4 text-foreground">{contact.phone}</td>
                  <td className="px-6 py-4 text-foreground">{contact.department}</td>
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
