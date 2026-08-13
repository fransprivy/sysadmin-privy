'use client';

import { useMemo, useState } from 'react';
import { InfoIcon } from '@/components/icons';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RowMenu } from '@/components/ui/row-menu';
import { TableCell as Cell, TableHeaderCell, TableWrapper, Toolbar } from './shared';

const SEAT_LIMIT = 100;

const SEARCH_FIELDS = ['Name', 'Position', 'Email'] as const;
type SearchField = (typeof SEARCH_FIELDS)[number];

interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  addedAt: string;
  activeUntil: string;
  isOwner?: boolean;
}

const EMPLOYEES: Employee[] = [
  { id: 'AA99999', name: 'Andre Adams', position: 'UI/UX designer', email: 'andre.adams@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'BB99999', name: 'Brian Brown', position: 'iOS Developer', email: 'brian.brown@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026', isOwner: true },
  { id: 'CC99999', name: 'Claire Clark', position: 'Backend engineer', email: 'claire.clark@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'DD99999', name: 'Douglas Doe', position: 'Backend engineer', email: 'douglas.doe@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'EE99999', name: 'Elaine Evans', position: 'Backend engineer', email: 'elaine.evans@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'FF99999', name: 'Frank Foster', position: 'Frontend engineer', email: 'luna.lewis@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'GG99999', name: 'Gerald Green', position: 'SQA Engineer', email: 'gerald.green@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'H999999', name: 'Hannah Harris', position: 'SQA Engineer', email: 'hannah.harris@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'II99999', name: 'Isaac Irving', position: 'Product owner', email: 'isaac.irving@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'JJ99999', name: 'Joanne Johnson', position: 'VP Marketing', email: 'joanne.johnson@cymbalgroup.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 02, 2026' },
  { id: 'KK99999', name: 'Katherine King', position: 'VP Enterprise solution', email: 'katherine.king@altostrat.com', addedAt: 'Jun 02, 2025', activeUntil: 'Jun 01, 2026' },
];

export function EmployeeTab() {
  const [searchField, setSearchField] = useState<SearchField>('Name');
  const [query, setQuery] = useState('');

  const employees = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return EMPLOYEES;
    const field = searchField.toLowerCase() as 'name' | 'position' | 'email';
    return EMPLOYEES.filter((employee) => employee[field].toLowerCase().includes(term));
  }, [query, searchField]);

  return (
    <>
      <Toolbar
        leading={
          <p className="whitespace-nowrap text-p1 text-foreground">
            {EMPLOYEES.length}/{SEAT_LIMIT}
          </p>
        }
        fields={SEARCH_FIELDS}
        field={searchField}
        onFieldChange={(value) => setSearchField(value as SearchField)}
        query={query}
        onQueryChange={setQuery}
        actions={
          <>
            <Button variant="default" size="sm" className="shrink-0">
              Download
            </Button>
            <Button variant="primary" size="sm" className="shrink-0">
              Add employee
            </Button>
          </>
        }
      />

      {/* Banner Alert */}
      <div className="px-6 pb-5 pt-2">
        <div className="flex w-full items-start gap-3 rounded-md bg-ground p-4">
          <InfoIcon className="size-5 shrink-0" />
          <p className="flex-1 text-p2 text-subtle">
            Employees will not be able to access the enterprise after their active period ends
          </p>
        </div>
      </div>

      {/* User and Role List */}
      <TableWrapper>
          <thead>
            <tr>
              <TableHeaderCell className="w-[32%]">Name</TableHeaderCell>
              <TableHeaderCell className="w-[16%]">Position</TableHeaderCell>
              <TableHeaderCell className="w-[22%]">Email</TableHeaderCell>
              <TableHeaderCell className="w-[12%]">Added at</TableHeaderCell>
              <TableHeaderCell className="w-[12%]">Active until</TableHeaderCell>
              <TableHeaderCell className="w-[56px]" srOnly="Actions" />
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <Cell>
                  <div className="flex h-10 items-center gap-2">
                    <Avatar name={employee.name} size={32} />
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <p className="truncate text-p2 text-foreground">{employee.name}</p>
                      <div className="flex items-center gap-1">
                        {employee.isOwner && (
                          <Badge variant="info" className="shrink-0">
                            Owner
                          </Badge>
                        )}
                        <p className="truncate text-caption1 text-muted">{employee.id}</p>
                      </div>
                    </div>
                  </div>
                </Cell>
                <Cell className="text-p2 text-foreground">{employee.position}</Cell>
                <Cell className="truncate text-p2 text-foreground">{employee.email}</Cell>
                <Cell className="whitespace-nowrap text-p2 text-foreground">{employee.addedAt}</Cell>
                <Cell className="whitespace-nowrap text-p2 text-foreground">
                  {employee.activeUntil}
                </Cell>
                <Cell className="text-center">
                  <RowMenu
                    label={`Actions for ${employee.name}`}
                    items={[
                      { label: 'Edit', icon: 'edit' },
                      { label: 'Delete', icon: 'delete' },
                    ]}
                  />
                </Cell>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-12 text-center text-p2 text-subtle">
                  No employees match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
      </TableWrapper>
    </>
  );
}
