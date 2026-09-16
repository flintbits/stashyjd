import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

import styles from './DataTable.module.css';

import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';

const DataTable = ({
  data,
  columns,
  onRowClick,
  showFooter = true,
  highlightedRowId,
  onHighlightChange,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [internalHighlightedRowId, setInternalHighlightedRowId] = useState(null);

  const table = useReactTable({
    data,
    columns,

    columnResizeMode: 'onChange',

    getRowId: (row, index) => row.public_id ?? row.id ?? index.toString(),

    state: {
      sorting,
      rowSelection,
      columnFilters,
    },

    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className={styles['data-table-layout']}>
      {/* SCROLLABLE AREA */}
      <div className={styles['data-table-scroll']}>
        <table className={styles['data-table']}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={header.column.getCanSort() ? styles['sortable-header'] : ''}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                      {header.column.getCanSort() && (
                        <span
                          className={`${styles['sort-indicator']} ${
                            isSorted === 'asc'
                              ? styles.asc
                              : isSorted === 'desc'
                                ? styles.desc
                                : styles.none
                          }`}
                        >
                          {isSorted === 'asc' ? (
                            <FaSortUp />
                          ) : isSorted === 'desc' ? (
                            <FaSortDown />
                          ) : (
                            <FaSort />
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}

            {/* FILTER ROW */}
            <tr className={styles['filter-row']}>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th key={header.id} style={{ width: header.getSize() }}>
                  {header.column.getCanFilter() ? (
                    <input
                      type="text"
                      value={header.column.getFilterValue() ?? ''}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                      placeholder="Search..."
                      className={styles['column-filter']}
                    />
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              const isHighlighted =
                (highlightedRowId === undefined ? internalHighlightedRowId : highlightedRowId) ===
                row.id;

              return (
                <tr
                  key={row.id}
                  className={isHighlighted ? styles['row-selected'] : ''}
                  onClick={() => {
                    if (highlightedRowId === undefined) {
                      setInternalHighlightedRowId(row.id);
                    }
                    onHighlightChange?.(row.id);
                    onRowClick?.(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FIXED FOOTER */}
      {showFooter && (
        <div className={styles['data-table-footer']}>
          {table.getRowModel().rows.length === 0
            ? 'No results found'
            : `Showing ${table.getRowModel().rows.length} ${
                table.getRowModel().rows.length === 1 ? 'result' : 'results'
              }`}
        </div>
      )}
    </div>
  );
};

export default DataTable;
