import React, { useState, useEffect } from "react";
import { Parser } from "node-sql-parser"; // Used for onSubmit
import Querybox from "./query/Querybox";
import QueryTable from "./query/QueryTable"; // reactTable
import reloadSheets from "./query/queryFunctions/reloadSheets"; // sets allWorksheets with useEffect
import handleQuery from "./query/queryFunctions/handleQuery";

/* global JSX console document Office Excel */

export default (): JSX.Element => {
  // see allWorkSheets object in references
  const [allWorksheets, setAllWorksheets] = useState<any>({});
  // hide or show the copy button
  const [showTable, setShowTable] = useState(false);
  // hold the table
  const [currTable, setCurrTable] = useState<any>(<QueryTable columns={null} data={null} />);

  const [copyHeader, setCopyHeader] = useState<any>();
  const [copyData, setCopyData] = useState();
  /**
   * Loads Current sheets and sets current state
   */
  const getSheet = async () => {
    const updatedSheet = await reloadSheets();
    setAllWorksheets(updatedSheet);
  };

  useEffect(() => {
    getSheet();
  }, []);

  /**
   * on Submit reads the query
   * if sql query is invalid -> it console.logs invalid query
   */
  const onSubmit = () => {
    const query = document.getElementById("sqlQueryBox") as HTMLInputElement;
    try {
      // get query ast from input text
      const parser = new Parser();
      const { ast } = parser.parse(query.value);

      // return relected columns
      const { queryHeaders, queryData } = handleQuery(ast, allWorksheets);

      setShowTable(true); // setting this is what causes the table to rerender, someone please tell me why
      // render the table with the relavent data
      setCurrTable(<QueryTable columns={queryHeaders} data={queryData} />);
      setCopyHeader(queryHeaders.map((header: any) => header.header));
      setCopyData(queryData);
    } catch (err) {
      console.log("Query failed:", err);
      // query.setAttribute("style","text-decoration-style: wavy;")
      // query.style.textDecorationStyle = "wavy";
      query.setAttribute("class", "incorrect");
      console.log("query class", query.getAttribute("class"));
      setShowTable(false);
    }
  };

  const newSheet = async (): Promise<any> => {
    await makeNewSheet();
    await writeNewSheet();
  };

  const makeNewSheet = async (): Promise<any> => {
    // create a new sheet with the queried information
    await Excel.run(async (context) => {
      let sheets = context.workbook.worksheets;

      const sheetName: any = document.getElementById("sheetName");
      let sheet = sheets.add(sheetName.value);
      sheet.load("name, position");

      await context.sync();
      console.log(`Added worksheet named "${sheet.name}" in position ${sheet.position}`);
    });

    //currTable is a useState with the JSX element with the attributes columns and data
  };

  // write sheet
  const writeNewSheet = async (): Promise<any> => {
    await Excel.run(async (context) => {
      const sheetName: any = document.getElementById("sheetName");
      let sheet = context.workbook.worksheets.getItem(sheetName.value);
      sheet.load("name");
      await context.sync();
      console.log("sheet", sheet.name);

      // calculate the range
      const alphabet: any = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
        6: "F",
        7: "G",
        8: "H",
        9: "I",
        10: "J",
        11: "K",
        12: "L",
        13: "M",
        14: "N",
        15: "O",
        16: "P",
        17: "Q",
        18: "R",
        19: "S",
        20: "T",
        21: "U",
        22: "V",
        23: "W",
        24: "X",
        25: "Y",
        26: "Z",
      };
      const findRange = (num: any) => {
        if (num <= 26) return alphabet[num];
        // else {
        //   const times = (num / 26) >> 0;
        //   alphabet[times -1].concat) 
        // }
      };
      // A, AA, BA, CA
      const rangeString = "A1:" + findRange(copyHeader.length) + "1";
      let Table = sheet.tables.add(rangeString, true /*hasHeaders*/);
      Table.name = sheetName.value;

      console.log("this is our header array:", copyHeader);

      Table.getHeaderRowRange().values = [copyHeader];

      console.log("this is our data array:", copyData);

      Table.rows.add(-1 /*add rows to the end of the table*/, copyData);

      if (Office.context.requirements.isSetSupported("ExcelApi", "1.2")) {
        sheet.getUsedRange().format.autofitColumns();
        sheet.getUsedRange().format.autofitRows();
      }

      sheet.activate();

      await context.sync();
    });
  };

  return (
    <>
      <Querybox onSubmit={onSubmit} />
      <button
        onClick={() => {
          setShowTable(false);
          (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "";
        }}
      >
        CLEAR
      </button>
      {showTable ? <button onClick={newSheet}>COPY</button> : null}
      {showTable ? <input id="sheetName" placeholder="Enter sheet name here" /> : null}
      {showTable ? currTable : null}
    </>
  );
};
