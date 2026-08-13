'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

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
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Payment history' }]} width="wide">
      {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-h6 font-medium mb-2 text-foreground">Payment History</h1>
          <p className="text-subtle">View all your past payments and transactions</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-subtle" />
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
            <thead className="bg-bg-alpha border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Date</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Invoice</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Amount</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Method</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Status</th>
                <th className="text-left px-6 py-4 font-medium text-p2 text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-bg-alpha transition-colors">
                  <td className="px-6 py-4 text-foreground">{payment.date}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{payment.invoice}</td>
                  <td className="px-6 py-4 text-foreground">{payment.amount}</td>
                  <td className="px-6 py-4 text-foreground">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className="bg-success text-success-fg px-3 py-1 rounded-full text-p2 font-medium">
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
    </AdminLayout>
  );
}
