import React from "react";
import AddDatabase from "./database/AddDatabase";
import DatabaseSchema from "./database/DatabaseSchema";

export default (): JSX.Element => {
  return (
    <>
      <AddDatabase />
      <DatabaseSchema />
    </>
  );
};
