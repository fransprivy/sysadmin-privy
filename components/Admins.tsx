'use client';

import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { SearchIcon } from '@/components/icons';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Toast } from '@/components/ui/toast';
import { TableCell, TableHeaderCell } from '@/components/user-and-role/shared';

interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  addedAt: string;
  isOwner?: boolean;
}

const INVITED_BY = { name: 'Jane Saliman Rasih', id: 'JJ88888' };

const ADMINS: Admin[] = [
  { id: 'AA99999', name: 'Andre Adams', email: 'andre.adams@altostrat.com', phone: '081212345671', addedAt: 'Jun 02, 2023', isOwner: true },
  { id: 'BB99999', name: 'Brian Brown', email: 'brian.brown@cymbalgroup.com', phone: '081212345672', addedAt: 'Jun 02, 2023' },
  { id: 'CC99999', name: 'Claire Clark', email: 'claire.clark@altostrat.com', phone: '081212345673', addedAt: 'Jun 02, 2023' },
  { id: 'DD99999', name: 'Douglas Doe', email: 'douglas.doe@cymbalgroup.com', phone: '081212345674', addedAt: 'Jun 02, 2023' },
  { id: 'EE99999', name: 'Elaine Evans', email: 'elaine.evans@altostrat.com', phone: '081212345675', addedAt: 'Jun 02, 2023' },
  { id: 'LL99999', name: 'Luna Lewis', email: 'luna.lewis@cymbalgroup.com', phone: '081212345676', addedAt: 'Jun 02, 2023' },
  { id: 'GG99999', name: 'Gerald Green', email: 'gerald.green@altostrat.com', phone: '081212345677', addedAt: 'Jun 02, 2023' },
  { id: 'H999999', name: 'Hannah Harris', email: 'hannah.harris@cymbalgroup.com', phone: '081212345678', addedAt: 'Jun 02, 2023' },
  { id: 'II99999', name: 'Isaac Irving', email: 'isaac.irving@altostrat.com', phone: '081212345679', addedAt: 'Jun 02, 2023' },
  { id: 'JJ99999', name: 'Joanne Johnson', email: 'joanne.johnson@cymbalgroup.com', phone: '081212345670', addedAt: 'Jun 02, 2023' },
  { id: 'KK99999', name: 'Katherine King', email: 'katherine.king@altostrat.com', phone: '081212345612', addedAt: 'Jun 02, 2023' },
];

/** The frame shows "Page 1 of 10" against a single page of rows. */
const TOTAL_PAGES_IN_FRAME = 10;

/** Name cell — avatar, name (with an optional Owner label) and the account id. */
function PersonCell({
  name,
  id,
  isOwner,
}: {
  name: string;
  id: string;
  isOwner?: boolean;
}) {
  return (
    <div className="flex h-10 items-center gap-2">
      <Avatar name={name} size={32} />
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="truncate text-p2 text-foreground">{name}</p>
        <div className="flex items-center gap-1">
          {isOwner && (
            <Badge variant="info" className="shrink-0">
              Owner
            </Badge>
          )}
          <p className="truncate text-caption1 text-muted">{id}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminsPage() {
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return ADMINS;
    return ADMINS.filter(
      (admin) =>
        admin.name.toLowerCase().includes(term) || admin.email.toLowerCase().includes(term)
    );
  }, [query]);

  const pageCount = Math.max(
    query ? Math.ceil(filtered.length / rowsPerPage) : TOTAL_PAGES_IN_FRAME,
    1
  );
  const rows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: 'Admins' },
      ]}
      width="bleed"
    >
      <div className="flex flex-wrap items-start gap-[18px] px-5 pb-3 pt-6">
        <p className="flex-1 text-h6 font-medium text-foreground">Admins</p>
        <div className="flex items-start gap-[18px]">
          <div className="flex w-[301px] max-w-full items-center gap-2 rounded-md border border-border-muted bg-background px-2 py-1">
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
          <Button variant="primary" size="sm" onClick={() => setToast('Admin invited')}>
            Add admin
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto px-5">
        <table className="w-full min-w-[1000px] table-fixed border-collapse">
          <thead>
            <tr>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Invited by</TableHeaderCell>
              <TableHeaderCell className="w-[112px]">Added at</TableHeaderCell>
              <TableHeaderCell className="w-[238px]">Email</TableHeaderCell>
              <TableHeaderCell className="w-[173px]">Phone number</TableHeaderCell>
              <TableHeaderCell className="w-[56px]" srOnly="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((admin) => (
              <tr key={admin.id}>
                <TableCell>
                  <PersonCell name={admin.name} id={admin.id} isOwner={admin.isOwner} />
                </TableCell>
                <TableCell>
                  <PersonCell name={INVITED_BY.name} id={INVITED_BY.id} />
                </TableCell>
                <TableCell className="whitespace-nowrap text-p2 text-foreground">
                  {admin.addedAt}
                </TableCell>
                <TableCell className="truncate text-p2 text-foreground">{admin.email}</TableCell>
                <TableCell className="whitespace-nowrap text-p2 text-foreground">
                  {admin.phone}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    type="button"
                    aria-label={`Remove ${admin.name}`}
                    onClick={() => setToast(`${admin.name} removed`)}
                    className="inline-flex size-8 items-center justify-center rounded text-subtle transition-colors hover:bg-bg-alpha hover:text-red40"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </TableCell>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-12 text-center text-p2 text-subtle">
                  No admins match “{query}”.
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
