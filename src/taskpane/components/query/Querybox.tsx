import React from "react";
import { QueryBoxProps } from "src/types";

/* global JSX document */

export default (props: QueryBoxProps): JSX.Element => {
  const str: string = "SELECT population FROM world_population";
  return (
    <>
      <textarea
        id="sqlQueryBox"
        placeholder="Enter SQL Query"
        defaultValue={str}
        onClick={() => {
          document.getElementById("sqlQueryBox")?.classList.remove("incorrect");
        }}
      ></textarea>
      <br />
      <button onClick={props.onSubmit}>Submit</button>
    </>
  );
};
