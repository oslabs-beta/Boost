/* global Excel console*/

export default async (): Promise<any> => {
  return await Excel.run(async (context: Excel.RequestContext): Promise<any> => {
    /**
     * Variable sheets contains all sheets in big nested object
     * sheets is all of the worksheets in the workbook
     */
    let sheets: any = context.workbook.worksheets;
    sheets.load("items/name");
    await context.sync();

    /**
     * TYPES FOR Worksheet Object
     */
    type headerType = {
      header: string;
      Accessor: string;
      Filter: any;
    };

    type sheetInfo = {
      headerInfo?: headerType[];
      data?: string[];
    };

    type newSheet = {
      [key: string]: sheetInfo;
    };

    /**
     * Creating object of current sheets in the workbook
     */
    const newWorksheet: newSheet = {};

    /**
     * Iterating through sheet informations using getUsedRange. Holding both the sheet and the range
     * sheet and range are aync a need to be loaded beforehand
     */
    const infoArray = sheets.items.map((sheet: any) => {
      const range: any = sheet.getUsedRange();
      sheet.load("name");
      range.load("values");
      return [sheet, range];
    });

    await context.sync();

    // keep track of accessor value
    let accessorValue = 0;

    // hold all headers and data in the workbook
    let _headers: any = [];
    let _data: any = []; // rows need to account for blank space

    /**
     * iterating through all the sheets in the workbook
     * range contains all the data and the headers
     * sheet has the name of the current worksheet
     */
    for (const info of infoArray) {
      // get sheet and range info for each sheet
      const sheet = info[0];
      const range = info[1];

      /**
       * headerArray - Creating array list of just the headers, index accessor and Column Filter
       */
      const headerArray = range.values[0].map((column: string) => {
        const curHeader = { table: sheet.name, header: column, accessor: `${accessorValue++}` };
        _headers.push(curHeader);
        return curHeader;
      });

      /**
       * hold all the data from all sheets
       */
      if (!_data.length) {
        _data = range.values.slice(1);
      } else {
        const { values } = range;
        if (_data.length > values.length) {
          for (let i = 0; i < _data.length; i++) {
            _data[i] = _data[i].concat(values[i + 1]);
          }
        }
      }

      /**
       * Adding a new sheet to workbook
       */
      newWorksheet[sheet.name] = {
        headerInfo: headerArray,
        data: range.values.slice(1),
      };
    }

    newWorksheet._headers = _headers;
    newWorksheet._data = _data;

    // use newWorksheet to load react-table
    console.log("newWorksheet:", newWorksheet);
    return newWorksheet;
  });
};
