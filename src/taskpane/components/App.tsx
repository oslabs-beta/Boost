import React, { useState } from "react";
import NavBar from "./NavBar";
import Query from "./Query";
import "../taskpane.css";

/* global JSX */

export default (): JSX.Element => {
  const [page, setPage] = useState(<Query />);

  return (
    <div>
      <NavBar setPage={setPage} />
      {page}
    </div>
  );
};
