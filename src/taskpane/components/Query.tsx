import React, { useState, useEffect, useMemo } from "react";
import Querybox from "./query/Querybox";
import QueryTable from "./query/QueryTable";
import * as excelFuncs from "../../excelFunction";

/* global Excel console document */

export default () => {
  const [stateRange, setStateRange] = useState([[]]);
  const [columns, setColumns] = useState([
    {
      Header: "field_1",
      accessor: "0",
    },
    {
      Header: "field_2",
      accessor: "1",
    },
    {
      Header: "field_3",
      accessor: "2",
    },
    {
      Header: "field_4",
      accessor: "3",
    },
    {
      Header: "field_5",
      accessor: "4",
    },
  ]);
  // const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => stateRange.slice(1), [stateRange]);

  const onSubmit = async () => {
    await Excel.run(async (context) => {
      let sheet: any = excelFuncs.getSheet(context);
      sheet.load("name"); // getname of the active worksheet

      // sheet.getUsedRange().load() gives us the cells that are being used
      // const load = sheet.getUsedRange().getRow(2);
      // const range: any = sheet.getUsedRange();

      const range: any = sheet.getRange((document.getElementById("sqlQueryBox") as HTMLInputElement).value);
      range.load("address");
      range.load("values");

      // used to navigate you to the select range
      excelFuncs.selectRange(range);

      await context.sync();
      setStateRange(range.values);
      console.log(range.values);
      // console.log("test:", load);
      // console.log("test2:", range);
      // console.log(`The active worksheet is "${sheet.name}"`);
    });
  };

  useEffect(() => {
    setColumns(
      stateRange[0].map((column: string, i: number) => {
        return { Header: column, accessor: `${i}` };
      })
    );
  }, [stateRange]);

  return (
    <div>
      <Querybox onSubmit={onSubmit} />
      <QueryTable columns={columns} data={data} />

      <button>CLEAR</button>
      <button>COPY</button>
    </div>
  );
};
