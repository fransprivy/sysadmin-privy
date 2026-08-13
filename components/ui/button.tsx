import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/** Button / Text (Figma 1:8) */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-accent/90',
        default: 'bg-[rgba(134,136,139,0.1)] text-foreground hover:bg-[rgba(134,136,139,0.16)]',
        outline: 'border border-border bg-background text-foreground hover:bg-bg-alpha',
        ghost: 'text-subtle hover:bg-bg-alpha hover:text-foreground',
        link: 'text-link underline-offset-4 hover:underline',
        destructive: 'bg-red40 text-white hover:bg-red40/90',
      },
      size: {
        sm: 'h-8 px-3 text-p1',
        md: 'h-10 px-4 text-b1 font-medium',
        lg: 'h-11 px-6 text-b1 font-medium',
        icon: 'size-11',
        none: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
