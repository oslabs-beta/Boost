import React from "react";
import { useTable, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";

export default (props: any) => {
  const { columns, data } = props;

  const tableInstance: any = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;

  const { globalFilter } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
    </>
  );
};
