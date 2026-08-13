'use client';

import { useMemo, useState } from 'react';
import { DataBranchIcon } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { RowMenu } from '@/components/ui/row-menu';
import {
  CreateButton,
  EmptyState,
  NoResults,
  TableCell,
  TableHeaderCell,
  TableWrapper,
  Toolbar,
} from './shared';

const FIELDS = ['Title'] as const;

interface Branch {
  name: string;
  employees: number;
}

/** The frame ships this tab in its empty state. */
const BRANCHES: Branch[] = [];

export function BranchTab({ onCreated }: { onCreated: (message: string) => void }) {
  const [field, setField] = useState<string>('Title');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return BRANCHES;
    return BRANCHES.filter((row) => row.name.toLowerCase().includes(term));
  }, [query]);

  const isEmpty = BRANCHES.length === 0;

  return (
    <>
      <Toolbar
        fields={FIELDS}
        field={field}
        onFieldChange={setField}
        query={query}
        onQueryChange={setQuery}
        actions={<CreateButton onClick={() => onCreated('Branch created')}>Create branch</CreateButton>}
      />
      <TableWrapper>
        <thead>
          <tr>
            <TableHeaderCell className="w-[56px]">
              <Checkbox
                label="Select all branches"
                checked={rows.length > 0 && selected.length === rows.length}
                indeterminate={selected.length > 0}
                onChange={(checked) => setSelected(checked ? rows.map((row) => row.name) : [])}
              />
            </TableHeaderCell>
            <TableHeaderCell className="w-[68%]">Branch name</TableHeaderCell>
            <TableHeaderCell className="w-[215px]">Number of employee</TableHeaderCell>
            <TableHeaderCell className="w-[56px]" srOnly="Actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <TableCell>
                <Checkbox
                  label={`Select ${row.name}`}
                  checked={selected.includes(row.name)}
                  onChange={(checked) =>
                    setSelected((current) =>
                      checked ? [...current, row.name] : current.filter((n) => n !== row.name)
                    )
                  }
                />
              </TableCell>
              <TableCell className="text-p1 font-medium text-foreground">{row.name}</TableCell>
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
          {!isEmpty && rows.length === 0 && <NoResults colSpan={4} query={query} />}
        </tbody>
      </TableWrapper>
      {isEmpty && (
        <EmptyState
          illustration="/assets/illustrations/empty-branch.png"
          title="No Branch yet"
          description="No branch here yet. Start by creating one now."
        />
      )}
    </>
  );
}
