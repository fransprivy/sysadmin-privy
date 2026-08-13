import Link from 'next/link';
import { CaretIcon } from '@/components/icons';

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumbs (Figma 1:1198) — sits directly beneath the topbar. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center bg-background px-3 py-2">
      <ol className="flex flex-1 items-center gap-1 p-2.5">
        {trail.map((crumb, index) => {
          const isCurrent = index === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1">
              {index > 0 && <CaretIcon className="size-4 shrink-0 text-subtle" />}
              {isCurrent || !crumb.href ? (
                <span
                  aria-current={isCurrent ? 'page' : undefined}
                  className="whitespace-nowrap text-p2 font-bold text-foreground"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="whitespace-nowrap text-p2 text-subtle underline decoration-from-font hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
