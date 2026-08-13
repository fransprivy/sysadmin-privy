'use client';

import { useCallback, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Toast } from '@/components/ui/toast';
import { BranchTab } from '@/components/user-and-role/BranchTab';
import { DepartmentTab } from '@/components/user-and-role/DepartmentTab';
import { EmployeeTab } from '@/components/user-and-role/EmployeeTab';
import { PositionTab } from '@/components/user-and-role/PositionTab';

/**
 * The Employee / Position / Department frames label the fourth tab
 * "Organizational structure"; the newer Branch frame (1:12374) renames it
 * "Branch (optional)" and is the only frame that gives it content, so that is
 * the label used here.
 */
const TABS = ['Employee', 'Position', 'Department', 'Branch (optional)'] as const;
type Tab = (typeof TABS)[number];

/** Navigation Tabs — 12px padding, coloured bottom border marks the active tab. */
function Tabs({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return (
    <div role="tablist" className="flex items-center px-6">
      {TABS.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={`flex items-center justify-center gap-3 border-b p-3 text-p2 whitespace-nowrap transition-colors ${
            active === tab
              ? 'border-accent text-foreground'
              : 'border-border text-subtle hover:text-foreground'
          }`}
        >
          {tab}
        </button>
      ))}
      {/* trailing filler keeps the rule running to the edge of the content area */}
      <span aria-hidden className="h-11 flex-1 border-b border-border" />
    </div>
  );
}

export default function UserAndRolePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Employee');
  const [toast, setToast] = useState<string | null>(null);

  const dismissToast = useCallback(() => setToast(null), []);

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: 'User and role' },
      ]}
      width="bleed"
    >
      <Tabs active={activeTab} onChange={setActiveTab} />

      {activeTab === 'Employee' && <EmployeeTab />}
      {activeTab === 'Position' && <PositionTab onCreated={setToast} />}
      {activeTab === 'Department' && <DepartmentTab onCreated={setToast} />}
      {activeTab === 'Branch (optional)' && <BranchTab onCreated={setToast} />}

      <Toast message={toast ?? ''} open={toast !== null} onDismiss={dismissToast} />
    </AdminLayout>
  );
}
