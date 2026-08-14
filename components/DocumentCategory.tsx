'use client';

import { useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { SearchIcon, StarEmptyIcon, StarFilledIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { RowMenu } from '@/components/ui/row-menu';
import { Toast } from '@/components/ui/toast';
import { TableCell, TableHeaderCell } from '@/components/user-and-role/shared';

interface Category {
  id: string;
  name: string;
  /** Figma ships a distinct dot colour per category; grey is the fallback. */
  color: string;
  description: string;
  favorite: boolean;
}

const CATEGORIES: Category[] = [
  { id: 'penjualan', name: 'Penjualan', color: '#0065D1', description: 'Kategori untuk penjualan', favorite: true },
  { id: 'approval', name: 'Approval', color: '#8640DD', description: 'Untuk status approval', favorite: true },
  { id: 'sertifikat', name: 'Sertifikat', color: '#23B242', description: 'Masalah sertifikat pakai kategori ini', favorite: true },
  { id: 'surat-kerja', name: 'Surat Kerja', color: '#F5A623', description: 'SK Karyawan semua', favorite: false },
  { id: 'skb', name: 'Surat Keputusan Bisnis', color: '#12B89C', description: 'SKB Karyawan', favorite: false },
  { id: 'surat-cuti', name: 'Surat Cuti', color: '#E42E2C', description: 'Untuk karyawan yang ingin cuti', favorite: false },
  { id: 'surat-kuasa', name: 'Surat Kuasa', color: '#6E7074', description: '-', favorite: false },
  { id: 'memo', name: 'Memo Internal', color: '#6E7074', description: '-', favorite: false },
  { id: 'uncat-1', name: 'Uncategorized', color: '#6E7074', description: '-', favorite: false },
  { id: 'uncat-2', name: 'Uncategorized', color: '#6E7074', description: '-', favorite: false },
  { id: 'uncat-3', name: 'Uncategorized', color: '#6E7074', description: '-', favorite: false },
  { id: 'uncat-4', name: 'Uncategorized', color: '#6E7074', description: '-', favorite: false },
];

/** The frame shows "Page 1 of 10" against 12 rows — the list is longer than the mock. */
const TOTAL_PAGES_IN_FRAME = 10;

export default function DocumentCategoryPage() {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    CATEGORIES.filter((category) => category.favorite).map((category) => category.id)
  );
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return CATEGORIES;
    return CATEGORIES.filter((category) => category.name.toLowerCase().includes(term));
  }, [query]);

  const pageCount = Math.max(
    query ? Math.ceil(filtered.length / rowsPerPage) : TOTAL_PAGES_IN_FRAME,
    1
  );
  const rows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const toggleFavorite = (id: string) =>
    setFavorites((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: 'Document category' },
      ]}
      width="bleed"
    >
      {/* Header row */}
      <div className="flex flex-wrap items-start gap-[18px] px-5 pb-3 pt-6">
        <p className="flex-1 text-h6 font-medium text-foreground">Document category</p>
        <div className="flex items-start gap-[18px]">
          <div className="flex w-[301px] max-w-full items-center gap-2 rounded-md border border-border-muted bg-background px-2 py-1">
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name"
              className="min-w-0 flex-1 bg-transparent text-p1 text-foreground outline-none placeholder:text-subtlest"
            />
            <SearchIcon className="size-4 shrink-0 text-subtlest" />
          </div>
          <Button variant="primary" size="sm" onClick={() => setToast('Category created')}>
            Add category
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-5">
        <table className="w-full min-w-[860px] table-fixed border-collapse">
          <thead>
            <tr>
              <TableHeaderCell>Category name</TableHeaderCell>
              <TableHeaderCell className="w-[341px]">Description</TableHeaderCell>
              <TableHeaderCell className="w-[112px] text-center">Favorite</TableHeaderCell>
              <TableHeaderCell className="w-[56px]" srOnly="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((category) => {
              const isFavorite = favorites.includes(category.id);
              return (
                <tr key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <p className="text-p2 text-foreground">{category.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-p2 text-foreground">{category.description}</TableCell>
                  <TableCell className="text-center">
                    <button
                      type="button"
                      aria-pressed={isFavorite}
                      aria-label={`${isFavorite ? 'Unfavorite' : 'Favorite'} ${category.name}`}
                      onClick={() => toggleFavorite(category.id)}
                      className="inline-flex items-center justify-center rounded transition-transform hover:scale-105"
                    >
                      {isFavorite ? (
                        <StarFilledIcon className="size-8" />
                      ) : (
                        <StarEmptyIcon className="size-8" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-center">
                    <RowMenu
                      label={`Actions for ${category.name}`}
                      items={[
                        { label: 'Edit category', icon: 'edit' },
                        { label: 'Delete category', icon: 'delete' },
                      ]}
                    />
                  </TableCell>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-12 text-center text-p2 text-subtle">
                  No categories match “{query}”.
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
        onRowsPerPageChange={(rows) => {
          setRowsPerPage(rows);
          setPage(1);
        }}
      />

      <Toast message={toast ?? ''} open={toast !== null} onDismiss={() => setToast(null)} />
    </AdminLayout>
  );
}
