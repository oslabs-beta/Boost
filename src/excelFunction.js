/**
 * Get the active worksheet
 * @param {object}
 * @return {object}
 */
export const getSheet = (context) => {
  return context.workbook.worksheets.getActiveWorksheet();
};

/**
 * Select a range of cells in the excel sheet
 * @param {object}
 * @return {object}
 */
export const selectRange = (range) => {
  range.select();
};

/**
 * selects all the cells that are filled
 */
// const range = excelFuncs.getSheet(context).getUsedRange();
