import React from "react";
import { QueryBoxProps } from "src/types";

/* global JSX document */

export default (props: QueryBoxProps): JSX.Element => {
  const str: string = "SELECT five, one, Region, Population, Country FROM thousand, world_population, test";
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
