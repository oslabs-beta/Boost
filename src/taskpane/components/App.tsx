import React, { useState } from "react";
import NavBar from "./NavBar";
import Query from "./Query";
/* global console, Excel, require  */

export default () => {
  const [page, setPage] = useState(<Query />);

  return (
    <div>
      <NavBar setPage={setPage}/>
      {page}
    </div>
  )
}