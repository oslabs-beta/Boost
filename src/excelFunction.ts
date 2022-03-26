/**
 * Get the active worksheet
 * @param {object}
 * @return {object}
 */
export const getSheet = (context: Excel.RequestContext): Excel.Worksheet => {
  return context.workbook.worksheets.getActiveWorksheet();
};

/**
 * Select a range of cells in the excel sheet
 * @param {object}
 * @return {object}
 */
export const selectRange = (range: Excel.Range): void => range.select();

/**
 * selects all the cells that are filled
 */
// const range = excelFuncs.getSheet(context).getUsedRange();
