'use client';

import React, { useState } from 'react';
import { ChevronDown, Settings, Bell, User, Home, Users, Shield, Clock, FileText, Download, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Employee {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  position: string;
  email: string;
  addedAt: string;
  activeUntil: string;
}

const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Andre Adams',
    avatar: 'AA',
    position: 'UI/UX designer',
    email: 'andre.adams@altostrat.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '2',
    name: 'Brian Brown',
    avatar: 'BB',
    role: 'Owner',
    position: 'iOS Developer',
    email: 'brian.brown@cymbalgroup.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '3',
    name: 'Claire Clark',
    avatar: 'CC',
    position: 'Backend engineer',
    email: 'claire.clark@altostrat.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '4',
    name: 'Douglas Doe',
    avatar: 'DD',
    position: 'Backend engineer',
    email: 'douglas.doe@cymbalgroup.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '5',
    name: 'Elaine Evans',
    avatar: 'EE',
    position: 'Backend engineer',
    email: 'elaine.evans@altostrat.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '6',
    name: 'Frank Foster',
    avatar: 'FF',
    position: 'Frontend engineer',
    email: 'luna.lewis@cymbalgroup.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '7',
    name: 'Gerald Green',
    avatar: 'GG',
    position: 'SQA Engineer',
    email: 'gerald.green@altostrat.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '8',
    name: 'Hannah Harris',
    avatar: 'HH',
    position: 'SQA Engineer',
    email: 'hannah.harris@cymbalgroup.c...',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
  {
    id: '9',
    name: 'Isaac Irving',
    avatar: 'II',
    position: 'Product owner',
    email: 'isaac.irving@altostrat.com',
    addedAt: 'Jun 02, 2025',
    activeUntil: 'Jun 02, 2026',
  },
];

function AvatarBadge({ initials }: { initials: string }) {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  return (
    <div className={`${colors[colorIndex]} w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="w-72 border-r border-border bg-background flex flex-col h-screen fixed left-0 top-16 pt-6 px-7 overflow-y-auto">
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
          {[
            { label: 'Overview', icon: Home },
            { label: 'User and role', icon: Users, active: true },
            { label: 'Enterprise seal', icon: Shield },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 h-11 rounded-lg text-sm font-normal transition-colors ${
                item.active
                  ? 'bg-muted text-foreground border-l-3 border-blue-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          ))}
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

export default function UserAndRolePage() {
  const [selectedTab, setSelectedTab] = useState('employee');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = EMPLOYEES.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = ['Employee', 'Position', 'Department', 'Organizational structure'];

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        {/* Breadcrumbs */}
        <div className="sticky top-0 border-b border-border bg-background/95 px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              PrivySign
            </a>
            <span className="text-muted-foreground">/</span>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Admin Center
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-foreground">User and role</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 space-y-6">
          {/* Tabs */}
          <div className="border-b border-border flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab.toLowerCase())}
                className={`pb-3 text-sm font-medium transition-colors ${
                  selectedTab === tab.toLowerCase()
                    ? 'border-b-2 border-blue-600 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stats and Controls */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">12</span>/100
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <select className="px-3 py-2 rounded-md border border-border bg-background text-sm">
                <option>Name</option>
                <option>Position</option>
                <option>Email</option>
              </select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Add employee
              </Button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              i
            </div>
            <p className="text-sm text-blue-900">Employees will not be able to access the enterprise after their active period ends</p>
          </div>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Added at</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Active until</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <AvatarBadge initials={employee.avatar} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{employee.name}</p>
                            {employee.role && <p className="text-xs text-blue-600">{employee.role}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{employee.position}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{employee.email}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{employee.addedAt}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{employee.activeUntil}</td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-muted transition-colors">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
