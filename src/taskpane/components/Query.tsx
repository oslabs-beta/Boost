import React from "react";
import QueryBox from "./query/QueryBox";
import QueryTable from "./query/QueryTable"

export default () => {
  return (
    <div>
      <QueryBox />
      <QueryTable />

      <button>CLEAR</button>
      <button>COPY</button>
    </div>
  )
}; 