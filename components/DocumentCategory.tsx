'use client';

import React, { useState } from 'react';
import { Search, MoreVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DocumentCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  favorite?: boolean;
}

const CATEGORIES: DocumentCategory[] = [
  {
    id: '1',
    name: 'Penjualan',
    color: '#3B82F6',
    description: 'Kategori untuk penjualan',
    favorite: true,
  },
  {
    id: '2',
    name: 'Approval',
    color: '#8B5CF6',
    description: 'Untuk status approval',
    favorite: true,
  },
  {
    id: '3',
    name: 'Sertifikat',
    color: '#10B981',
    description: 'Masalah sertifikat pakai kategori ini',
    favorite: true,
  },
  {
    id: '4',
    name: 'Surat Kerja',
    color: '#F59E0B',
    description: 'SK Karyawan semua',
    favorite: false,
  },
  {
    id: '5',
    name: 'Surat Keputusan Bisnis',
    color: '#14B8A6',
    description: 'SKB Karyawan',
    favorite: false,
  },
  {
    id: '6',
    name: 'Surat Cuti',
    color: '#EF4444',
    description: 'Untuk karyawan yang ingin cuti',
    favorite: false,
  },
  {
    id: '7',
    name: 'Surat Kuasa',
    color: '#9CA3AF',
    description: '-',
    favorite: false,
  },
  {
    id: '8',
    name: 'Memo Internal',
    color: '#9CA3AF',
    description: '-',
    favorite: false,
  },
  {
    id: '9',
    name: 'Uncategorized',
    color: '#9CA3AF',
    description: '-',
    favorite: false,
  },
  {
    id: '10',
    name: 'Uncategorized',
    color: '#9CA3AF',
    description: '-',
    favorite: false,
  },
];
import { AdminLayout } from '@/components/AdminLayout';

export default function DocumentCategoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>(
    CATEGORIES.filter((c) => c.favorite).map((c) => c.id)
  );
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedCategories = filteredCategories.slice(startIdx, startIdx + itemsPerPage);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Document category' }]} width="wide">
      {/* Page Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-h6 font-bold text-foreground">Document category</h1>
          <Button className="bg-red40 hover:bg-logo text-white">
            Add category
          </Button>
        </div>

        {/* Search and Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 rounded-md border border-border bg-background text-p2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-alpha border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-caption1 font-medium text-foreground">Category name</th>
                  <th className="px-6 py-3 text-left text-caption1 font-medium text-foreground">Description</th>
                  <th className="px-6 py-3 text-center text-caption1 font-medium text-foreground">Favorite</th>
                  <th className="px-6 py-3 text-center text-caption1 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayedCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-bg-alpha/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        />
                        <p className="text-p2 font-medium text-foreground">{category.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-p2 text-foreground">{category.description}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleFavorite(category.id)}
                        className="inline-flex items-center justify-center"
                      >
                        <Star
                          className={`h-5 w-5 transition-colors ${
                            favorites.includes(category.id)
                              ? 'fill-orange40 text-orange40'
                              : 'text-subtle hover:text-orange40'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="group relative inline-block">
                        <button
                          type="button"
                          aria-label="Category actions"
                          className="inline-flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-bg-alpha"
                        >
                          <MoreVertical className="h-4 w-4 text-subtle" />
                        </button>
                        {/* Hover menu — sibling of the trigger, never nested inside it */}
                        <div className="absolute right-0 z-50 hidden min-w-48 rounded-md border border-border bg-background shadow-medium group-hover:block">
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-p2 text-foreground hover:bg-bg-alpha">
                            ✎ Edit category
                          </button>
                          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-p2 text-red40 hover:bg-red40/10">
                            🗑 Delete category
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between text-p2">
          <p className="text-subtle">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-subtle">Show rows</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 rounded-md border border-border bg-background text-p2"
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ‹
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                ›
              </Button>
              <Button variant="outline" size="sm" disabled>
                Last
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
