import { cn } from '@/lib/utils';

/**
 * Avatars / Profile (Figma 1:172).
 * The Figma frame carries image fills that export empty (they are placeholder
 * user data), so the real source is a prop with an initials fallback.
 */
export function Avatar({
  name,
  src,
  size = 40,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-alpha',
        className
      )}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      {src ? (
        <img src={src} alt="" width={size} height={size} className="size-full object-cover" />
      ) : (
        <span
          className="font-medium text-subtle"
          style={{ fontSize: Math.round(size * 0.36) }}
        >
          {initials}
        </span>
      )}
    </span>
  );
}

/** Enterprise avatar — the Privy mark inside a bordered circle. */
export function EnterpriseAvatar({ size = 96 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full border border-border bg-background"
      style={{ width: size, height: size }}
    >
      <img
        src="/assets/icons/logo-privy-fill.svg"
        alt=""
        style={{ width: size * 0.55, height: size * 0.49 }}
      />
    </span>
  );
}
