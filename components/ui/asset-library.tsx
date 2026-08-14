'use client';

import { useRef, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { DiamondIcon, ImageUploadIcon } from '@/components/icons';
import { Toast } from '@/components/ui/toast';

const MAX_UPLOAD_MB = 5;

/**
 * Shared shell for the Enterprise seal / Enterprise stamp frames: title, an
 * optional Premium label, a two-line description, then a 192px tile grid whose
 * first cell is a dashed uploader.
 */
export interface AssetTile {
  id: string;
  /** Accessible description of the artwork. */
  label: string;
  /** The artwork itself, already sized per the frame. */
  content: React.ReactNode;
}

/** Dashed upload tile — "Add seal" / "Add stamp". */
function UploadTile({
  noun,
  onUpload,
}: {
  noun: string;
  onUpload: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      onUpload(`“${file.name}” is larger than ${MAX_UPLOAD_MB}MB`);
      return;
    }
    onUpload(`${noun[0].toUpperCase()}${noun.slice(1)} uploaded`);
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
          <p className="whitespace-nowrap text-p1 text-foreground">Add {noun}</p>
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

export function AssetLibraryPage({
  title,
  noun,
  description,
  premium,
  tiles,
}: {
  title: string;
  /** Lowercase noun for the uploader copy: "seal", "stamp". */
  noun: string;
  /** Rendered as two lines, matching the frame's explicit break. */
  description: [string, string];
  premium?: boolean;
  tiles: AssetTile[];
}) {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: title },
      ]}
    >
      <section className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="whitespace-nowrap text-h6 font-medium text-foreground">{title}</h1>
            {premium && (
              <span className="flex items-center justify-center gap-0.5 rounded-[7px] bg-teal0 px-2 py-0.5">
                <DiamondIcon className="size-4 shrink-0" />
                <span className="whitespace-nowrap text-p2 text-teal50">Premium</span>
              </span>
            )}
          </div>
          <p className="w-full text-p2 text-subtle">
            {description[0]}
            <br />
            {description[1]}
          </p>
        </div>

        {/* 192px tiles, 32px gutters */}
        <div className="flex flex-wrap gap-8">
          <UploadTile noun={noun} onUpload={setToast} />
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="flex size-48 shrink-0 flex-col items-center justify-center rounded-lg border border-border p-6"
            >
              {tile.content}
              <span className="sr-only">{tile.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Toast message={toast ?? ''} open={toast !== null} onDismiss={() => setToast(null)} />
    </AdminLayout>
  );
}
