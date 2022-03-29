import React, { useState } from "react";
import NavBar from "./NavBar";
import Query from "./Query";
import "../taskpane.css";

/* global JSX */

/*
copies the curent workbook and insert new sheet directly after

await Excel.run(async (context) => {
    let myWorkbook = context.workbook;
    let sampleSheet = myWorkbook.worksheets.getActiveWorksheet();
    let copiedSheet = sampleSheet.copy(Excel.WorksheetPositionType.after, sampleSheet);
    await context.sync();
});

https://docs.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-worksheets
*/

/**
 * CURRENT FEATURES
 * - Excel Add-in Integration
 * - React-Table, ability to interact and filter each column
 * - SELECT (columns) Querying
 */
export default (): JSX.Element => {
  const [page, setPage] = useState(<Query />);

  return (
    <div>
      {/* <QueryRefactored /> */}
      <NavBar setPage={setPage} />
      {page}
    </div>
  );
};
