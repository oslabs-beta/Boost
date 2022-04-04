/* global JSX */
import React, { useContext } from "react";
import FuncInput from "./ide/FuncInput";
import FuncLibrary from "./ide/FuncLibrary";
import { Contexts } from "./Contexts";

export default (): JSX.Element => {
  const { js, setJs } = useContext(Contexts);

  return (
    <>
      <div className="pane top-pane">
        <FuncInput language="javascript" value={js} onChange={setJs} />
      </div>
      {/* <div className="pane">
        <iframe title="output" sandbox="allow-scripts" frameBorder="0" width="100%" height="100%" />
      </div> */}
      <button>SAVE</button>
      <button onClick={() => setJs("")}>CLEAR</button>
      <FuncLibrary />
    </>
  );
};
