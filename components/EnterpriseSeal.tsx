'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
        <span className="text-h6 font-bold text-red40">privy</span>
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
          <span className="text-white font-bold text-p1">P</span>
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
import { AdminLayout } from '@/components/AdminLayout';

export default function EnterpriseSealPage() {
  const [selectedSeal, setSelectedSeal] = useState<string | null>(null);

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Enterprise seal' }]}>
      {/* Page Content */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-h6 font-bold text-foreground">Enterprise seal</h1>
            <Badge className="bg-cyan-100 text-cyan-700 border-0">Premium</Badge>
          </div>
          <p className="text-p2 text-subtle max-w-2xl">
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
                <Card className="h-48 flex flex-col items-center justify-center p-6 hover:bg-bg-alpha transition-colors border-2 border-dashed">
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-8 w-8 text-accent" />
                    <p className="font-medium text-center text-foreground">Add seal</p>
                    <p className="text-caption1 text-subtle text-center">
                      Click here to upload
                      <br />
                      JPG or PNG up to 5MB
                    </p>
                  </div>
                </Card>
              ) : (
                <Card
                  className={`h-48 flex items-center justify-center p-6 transition-all ${
                    selectedSeal === seal.id ? 'bg-info' : ''
                  } ${!seal.isActive ? 'opacity-50' : ''}`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {seal.preview}
                  </div>
                </Card>
              )}
              {!seal.isUploadSlot && (
                <p className="text-caption1 text-subtle text-center mt-2 font-medium">{seal.name}</p>
              )}
            </div>
          ))}
        </div>

        {/* Selected Seal Info */}
        {selectedSeal && selectedSeal !== 'upload' && (
          <Card className="p-6 bg-info border-accent">
            <div className="space-y-4">
              <p className="text-p2 text-foreground">
                <span className="font-medium">Selected seal:</span> {SEALS.find((s) => s.id === selectedSeal)?.name}
              </p>
              <div className="flex gap-3">
                <Button className="bg-accent hover:bg-accent/90 text-white">Use this seal</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
