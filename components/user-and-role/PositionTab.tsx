'use client';

import { useMemo, useState } from 'react';
import { DataBranchIcon } from '@/components/icons';
import { RowMenu } from '@/components/ui/row-menu';
import {
  CodeBadge,
  CreateButton,
  NoResults,
  TableCell,
  TableHeaderCell,
  TableWrapper,
  Toolbar,
} from './shared';

const FIELDS = ['Position', 'Code'] as const;

interface Position {
  name: string;
  code: string;
  employees: number;
}

const POSITIONS: Position[] = [
  { name: 'Engineering manager', code: 'EM', employees: 3 },
  { name: 'UI/UX designer', code: 'UIUX', employees: 4 },
];

export function PositionTab({ onCreated }: { onCreated: (message: string) => void }) {
  const [field, setField] = useState<string>('Position');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return POSITIONS;
    const key = field === 'Code' ? 'code' : 'name';
    return POSITIONS.filter((row) => row[key].toLowerCase().includes(term));
  }, [field, query]);

  return (
    <>
      <Toolbar
        fields={FIELDS}
        field={field}
        onFieldChange={setField}
        query={query}
        onQueryChange={setQuery}
        actions={
          <CreateButton onClick={() => onCreated('Position created')}>Create position</CreateButton>
        }
      />
      <TableWrapper>
        <thead>
          <tr>
            <TableHeaderCell className="w-[74%]">Position</TableHeaderCell>
            <TableHeaderCell className="w-[21%]">Number of employee</TableHeaderCell>
            <TableHeaderCell className="w-[56px]" srOnly="Actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code}>
              <TableCell>
                <div className="flex min-h-10 flex-col justify-center gap-1">
                  <p className="text-p1 font-medium text-foreground">{row.name}</p>
                  <span>
                    <CodeBadge code={row.code} />
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex h-10 items-center gap-2">
                  <DataBranchIcon className="size-4 shrink-0 text-subtle" />
                  <p className="text-p2 text-foreground">{row.employees}</p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <RowMenu
                  label={`Actions for ${row.name}`}
                  items={[
                    { label: 'Edit', icon: 'edit' },
                    { label: 'Delete', icon: 'delete' },
                  ]}
                />
              </TableCell>
            </tr>
          ))}
          {rows.length === 0 && <NoResults colSpan={3} query={query} />}
        </tbody>
      </TableWrapper>
    </>
  );
}
