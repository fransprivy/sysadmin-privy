'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  NavAdminsIcon,
  NavBillingIcon,
  NavContactsIcon,
  NavDocumentCategoryIcon,
  NavDocumentHandoverIcon,
  NavEmailLogoIcon,
  NavEnterpriseSealIcon,
  NavEnterpriseStampIcon,
  NavGroupsIcon,
  NavOverviewIcon,
  NavPaymentHistoryIcon,
  NavReminderIcon,
  NavReportsIcon,
  NavUserAndRoleIcon,
} from '@/components/icons';

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

interface NavItem {
  label: string;
  href: string;
  icon: IconComponent;
  /** Extra routes that should keep this item highlighted (detail pages). */
  match?: string[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    title: 'General',
    items: [
      { label: 'Overview', href: '/', icon: NavOverviewIcon },
      { label: 'User and role', href: '/user-and-role', icon: NavUserAndRoleIcon },
      { label: 'Enterprise seal', href: '/enterprise-seal', icon: NavEnterpriseSealIcon },
      { label: 'Enterprise stamp', href: '/enterprise-stamp', icon: NavEnterpriseStampIcon },
      { label: 'Reminder', href: '/reminder', icon: NavReminderIcon },
      { label: 'Email logo', href: '/email-logo', icon: NavEmailLogoIcon },
      { label: 'Document handover', href: '/document-handover', icon: NavDocumentHandoverIcon },
      { label: 'Document category', href: '/document-category', icon: NavDocumentCategoryIcon },
      // Not in the Figma frame, but the app ships this page — keeping it reachable.
      { label: 'PrivyPal', href: '/privypal', icon: NavDocumentCategoryIcon },
    ],
  },
  {
    title: 'User Management',
    items: [
      { label: 'Admins', href: '/admins', icon: NavAdminsIcon },
      { label: 'Contacts', href: '/contacts', icon: NavContactsIcon },
      { label: 'Groups', href: '/groups', icon: NavGroupsIcon },
    ],
  },
  {
    title: 'Other',
    items: [
      { label: 'Billing', href: '/billing', icon: NavBillingIcon },
      { label: 'Payment history', href: '/payment-history', icon: NavPaymentHistoryIcon },
      { label: 'Reports', href: '/reports', icon: NavReportsIcon, match: ['/reports-detail'] },
    ],
  },
];

/** Items / Title — 12px bold section label (Figma). */
function SectionTitle({ children, first }: { children: React.ReactNode; first?: boolean }) {
  return (
    <div className={`flex w-full items-center gap-2.5 px-3 pb-2 ${first ? 'pt-5' : 'pt-5'}`}>
      <p className="whitespace-nowrap text-caption1 font-bold text-subtle">{children}</p>
    </div>
  );
}

/** Items / Wide — 44px nav row with a 3px accent indicator when active. */
function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`relative flex h-11 w-full items-center gap-3 rounded-md p-3 text-p1 transition-colors ${
        active
          ? 'bg-bg-alpha text-foreground'
          : 'text-subtle hover:bg-bg-alpha hover:text-foreground'
      }`}
    >
      <Icon className="size-5 shrink-0" />
      <span className="flex-1 whitespace-nowrap">{item.label}</span>
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-[30px] w-[3px] -translate-y-1/2 rounded-r bg-accent"
        />
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    pathname === item.href || (item.match?.includes(pathname) ?? false);

  return (
    <aside className="fixed bottom-0 left-0 top-topbar z-40 flex w-sidebar flex-col bg-background">
      {/* Submenu (Figma 1:1179) — 28px padding, 24px between blocks */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-7">
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center gap-2.5 px-3 pb-2">
            <p className="whitespace-nowrap text-caption1 font-bold text-subtle">
              Enterprise account
            </p>
          </div>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-p1 text-foreground transition-colors hover:bg-bg-alpha"
          >
            <span className="truncate">PT. Privy Identitas...</span>
            <ChevronDownIcon className="size-5 shrink-0 text-subtlest" />
          </button>
        </div>

        <nav className="flex w-full flex-col gap-4">
          {SECTIONS.map((section, sectionIndex) => (
            <div key={section.title} className="flex w-full flex-col">
              <SectionTitle first={sectionIndex === 0}>{section.title}</SectionTitle>
              {section.items.map((item) => (
                <NavRow key={item.href} item={item} active={isActive(item)} />
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Balance card (Figma 1:1195) */}
      <div className="flex w-full shrink-0 flex-col items-start bg-background p-7">
        <div className="flex h-[90px] w-full items-center gap-3">
          <div aria-hidden className="flex h-14 shrink-0 flex-col gap-1">
            <span className="w-[3px] flex-1 rounded-full bg-border" />
            <span className="w-[3px] flex-1 rounded-full bg-border" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden rounded-md bg-background shadow-medium">
            <div className="flex w-full flex-col gap-1 px-4 py-2.5">
              <div className="flex w-full items-start gap-2">
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <p className="whitespace-nowrap text-caption1 text-foreground">
                    Enterprise Plan
                  </p>
                  <p className="text-h6 font-bold text-accent">Active</p>
                </div>
                <span className="flex h-11 items-center justify-center">
                  <ChevronRightIcon className="size-4 text-subtlest" />
                </span>
              </div>
            </div>
            <div className="w-full bg-info px-4 py-1">
              <p className="text-caption2 text-link">Until Apr 04, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
