'use client';

import { useMemo, useState } from 'react';
import { DataBranchIcon } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
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

const FIELDS = ['Name', 'Code'] as const;

interface Department {
  name: string;
  code: string;
  dotColor: string;
  description: string;
  positions: number;
}

const DEPARTMENTS: Department[] = [
  {
    name: 'Board of directors',
    code: 'BOD',
    dotColor: 'var(--blue-40)',
    description:
      'Employers are looking for candidates who are enthusiastic about the company. But this long…',
    positions: 3,
  },
  {
    name: 'Engineering',
    code: 'ENG',
    dotColor: 'var(--green-40)',
    description: 'Engineering (Backend & Frontend) QA not included',
    positions: 4,
  },
];

export function DepartmentTab({ onCreated }: { onCreated: (message: string) => void }) {
  const [field, setField] = useState<string>('Name');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return DEPARTMENTS;
    const key = field === 'Code' ? 'code' : 'name';
    return DEPARTMENTS.filter((row) => row[key].toLowerCase().includes(term));
  }, [field, query]);

  const allSelected = rows.length > 0 && rows.every((row) => selected.includes(row.code));

  return (
    <>
      <Toolbar
        fields={FIELDS}
        field={field}
        onFieldChange={setField}
        query={query}
        onQueryChange={setQuery}
        actions={
          <CreateButton onClick={() => onCreated('Department created')}>
            Create department
          </CreateButton>
        }
      />
      <TableWrapper>
        <thead>
          <tr>
            <TableHeaderCell className="w-[56px]">
              <Checkbox
                label="Select all departments"
                checked={allSelected}
                indeterminate={selected.length > 0}
                onChange={(checked) => setSelected(checked ? rows.map((row) => row.code) : [])}
              />
            </TableHeaderCell>
            <TableHeaderCell className="w-[34%]">Department name</TableHeaderCell>
            <TableHeaderCell className="w-[34%]">Description</TableHeaderCell>
            <TableHeaderCell className="w-[215px]">Number of positions</TableHeaderCell>
            <TableHeaderCell className="w-[56px]" srOnly="Actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code}>
              <TableCell>
                <Checkbox
                  label={`Select ${row.name}`}
                  checked={selected.includes(row.code)}
                  onChange={(checked) =>
                    setSelected((current) =>
                      checked
                        ? [...current, row.code]
                        : current.filter((code) => code !== row.code)
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex min-h-10 flex-col justify-center gap-1">
                  <p className="text-p1 font-medium text-foreground">{row.name}</p>
                  <span>
                    <CodeBadge code={row.code} dotColor={row.dotColor} />
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-p2 text-foreground">{row.description}</TableCell>
              <TableCell>
                <div className="flex h-10 items-center gap-2">
                  <DataBranchIcon className="size-4 shrink-0 text-subtle" />
                  <p className="text-p2 text-foreground">{row.positions}</p>
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
          {rows.length === 0 && <NoResults colSpan={5} query={query} />}
        </tbody>
      </TableWrapper>
    </>
  );
}
