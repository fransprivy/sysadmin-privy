'use client';

import React, { useState } from 'react';
import { Download, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  const colors = ['bg-red40', 'bg-accent', 'bg-green40', 'bg-purple40', 'bg-orange40'];
  const colorIndex = initials.charCodeAt(0) % colors.length;
  return (
    <div className={`${colors[colorIndex]} w-10 h-10 rounded-full flex items-center justify-center text-white text-p2 font-medium flex-shrink-0`}>
      {initials}
    </div>
  );
}
import { AdminLayout } from '@/components/AdminLayout';

export default function UserAndRolePage() {
  const [selectedTab, setSelectedTab] = useState('employee');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = EMPLOYEES.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = ['Employee', 'Position', 'Department', 'Organizational structure'];

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'User and role' }]} width="wide">
      {/* Page Content */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-border flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab.toLowerCase())}
              className={`pb-3 text-p2 font-medium transition-colors ${
                selectedTab === tab.toLowerCase()
                  ? 'border-b-2 border-accent text-foreground'
                  : 'text-subtle hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center justify-between">
          <div className="text-p2 text-subtle">
            <span className="font-medium text-foreground">12</span>/100
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-md border border-border bg-background text-p2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <select className="px-3 py-2 rounded-md border border-border bg-background text-p2">
              <option>Name</option>
              <option>Position</option>
              <option>Email</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button className="bg-red40 hover:bg-logo text-white">
              Add employee
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-info border border-accent rounded-lg p-4 flex gap-3">
          <div className="h-5 w-5 rounded-full bg-accent flex items-center justify-center text-white text-caption1 font-bold flex-shrink-0">
            i
          </div>
          <p className="text-p2 text-info-fg">Employees will not be able to access the enterprise after their active period ends</p>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-alpha border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-caption1 font-medium text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-caption1 font-medium text-foreground">Position</th>
                  <th className="px-6 py-3 text-left text-caption1 font-medium text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-caption1 font-medium text-foreground">Added at</th>
                  <th className="px-6 py-3 text-left text-caption1 font-medium text-foreground">Active until</th>
                  <th className="px-6 py-3 text-center text-caption1 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-bg-alpha/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AvatarBadge initials={employee.avatar} />
                        <div>
                          <p className="text-p2 font-medium text-foreground">{employee.name}</p>
                          {employee.role && <p className="text-caption1 text-accent">{employee.role}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-p2 text-foreground">{employee.position}</td>
                    <td className="px-6 py-4 text-p2 text-foreground">{employee.email}</td>
                    <td className="px-6 py-4 text-p2 text-foreground">{employee.addedAt}</td>
                    <td className="px-6 py-4 text-p2 text-foreground">{employee.activeUntil}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-bg-alpha transition-colors">
                        <MoreVertical className="h-4 w-4 text-subtle" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
