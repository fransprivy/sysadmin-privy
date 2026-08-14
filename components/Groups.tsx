'use client';

import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { GroupAvatarIcon, RecipientsIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { RowMenu } from '@/components/ui/row-menu';
import { Toast } from '@/components/ui/toast';
import { TableCell, TableHeaderCell, TableToolbar } from '@/components/user-and-role/shared';

const SEARCH_FIELDS = ['Group name', 'Short name'] as const;

interface Group {
  id: string;
  name: string;
  shortName: string;
  recipients: number;
}

/** The frame repeats one row twelve times; ids keep them addressable. */
const GROUPS: Group[] = Array.from({ length: 12 }, (_, index) => ({
  id: `group-${index + 1}`,
  name: 'Human Resource',
  shortName: 'HR',
  recipients: 12,
}));

/** The frame shows "Page 1 of 10" against a single page of rows. */
const TOTAL_PAGES_IN_FRAME = 10;

export default function GroupsPage() {
  const [field, setField] = useState<string>('Group name');
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return GROUPS;
    const key = field === 'Short name' ? 'shortName' : 'name';
    return GROUPS.filter((group) => group[key].toLowerCase().includes(term));
  }, [field, query]);

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
        { label: 'Groups' },
      ]}
      width="bleed"
    >
      <TableToolbar
        title="Groups"
        fields={SEARCH_FIELDS}
        field={field}
        onFieldChange={setField}
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        searchWidth="w-[387px]"
        actions={
          <Button variant="primary" size="sm" onClick={() => setToast('Group created')}>
            Create group
          </Button>
        }
      />

      <div className="overflow-x-auto px-5">
        <table className="w-full min-w-[860px] table-fixed border-collapse">
          <thead>
            <tr>
              <TableHeaderCell>Group name</TableHeaderCell>
              <TableHeaderCell className="w-[164px]">Short name</TableHeaderCell>
              <TableHeaderCell className="w-[140px]">Recipient</TableHeaderCell>
              <TableHeaderCell className="w-[56px]" srOnly="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((group) => (
              <tr key={group.id}>
                <TableCell>
                  <div className="flex h-10 items-center gap-2">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-border-muted text-subtle">
                      <GroupAvatarIcon className="size-5" />
                    </span>
                    <p className="truncate text-p2 text-foreground">{group.name}</p>
                  </div>
                </TableCell>
                <TableCell className="text-p2 text-foreground">{group.shortName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <RecipientsIcon className="size-4 shrink-0 text-subtle" />
                    <p className="text-p2 text-foreground">{group.recipients}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <RowMenu
                    label={`Actions for ${group.name}`}
                    items={[
                      { label: 'Edit group', icon: 'edit' },
                      { label: 'Delete group', icon: 'delete' },
                    ]}
                  />
                </TableCell>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-12 text-center text-p2 text-subtle">
                  No groups match “{query}”.
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
