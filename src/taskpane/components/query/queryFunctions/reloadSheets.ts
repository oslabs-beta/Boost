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

    // how's it going

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
    /**
     *
     */
    let _headers: any = [];

    /**
     * _data is all the worksheets combined into one monsterous array w/o headers
     * _data = values.slice(1); is used to ignore the headers
     * concating the rows together to be one giant table
     */
    let _data: any = [];

    // [          SHEET  RANGE
    //   SHEET 1: [{}, { values: [ [USA, 250,000,000],[],[],[] ] },
    //   SHEET 2: [{}, { values: [[],[],[],[]] },
    // ]

    // find longest dataset
    let max = infoArray[0][1].values.length;
    for (let i = 1; i < infoArray.length; i++) {
      if (max < infoArray[i][1].values.length) {
        max = infoArray[i][1].values.length;
      }
    }

    /**
     * iterating through all the sheets in the workbook
     * range contains all the data and the headers
     * sheet has the name of the current worksheet
     */
    for (const info of infoArray) {
      // get sheet and range info for each sheet
      const { name } = info[0];
      const { values } = info[1];

      /**
       * headerArray - Creating array list of just the headers, index accessor and Column Filter
       */
      const headerArray = values[0].map((column: string) => {
        const curHeader = { table: name, header: column, accessor: `${accessorValue++}` };
        _headers.push(curHeader);
        return curHeader;
      });

      const difference = max - values.length;
      console.log("difference in lengths ", difference);
      for (let i = 0; i < difference; i++) {
        const arr = values[0].slice();
        values.push(arr.fill(""));
        // console.log("arrays with added arrays", arr.fill(""))
      }

      /**
       * hold all the data from all sheets
       * combining the worksheets rows into one
       */
      if (!_data.length) {
        _data = values.slice(1);
      } else {
        for (let i = 0; i < _data.length; i++) {
          _data[i] = _data[i].concat(values[i + 1]);
        }
      }

      /**
       * Adding a new sheet to workbook
       */
      newWorksheet[name] = {
        headerInfo: headerArray,
        data: values.slice(1),
      };
    }

    console.log("data:", _data);

    newWorksheet._headers = _headers;
    newWorksheet._data = _data;

    // use newWorksheet to load react-table
    console.log("newWorksheet:", newWorksheet);
    return newWorksheet;
  });
};
