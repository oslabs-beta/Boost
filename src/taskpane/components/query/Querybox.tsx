import React from "react";
import { QueryBoxProps } from "src/types";

/* global JSX */

export default (props: QueryBoxProps): JSX.Element => {
  const query = "SELECT Population, five, two FROM world_population, Sheet1 WHERE Population > 1000000"
  return (
    <>
      <textarea id="sqlQueryBox" placeholder="Enter SQL Query">{query}</textarea>
      <br />
      <button onClick={props.onSubmit}>Submit</button>
    </>
  );
};
