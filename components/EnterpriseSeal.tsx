'use client';

import { useRef, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { DiamondIcon, ImageUploadIcon } from '@/components/icons';
import { PrivyLogo, type LogoVariant } from '@/components/ui/privy-logo';
import { Toast } from '@/components/ui/toast';

interface Seal {
  id: string;
  label: string;
  variant: LogoVariant;
  /** Figma renders each lockup at a fixed size inside the 192px tile. */
  className: string;
}

const SEALS: Seal[] = [
  { id: 'horizontal', label: 'Privy horizontal lockup', variant: 'horizontal', className: 'h-[26px] w-[97px]' },
  { id: 'vertical', label: 'Privy vertical lockup', variant: 'vertical', className: 'h-[102px] w-[97px]' },
  { id: 'mark', label: 'Privy mark', variant: 'mark', className: 'h-[72px] w-[104px]' },
  { id: 'mark-mono', label: 'Privy mark, monochrome', variant: 'mark-mono', className: 'h-[72px] w-[104px]' },
];

const MAX_UPLOAD_MB = 5;

/** Seal Container — 192px tile. */
function SealTile({ seal }: { seal: Seal }) {
  return (
    <div className="flex size-48 shrink-0 flex-col items-center justify-center rounded-lg border border-border p-6">
      <PrivyLogo variant={seal.variant} className={seal.className} />
      <span className="sr-only">{seal.label}</span>
    </div>
  );
}

/** Add seal — dashed upload tile. */
function UploadTile({ onUpload }: { onUpload: (message: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      onUpload(`“${file.name}” is larger than ${MAX_UPLOAD_MB}MB`);
      return;
    }
    onUpload('Seal uploaded');
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex size-48 shrink-0 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-bg-alpha p-6 transition-colors hover:bg-bg-alpha/80"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-col items-center gap-1">
          <ImageUploadIcon className="size-8 shrink-0" />
          <p className="whitespace-nowrap text-p1 text-foreground">Add seal</p>
        </div>
        <div className="flex flex-col gap-1 text-center text-caption1">
          <p className="w-36 font-medium text-accent">
            Click here <span className="text-subtle">to upload</span>
          </p>
          <p className="w-36 text-subtlest">JPG or PNG up to {MAX_UPLOAD_MB}MB</p>
        </div>
      </div>
    </button>
  );
}

export default function EnterpriseSealPage() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: 'Enterprise seal' },
      ]}
    >
      <section className="flex w-full flex-col gap-10">
        {/* Title Section */}
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="whitespace-nowrap text-h6 font-medium text-foreground">Enterprise seal</h1>
            <span className="flex items-center justify-center gap-0.5 rounded-[7px] bg-teal0 px-2 py-0.5">
              <DiamondIcon className="size-4 shrink-0" />
              <span className="whitespace-nowrap text-p2 text-teal50">Premium</span>
            </span>
          </div>
          <p className="w-full text-p2 text-subtle">
            Certify the integrity and origin of your enterprise documents by applying electronic
            seal.
            <br />
            The recommended image format is PNG with transparent background.
          </p>
        </div>

        {/* Seal Options — 192px tiles, 32px gutters */}
        <div className="flex flex-wrap gap-8">
          <UploadTile onUpload={setToast} />
          {SEALS.map((seal) => (
            <SealTile key={seal.id} seal={seal} />
          ))}
        </div>
      </section>

      <Toast message={toast ?? ''} open={toast !== null} onDismiss={() => setToast(null)} />
    </AdminLayout>
  );
}
