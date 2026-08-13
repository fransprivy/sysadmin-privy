'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Home, Users, Shield, Stamp, Clock, FileText, CreditCard, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SidebarProps {
  activePage?: 'overview' | 'user-and-role' | 'enterprise-seal' | 'enterprise-stamp' | 'email-logo' | 'document-category' | 'reminder' | 'document-handover' | 'admins' | 'contacts' | 'groups' | 'billing' | 'payment-history' | 'reports' | 'privypal';
}

export function Sidebar({ activePage }: SidebarProps) {
  const pathname = usePathname();

  const generalItems = [
    { label: 'Overview', icon: Home, href: '/', id: 'overview' },
    { label: 'User and role', icon: Users, href: '/user-and-role', id: 'user-and-role' },
    { label: 'Enterprise seal', icon: Shield, href: '/enterprise-seal', id: 'enterprise-seal' },
    { label: 'Enterprise stamp', icon: Stamp, href: '/enterprise-stamp', id: 'enterprise-stamp' },
    { label: 'Reminder', icon: Clock, href: '/reminder', id: 'reminder' },
    { label: 'Email logo', icon: FileText, href: '/email-logo', id: 'email-logo' },
    { label: 'Document handover', icon: FileText, href: '/document-handover', id: 'document-handover' },
    { label: 'Document category', icon: FileText, href: '/document-category', id: 'document-category' },
    { label: 'PrivyPal', icon: FileText, href: '/privypal', id: 'privypal' },
  ];

  const userManagementItems = [
    { label: 'Admins', icon: Shield, href: '/admins', id: 'admins' },
    { label: 'Contacts', icon: Users, href: '/contacts', id: 'contacts' },
    { label: 'Groups', icon: Users, href: '/groups', id: 'groups' },
  ];

  const otherItems = [
    { label: 'Billing', icon: CreditCard, href: '/billing', id: 'billing' },
    { label: 'Payment history', icon: CreditCard, href: '/payment-history', id: 'payment-history' },
    { label: 'Reports', icon: BarChart3, href: '/reports', id: 'reports' },
  ];

  const isActive = (id: string) => {
    if (id === 'overview' && pathname === '/') return true;
    if (id === 'user-and-role' && pathname === '/user-and-role') return true;
    if (id === 'enterprise-seal' && pathname === '/enterprise-seal') return true;
    if (id === 'enterprise-stamp' && pathname === '/enterprise-stamp') return true;
    if (id === 'email-logo' && pathname === '/email-logo') return true;
    if (id === 'document-category' && pathname === '/document-category') return true;
    if (id === 'reminder' && pathname === '/reminder') return true;
    if (id === 'document-handover' && pathname === '/document-handover') return true;
    if (id === 'admins' && pathname === '/admins') return true;
    if (id === 'contacts' && pathname === '/contacts') return true;
    if (id === 'groups' && pathname === '/groups') return true;
    if (id === 'billing' && pathname === '/billing') return true;
    if (id === 'payment-history' && pathname === '/payment-history') return true;
    if (id === 'reports' && pathname === '/reports') return true;
    if (id === 'privypal' && pathname === '/privypal') return true;
    return false;
  };

  return (
    <div className="w-72 border-r border-border bg-background flex flex-col h-screen fixed left-0 top-16 pt-6 px-7 overflow-y-auto">
      {/* Enterprise Account Section */}
      <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-border">
        <p className="text-xs font-bold uppercase text-muted-foreground">Enterprise account</p>
        <Button variant="outline" className="w-full justify-center">
          <span className="text-sm">PT. Privy Identitas...</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* General Section */}
      <div className="flex flex-col gap-4 w-full mb-6">
        <p className="px-3 text-xs font-bold uppercase text-muted-foreground">General</p>
        <div className="flex flex-col gap-0">
          {generalItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 h-11 rounded-lg text-sm font-normal transition-colors ${
                  active
                    ? 'bg-muted text-foreground border-l-3 border-blue-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Management Section */}
      <div className="flex flex-col gap-4 w-full mb-6">
        <p className="px-3 text-xs font-bold uppercase text-muted-foreground">User Management</p>
        <div className="flex flex-col gap-0">
          {userManagementItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 h-11 rounded-lg text-sm font-normal transition-colors ${
                  active
                    ? 'bg-muted text-foreground border-l-3 border-blue-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Other Section */}
      <div className="flex flex-col gap-4 w-full mb-6">
        <p className="px-3 text-xs font-bold uppercase text-muted-foreground">Other</p>
        <div className="flex flex-col gap-0">
          {otherItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 h-11 rounded-lg text-sm font-normal transition-colors ${
                  active
                    ? 'bg-muted text-foreground border-l-3 border-blue-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Plan Status */}
      <div className="mt-auto pt-6 border-t border-border">
        <Card className="p-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-normal text-muted-foreground">Enterprise Plan</p>
              <p className="text-lg font-semibold text-blue-600">Active</p>
            </div>
            <div className="rounded-md bg-blue-50 px-3 py-1.5">
              <p className="text-xs font-normal text-blue-700">Until Apr 04, 2026</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
