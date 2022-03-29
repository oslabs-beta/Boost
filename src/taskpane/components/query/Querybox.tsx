import React from "react";
import { QueryBoxProps } from "src/types";

/* global JSX */

export default (props: QueryBoxProps): JSX.Element => {
  return (
    <>
      <textarea id="sqlQueryBox" placeholder="Enter SQL Query"></textarea>
      <br />
      <button onClick={props.onSubmit}>Submit</button>
    </>
  );
};
