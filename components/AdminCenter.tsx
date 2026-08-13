'use client';

import { AdminLayout, AdminSection } from '@/components/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ActDocumentReviewedIcon,
  ActDocumentUploadedIcon,
  ActEmployeeAddedIcon,
  ActSealPlacedIcon,
  ActSignaturePlacedIcon,
  ActTemplateUsedIcon,
  ChevronDownIcon,
  VerifiedIcon,
} from '@/components/icons';
import { EnterpriseAvatar } from '@/components/ui/avatar';

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

const ENTERPRISE = {
  name: 'PT Privy Identitas digital',
  role: 'Admin',
  id: 'KC059012',
  address:
    'Jalan Lele sumargo No II Block IV Cluster melati K.H Dewantara, Sewon, Bantul, Yogyakarta, Indonesia',
  documents: ['NPWP', 'Company deed', 'Company decree'],
};

const ACTIVITIES: {
  label: string;
  icon: IconComponent;
  value?: string;
  badge?: string;
}[] = [
  { label: 'Document uploaded', icon: ActDocumentUploadedIcon, value: '777' },
  { label: 'Signature placed', icon: ActSignaturePlacedIcon, value: '5' },
  { label: 'Document reviewed', icon: ActDocumentReviewedIcon, value: '12' },
  { label: 'Seal placed', icon: ActSealPlacedIcon, value: '21' },
  { label: 'Document template used', icon: ActTemplateUsedIcon, badge: 'Coming soon' },
  { label: 'Employee account added', icon: ActEmployeeAddedIcon, value: '42' },
];

/** 🔌 item / list — label above value, 12px/10px inset. */
function ListItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-1 px-3 py-2.5">
      <p className="whitespace-nowrap text-caption1 text-subtle">{label}</p>
      <p className="w-full text-p2 text-foreground">{value}</p>
    </div>
  );
}

function VerificationItem({ label }: { label: string }) {
  return (
    <div className="flex w-[140px] flex-col gap-1 px-3 py-2.5">
      <p className="whitespace-nowrap text-caption1 text-subtle">{label}</p>
      <Badge variant="success">
        <VerifiedIcon className="size-4 shrink-0" />
        Verified
      </Badge>
    </div>
  );
}

/** Statistics Item — inline label + accent value. */
function StatisticsItem({
  label,
  value,
  note,
  className,
}: {
  label: string;
  value: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-start rounded-lg border border-border bg-background p-4 ${className ?? ''}`}
    >
      <div className="flex w-full items-center gap-2.5">
        <p className="min-w-0 flex-1 text-caption1 font-medium text-foreground">{label}</p>
        <p className="whitespace-nowrap text-p1 font-bold text-accent">{value}</p>
        {note && <p className="whitespace-nowrap text-caption1 text-subtlest">{note}</p>}
      </div>
    </div>
  );
}

/** Activity Detail — 130px card, icon + label block over the figure. */
function ActivityCard({
  label,
  icon: Icon,
  value,
  badge,
}: {
  label: string;
  icon: IconComponent;
  value?: string;
  badge?: string;
}) {
  return (
    <div className="flex h-[130px] flex-col justify-center rounded-lg border border-border bg-background p-6">
      <div className="flex w-full flex-col gap-2">
        <div className="flex h-11 w-full flex-col gap-1">
          <Icon className="size-6 shrink-0" />
          <p className="w-full text-caption1 font-medium text-foreground">{label}</p>
        </div>
        {badge ? (
          <div className="flex h-[26px] items-center">
            <Badge variant="info">{badge}</Badge>
          </div>
        ) : (
          <p className="w-full text-h6 font-medium text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function AdminCenterPage() {
  return (
    <AdminLayout trail={[{ label: 'PrivySign', href: '#' }, { label: 'Admin Center' }]}>
      <AdminSection title="General">
        {/* Card / Container */}
        <div className="flex w-full flex-col gap-6 rounded-lg border border-border bg-background p-6">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start">
            {/* Profile Image Section */}
            <div className="flex w-full shrink-0 flex-col gap-4 sm:w-[342px]">
              <EnterpriseAvatar size={96} />
              <div className="flex w-full flex-col gap-2 break-words">
                <p className="text-h6 font-medium text-foreground">{ENTERPRISE.name}</p>
                <p className="text-p2 text-subtlest">{ENTERPRISE.role}</p>
              </div>
            </div>

            {/* Status Section */}
            <div className="flex min-w-0 flex-1 flex-col">
              <ListItem label="Enterprise ID" value={ENTERPRISE.id} />
              <ListItem label="Address" value={ENTERPRISE.address} />
              <div className="flex w-full flex-col items-start">
                <Button variant="link" size="none" className="px-3 py-1 text-p2">
                  Edit
                </Button>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex w-full flex-wrap items-center gap-4">
            {ENTERPRISE.documents.map((doc) => (
              <VerificationItem key={doc} label={doc} />
            ))}
          </div>
        </div>

        {/* Statistics Container */}
        <div className="flex w-full flex-wrap items-start gap-6">
          <StatisticsItem label="Enterprise Plan" value="Active" className="w-[185px] shrink-0" />
          <StatisticsItem label="e-Meterai" value="120,930" className="w-[182px] shrink-0" />
          <StatisticsItem
            label="Employee account"
            value="100"
            note="of 212 (112 available)"
            className="min-w-[220px] flex-1"
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Activity summary"
        action={
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-p1 text-foreground transition-colors hover:bg-bg-alpha"
            >
              This month
              <ChevronDownIcon className="size-5 shrink-0 text-subtlest" />
            </button>
            <Button variant="default" size="sm">Download</Button>
          </div>
        }
      >
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((activity) => (
            <ActivityCard key={activity.label} {...activity} />
          ))}
        </div>
      </AdminSection>
    </AdminLayout>
  );
}
