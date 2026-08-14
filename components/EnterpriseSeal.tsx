'use client';

import { AssetLibraryPage, type AssetTile } from '@/components/ui/asset-library';
import { PrivyLogo, type LogoVariant } from '@/components/ui/privy-logo';

/** Figma renders each lockup at a fixed size inside the 192px tile. */
const LOCKUPS: { id: string; label: string; variant: LogoVariant; size: string }[] = [
  { id: 'horizontal', label: 'Privy horizontal lockup', variant: 'horizontal', size: 'h-[26px] w-[97px]' },
  { id: 'vertical', label: 'Privy vertical lockup', variant: 'vertical', size: 'h-[102px] w-[97px]' },
  { id: 'mark', label: 'Privy mark', variant: 'mark', size: 'h-[72px] w-[104px]' },
  { id: 'mark-mono', label: 'Privy mark, monochrome', variant: 'mark-mono', size: 'h-[72px] w-[104px]' },
];

const TILES: AssetTile[] = LOCKUPS.map((lockup) => ({
  id: lockup.id,
  label: lockup.label,
  content: <PrivyLogo variant={lockup.variant} className={lockup.size} />,
}));

export default function EnterpriseSealPage() {
  return (
    <AssetLibraryPage
      title="Enterprise seal"
      noun="seal"
      premium
      description={[
        'Certify the integrity and origin of your enterprise documents by applying electronic seal.',
        'The recommended image format is PNG with transparent background.',
      ]}
      tiles={TILES}
    />
  );
}
