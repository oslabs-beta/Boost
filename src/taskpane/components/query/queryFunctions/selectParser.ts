/* global  */

import whereFilter from "./whereFilter";

/**
 * setting the types for the result of the AST parser
 */
type astType = {
  columns: any;
  from: any;
  where: any;
};

/**
 * returns the selected headers and selected conditions of the query
 */
export default ({ columns, from, where }: astType, allWorksheets: any) => {
  // get the headers for the tables that are requested in FROM arguments
  /**
   * Populating queryHeaders with all the selected column names/ headers
   * an array of objects that has the column name, accessor and Filter: ColumnFilter (built-in from react table)
   * ex.) { table: table_name, header: column, accessor: `${accessorValue++}` };
   */
  let queryHeaders: any = [];

  if (columns === "*") {
    // enter the objects in the order of the tables
    for (const fromObj of from) {
      queryHeaders = queryHeaders.concat(allWorksheets[fromObj.table].headerInfo);
    }
  } else {
    // create a hash table mapping column names to header objects
    const objWithColumns: any = {};
    for (const header of allWorksheets._headers) {
      objWithColumns[header.header] = header;
    }
    for (const column of columns) {
      queryHeaders.push(objWithColumns[column.expr.column]);
    }
  }

  // get the conditions for rendering the rows
  const queryConditions = {
    where: [where], // if where is only 1 condition then return it in an array to keep data formatting consistant
  };
  if (queryConditions.where[0]?.value) queryConditions.where = where.value;

  // filter our any rows that don't meet the where conditions
  let validRows = allWorksheets._data;
  // where here refers to the paramater so it will be null if there are no where conditions
  if (where) validRows = whereFilter(queryConditions.where, allWorksheets);

  // hold the order that data should appear in each row
  const order: any = [];
  for (const header of queryHeaders) {
    order.push(header.accessor);
  }

  // data being displayed on the table
  const queryData = [];
  let i = 0;

  while (validRows[i]) {
    const row: any = [];
    for (const accessor of order) {
      row.push(validRows[i][accessor]);
    }
    queryData.push(row);
    i++;
  }

  return { queryHeaders, queryData };
};
