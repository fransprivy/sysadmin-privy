'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

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
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Reminder' }]}>
      {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-h6 font-medium mb-2 text-foreground">Reminder Settings</h1>
          <p className="text-subtle">Configure reminder notifications for your account</p>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-p1 font-medium text-foreground mb-1">{reminder.name}</h3>
                  <p className="text-p2 text-subtle mb-2">{reminder.description}</p>
                  <p className="text-p2 text-subtle">Frequency: {reminder.frequency}</p>
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
    </AdminLayout>
  );
}
