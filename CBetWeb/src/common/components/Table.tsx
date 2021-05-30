import { Icon } from './Icon';
import { useEffect } from 'react';
import { Button, Table as ReactTable } from 'react-bootstrap';
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';

export const Table = <T extends object>({
  columns,
  data,
  globalFilterValue,
  pagination = false,
  onRowClick,
}: ReactTableProps<T>) => {
  const tableInstance = useTable<T>(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    state,
    prepareRow,
    getTableProps,
    getTableBodyProps,
    setGlobalFilter,
  } = tableInstance as any;

  const { pageIndex } = state;

  useEffect(() => {
    setGlobalFilter(globalFilterValue);
  }, [globalFilterValue, setGlobalFilter]);

  return (
    <>
      <ReactTable
        size="sm"
        hover
        responsive
        {...getTableProps()}
        className={!!onRowClick ? 'table-row-clickable' : ''}
      >
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => {
                return (
                  <th
                    {...column.getHeaderProps([
                      {
                        className: column.className,
                      },
                      column.width,
                      column.getSortByToggleProps(),
                    ])}
                  >
                    <div className="table__header">
                      <span>{column.render('Header')}</span>
                      {(column as any).isSorted ? (
                        (column as any).isSortedDesc ? (
                          <Icon name="arrow_drop_down" color="primary" />
                        ) : (
                          <Icon name="arrow_drop_up" color="primary" />
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  </th>
                );
              })}
              {!!onRowClick && <th style={{ width: '64px' }}></th>}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={
                  onRowClick ? () => onRowClick(row.original as T) : () => {}
                }
              >
                {row.cells.map((cell: any) => {
                  return (
                    <td className="table__row" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
                {!!onRowClick && (
                  <td style={{ verticalAlign: 'middle' }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Icon name="chevron_right" color="icon" />
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </ReactTable>
      {pagination && pageCount > 1 && (
        <div className="table__pagination">
          <Button
            variant="outline-secondary"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <Icon name="chevron_left_24px" color="gray" /> Prev
          </Button>
          <p>
            Page <b>{pageIndex + 1}</b> of {pageCount}
          </p>
          <Button
            variant="outline-secondary"
            disabled={!canNextPage}
            onClick={() => nextPage()}
            className="button__next"
          >
            Next <Icon name="chevron_right_24px" color="gray" />
          </Button>
        </div>
      )}
    </>
  );
};
export interface ReactTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  globalFilterValue?: string;
  onRowClick?(row: T): void;
  pagination?: boolean;
}
