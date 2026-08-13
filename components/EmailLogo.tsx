'use client';

import React, { useState } from 'react';
import { Settings, Bell, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/Sidebar';

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

export default function EmailLogoPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <Topbar />
      <Sidebar activePage="email-logo" />

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
            <span className="font-semibold text-foreground">Email logo</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 space-y-8">
          {/* Header with Toggle */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Email logo</h1>
              <p className="text-sm text-muted-foreground">
                Turn this on to use your customized enterprise logo
              </p>
            </div>
            {/* Toggle Switch */}
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                isEnabled ? 'bg-blue-600' : 'bg-gray-300'
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
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Change logo
              </Button>
              <p className="text-xs text-muted-foreground">File size up to 300KB</p>
            </div>

            {/* Email Preview Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Preview</h3>
              <Card className="overflow-hidden">
                <div className="bg-gray-50 p-6 space-y-4">
                  {/* Email Header with Logo */}
                  <div className="flex justify-center pb-4 border-b border-gray-200">
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
                    <p className="text-sm font-semibold text-foreground">
                      My Company - You've received a document to be signed
                    </p>
                    <p className="text-xs text-muted-foreground">Hi Mr. Signer,</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      You receive a important Agreement document from MyCompany to be signed. Click the button below to view and sign the document.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">
                      View document
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
