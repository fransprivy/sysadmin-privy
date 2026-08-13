'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function PrivyPalPage() {
  const [enabled, setEnabled] = useState(true);

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'PrivyPal' }]}>
      {/* Feature Configuration */}
        <div className="max-w-2xl">
          <Card className="mb-8 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-h6 font-medium mb-2 text-foreground">PrivyPal (AI assistant)</h1>
                <p className="text-p1 text-subtle">
                  Enable PrivyPal to give your team AI-powered document summaries and Q&A across your workspace.
                </p>
              </div>
              <div className="ml-8">
                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    enabled ? 'bg-accent' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          {/* Preview Section */}
          <div>
            <h2 className="text-p1 font-medium mb-4 text-foreground">Preview</h2>
            <Card className="p-6">
              {/* No preview asset ships with the app yet — render an empty state
                  rather than a broken <img>. */}
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-bg-alpha">
                <p className="text-p2 text-subtle">
                  AI assistant interface preview will appear here
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Status Message */}
        {enabled && (
          <div className="fixed bottom-8 right-8 z-50 bg-inverse text-white px-4 py-3 rounded-lg flex items-center gap-3">
            <div className="w-5 h-5 bg-green40 rounded-full flex items-center justify-center text-caption1 text-white">✓</div>
            <span>PrivyPal enabled for your enterprise.</span>
          </div>
        )}
    </AdminLayout>
  );
}
