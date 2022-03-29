import { ColumnFilter } from "../ColumnFilter";

type astType = {
  columns: any
  from: any
  where: any
}

/**
 * Get all headers selected in the query
 */
export default ({ columns, from, where }: astType, allWorksheets: any) => {
  // return all headers from all worksheets
  if (columns === '*') return Object.values(allWorksheets).reduce((prev: any, cur: any) => prev.concat(cur.headerInfo), [])
  
  // get the headers for the tables that are requested in FROM arguments
  const queryHeaders: any = [];

  // Create an object will all requested columns if it is not *
  const objWithColumns: any = {};
  for (const column of columns) {
    objWithColumns[column.expr.column] = true;
  }



  for (const fromObj of from) {
    // make sure that the table they are looking for is in 
    if (allWorksheets[fromObj.table]) {
      const headersArray = allWorksheets[fromObj.table].headerInfo
      console.log('headers array', headersArray);

      for (const headerInfo of headersArray) {
        if (objWithColumns[headerInfo.Header]) queryHeaders.push(headerInfo)
      }
    }
  }

  console.log('where', where)
  // if there is no where or there is only 1 condition then return it in an array
  let queryConditions = [where]
  if (where?.value) queryConditions = where.value

  return { queryHeaders, queryConditions };
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
