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

export default function PaymentHistoryPage() {
  const payments = [
    {
      id: 1,
      date: '2024-04-15',
      invoice: 'INV-2024-0001',
      amount: 'Rp 5.000.000',
      method: 'Bank Transfer',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2024-03-15',
      invoice: 'INV-2024-0002',
      amount: 'Rp 5.000.000',
      method: 'Credit Card',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2024-02-15',
      invoice: 'INV-2024-0003',
      amount: 'Rp 5.000.000',
      method: 'Bank Transfer',
      status: 'Completed',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="payment-history" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">PrivySign</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">Payment History</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2 text-foreground">Payment History</h1>
            <p className="text-muted-foreground">View all your past payments and transactions</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search payments..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Table */}
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Date</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Invoice</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Amount</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Method</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Status</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="px-6 py-4 text-foreground">{payment.date}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{payment.invoice}</td>
                    <td className="px-6 py-4 text-foreground">{payment.amount}</td>
                    <td className="px-6 py-4 text-foreground">{payment.method}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">Download</Button>
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
