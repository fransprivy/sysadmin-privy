'use client';

import React, { useState } from 'react';
import { Settings, Bell, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';

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
        <div className="relative w-24 h-16">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <g transform="translate(50, 30) rotate(-15)">
              <rect x="-35" y="-12" width="70" height="24" fill="none" stroke="#EF4444" strokeWidth="2"/>
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" className="font-bold" fontSize="14" fill="#EF4444">
                ORIGINAL
              </text>
            </g>
          </svg>
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
        <div className="relative w-24 h-16">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <g transform="translate(50, 30) rotate(-15)">
              <rect x="-35" y="-12" width="70" height="24" fill="none" stroke="#EF4444" strokeWidth="2"/>
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" className="font-bold" fontSize="14" fill="#EF4444">
                IMPORTANT
              </text>
            </g>
          </svg>
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
        <div className="relative w-24 h-16">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <g transform="translate(50, 30) rotate(-15)">
              <rect x="-40" y="-12" width="80" height="24" fill="none" stroke="#EF4444" strokeWidth="2"/>
              <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" className="font-bold" fontSize="12" fill="#EF4444">
                CONFIDENTIAL
              </text>
            </g>
          </svg>
        </div>
      </div>
    ),
    isActive: true,
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

export default function EnterpriseStampPage() {
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="enterprise-stamp" />

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
            <span className="font-semibold text-foreground">Enterprise stamp</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground">Enterprise stamp</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
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
                  <Card className="h-48 flex flex-col items-center justify-center p-6 hover:bg-muted transition-colors border-2 border-dashed">
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="h-8 w-8 text-blue-600" />
                      <p className="font-medium text-center text-foreground">Add stamp</p>
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
                      selectedStamp === stamp.id ? 'bg-blue-50' : ''
                    } ${!stamp.isActive ? 'opacity-50' : ''}`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {stamp.preview}
                    </div>
                  </Card>
                )}
                {!stamp.isUploadSlot && (
                  <p className="text-xs text-muted-foreground text-center mt-2 font-medium">{stamp.name}</p>
                )}
              </div>
            ))}
          </div>

          {/* Selected Stamp Info */}
          {selectedStamp && selectedStamp !== 'upload' && (
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="space-y-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Selected stamp:</span> {STAMPS.find((s) => s.id === selectedStamp)?.name}
                </p>
                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Use this stamp</Button>
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
