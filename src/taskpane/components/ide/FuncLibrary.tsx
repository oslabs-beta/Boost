import React, { useContext } from "react";
import { Contexts } from "../Contexts";

/* global JSX */

export default (): JSX.Element => {
  const { library } = useContext(Contexts);

  return (
    <div>
      <ul>{library}</ul>
    </div>
  );
};
