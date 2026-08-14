'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Toast } from '@/components/ui/toast';
import { Toggle } from '@/components/ui/toggle';

export default function PrivyPalPage() {
  const [enabled, setEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  return (
    <AdminLayout
      trail={[{ label: 'Admin Center', href: '/' }, { label: 'PrivyPal' }]}
    >
      <div className="flex w-full flex-col gap-12">
        {/* Main Section */}
        <section className="flex w-full items-center gap-5">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="w-full text-h6 font-medium text-foreground">PrivyPal (AI assistant)</h1>
            <p className="w-full text-p2 text-subtle">
              Enable PrivyPal to give your team AI-powered document summaries and Q&amp;A across
              your workspace.
            </p>
          </div>
          <Toggle
            checked={enabled}
            onChange={(next) => {
              setEnabled(next);
              setToast(
                next ? 'PrivyPal enabled for your enterprise.' : 'PrivyPal disabled.'
              );
            }}
            label="Enable PrivyPal"
          />
        </section>

        {/* Preview Section */}
        <section className="flex w-full flex-col gap-5">
          <p className="whitespace-nowrap text-p1 font-medium text-foreground">Preview</p>
          <div className="h-[519px] w-full max-w-content overflow-hidden rounded-2xl border-4 border-border">
            <img
              src="/assets/img/privypal-preview.png"
              alt="PrivyPal answering questions alongside a document"
              className="size-full object-cover"
            />
          </div>
        </section>
      </div>

      <Toast message={toast ?? ''} open={toast !== null} onDismiss={() => setToast(null)} />
    </AdminLayout>
  );
}
