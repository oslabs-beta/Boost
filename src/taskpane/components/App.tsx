import React, { useState } from "react";
import NavBar from "./NavBar";
import Query, { QueryRefactored } from "./Query";
import "../taskpane.css";

/* global JSX */

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
      <QueryRefactored />
      {/* <NavBar setPage={setPage} /> */}
      {/* {page} */}
    </div>
  );
};
