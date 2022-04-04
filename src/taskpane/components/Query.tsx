import React, { useState, useEffect, useMemo } from "react";
import { Parser } from "node-sql-parser"; // Used for onSubmit
import Querybox from "./query/Querybox";
import QueryTable from "./query/QueryTable"; // reactTable
import reloadSheets from "./query/queryFunctions/reloadSheets"; // sets allWorksheets with useEffect
import handleQuery from "./query/queryFunctions/handleQuery";
import hideColumns from "./query/queryFunctions/hideColumns";
// import hideColumns from "./query/queryFunctions/hideColumns";

/* global JSX console document */

const ROWS_LOADED = 20;

export default (): JSX.Element => {
  //see allWorkSheets object in references
  const [allWorksheets, setAllWorksheets] = useState<any>({});
  // hide or show the queryTable
  const [showTable, setShowTable] = useState(false);

  /**
   * use memoize so that the sheet does not re-render unless [allWorksheets] has changed
   * iterate through the allWorkSheets object and assign to allColumns
   */
  const allColumns: any = useMemo(
    (): any => Object.values(allWorksheets).reduce((prev: any, cur: any) => prev.concat(cur.headerInfo), []),
    [allWorksheets]
  );

  /**
   * memoizing table data for react-table
   */
  const data: any = useMemo(
    () => Object.values(allWorksheets).reduce((prev: any, cur: any) => prev.concat(cur.data), []),
    [allWorksheets]
  );
  /**
   * ourTable renders the allColumns and data into the react table, 50 values hardcoded
   */

  const [currRow, setCurrRow] = useState<any>(0);
  const ourTable = useMemo(
    () => <QueryTable columns={allColumns} data={data.slice(currRow - ROWS_LOADED, currRow)} />,
    [currRow]
  );
  console.log("table :", ourTable);

  // const getCurrRow = () => currRow[0];

  /**
   * Loads Current sheets and sets current state
   */
  useEffect(() => {
    const getSheet = async () => {
      const updatedSheet = await reloadSheets();
      setAllWorksheets(updatedSheet);
      setCurrRow(() => {
        console.log("setting currRow");
        return ROWS_LOADED;
      });

      const table = document.getElementById("query-table") as HTMLElement;

      table.addEventListener("scroll", () => {
        if (table.scrollTop > table.scrollHeight - 500) {
          scrollDown();
        }
        // console.log("scrolling up:", table.scrollTop, getCurrRow());
        // if (table.scrollTop < 10 && currRow > ROWS_LOADED) {
        //   scrollUp();
        // }
      });

      const scrollDown = () => {
        table.scrollTop = table.scrollTop - 100;
        setCurrRow((prev: any): any => (prev += 3));
      };

      // const scrollUp = () => {
      //   setCurrRow((prev: any): any => [(prev[0] -= 3)]);
      // };
    };
    getSheet();
  }, []);

  useEffect(() => {
    console.log("inside currRow use effect:", currRow);
  }, [currRow]);

  /**
   * on Submit reads the query
   * if sql query is invalid -> it console.logs invalid query
   *
   */

  // needs to be after the table is loaded

  const onSubmit = async () => {
    console.log("scroll top:", (document.getElementById("query-table") as HTMLElement).scrollTop);
    console.log("div height:", (document.getElementById("query-table") as HTMLElement).scrollHeight);

    try {
      // get query from input text
      const query = (document.getElementById("sqlQueryBox") as HTMLInputElement).value;
      const parser = new Parser();
      const { ast } = parser.parse(query);
      console.log("ast:", ast);

      const { queryHeaders, queryConditions } = handleQuery(ast, allWorksheets); // return columns and queryContitions (WHERE)

      console.log("queryHeaders:", queryHeaders);
      console.log("conditions:", queryConditions);
      await setShowTable(true);

      hideColumns(queryHeaders, allColumns);

      // QueryTable.ourFunction({ queryHeaders, allColumns });
    } catch (err) {
      console.log("Invalid query:", err);
      setShowTable(false);
      // (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "invalid query!";
    }
  };

  return (
    <>
      <Querybox onSubmit={onSubmit} />
      {/* {showTable ? ourTable : null} */}
      <button
        onClick={() => {
          setShowTable(false);
          (document.getElementById("sqlQueryBox") as HTMLInputElement).value = "";
        }}
      >
        CLEAR
      </button>
      {showTable ? <button>COPY</button> : null}
      {ourTable}
    </>
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

/*
import { useAsyncDebounce } from 'react-table'
export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setvalue] useState(filter) 
  const onChange useAsyncDebounce((value) => {
    setFilter(value || undefined)
 }, 1000)
  return (
    <span>
      Search:{' '}
      Binput
        value={value || '}
        onChange={(e) => {
           setvalue(e.target.value)
          onChange(e.target.value)
        }}

*/
