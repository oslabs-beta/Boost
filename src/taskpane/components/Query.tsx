import React, { useState, useEffect } from "react";
import { Parser } from "node-sql-parser"; // Used for onSubmit
import Querybox from "./query/Querybox";
import QueryTable from "./query/QueryTable"; // reactTable
import reloadSheets from "./query/queryFunctions/reloadSheets"; // sets allWorksheets with useEffect
import handleQuery from "./query/queryFunctions/handleQuery";

/* global JSX console document */

export default (): JSX.Element => {
  // see allWorkSheets object in references
  const [allWorksheets, setAllWorksheets] = useState<any>({});
  // hide or show the copy button
  const [showCopyButton, setShowCopyButton] = useState(false);
  // hold the table
  const [currTable, setCurrTable] = useState<any>(<QueryTable columns={null} data={null} />);

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
  const onSubmit = async () => {
    try {
      // get query ast from input text
      const query = (document.getElementById("sqlQueryBox") as HTMLInputElement).value;
      const parser = new Parser();
      const { ast } = parser.parse(query);

      // return relected columns
      const { queryHeaders, queryData } = handleQuery(ast, allWorksheets);

      setShowCopyButton(true); // setting this is what causes the table to rerender, someone please tell me why
      // render the table with the relavent data
      setCurrTable(<QueryTable columns={queryHeaders} data={queryData} />);
    } catch (err) {
      console.log("Query failed:", err);
      setShowCopyButton(false);
    }
  };

  return (
    <>
      <Querybox onSubmit={onSubmit} />
      <button
        onClick={() => {
          setShowCopyButton(false);
          (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "";
        }}
      >
        CLEAR
      </button>
      {showCopyButton ? <button>COPY</button> : null}
      {showCopyButton ? currTable : null}
    </>
  );
};
