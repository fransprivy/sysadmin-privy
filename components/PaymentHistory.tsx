'use client';

import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { ChevronDownIcon } from '@/components/icons';
import { Pagination } from '@/components/ui/pagination';
import {
  SortableHeaderCell,
  TableCell,
  TableHeaderCell,
  TableToolbar,
} from '@/components/user-and-role/shared';

const PAYMENT_FILTERS = ['All payment', 'ATM/Bank Transfer', 'Gopay', 'QRIS'] as const;

interface Payment {
  id: string;
  purchaseDate: string;
  number: string;
  method: string;
  amount: string;
}

const METHODS = [
  'ATM/Bank Transfer', 'ATM/Bank Transfer', 'ATM/Bank Transfer', 'Gopay', 'QRIS',
  'Gopay', 'ATM/Bank Transfer', 'Gopay', 'Gopay', 'Gopay', 'QRIS',
];

const PAYMENTS: Payment[] = METHODS.map((method, index) => ({
  id: `payment-${index + 1}`,
  purchaseDate: 'Jun 02, 2023',
  number: '32404/PID-FIN/INV/V/23',
  method,
  amount: 'Rp. 290,500',
}));

/** The frame shows "Page 1 of 10" against a single page of rows. */
const TOTAL_PAGES_IN_FRAME = 10;

type SortKey = 'purchaseDate' | 'amount';

export default function PaymentHistoryPage() {
  const [query, setQuery] = useState('');
  const [method, setMethod] = useState<string>('All payment');
  const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({
    key: 'purchaseDate',
    asc: true,
  });
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PAYMENTS.filter(
      (payment) =>
        (method === 'All payment' || payment.method === method) &&
        (!term || payment.number.toLowerCase().includes(term))
    );
  }, [query, method]);

  const pageCount = Math.max(
    query || method !== 'All payment'
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
        { label: 'Payment history' },
      ]}
      width="bleed"
    >
      <TableToolbar
        title="Payment history"
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        filters={
          <label className="relative flex items-center justify-center gap-2 rounded-md border border-[rgba(13,17,23,0.05)] bg-background px-3 py-1">
            <select
              aria-label="Filter by payment method"
              value={method}
              onChange={(event) => {
                setMethod(event.target.value);
                setPage(1);
              }}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {PAYMENT_FILTERS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="whitespace-nowrap text-p1 text-subtle">{method}</span>
            <ChevronDownIcon className="size-5 shrink-0 text-subtle" />
          </label>
        }
      />

      <div className="overflow-x-auto px-5">
        <table className="w-full min-w-[860px] table-fixed border-collapse">
          <thead>
            <tr>
              <SortableHeaderCell
                label="Purchase date"
                className="w-[159px]"
                active={sort.key === 'purchaseDate'}
                onClick={() => toggleSort('purchaseDate')}
              />
              <TableHeaderCell>Invoice number</TableHeaderCell>
              <TableHeaderCell className="w-[154px]">Payment method</TableHeaderCell>
              <SortableHeaderCell
                label="Amount"
                className="w-[135px]"
                active={sort.key === 'amount'}
                onClick={() => toggleSort('amount')}
              />
            </tr>
          </thead>
          <tbody>
            {rows.map((payment) => (
              <tr key={payment.id}>
                <TableCell className="whitespace-nowrap text-p2 text-foreground">
                  {payment.purchaseDate}
                </TableCell>
                <TableCell className="truncate text-p2 text-foreground">{payment.number}</TableCell>
                <TableCell className="whitespace-nowrap text-p2 text-foreground">
                  {payment.method}
                </TableCell>
                <TableCell className="whitespace-nowrap text-p2 text-foreground">
                  {payment.amount}
                </TableCell>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-12 text-center text-p2 text-subtle">
                  No payments match the current filters.
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
    </AdminLayout>
  );
}
