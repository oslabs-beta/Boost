import React, { useEffect, useMemo, useState } from "react";

/* global console */
export default (props: any): any => {
  const { columns, data } = props;

  if (!columns) return <table></table>;

  const header = useMemo(() => {
    return (
      <thead>
        <tr>
          {columns.map((column: any, i: number) => (
            <th className={`column${i}`} key={`column${i}`}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
    );
  }, [columns]);
  const [tableRows, setTableRows] = useState<any>([]);

  useEffect(() => {
    setTableRows([]);
  }, [columns, data]);

  // add to table rows in sets of 100 so that the initial data loads quicker
  useEffect(() => {
    let i = tableRows.length;
    let d = i * columns.length;
    let arr: any = [];

    const LOAD_SIZE = 100;
    const limit = data.length - i < LOAD_SIZE ? data.length : i + LOAD_SIZE;

    console.log("limit:", limit);

    while (i < limit) {
      const rowInfo = data[i];

      const row: any = (
        <tr className={`row${i}`} key={`row${i}`}>
          {rowInfo.map((data: any, j: number) => {
            return (
              <td className={`column${j}`} key={`data${d++}`}>
                {data}
              </td>
            );
          })}
        </tr>
      );

      arr.push(row);
      i++;
    }

    if (arr.length) setTableRows((prev: any) => prev.concat(arr));
  }, [tableRows]);

  return (
    <div id="query-table">
      <table>
        {header}
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};
