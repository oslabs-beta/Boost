import React from "react";
import Querybox from "./query/Querybox";
import QueryTable from "./query/QueryTable";

export default () => {
  return (
    <div>
      <Querybox />
      <QueryTable />

      <button>CLEAR</button>
      <button>COPY</button>
    </div>
  );
};
