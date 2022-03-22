import React from "react";

export default () => {
  const onSubmit = async () => {
    console.log("submit was clicked");
    console.log((document.getElementById('sqlQueryBox') as HTMLInputElement).value); 

    await Excel.run(async (context) => {
      // This method adds a percentage AutoFilter to the active worksheet 
      // and applies the filter to a column of the used range.
  
      // Retrieve the active worksheet and the used range on that worksheet.
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const farmData = sheet.getUsedRange();
  
      // Add a filter that will only show the rows with the top 50% of values in column 3.
      sheet.autoFilter.apply(farmData, 3, {
          criterion1: "50",
          filterOn: Excel.FilterOn.topPercent
      });
  
      await context.sync();
  });

  };

  return (
    <>
      <textarea id="sqlQueryBox" placeholder="Enter SQL Query"></textarea>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
};
