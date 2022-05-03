/* global JSX console */
import React, { useContext, useEffect } from "react";
import FuncInput from "./ide/FuncInput";
import FuncLibrary from "./ide/FuncLibrary";
import { Contexts } from "./Contexts";

export default (): JSX.Element => {
  const { js, setJs, library, setLibrary, index, setIndex } = useContext(Contexts);

  const handleSave = () => {
    // const customFunc = document.getElementById()
    const restoreFunc = () => {
      setJs(js);
      setIndex(index);
    };

    setLibrary((prev: any) => {
      if (index === library.length)
        return prev.concat(
          <li key={`func${index}`} onClick={restoreFunc}>
            {js}
          </li>
        );

      const first = prev.slice(0, index);
      first.push(
        <li key={`func${index}`} onClick={restoreFunc}>
          {js}
        </li>
      );
      return first.concat(prev.slice(index + 1));
    });

    setJs("");
  };

  useEffect(() => {
    setIndex(library.length);
  }, [library]);

  useEffect(() => {
    console.log("index:", index);
  }, [index]);

  return (
    <>
      <div className="pane top-pane">
        <FuncInput language="javascript" value={js} onChange={setJs} />
      </div>
      {/* <div className="pane">
        <iframe title="output" sandbox="allow-scripts" frameBorder="0" width="100%" height="100%" />
      </div> */}
      <button onClick={handleSave}>SAVE</button>
      <button onClick={() => setJs("")}>CLEAR</button>
      <FuncLibrary />
    </>
  );
};
