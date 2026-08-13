'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AdminLayout } from '@/components/AdminLayout';

export default function EmailLogoPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

    return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Email logo' }]}>
      {/* Page Content */}
      <div className="space-y-8">
        {/* Header with Toggle */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-h6 font-bold text-foreground">Email logo</h1>
            <p className="text-p2 text-subtle">
              Turn this on to use your customized enterprise logo
            </p>
          </div>
          {/* Toggle Switch */}
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
              isEnabled ? 'bg-accent' : 'bg-border'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Logo Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card className="h-48 flex flex-col items-center justify-center p-6">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <svg viewBox="0 0 100 100" className="w-24 h-24">
                    <g transform="translate(50, 50)">
                      {/* P/Checkmark logo */}
                      <path
                        d="M -20 -15 Q -15 -25, 0 -25 Q 15 -25, 15 -10 Q 15, 5, 0, 5 L -5, 5 L -5, 20 M -5, -5 L 10, 10"
                        stroke="#EF4444"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </Card>
            <Button className="w-full bg-red40 hover:bg-logo text-white">
              <Upload className="h-4 w-4 mr-2" />
              Change logo
            </Button>
            <p className="text-caption1 text-subtle">File size up to 300KB</p>
          </div>

          {/* Email Preview Section */}
          <div className="space-y-3">
            <h3 className="text-p2 font-medium text-foreground">Preview</h3>
            <Card className="overflow-hidden">
              <div className="bg-bg-alpha p-6 space-y-4">
                {/* Email Header with Logo */}
                <div className="flex justify-center pb-4 border-b border-border">
                  <svg viewBox="0 0 100 100" className="w-12 h-12">
                    <g transform="translate(50, 50)">
                      <path
                        d="M -20 -15 Q -15 -25, 0 -25 Q 15 -25, 15 -10 Q 15, 5, 0, 5 L -5, 5 L -5, 20 M -5, -5 L 10, 10"
                        stroke="#EF4444"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>

                {/* Email Content */}
                <div className="space-y-3">
                  <p className="text-p2 font-medium text-foreground">
                    My Company - You've received a document to be signed
                  </p>
                  <p className="text-caption1 text-subtle">Hi Mr. Signer,</p>
                  <p className="text-caption1 text-subtle leading-relaxed">
                    You receive a important Agreement document from MyCompany to be signed. Click the button below to view and sign the document.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button className="w-full bg-red40 hover:bg-logo text-white text-p2">
                    View document
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
