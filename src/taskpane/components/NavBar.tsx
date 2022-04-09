/* global JSX */
import React, { useContext } from "react";
import Query from "./Query";
import IDE from "./IDE";
import { Contexts } from "./Contexts";

export default (): JSX.Element => {
  const { setPage } = useContext(Contexts);

  return (
    <div id="navbar">
      <button onClick={() => setPage(<Query />)}>Query</button>
      <button onClick={() => setPage(<IDE />)}>TS IDE</button>
    </div>
  );
};
