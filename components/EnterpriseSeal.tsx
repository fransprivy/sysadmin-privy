'use client';

import React, { useState } from 'react';
import { Settings, Bell, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sidebar } from '@/components/Sidebar';

interface Seal {
  id: string;
  name: string;
  preview: React.ReactNode;
  isActive?: boolean;
  isUploadSlot?: boolean;
}

const SEALS: Seal[] = [
  {
    id: 'upload',
    name: 'Add seal',
    isUploadSlot: true,
    preview: null,
  },
  {
    id: 'privy-text-1',
    name: 'Privy Text',
    preview: (
      <div className="flex items-center justify-center h-full">
        <span className="text-2xl font-bold text-red-600">privy</span>
      </div>
    ),
    isActive: true,
  },
  {
    id: 'privy-logo',
    name: 'Privy Logo',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>
      </div>
    ),
    isActive: true,
  },
  {
    id: 'red-seal',
    name: 'Red Seal',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="45" ry="35" fill="#EF4444" />
            <ellipse cx="50" cy="50" rx="40" ry="30" fill="#DC2626" />
            <circle cx="50" cy="50" r="8" fill="#991B1B" />
          </svg>
        </div>
      </div>
    ),
    isActive: true,
  },
  {
    id: 'gray-seal',
    name: 'Gray Seal',
    preview: (
      <div className="flex items-center justify-center h-full opacity-50">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="45" ry="35" fill="#6B7280" />
            <ellipse cx="50" cy="50" rx="40" ry="30" fill="#4B5563" />
            <circle cx="50" cy="50" r="8" fill="#1F2937" />
          </svg>
        </div>
      </div>
    ),
    isActive: false,
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

export default function EnterpriseSealPage() {
  const [selectedSeal, setSelectedSeal] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="enterprise-seal" />

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
            <span className="font-semibold text-foreground">Enterprise seal</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">Enterprise seal</h1>
              <Badge className="bg-cyan-100 text-cyan-700 border-0">Premium</Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Certify the integrity and origin of your enterprise documents by applying electronic seal.
              <br />
              The recommended image format is PNG with transparent background.
            </p>
          </div>

          {/* Seals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEALS.map((seal) => (
              <div
                key={seal.id}
                className={`cursor-pointer transition-all ${
                  selectedSeal === seal.id ? 'ring-2 ring-blue-600' : ''
                }`}
                onClick={() => !seal.isUploadSlot && setSelectedSeal(seal.id)}
              >
                {seal.isUploadSlot ? (
                  <Card className="h-48 flex flex-col items-center justify-center p-6 hover:bg-muted transition-colors border-2 border-dashed">
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="h-8 w-8 text-blue-600" />
                      <p className="font-medium text-center text-foreground">Add seal</p>
                      <p className="text-xs text-muted-foreground text-center">
                        Click here to upload
                        <br />
                        JPG or PNG up to 5MB
                      </p>
                    </div>
                  </Card>
                ) : (
                  <Card
                    className={`h-48 flex items-center justify-center p-6 transition-all ${
                      selectedSeal === seal.id ? 'bg-blue-50' : ''
                    } ${!seal.isActive ? 'opacity-50' : ''}`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {seal.preview}
                    </div>
                  </Card>
                )}
                {!seal.isUploadSlot && (
                  <p className="text-xs text-muted-foreground text-center mt-2 font-medium">{seal.name}</p>
                )}
              </div>
            ))}
          </div>

          {/* Selected Seal Info */}
          {selectedSeal && selectedSeal !== 'upload' && (
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="space-y-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Selected seal:</span> {SEALS.find((s) => s.id === selectedSeal)?.name}
                </p>
                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Use this seal</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
