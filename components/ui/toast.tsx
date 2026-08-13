'use client';

import { useEffect } from 'react';
import { ToastCheckIcon } from '@/components/icons';

/**
 * Toast (Figma) — inverse surface, 8px radius.
 * The frames anchor it 30px from the bottom-left of the *viewport*, which puts
 * it on top of the sidebar's balance card; it is offset past the sidebar here
 * so it sits at the bottom-left of the content area instead.
 */
export function Toast({
  message,
  open,
  onDismiss,
  duration = 4000,
}: {
  message: string;
  open: boolean;
  onDismiss: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onDismiss]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[30px] left-[calc(var(--sidebar-width)+30px)] z-50 flex min-w-[304px] max-w-[640px] items-center gap-2 overflow-hidden rounded-md border border-[rgba(13,17,23,0.1)] bg-inverse px-2 py-3 shadow-medium"
    >
      <div className="flex min-h-6 flex-1 items-center gap-2.5 px-2">
        <ToastCheckIcon className="size-5 shrink-0" />
        <p className="max-w-[576px] text-p2 text-[color:var(--bg-default)]">{message}</p>
      </div>
    </div>
  );
}
