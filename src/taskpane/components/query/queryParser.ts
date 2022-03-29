import { ColumnFilter } from "./ColumnFilter";
/* global console Excel */

export default (ast: any, columns: any, setColumns: any) => {
  // ast will be an array if the sql query ends in a semi colon or there are multiple queries
  if (Array.isArray(ast)) ast = ast[0];

  switch (ast.type) {
    case "select":
      handleSelect(ast, columns, setColumns);
      break;
  }
};

/*

ast = { columns: is “*” or array of objects [ {as : null ]}, { expr: { columns: “population”, table: “null”, type: “column_left” }, }

*/

const handleSelect = async (ast: any, columns: any, setColumns: any) => {
  // console.log("Handling select:", ast);

  if (ast.columns === "*") {
    setColumns(columns);
  } else {
    const arr = [];

    for (let i = 0; i < columns.length; i++) {
      for (const obj of ast.columns) {
        if (obj.expr.column === columns[i].Header) {
          arr.push({ Header: columns[i].Header, accessor: `${i}`, Filter: ColumnFilter });
          break;
        }
      }
    }
    setColumns(arr);
  }

  await Excel.run(async (context: Excel.RequestContext) => {
    let sheets = context.workbook.worksheets;
    sheets.load("items/name");

    await context.sync();

    if (sheets.items.length > 1) {
      console.log(`There are ${sheets.items.length} worksheets in the workbook:`);
    } else {
      console.log(`There is one worksheet in the workbook:`);
    }

    const sheetArray: any = [];

    for (const sheet of sheets.items) {
      console.log("Sheet name", sheet.name);
      const curRange = sheet.getUsedRange();
      curRange.load("values");
      await context.sync();
      sheetArray.push(curRange.values);
      console.log(sheetArray);
    }
  });
};
