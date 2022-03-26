import React from "react";
import FuncInput from "./ide/FuncInput";
import FuncLibrary from "./ide/FuncLibrary";

export default (): JSX.Element => {
  return (
    <div>
      <FuncInput />
      <FuncLibrary />
    </div>
  );
};
