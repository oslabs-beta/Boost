import React, { useState, useEffect, useMemo } from "react";
import { Parser } from "node-sql-parser";
import Querybox from "./query/Querybox";
import QueryTable from "./query/QueryTable";
import { ColumnFilter } from "./query/ColumnFilter";
import reloadSheets from "./query/queryFunctions/reloadSheets";
import handleQuery from "./query/queryFunctions/handleQuery";

/* global Excel JSX console document */

export default (): JSX.Element => {
  const [allWorksheets, setAllWorksheets] = useState({});
  const [activeColumns, setActiveColumns] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    /**
     * Loads Current sheets and sets current state
     */
    const getSheet = async () => {
      
      setAllWorksheets(await reloadSheets());
    };
    getSheet();

  }, []);

  const onSubmit = async () => {
    // get query from input text
    const query = (document.getElementById("sqlQueryBox") as HTMLInputElement).value

    // attempt to fix column names if possible

    try {
      const parser = new Parser();
      const { ast } = parser.parse(query);
      handleQuery(ast, allWorksheets); // return columns and data for react table

      setShowTable(true);
    } catch (err) {
      console.log("Invalid query:", err);
      setShowTable(false);
      // (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "invalid query!";
    }
  };

 

  return (
    <Querybox onSubmit={onSubmit} />

    //   {showTable ? <QueryTable columns={columns} data={data} /> : null}
    //   <button
    //     onClick={() => {
    //       setShowTable(false);
    //       (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "";
    //     }}
    //   >
    //     CLEAR
    //   </button>
    //   {showTable ? <button>COPY</button> : null}
    // </div>
  );
};

/* OLD QUERY - ONCE REFACTORED, WE WILL REMOVE */
// export const name = (): JSX.Element => {
//   const [stateRange, setStateRange] = useState<string[][]>([[]]);
//   const [HEADERS, setHEADERS] = useState([]);
//   const [columns, setColumns] = useState<any>([]);
//   const [showTable, setShowTable] = useState(false);

//   // We want to be able to useMemo for the columns as well
//   const data: string[][] = useMemo(() => stateRange.slice(1), [stateRange]);

//   const onSubmit = async (): Promise<void> => {
//     await Excel.run(async (context: Excel.RequestContext): Promise<void> => {
//       const sheet: Excel.Worksheet = excelFuncs.getSheet(context);
//       sheet.load("name"); // getname of the active worksheet

//       const range = sheet.getUsedRange(); // gives us the cells that are being used

//       // NOTE: Needs to accept SQL queries, currently reqires an excel address
//       // const range = sheet.getRange("A1:F3");

//       const parser = new Parser();
//       try {
//         const { ast } = parser.parse((document.getElementById("sqlQueryBox") as HTMLInputElement).value);
//         queryParser(ast, HEADERS, setColumns);
//         // excelFuncs.selectRange(range);
//         setShowTable(true);
//       } catch (err) {
//         console.log("Invalid query:", err);
//         setShowTable(false);
//         // (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "invalid query!";
//       }

//       range.load("address");
//       range.load("values");

//       await context.sync();

//       setStateRange(range.values);
//     });
//   };

//   useEffect(() => {
//     const onLoad = async (): Promise<void> => {
//       await Excel.run(async (context: Excel.RequestContext): Promise<void> => {
//         const sheet: Excel.Worksheet = excelFuncs.getSheet(context);
//         const range: any = sheet.getUsedRange();
//         range.load("values");
//         await context.sync();
//         // range.values[0] is the headers from the spreadsheet
//         // we are creating an array of objects which has the same formatting as react-table
//         setHEADERS(
//           range.values[0].map((column: string, i: number) => {
//             return { Header: column, accessor: `${i}`, Filter: ColumnFilter };
//           })
//         );
//       });
//     };

//     onLoad();
//   }, []);

//   // useEffect(() => {
//   //   setColumns(
//   //     stateRange[0].map((column: string, i: number) => {
//   //       return { Header: column, accessor: `${i}`, Filter: ColumnFilter };
//   //     })
//   //   );
//   // }, [stateRange]);

//   return (
//     <div>
//       <Querybox onSubmit={onSubmit} />

//       {showTable ? <QueryTable columns={columns} data={data} /> : null}
//       <button
//         onClick={() => {
//           setShowTable(false);
//           (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "";
//         }}
//       >
//         CLEAR
//       </button>
//       {showTable ? <button>COPY</button> : null}
//     </div>
//   );
// };
