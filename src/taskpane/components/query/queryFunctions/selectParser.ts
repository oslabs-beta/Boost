/* global  console */
/**
 * setting the types for the result of the AST parser
 */
type astType = {
  columns: any;
  from: any;
  where: any;
  groupby: any;
  orderby: any;
  having: any;
};

/**
 * returns the selected headers and selected conditions of the query (i.e. WHERE, FROM, GROUPBY, ORDER_By)
 */
export default ({ columns, from, where, groupby, orderby, having }: astType, allWorksheets: any) => {
  // get the headers for the tables that are requested in FROM arguments
  /**
   * Populating queryHeaders with all the selected column names/ headers
   * an array of objects that has the column name, accessor and Filter: ColumnFilter (built-in from react table)
   * ex.) { Header: column, accessor: `${accessorValue++}`, Filter: ColumnFilter };
   */
  let queryHeaders: any = [];

  // Create an object will to hold requested columns with O(1) lookup time
  /**
   * Creating an object with all headers if SELECT *
   */
  const objWithColumns: any = {};

  if (columns === "*") {
    objWithColumns["*"] = true;
  } else {
    for (const column of columns) {
      objWithColumns[column.expr.column] = true;
    }
  }

  /**
   * destructuring fromObj to get the worksheet names (.table is worksheet name)
   * reformatting AST data for use in react-table
   */
  for (const fromObj of from) {
    // make sure that the table they are looking for is in
    if (allWorksheets[fromObj.table]) {
      const headersArray = allWorksheets[fromObj.table].headerInfo;
      /**
       * checking if SELECT * exists in objWithColumns, we are selecting all the headers
       */
      if (objWithColumns["*"]) {
        queryHeaders = queryHeaders.concat(headersArray);
      } else {
        for (const headerInfo of headersArray) {
          if (objWithColumns[headerInfo.Header]) queryHeaders.push(headerInfo);
        }
      }
    } else {
      //error handling for if the table they requested isn't in the worksheets
    }
  }

  // here is only 1 condition then return it in an array
  const queryConditions = {
    where: [where],
    groupby: groupby,
    orderby: orderby,
    having: having,
  };
  if (queryConditions.where[0]?.value) queryConditions.where = where.value;

  console.log("headers, conditions", queryHeaders, queryConditions);

  return { queryHeaders, queryConditions };
};

// export default async (ast: any, columns: any, setColumns: any) => {
//   if (ast.columns === "*") {
//     setColumns(columns);
//   } else {
//     const arr = [];

//     for (let i = 0; i < columns.length; i++) {
//       for (const obj of ast.columns) {
//         if (obj.expr.column === columns[i].Header) {
//           arr.push({ Header: columns[i].Header, accessor: `${i}`, Filter: ColumnFilter });
//           break;
//         }
//       }
//     }
//     setColumns(arr);
//   }

//   await Excel.run(async (context: Excel.RequestContext) => {
//     let sheets = context.workbook.worksheets;
//     sheets.load("items/name");

//     await context.sync();

//     if (sheets.items.length > 1) {
//       console.log(`There are ${sheets.items.length} worksheets in the workbook:`);
//     } else {
//       console.log(`There is one worksheet in the workbook:`);
//     }

//     const sheetArray: any = [];

//     for (const sheet of sheets.items) {
//       console.log("Sheet name", sheet.name);
//       const curRange = sheet.getUsedRange();
//       curRange.load("values");
//       await context.sync();
//       sheetArray.push(curRange.values);
//       console.log(sheetArray);
//     }
//   });
// }
