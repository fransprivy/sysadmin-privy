'use client';

import React, { useState } from 'react';
import { Bell, Settings } from 'lucide-react';
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

export default function ReminderPage() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      name: 'Document Review',
      description: 'Reminder for document reviews',
      frequency: 'Weekly',
      enabled: true,
    },
    {
      id: 2,
      name: 'Signature Required',
      description: 'Documents awaiting signatures',
      frequency: 'Daily',
      enabled: true,
    },
  ]);

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="reminder" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">PrivySign</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">Reminder</span>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2 text-foreground">Reminder Settings</h1>
            <p className="text-muted-foreground">Configure reminder notifications for your account</p>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{reminder.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>
                    <p className="text-sm text-muted-foreground">Frequency: {reminder.frequency}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reminder.enabled}
                        onChange={() => {
                          setReminders(
                            reminders.map((r) =>
                              r.id === reminder.id ? { ...r, enabled: !r.enabled } : r
                            )
                          );
                        }}
                        className="w-5 h-5 rounded border-border"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Add Reminder Button */}
          <div className="mt-8">
            <Button>
              <span>+ Add Reminder</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
