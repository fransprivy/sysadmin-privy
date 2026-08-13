'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Stamp {
  id: string;
  name: string;
  preview: React.ReactNode;
  isActive?: boolean;
  isUploadSlot?: boolean;
}

const STAMPS: Stamp[] = [
  {
    id: 'upload',
    name: 'Add stamp',
    isUploadSlot: true,
    preview: null,
  },
  {
    id: 'original',
    name: 'Original',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-24 h-16 flex items-center justify-center" style={{ transform: 'rotate(-15deg)' }}>
          <div className="border-2 border-red40 px-3 py-2 text-caption1 font-bold text-red40 text-center">
            ORIGINAL
          </div>
        </div>
      </div>
    ),
    isActive: true,
  },
  {
    id: 'important',
    name: 'Important',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-24 h-16 flex items-center justify-center" style={{ transform: 'rotate(-15deg)' }}>
          <div className="border-2 border-red40 px-3 py-2 text-caption1 font-bold text-red40 text-center">
            IMPORTANT
          </div>
        </div>
      </div>
    ),
    isActive: true,
  },
  {
    id: 'red-seal-2',
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
    id: 'confidential',
    name: 'Confidential',
    preview: (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-32 h-16 flex items-center justify-center" style={{ transform: 'rotate(-15deg)' }}>
          <div className="border-2 border-red40 px-2 py-2 text-caption1 font-bold text-red40 text-center whitespace-nowrap">
            CONFIDENTIAL
          </div>
        </div>
      </div>
    ),
    isActive: true,
  },
];
import { AdminLayout } from '@/components/AdminLayout';

export default function EnterpriseStampPage() {
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Enterprise stamp' }]}>
      {/* Page Content */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-h6 font-bold text-foreground">Enterprise stamp</h1>
          <p className="text-p2 text-subtle max-w-2xl">
            Ensure each action on your documents is legally valid by applying electronic stamp.
            <br />
            The recommended image format is PNG with transparent background.
          </p>
        </div>

        {/* Stamps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAMPS.map((stamp) => (
            <div
              key={stamp.id}
              className={`cursor-pointer transition-all ${
                selectedStamp === stamp.id ? 'ring-2 ring-blue-600' : ''
              }`}
              onClick={() => !stamp.isUploadSlot && setSelectedStamp(stamp.id)}
            >
              {stamp.isUploadSlot ? (
                <Card className="h-48 flex flex-col items-center justify-center p-6 hover:bg-bg-alpha transition-colors border-2 border-dashed">
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-8 w-8 text-accent" />
                    <p className="font-medium text-center text-foreground">Add stamp</p>
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
                    selectedStamp === stamp.id ? 'bg-info' : ''
                  } ${!stamp.isActive ? 'opacity-50' : ''}`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {stamp.preview}
                  </div>
                </Card>
              )}
              {!stamp.isUploadSlot && (
                <p className="text-caption1 text-subtle text-center mt-2 font-medium">{stamp.name}</p>
              )}
            </div>
          ))}
        </div>

        {/* Selected Stamp Info */}
        {selectedStamp && selectedStamp !== 'upload' && (
          <Card className="p-6 bg-info border-accent">
            <div className="space-y-4">
              <p className="text-p2 text-foreground">
                <span className="font-medium">Selected stamp:</span> {STAMPS.find((s) => s.id === selectedStamp)?.name}
              </p>
              <div className="flex gap-3">
                <Button className="bg-accent hover:bg-accent/90 text-white">Use this stamp</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
