import { ColumnFilter } from "../ColumnFilter";

type astType = {
  columns: any
  from: any
}

/**
 * Get all headers selected in the query
 */
export default ({ columns, from }: astType, allWorksheets: any) => {
  const objWithColumns: any = {};

  // Create an object will all requested columns if it is not *
  if (columns !== '*') {
    for (const column of columns) {
      objWithColumns[column.expr.column] = true;
    }
  }

  // get the headers for the tables that are requested in FROM arguments
  const headers: any = [];

  for (const fromObj of from) {
    // make sure that the table they are looking for is in 
    if (allWorksheets[fromObj.table]) {
      const headersArray = allWorksheets[fromObj.table].headerInfo
      console.log('headers array', headersArray);
      for (const headerInfo of headersArray) {
        if (objWithColumns[headerInfo.Header]) headers.push(headerInfo)
      }
    }
  }
  return headers;
}


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
