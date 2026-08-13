'use client';

import { useEffect, useRef, useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

export interface RowMenuItem {
  label: string;
  icon: 'edit' | 'delete';
  onSelect?: () => void;
}

const ICONS = { edit: Pencil, delete: Trash2 };

/** Dropdown Menu (Figma) — right-aligned row actions. */
export function RowMenu({ label, items }: { label: string; items: RowMenuItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-8 items-center justify-center rounded transition-colors hover:bg-bg-alpha"
      >
        <MoreVertical className="size-4 text-subtle" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 w-[209px] overflow-hidden rounded-md border border-border bg-background py-1 shadow-medium">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                className={`flex h-11 w-full items-center gap-3 px-4 text-left text-p1 transition-colors hover:bg-bg-alpha ${
                  item.icon === 'delete' ? 'text-red40' : 'text-foreground'
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
