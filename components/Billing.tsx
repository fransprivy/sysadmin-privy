'use client';

import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { ChevronDownIcon } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { RowMenu } from '@/components/ui/row-menu';
import { Toast } from '@/components/ui/toast';
import {
  SortableHeaderCell,
  TableCell,
  TableHeaderCell,
  TableToolbar,
} from '@/components/user-and-role/shared';

type Status = 'Unpaid' | 'Paid' | 'Expired';

const STATUS_FILTERS = ['All status', 'Unpaid', 'Paid', 'Expired'] as const;

const STATUS_VARIANT: Record<Status, 'warning' | 'success' | 'subtle'> = {
  Unpaid: 'warning',
  Paid: 'success',
  Expired: 'subtle',
};

interface Invoice {
  id: string;
  billingDate: string;
  number: string;
  dueDate: string;
  status: Status;
}

const STATUSES: Status[] = [
  'Unpaid', 'Unpaid', 'Unpaid', 'Unpaid', 'Paid', 'Expired',
  'Expired', 'Unpaid', 'Unpaid', 'Unpaid', 'Unpaid', 'Unpaid',
];

const INVOICES: Invoice[] = STATUSES.map((status, index) => ({
  id: `invoice-${index + 1}`,
  billingDate: 'Jun 02, 2023',
  number: '32404/PID-FIN/INV/V/23',
  dueDate: 'Jun 02, 2023',
  status,
}));

/** The frame shows "Page 1 of 10" against a single page of rows. */
const TOTAL_PAGES_IN_FRAME = 10;

type SortKey = 'billingDate' | 'dueDate';

export default function BillingPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('All status');
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({ key: 'billingDate', asc: true });
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return INVOICES.filter(
      (invoice) =>
        (status === 'All status' || invoice.status === status) &&
        (!term || invoice.number.toLowerCase().includes(term))
    );
  }, [query, status]);

  const pageCount = Math.max(
    query || status !== 'All status'
      ? Math.ceil(filtered.length / rowsPerPage)
      : TOTAL_PAGES_IN_FRAME,
    1
  );
  const rows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const toggleSort = (key: SortKey) =>
    setSort((current) => ({ key, asc: current.key === key ? !current.asc : true }));

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: 'Billing' },
      ]}
      width="bleed"
    >
      <TableToolbar
        title="Billing"
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        searchWidth="w-[351px]"
        filters={
          <label className="relative flex items-center justify-center gap-2 rounded-md border border-[rgba(13,17,23,0.05)] bg-background px-3 py-1">
            <select
              aria-label="Filter by status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {STATUS_FILTERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="whitespace-nowrap text-p1 text-subtle">{status}</span>
            <ChevronDownIcon className="size-5 shrink-0 text-subtle" />
          </label>
        }
      />

      <div className="overflow-x-auto px-5">
        <table className="w-full min-w-[860px] table-fixed border-collapse">
          <thead>
            <tr>
              <SortableHeaderCell
                label="Billing date"
                className="w-[159px]"
                active={sort.key === 'billingDate'}
                onClick={() => toggleSort('billingDate')}
              />
              <TableHeaderCell>Invoice number</TableHeaderCell>
              <SortableHeaderCell
                label="Billing due date"
                className="w-[159px]"
                active={sort.key === 'dueDate'}
                onClick={() => toggleSort('dueDate')}
              />
              <TableHeaderCell className="w-[95px] text-center">Status</TableHeaderCell>
              <TableHeaderCell className="w-[56px]" srOnly="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((invoice) => (
              <tr key={invoice.id}>
                <TableCell className="whitespace-nowrap text-p2 text-foreground">
                  {invoice.billingDate}
                </TableCell>
                <TableCell className="truncate text-p2 text-foreground">{invoice.number}</TableCell>
                <TableCell className="whitespace-nowrap text-p2 text-foreground">
                  {invoice.dueDate}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={STATUS_VARIANT[invoice.status]} className="text-p2">
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <RowMenu
                    label={`Actions for invoice ${invoice.number}`}
                    items={[
                      { label: 'Download invoice', icon: 'edit' },
                      { label: 'Delete invoice', icon: 'delete' },
                    ]}
                  />
                </TableCell>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-12 text-center text-p2 text-subtle">
                  No invoices match the current filters.
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

      <Toast message={toast ?? ''} open={toast !== null} onDismiss={() => setToast(null)} />
    </AdminLayout>
  );
}
