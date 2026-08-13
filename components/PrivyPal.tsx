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

export default function PrivyPalPage() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="privypal" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <span className="text-muted-foreground">Admin Center</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-semibold">PrivyPal</span>
          </div>

          {/* Feature Configuration */}
          <div className="max-w-2xl">
            <Card className="p-8 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold mb-2 text-foreground">PrivyPal (AI assistant)</h1>
                  <p className="text-base text-muted-foreground">
                    Enable PrivyPal to give your team AI-powered document summaries and Q&A across your workspace.
                  </p>
                </div>
                <div className="ml-8">
                  <button
                    onClick={() => setEnabled(!enabled)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      enabled ? 'bg-blue-600' : 'bg-gray-300'
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
              <h2 className="text-lg font-semibold mb-4 text-foreground">Preview</h2>
              <Card className="p-6 border-2 border-gray-300">
                <div className="bg-white rounded-lg overflow-hidden">
                  <img
                    src="/preview-placeholder.png"
                    alt="PrivyPal Preview"
                    className="w-full h-auto"
                  />
                  <div className="p-6 text-center text-muted-foreground">
                    AI assistant interface preview will appear here
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Status Message */}
          {enabled && (
            <div className="fixed bottom-8 left-8 bg-gray-900 text-white px-4 py-3 rounded-lg flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">✓</div>
              <span>PrivyPal enabled for your enterprise.</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
