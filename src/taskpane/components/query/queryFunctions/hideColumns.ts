/* global document console */

// export default (queryHeaders: any, setValue: any) => {
//   const newValue: any = [];
//   for (const item of queryHeaders) {
//     newValue.push(item.accessor);
//   }
//   setValue(newValue);
// };

export default (queryHeaders: any, allColumns: any) => {
  console.log("queryHeaders from hideColumns", queryHeaders);

  const columnIDs: any = {};

  // queryHeaders { Header: column, accessor: `${accessorValue++}`, Filter: ColumnFilter }

  for (const headerInfo of queryHeaders) {
    columnIDs[headerInfo.accessor] = true;

    console.log("columnIDs ", columnIDs[headerInfo.accessor]);
  }

  console.log("hashmap:",columnIDs);

  // console.log("an html element:", document.getElementById("sqlQueryBox") as HTMLInputElement);
  // const checkbox = document.getElementById('check0') as HTMLInputElement;
  // console.log("checkbox", checkbox);

  for (const column of allColumns) {
    const checkbox = document.getElementById(`check${column.accessor}`) as HTMLInputElement;
    checkbox.checked = columnIDs[column.accessor];
    console.log('checkbox ' + column?.accessor + ' ' + checkbox?.checked)
    const event = new Event("change");
    checkbox.dispatchEvent(event);
  }
};
