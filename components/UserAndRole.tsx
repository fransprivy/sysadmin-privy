'use client';

import React, { useMemo, useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDownSmIcon, InfoIcon, SearchIcon } from '@/components/icons';

const SEAT_LIMIT = 100;

const TABS = ['Employee', 'Position', 'Department', 'Organizational structure'] as const;
type Tab = (typeof TABS)[number];

const SEARCH_FIELDS = ['Name', 'Position', 'Email'] as const;
type SearchField = (typeof SEARCH_FIELDS)[number];

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  addedAt: string;
  activeUntil: string;
  isOwner?: boolean;
}

const EMPLOYEES: Employee[] = [
  { id: 'AA99999', name: 'Andre Adams', position: 'UI/UX designer', email: 'andre.adams@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'BB99999', name: 'Brian Brown', position: 'iOS Developer', email: 'brian.brown@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026', isOwner: true },
  { id: 'CC99999', name: 'Claire Clark', position: 'Backend engineer', email: 'claire.clark@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'DD99999', name: 'Douglas Doe', position: 'Backend engineer', email: 'douglas.doe@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'EE99999', name: 'Elaine Evans', position: 'Backend engineer', email: 'elaine.evans@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'FF99999', name: 'Frank Foster', position: 'Frontend engineer', email: 'luna.lewis@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'GG99999', name: 'Gerald Green', position: 'SQA Engineer', email: 'gerald.green@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'H999999', name: 'Hannah Harris', position: 'SQA Engineer', email: 'hannah.harris@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'II99999', name: 'Isaac Irving', position: 'Product owner', email: 'isaac.irving@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'JJ99999', name: 'Joanne Johnson', position: 'VP Marketing', email: 'joanne.johnson@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'KK99999', name: 'Katherine King', position: 'VP Enterprise solution', email: 'katherine.king@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 01, 2026' },
];

const COLUMNS = [
  { key: 'name', label: 'Name', className: 'w-[32%]' },
  { key: 'position', label: 'Position', className: 'w-[16%]' },
  { key: 'email', label: 'Email', className: 'w-[22%]' },
  { key: 'addedAt', label: 'Added at', className: 'w-[12%]' },
  { key: 'activeUntil', label: 'Active until', className: 'w-[12%]' },
  { key: 'actions', label: '', className: 'w-[56px]' },
] as const;

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

/** Table Element — 12px/16px inset with a subtlest bottom rule. */
function Cell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td
      className={`border-b border-border-muted px-3 py-4 align-middle ${className ?? ''}`}
    >
      {children}
    </td>
  );
}

export default function UserAndRolePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Employee');
  const [searchField, setSearchField] = useState<SearchField>('Name');
  const [query, setQuery] = useState('');

  const employees = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return EMPLOYEES;
    const field = searchField.toLowerCase() as 'name' | 'position' | 'email';
    return EMPLOYEES.filter((employee) => employee[field].toLowerCase().includes(term));
  }, [query, searchField]);

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

      {activeTab !== 'Employee' ? (
        <div className="px-5 py-16 text-center text-p2 text-subtle">
          {activeTab} is not part of this design yet.
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="flex flex-wrap items-center justify-end gap-10 px-[26px] pb-3 pt-6">
            <p className="whitespace-nowrap text-p1 text-foreground">
              {EMPLOYEES.length}/{SEAT_LIMIT}
            </p>
            <div className="flex flex-1 items-center gap-[18px]">
              {/* Button Container — the field selector and the search input share one
                  border; auto-width, with the action buttons pushed to the right */}
              <div className="flex w-[248px] max-w-full items-stretch rounded-md border border-[#e7e7e8] bg-background">
                <label className="relative flex w-[92px] shrink-0 items-center gap-2 rounded-[7px] px-2 py-1">
                  <select
                    aria-label="Search field"
                    value={searchField}
                    onChange={(event) => setSearchField(event.target.value as SearchField)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  >
                    {SEARCH_FIELDS.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                  <span className="min-w-0 flex-1 truncate text-p1 text-subtle">{searchField}</span>
                  <ChevronDownSmIcon className="size-4 shrink-0 text-subtle" />
                </label>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[7px] px-2 py-1">
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="min-w-0 flex-1 bg-transparent text-p1 text-foreground outline-none placeholder:text-subtlest"
                  />
                  <SearchIcon className="size-4 shrink-0 text-subtlest" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto shrink-0">
                Download
              </Button>
              <Button variant="primary" size="sm" className="shrink-0">
                Add employee
              </Button>
            </div>
          </div>

          {/* Banner Alert */}
          <div className="px-5 pb-5 pt-2">
            <div className="flex w-full items-start gap-3 rounded-md bg-ground p-4">
              <InfoIcon className="size-5 shrink-0" />
              <p className="flex-1 text-p2 text-subtle">
                Employees will not be able to access the enterprise after their active period ends
              </p>
            </div>
          </div>

          {/* User and Role List */}
          <div className="overflow-x-auto px-5 pb-8">
            <table className="w-full min-w-[900px] table-fixed border-collapse">
              <thead>
                <tr className="bg-bg-alpha">
                  {COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`px-3 py-2 text-left text-p2 font-medium text-subtle ${column.className}`}
                    >
                      {column.label || <span className="sr-only">Actions</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <Cell>
                      <div className="flex h-10 items-center gap-2">
                        <Avatar name={employee.name} size={32} />
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="truncate text-p2 text-foreground">{employee.name}</p>
                          <div className="flex items-center gap-1">
                            {employee.isOwner && (
                              <Badge variant="info" className="shrink-0">
                                Owner
                              </Badge>
                            )}
                            <p className="truncate text-caption1 text-muted">{employee.id}</p>
                          </div>
                        </div>
                      </div>
                    </Cell>
                    <Cell className="text-p2 text-foreground">{employee.position}</Cell>
                    <Cell className="truncate text-p2 text-foreground">{employee.email}</Cell>
                    <Cell className="whitespace-nowrap text-p2 text-foreground">{employee.addedAt}</Cell>
                    <Cell className="whitespace-nowrap text-p2 text-foreground">
                      {employee.activeUntil}
                    </Cell>
                    <Cell className="text-center">
                      <button
                        type="button"
                        aria-label={`Actions for ${employee.name}`}
                        className="inline-flex size-8 items-center justify-center rounded transition-colors hover:bg-bg-alpha"
                      >
                        <MoreVertical className="size-4 text-subtle" />
                      </button>
                    </Cell>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan={COLUMNS.length} className="px-3 py-12 text-center text-p2 text-subtle">
                      No employees match “{query}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
