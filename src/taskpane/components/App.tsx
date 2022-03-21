import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Query from "./Query";
import IDE from "./IDE";
/* global console, Excel, require  */

const click = async () => {
  try {
    await Excel.run(async (context) => {
      /**
       * Insert your Excel code here
       */
      const range = context.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      range.format.fill.color = "yellow";

      await context.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
};

export default () => {
  const [page, setPage] = useState('query');
  let renderThis;

  useEffect(() => {
    renderThis = <Query />;
  }, [])

  useEffect(() => {
    switch (page) {
      case 'query':
        renderThis = <Query />
        break;
      case 'ide':
        renderThis = <IDE />
        break;
      case 'b':
        renderThis = null
        break;
      case 'c':
        renderThis = null
        break;
      default:
        renderThis = null
    }
  }, [page])

  return (
    <div>
      <NavBar setPage={setPage}/>
      <IDE />
      {renderThis}
    </div>
  )
}
