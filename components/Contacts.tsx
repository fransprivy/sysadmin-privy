'use client';

import React from 'react';
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
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="contacts" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">PrivySign</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">Contacts</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-2 text-foreground">Contacts</h1>
              <p className="text-muted-foreground">Manage contact information</p>
            </div>
            <Button>+ Add Contact</Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
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
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Name</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Email</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Phone</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Department</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-border hover:bg-muted transition-colors">
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
        </div>
      </main>
    </div>
  );
}
