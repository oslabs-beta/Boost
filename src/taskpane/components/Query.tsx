import React, { useState, useEffect, useMemo } from "react";
import { Parser } from "node-sql-parser";
import Querybox from "./query/Querybox";
import QueryTable from "./query/QueryTable";
import queryParser from "./query/queryParser";
import * as excelFuncs from "../../excelFunction";

/* global Excel JSX console document */
//HELLOOOO
export default (): JSX.Element => {
  const [stateRange, setStateRange] = useState<string[][]>([[]]);
  const [columns, setColumns] = useState<any>([]);
  const [showTable, setShowTable] = useState(false);

  // We want to be able to useMemo for the columns as well
  const data: string[][] = useMemo(() => stateRange.slice(1), [stateRange]);

  const onSubmit = async (): Promise<void> => {
    await Excel.run(async (context: Excel.RequestContext): Promise<void> => {
      const sheet: Excel.Worksheet = excelFuncs.getSheet(context);
      sheet.load("name"); // getname of the active worksheet

      const range = sheet.getUsedRange(); // gives us the cells that are being used

      // NOTE: Needs to accept SQL queries, currently reqires an excel address
      // const range = sheet.getRange("A1:F3");

      const parser = new Parser();
      try {
        const { ast } = parser.parse((document.getElementById("sqlQueryBox") as HTMLInputElement).value);
        queryParser(ast);
        excelFuncs.selectRange(range);
        setShowTable(true);
      } catch (err) {
        console.log("Invalid query");
        setShowTable(false);
        (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "invalid query!";
      }

      range.load("address");
      range.load("values");

      await context.sync();

      setStateRange(range.values);
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

      {showTable ? <QueryTable columns={columns} data={data} /> : null}
      <button
        onClick={() => {
          setShowTable(false);
          (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "";
        }}
      >
        CLEAR
      </button>
      {showTable ? <button>COPY</button> : null}
    </div>
  );
};
