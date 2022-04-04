/* global JSX */
import React, { useContext } from "react";
import Query from "./Query";
import IDE from "./IDE";
import Database from "./Database";
import { Contexts } from "./Contexts";

export default (): JSX.Element => {
  const { setPage } = useContext(Contexts);

  return (
    <div>
      <button onClick={() => setPage(<Query />)}>Query</button>
      <button onClick={() => setPage(<IDE />)}>TS IDE</button>
      <button onClick={() => setPage("visual")}>Visuals</button>
      <button onClick={() => setPage(<Database />)}>Database</button>
    </div>
  );
};
