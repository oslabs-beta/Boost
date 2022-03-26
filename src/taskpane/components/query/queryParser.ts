/* global console */

export default (ast: any) => {
  // ast will be an array if the sql query ends in a semi colon or there are multiple queries
  if (Array.isArray(ast)) ast = ast[0];

  switch (ast.type) {
    case "select":
      handleSelect(ast);
      break;
  }
};

const handleSelect = (ast: any) => {
  console.log("Handling select:", ast);
};
