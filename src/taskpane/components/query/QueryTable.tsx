import React from "react";
import { useTable, useFilters } from "react-table";

export default (props: any) => {
  const { columns, data } = props;

  const tableInstance: any = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow, 
    allColumns,
  } = tableInstance;

  
  return (
    <div id="query-table">
      <div>
        <div>
          {
            allColumns.map((column: any) => (
              <div key={column.id}>
                <label>
                  <input type='checkbox' {...column.getToggleHiddenProps()} />
                  {console.log('what even is this????', column.getToggleHiddenProps())}
                  {column.Header}
                </label>
              </div>
            ))
          }
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
