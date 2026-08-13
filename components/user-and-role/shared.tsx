'use client';

import { Button } from '@/components/ui/button';
import { ChevronDownSmIcon, SearchIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

/**
 * Toolbar (Figma) — 24px inset, the field selector and search share one border,
 * actions sit hard right.
 */
export function Toolbar({
  leading,
  fields,
  field,
  onFieldChange,
  query,
  onQueryChange,
  actions,
}: {
  leading?: React.ReactNode;
  fields: readonly string[];
  field: string;
  onFieldChange: (field: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 px-6 pb-3 pt-6">
      {leading}
      <div className="flex min-w-[248px] max-w-full items-stretch rounded-md border border-[#e7e7e8] bg-background">
        <label className="relative flex min-w-[92px] shrink-0 items-center gap-2 rounded-[7px] px-2 py-1">
          <select
            aria-label="Search field"
            value={field}
            onChange={(event) => onFieldChange(event.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {fields.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="flex-1 whitespace-nowrap text-p1 text-subtle">{field}</span>
          <ChevronDownSmIcon className="size-4 shrink-0 text-subtle" />
        </label>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[7px] px-2 py-1">
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-p1 text-foreground outline-none placeholder:text-subtlest"
          />
          <SearchIcon className="size-4 shrink-0 text-subtlest" />
        </div>
      </div>
      {actions && <div className="ml-auto flex items-center gap-[18px]">{actions}</div>}
    </div>
  );
}

/**
 * The create CTAs in the Position / Department / Branch frames are squashed
 * instances (19–23px tall inside a 32px bar) with clipped labels — a Figma
 * accident, not a spec. This renders the button at its real 32px size.
 */
export function CreateButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <Button variant="primary" size="sm" onClick={onClick} className="shrink-0">
      {children}
    </Button>
  );
}

export function TableHeaderCell({
  children,
  className,
  srOnly,
}: {
  children?: React.ReactNode;
  className?: string;
  srOnly?: string;
}) {
  return (
    <th
      scope="col"
      className={cn('bg-bg-alpha px-3 py-2 text-left text-p2 font-medium text-subtle', className)}
    >
      {srOnly ? <span className="sr-only">{srOnly}</span> : children}
    </th>
  );
}

export function TableCell({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn('border-b border-border-muted px-3 py-4 align-middle', className)}>
      {children}
    </td>
  );
}

/** Code badge — outlined pill with an optional status dot (Figma "style=dot"). */
export function CodeBadge({ code, dotColor }: { code: string; dotColor?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background px-1.5 py-0.5 text-caption1 text-subtle">
      {dotColor && (
        <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
      )}
      {code}
    </span>
  );
}

export function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto px-6 pb-6 pt-3">
      <table className="w-full min-w-[860px] table-fixed border-collapse">{children}</table>
    </div>
  );
}

export function NoResults({ colSpan, query }: { colSpan: number; query: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-3 py-12 text-center text-p2 text-subtle">
        Nothing matches “{query}”.
      </td>
    </tr>
  );
}

/** Empty state (Figma "No Branch yet"). */
export function EmptyState({
  illustration,
  title,
  description,
}: {
  illustration: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-[50px] px-6 py-16">
      <img src={illustration} alt="" width={250} height={250} className="size-[250px]" />
      <div className="flex flex-col items-center gap-6">
        <p className="text-[24px] font-medium leading-none text-foreground">{title}</p>
        <p className="w-[446px] max-w-full text-center text-p2 text-subtle">{description}</p>
      </div>
    </div>
  );
}
