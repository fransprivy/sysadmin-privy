import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Label (Figma 1:235 / 1:261) — 6px radius pill used for statuses and tags. */
const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-sm px-1.5 py-0.5 text-caption1 whitespace-nowrap',
  {
    variants: {
      variant: {
        info: 'bg-info text-link',
        success: 'bg-success text-success-fg',
        neutral: 'bg-bg-alpha text-subtle',
        subtle: 'bg-surface-subtle text-subtle',
        warning: 'bg-warning text-warning-fg',
        outline: 'border border-border bg-background text-foreground',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
