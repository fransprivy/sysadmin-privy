'use client';

import { useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { Toggle } from '@/components/ui/toggle';

const MAX_UPLOAD_KB = 300;
const LOGO = '/assets/email/line-logo.png';

/**
 * The logo asset is an 800x600 export with the mark inset in whitespace, so both
 * places it appears crop into it with the frame's own offsets.
 */
function CroppedLogo({
  className,
  imageStyle,
  blend,
}: {
  className: string;
  imageStyle: React.CSSProperties;
  blend?: boolean;
}) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <img
        src={LOGO}
        alt=""
        className={`absolute max-w-none ${blend ? 'mix-blend-multiply' : ''}`}
        style={imageStyle}
      />
    </span>
  );
}

/** The email mock inside the Preview panel — its own visual language, not the app's. */
function EmailPreview() {
  return (
    <div className="flex h-[1010px] w-full items-start rounded-lg border border-border bg-bg-alpha p-6">
      <div className="flex h-full min-w-0 flex-1 flex-col bg-background">
        <div className="flex min-h-0 w-full flex-1 flex-col gap-6 px-16 pb-10 pt-8">
          <CroppedLogo
            className="h-[66px] w-[92px]"
            blend
            imageStyle={{ height: '184.05%', width: '177.78%', left: '-38.89%', top: '-42.02%' }}
          />
          <div className="flex w-full flex-col pr-40">
            <p className="w-full text-h6 font-medium text-foreground">
              My Company - You’ve received a document to be signed
            </p>
          </div>
          <div className="flex w-full flex-col gap-6">
            <p className="w-full text-p2 text-subtlest">Hi Mr. Signer,</p>
            <p className="w-full text-p2 text-subtlest">
              You receive a Important Agreement document from MyCompany to be signed. Click the
              button below to view and sign the document.
            </p>
            <div className="flex w-full flex-col items-center justify-center p-2">
              {/* Email-template chrome: its own red and type, deliberately not the app button */}
              <span className="flex flex-col items-center justify-center rounded-md bg-[#c43330] px-8 py-3">
                <span className="whitespace-nowrap text-p2 font-medium text-white">
                  View document
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmailLogoPage() {
  const [enabled, setEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_KB * 1024) {
      setToast(`“${file.name}” is larger than ${MAX_UPLOAD_KB}KB`);
      return;
    }
    setToast('Logo updated');
  };

  return (
    <AdminLayout
      trail={[
        { label: 'PrivySign', href: '#' },
        { label: 'Admin Center', href: '/' },
        { label: 'Email logo' },
      ]}
    >
      <div className="flex w-full flex-col gap-12">
        <section className="flex w-full flex-col gap-5">
          <div className="flex w-full items-center gap-5">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h1 className="w-full text-h6 font-medium text-foreground">Email logo</h1>
              <p className="w-full text-p2 text-subtle">
                Turn this on to use your customized enterprise logo
              </p>
            </div>
            <Toggle checked={enabled} onChange={setEnabled} label="Use customized enterprise logo" />
          </div>

          {/* Logo — 192px card */}
          <div className="flex size-48 shrink-0 flex-col items-center justify-center rounded-lg border border-border p-1">
            <CroppedLogo
              className="h-full w-full rounded-[5px]"
              imageStyle={{ height: '150.49%', width: '204.32%', left: '-49.53%', top: '-25.73%' }}
            />
          </div>

          <div className="flex w-48 flex-col gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="sr-only"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            <Button variant="primary" onClick={() => inputRef.current?.click()}>
              <Pencil className="size-4 shrink-0" />
              Change logo
            </Button>
            <p className="w-full text-p2 text-subtlest">File size up to {MAX_UPLOAD_KB}KB</p>
          </div>
        </section>

        <section className="flex w-full flex-col gap-5">
          <p className="whitespace-nowrap text-p1 font-medium text-foreground">Preview</p>
          <EmailPreview />
        </section>
      </div>

      <Toast message={toast ?? ''} open={toast !== null} onDismiss={() => setToast(null)} />
    </AdminLayout>
  );
}
