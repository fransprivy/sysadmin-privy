'use client';

import React, { useState } from 'react';
import { Settings, Bell, Search, MoreVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';

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

function Topbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-5 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <span className="text-lg font-semibold text-foreground">Admin Center</span>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            U
          </div>
        </Button>
      </div>
    </div>
  );
}

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
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="document-category" />

      <main className="ml-72 mt-16 flex-1 overflow-auto">
        {/* Breadcrumbs */}
        <div className="sticky top-0 border-b border-border bg-background/95 px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              PrivySign
            </a>
            <span className="text-muted-foreground">/</span>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Admin Center
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-foreground">Document category</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Document category</h1>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Add category
            </Button>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Category name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Description</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-foreground">Favorite</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {displayedCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-3 w-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          />
                          <p className="text-sm font-medium text-foreground">{category.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{category.description}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleFavorite(category.id)}
                          className="inline-flex items-center justify-center"
                        >
                          <Star
                            className={`h-5 w-5 transition-colors ${
                              favorites.includes(category.id)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground hover:text-yellow-400'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="inline-flex items-center justify-center h-8 w-8 rounded hover:bg-muted transition-colors group">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          {/* Hover menu */}
                          <div className="absolute hidden group-hover:block bg-background border border-border rounded-md shadow-lg min-w-48 z-50">
                            <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2">
                              ✎ Edit category
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                              🗑 Delete category
                            </button>
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Show rows</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 rounded-md border border-border bg-background text-sm"
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
      </main>
    </div>
  );
}
