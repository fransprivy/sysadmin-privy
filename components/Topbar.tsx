'use client';

import Link from 'next/link';
import { AppsIcon, HelpIcon } from '@/components/icons';
import { Avatar } from '@/components/ui/avatar';

/**
 * Topbar Admin center (Figma 1:1168).
 * 60px tall: 8px vertical padding around 44px hit targets, 20px horizontal.
 */
export function Topbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-topbar items-center gap-5 bg-layer1 px-5 py-2 shadow-small">
      <Link href="/" className="flex items-center gap-1.5 pr-[120px]">
        <span className="relative block size-8 shrink-0">
          {/* Privy mark, exported from the Figma "Apps / Admin center" component */}
          <img
            src="/assets/icons/logo-privy-fill.svg"
            alt=""
            className="absolute left-[1.97px] top-[3.56px] h-[24.87px] w-[28.052px]"
          />
          <img
            src="/assets/icons/logo-privy-gradient.svg"
            alt=""
            className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
          />
        </span>
        <span className="whitespace-nowrap text-h6 font-medium text-foreground">
          Admin Center
        </span>
      </Link>

      <div className="flex flex-1 items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Help"
          className="flex size-11 items-center justify-center rounded-md text-subtle transition-colors hover:bg-bg-alpha hover:text-foreground"
        >
          <HelpIcon className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Switch app"
          className="flex size-11 items-center justify-center rounded-md text-subtle transition-colors hover:bg-bg-alpha hover:text-foreground"
        >
          <AppsIcon className="size-5" />
        </button>
        <button type="button" aria-label="Account" className="shrink-0 rounded-full">
          <Avatar name="Jane Saliman Rasih" size={40} />
        </button>
      </div>
    </header>
  );
}
