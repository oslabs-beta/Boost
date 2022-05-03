import React from "react";
import { QueryBoxProps } from "src/types";

/* global JSX document */

export default (props: QueryBoxProps): JSX.Element => {
  return (
    <>
      <textarea
        id="sqlQueryBox"
        placeholder="Enter SQL Query"
        onClick={() => {
          document.getElementById("sqlQueryBox")?.classList.remove("incorrect");
        }}
      ></textarea>
      <br />
      <button onClick={props.onSubmit}>Submit</button>
    </>
  );
};
