'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Home, Users, Shield, Stamp, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SidebarProps {
  activePage?: 'overview' | 'user-and-role' | 'enterprise-seal' | 'enterprise-stamp';
}

export function Sidebar({ activePage }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', icon: Home, href: '/', id: 'overview' },
    { label: 'User and role', icon: Users, href: '/user-and-role', id: 'user-and-role' },
    { label: 'Enterprise seal', icon: Shield, href: '/enterprise-seal', id: 'enterprise-seal' },
    { label: 'Enterprise stamp', icon: Stamp, href: '/enterprise-stamp', id: 'enterprise-stamp' },
    { label: 'Reminder', icon: Clock, href: '#', id: 'reminder' },
    { label: 'Email logo', icon: FileText, href: '#', id: 'email-logo' },
    { label: 'Document handover', icon: FileText, href: '#', id: 'doc-handover' },
    { label: 'Document category', icon: FileText, href: '#', id: 'doc-category' },
  ];

  const isActive = (id: string) => {
    if (id === 'overview' && pathname === '/') return true;
    if (id === 'user-and-role' && pathname === '/user-and-role') return true;
    if (id === 'enterprise-seal' && pathname === '/enterprise-seal') return true;
    if (id === 'enterprise-stamp' && pathname === '/enterprise-stamp') return true;
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
          {navItems.slice(0, 8).map((item) => {
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
