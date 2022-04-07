import React, { useEffect, useMemo, useState } from "react";

/* global console document */
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
    loadTableRows();
  }, [columns, data]);

  const loadTableRows = () => {
    let i = tableRows.length;
    let d = i * columns.length;
    let arr: any = [];

    const limit = data.length - i < 100 ? data.length : i + 100;

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

    if (arr.length) {
      setTableRows((prev: any) => prev.concat(arr));
    }
  };

  const scrollFunction = (e: any) => {
    const { scrollTop } = e.target;
    const { offsetHeight } = document.querySelector("table") as HTMLTableElement;
    if (offsetHeight < scrollTop + 1000) loadTableRows();
  };

  return (
    <div id="query-table" onScroll={(e) => scrollFunction(e)}>
      <table>
        {header}
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};
