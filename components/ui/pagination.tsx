'use client';

import { PaginationNextIcon, PaginationPrevIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const ROW_OPTIONS = [15, 25, 50, 100];

/** Pagination / Table (Figma) — page info, rows-per-page, then the step controls. */
export function Pagination({
  page,
  pageCount,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: {
  page: number;
  pageCount: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}) {
  const atStart = page <= 1;
  const atEnd = page >= pageCount;

  const step = 'flex size-[34px] items-center justify-center rounded-[7px] transition-colors';
  const edge = 'flex h-[34px] items-center justify-center rounded-[7px] py-2 text-p1 transition-colors';

  return (
    <div className="flex w-full items-center gap-5 bg-background px-4 py-2">
      <div className="flex flex-1 items-center">
        <p className="text-p1 text-foreground">
          Page {page} of {pageCount}
        </p>
      </div>

      <label className="flex items-center gap-2">
        <span className="whitespace-nowrap text-p1 text-foreground">Show rows</span>
        <span className="relative flex w-20 items-center gap-2 rounded-[7px] border border-border-muted bg-background px-2 py-1">
          <select
            aria-label="Rows per page"
            value={rowsPerPage}
            onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {ROW_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="flex-1 text-p1 text-foreground">{rowsPerPage}</span>
        </span>
      </label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={atStart}
          className={cn(edge, 'pr-1', atStart ? 'text-subtlest opacity-50' : 'text-foreground hover:bg-bg-alpha')}
        >
          First
        </button>
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(page - 1)}
          disabled={atStart}
          className={cn(step, atStart ? 'text-subtlest opacity-50' : 'text-foreground hover:bg-bg-alpha')}
        >
          <PaginationPrevIcon className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(page + 1)}
          disabled={atEnd}
          className={cn(step, atEnd ? 'text-subtlest opacity-50' : 'text-foreground hover:bg-bg-alpha')}
        >
          <PaginationNextIcon className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(pageCount)}
          disabled={atEnd}
          className={cn(edge, 'pl-1', atEnd ? 'text-subtlest opacity-50' : 'text-foreground hover:bg-bg-alpha')}
        >
          Last
        </button>
      </div>
    </div>
  );
}
