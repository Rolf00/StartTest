import React from 'react';
import { useTable, useResizeColumns, useSortBy } from 'react-table';
import { useState } from 'react';

const ResizableTableRolf = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { columnResizing },
  } = useTable(
    {
      columns,
      data,
    },
    useResizeColumns, // Enable column resizing
    useSortBy // Optional: Enable sorting
  );

  return (
    <table {...getTableProps()} style={{ border: '1px solid black' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                {...column.getSortByToggleProps()} // Enable sorting on columns
                style={{
                  border: '1px solid black',
                  padding: '10px',
                  cursor: column.canResize ? 'col-resize' : 'default',
                  width: column.getWidth(),
                }}
              >
                {column.render('Header')}
                <div
                  {...column.getResizerProps()}
                  style={{
                    display: 'inline-block',
                    background: 'gray',
                    width: '5px',
                    height: '100%',
                    cursor: 'col-resize',
                    marginLeft: '-2px',
                    marginRight: '-2px',
                  }}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid black' }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResizableTableRolf;
