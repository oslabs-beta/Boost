import selectParser from "./selectParser"

export default (ast: any, allWorksheets: any): any => {
  // ast will be an array if the sql query ends in a semi colon or there are multiple queries
  if (Array.isArray(ast)) ast = ast[0];

  switch (ast.type) {
    case "select":
      return selectParser(ast, allWorksheets);
  }
};
