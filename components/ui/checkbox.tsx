import { cn } from '@/lib/utils';

/** Checkbox (Figma) — 16px, 4px radius. */
export function Checkbox({
  checked,
  indeterminate,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <label className={cn('flex cursor-pointer items-center justify-center py-1', className)}>
      <input
        type="checkbox"
        checked={checked}
        aria-label={label}
        ref={(node) => {
          if (node) node.indeterminate = Boolean(indeterminate) && !checked;
        }}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 cursor-pointer appearance-none rounded-[4px] border border-border bg-background accent-accent checked:border-accent checked:bg-accent indeterminate:border-accent indeterminate:bg-accent"
      />
      <span
        aria-hidden
        className="pointer-events-none -ml-4 size-4 bg-[length:12px_12px] bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 6.2 4.6 8.8 10 3.4' stroke='%23fff' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
          opacity: checked ? 1 : 0,
        }}
      />
    </label>
  );
}
