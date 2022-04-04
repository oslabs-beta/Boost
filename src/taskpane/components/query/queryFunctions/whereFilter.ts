export default (where: any, allWorksheets: any): any => {
  // prev is the rows that are still valid
  // cur is the conditions
  const validData = where.reduce((prev: any, cur: any) => {
    const validRows = [];
    const { left, operator, right } = cur;
    const { column } = left;
    const { value } = right;

    // determine the column accessor
    let accessor;
    for (const header of allWorksheets._headers) {
      if (header.header === column) {
        accessor = header.accessor;
        break;
      }
    }

    // push each valid row into validRows
    switch (operator) {
      case "=":
        for (const row of prev) {
          if (row[accessor] === value) validRows.push(row);
        }
        break;
      case ">":
        for (const row of prev) {
          if (row[accessor] > value) validRows.push(row);
        }
        break;
      case "<":
        for (const row of prev) {
          if (row[accessor] < value) validRows.push(row);
        }
        break;
      case ">=":
        for (const row of prev) {
          if (row[accessor] >= value) validRows.push(row);
        }
        break;
      case "<=":
        for (const row of prev) {
          if (row[accessor] <= value) validRows.push(row);
        }
        break;
      case "<>":
        for (const row of prev) {
          if (row[accessor] != value) validRows.push(row);
        }
        break;
    }

    return validRows;
  }, allWorksheets._data);

  return validData;
};
