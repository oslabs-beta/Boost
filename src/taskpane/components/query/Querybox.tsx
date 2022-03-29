import React from "react";
import { QueryBoxProps } from "src/types";

/* global JSX */

export default (props: QueryBoxProps): JSX.Element => {
  const str: string = "SELECT country FROM world_population";
  return (
    <>
      <textarea id="sqlQueryBox" placeholder="Enter SQL Query">
        {str}
      </textarea>
      <br />
      <button onClick={props.onSubmit}>Submit</button>
    </>
  );
};
