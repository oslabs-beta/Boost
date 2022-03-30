import React, { useEffect } from "react";
import { useTable, useFilters } from "react-table";

/* global console */
let prevHiddenColumns: any = [];

export default (props: any): any => {
  const { columns, data, hiddenColumns } = props;

  console.log('table columns', columns)
  console.log('table data', data)

  const tableInstance: any = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    },
    useFilters
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns, setHiddenColumns } = tableInstance;

  useEffect(() => {
    if (JSON.stringify(prevHiddenColumns) != JSON.stringify(hiddenColumns)) {
      prevHiddenColumns = hiddenColumns;
      setHiddenColumns(hiddenColumns);
    }
  }, []);


  // type hideColumnsProps = {
  //   queryHeaders: any;
  //   allColumns: any;
  // };

  // const ourFunction = ({ queryHeaders, allColumns }: hideColumnsProps) => {
  //   const columnIDs: any = {};

  //   for (const headerInfo of queryHeaders) {
  //     columnIDs[headerInfo.accessor] = true;
  //     console.log("columnIDs ", columnIDs[headerInfo.accessor]);
  //   }

  //   allColumns.map((column: any) => {
  //     column.toggleHidden(columnIDs[column.id]);
  //   });
  // };

  return (
    <div id="query-table">
      <div>
        <div>
          {allColumns.map((column: any) => (
            <div key={column.id}>
              <label>
                <input id={`check${column.id}`} type="checkbox" {...column.getToggleHiddenProps()} />
                {column.Header}
              </label>
            </div>
          ))}
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
