'use client';

import { AssetLibraryPage, type AssetTile } from '@/components/ui/asset-library';
import { PrivyLogo } from '@/components/ui/privy-logo';

/** Rubber-stamp artwork, sized as the frame renders it inside the 192px tile. */
const STAMPS = [
  { id: 'original', label: 'Original stamp', src: '/assets/stamps/original.png', size: 'h-[104px] w-[148px]' },
  { id: 'important', label: 'Important stamp', src: '/assets/stamps/important.png', size: 'h-[102px] w-[146px]' },
];

const TILES: AssetTile[] = [
  ...STAMPS.map((stamp) => ({
    id: stamp.id,
    label: stamp.label,
    content: (
      <img src={stamp.src} alt="" className={`${stamp.size} max-w-none shrink-0 object-contain`} />
    ),
  })),
  {
    id: 'mark',
    label: 'Privy mark',
    content: <PrivyLogo variant="mark" className="h-[72px] w-[104px]" />,
  },
  {
    id: 'confidential',
    label: 'Confidential stamp',
    content: (
      // The frame crops this one horizontally: 123.31% wide, offset -11.66%.
      <span className="relative block h-[73px] w-[178px] overflow-hidden">
        <img
          src="/assets/stamps/confidential.png"
          alt=""
          className="absolute top-0 h-full max-w-none"
          style={{ left: '-11.66%', width: '123.31%' }}
        />
      </span>
    ),
  },
];

export default function EnterpriseStampPage() {
  return (
    <AssetLibraryPage
      title="Enterprise stamp"
      noun="stamp"
      description={[
        'Ensure each action on your documents is legally valid by applying electronic stamp.',
        'The recommended image format is PNG with transparent background.',
      ]}
      tiles={TILES}
    />
  );
}
