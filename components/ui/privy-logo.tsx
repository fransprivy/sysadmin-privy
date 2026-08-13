/**
 * Privy brand lockups used as the sample seals (Figma component "Logo").
 * Each variant reproduces the component's own box and layer insets, so the SVGs
 * stay vector-crisp at any size.
 *
 * Each layer needs a positioned wrapper: an absolutely positioned <img> is a
 * replaced element, so it takes its intrinsic size and ignores the opposing
 * offset. The wrapper takes the inset, the image fills the wrapper.
 */
export type LogoVariant = 'horizontal' | 'vertical' | 'mark' | 'mark-mono';

interface Layer {
  src: string;
  inset: string;
}

const LOGOGRAM = '/assets/seals/logogram.svg';
const WORDMARK = '/assets/seals/wordmark.svg';

const VARIANTS: Record<LogoVariant, Layer[]> = {
  // Figma box 1000 × 265
  horizontal: [
    { src: LOGOGRAM, inset: '0 61.98% 0.09% 0' },
    { src: WORDMARK, inset: '0.74% 0.05% 6.45% 43.44%' },
  ],
  // Figma box 856 × 907
  vertical: [
    { src: LOGOGRAM, inset: '13.23% 20.2% 47.6% 20.2%' },
    { src: WORDMARK, inset: '57.48% 11.68% 11.03% 11.68%' },
  ],
  mark: [{ src: LOGOGRAM, inset: '0 0 0 0' }],
  // Figma box 381 × 265
  'mark-mono': [
    { src: '/assets/seals/mono-ellipse-1.svg', inset: '0 30.51% 0.1% 0' },
    { src: '/assets/seals/mono-ellipse-2.svg', inset: '0 30.51% 0.1% 0' },
    { src: '/assets/seals/mono-vector.svg', inset: '0 0.2% 0.09% 11.94%' },
  ],
};

export function PrivyLogo({
  variant,
  className,
}: {
  variant: LogoVariant;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {VARIANTS[variant].map((layer, index) => (
        <div key={index} className="absolute" style={{ inset: layer.inset }}>
          <img src={layer.src} alt="" className="absolute inset-0 block size-full max-w-none" />
        </div>
      ))}
    </div>
  );
}
