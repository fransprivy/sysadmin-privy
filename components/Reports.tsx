'use client';

import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import {
  ChevronDownIcon,
  ChevronDownSmIcon,
  SearchIcon,
  TabBalanceIcon,
  TabUserLogIcon,
} from '@/components/icons';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { TableCell, TableHeaderCell } from '@/components/user-and-role/shared';

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

const TABS: { label: string; icon: IconComponent }[] = [
  { label: 'Balance usage', icon: TabBalanceIcon },
  { label: 'User log', icon: TabUserLogIcon },
  { label: 'Enterprise plan log', icon: TabUserLogIcon },
];
type Tab = (typeof TABS)[number]['label'];

const SEARCH_FIELDS = ['Name', 'PrivyID'] as const;
const TYPE_FILTERS = ['Type', 'Employee account', 'e-Meterai', 'Digital signature'] as const;
const DATE_FILTERS = ['Date', 'Last 7 days', 'Last 30 days'] as const;

const USER = { name: 'Jane Saliman Rasih', id: 'HN32322' };

interface Entry {
  id: string;
  date: string;
  type: string;
  balance: number;
}

const TYPES = [
  'Employee account', 'e-Meterai', 'Digital signature', 'Digital signature',
  'Digital signature', 'Digital signature', 'Digital signature', 'Digital signature',
  'e-Meterai', 'e-Meterai', 'e-Meterai balance',
];

const ENTRIES: Entry[] = TYPES.map((type, index) => ({
  id: `entry-${index + 1}`,
  date: 'Jun 02, 2023',
  type,
  balance: index < 8 ? 1 : -1,
}));

/** The frame shows "Page 1 of 10" against a single page of rows. */
const TOTAL_PAGES_IN_FRAME = 10;

/** Navigation Tabs — icon + label, accent underline on the active tab. */
function ReportTabs({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return (
    <div className="w-full px-6">
      <div role="tablist" className="flex w-full items-center border-b border-border">
        <div className="flex items-center justify-center gap-2">
          {TABS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              role="tab"
              aria-selected={active === label}
              onClick={() => onChange(label)}
              className={`flex h-11 w-[199px] items-center justify-center gap-3 border-b p-3 text-p1 transition-colors ${
                active === label
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-subtle hover:text-foreground'
              }`}
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** item / dropdown — the filled filter chips next to the search box. */
function FilterChip({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative flex items-center justify-center gap-2 rounded-md border border-[rgba(13,17,23,0.05)] bg-bg-alpha px-3 py-1">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="whitespace-nowrap text-p1 text-subtle">{value}</span>
      <ChevronDownIcon className="size-5 shrink-0 text-subtle" />
    </label>
  );
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Balance usage');
  const [field, setField] = useState<string>('Name');
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string>('Type');
  const [date, setDate] = useState<string>('Date');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return ENTRIES.filter(
      (entry) =>
        (type === 'Type' || entry.type === type) &&
        (!term || USER.name.toLowerCase().includes(term) || USER.id.toLowerCase().includes(term))
    );
  }, [query, type]);

  const pageCount = Math.max(
    query || type !== 'Type' ? Math.ceil(filtered.length / rowsPerPage) : TOTAL_PAGES_IN_FRAME,
    1
  );
  const rows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: 'Report' },
      ]}
      width="bleed"
    >
      <ReportTabs active={activeTab} onChange={setActiveTab} />

      {activeTab !== 'Balance usage' ? (
        <div className="px-6 py-16 text-center text-p2 text-subtle">
          {activeTab} is not part of this design yet.
        </div>
      ) : (
        <>
          {/* Filters Container */}
          <div className="flex flex-wrap items-start gap-[30px] py-5 pl-6 pr-7">
            <div className="flex flex-1 flex-wrap items-center gap-[18px]">
              <div className="flex w-[301px] max-w-full items-stretch rounded-md border border-border-muted bg-background">
                <label className="relative flex shrink-0 items-center gap-2 rounded-[7px] px-2 py-1">
                  <select
                    aria-label="Search field"
                    value={field}
                    onChange={(event) => setField(event.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  >
                    {SEARCH_FIELDS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="whitespace-nowrap text-p1 text-subtle">{field}</span>
                  <ChevronDownSmIcon className="size-4 shrink-0 text-subtle" />
                </label>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[7px] px-2 py-1">
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search"
                    className="min-w-0 flex-1 bg-transparent text-p1 text-foreground outline-none placeholder:text-subtlest"
                  />
                  <SearchIcon className="size-4 shrink-0 text-subtlest" />
                </div>
              </div>
              <FilterChip
                label="Filter by type"
                value={type}
                options={TYPE_FILTERS}
                onChange={(value) => {
                  setType(value);
                  setPage(1);
                }}
              />
              <FilterChip label="Filter by date" value={date} options={DATE_FILTERS} onChange={setDate} />
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              Download
            </Button>
          </div>

          <div className="overflow-x-auto px-5">
            <table className="w-full min-w-[860px] table-fixed border-collapse">
              <thead>
                <tr>
                  <TableHeaderCell className="w-[159px]">Date</TableHeaderCell>
                  <TableHeaderCell>PrivyID</TableHeaderCell>
                  <TableHeaderCell className="w-[178px]">Type</TableHeaderCell>
                  <TableHeaderCell className="w-[125px] text-right">Balance</TableHeaderCell>
                </tr>
              </thead>
              <tbody>
                {rows.map((entry) => (
                  <tr key={entry.id}>
                    <TableCell className="whitespace-nowrap text-p2 text-foreground">
                      {entry.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex h-10 items-center gap-2">
                        <Avatar name={USER.name} size={32} />
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="truncate text-p2 text-foreground">{USER.name}</p>
                          <p className="truncate text-caption1 text-muted">{USER.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-p2 text-foreground">
                      {entry.type}
                    </TableCell>
                    <TableCell
                      className={`whitespace-nowrap text-right text-p2 ${
                        entry.balance > 0 ? 'text-success-fg' : 'text-danger-fg'
                      }`}
                    >
                      {entry.balance > 0 ? '+' : '-'} {Math.abs(entry.balance)}
                    </TableCell>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-12 text-center text-p2 text-subtle">
                      No entries match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            pageCount={pageCount}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(value) => {
              setRowsPerPage(value);
              setPage(1);
            }}
          />
        </>
      )}
    </AdminLayout>
  );
}
