/* global console */

export default (ast: any, columns: any) => {
  // ast will be an array if the sql query ends in a semi colon or there are multiple queries
  if (Array.isArray(ast)) ast = ast[0];

  switch (ast.type) {
    case "select":
      handleSelect(ast, columns);
      break;
  }
};

/*

ast = { columns: is “*” or array of objects [ {as : null ]}, { expr: { columns: “population”, table: “null”, type: “column_left” }, }

*/

const handleSelect = (ast: any, columns: any) => {
  // console.log("Handling select:", ast);

  if (ast.columns === "*") {
    console.log("Select all columns");
  } else {
    for (const search of ast.columns) {
      console.log(
        "filtered header: ",
        columns.filter((header: any) => {
          console.log("header:", header);
          console.log("column:", search.expr.column);
          return header === search.expr.column;
        })
      );
      console.log("columns:", search.expr.column); // get the columns
    }
  }

  // console.log("WHERE: ");
  // if (ast.where) {
  //   console.log(ast.where.left);
  //   console.log(ast.where.operator);
  //   console.log(ast.where.right);
  // }
};
