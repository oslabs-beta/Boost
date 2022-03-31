import { ColumnFilter } from "../ColumnFilter";

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
      Header: string;
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

    let data: any = [];

    /**
     * iterating through all the sheets in the workbook
     * range contains all the data and the headers
     * sheet has the name of the current worksheet
     */
    for (const info of infoArray) {
      const sheet = info[0]; // Retrieving sheet info (refer to line 58)
      const range = info[1]; // Retrieving range info (refer to line 58)
      // console.log("outer values: ", info.values);

      /**
       * headerArray - Creating array list of just the headers, index accessor and Column Filter
       */
      const headerArray = range.values[0].map((column: string) => {
        return { Header: column, accessor: `${accessorValue++}`, Filter: ColumnFilter };
      });

      /**
       * dataArray - Removing index 0 (headers), all the data except the headers
       */
      if (!data.length) {
        data = range.values.slice(1);
      } else {
        const { values } = range;
        for (let i = 0; i < data.length; i++) {
          data[i] = data[i].concat(values[i + 1]);
        }
      }

      // const dataArray = range.values.slice(1);

      // console.log('range:', range.name)
      // console.log('header array:', headerArray)
      // console.log('data array:', dataArray)

      /**
       * Adding a new sheet to workbook
       */
      newWorksheet[sheet.name] = {
        headerInfo: headerArray,
        data,
      };
    }

    // newWorksheet.rabbit = data;

    // use newWorksheet to load react-table

    console.log("newWorksheet:", newWorksheet);
    return newWorksheet;
  });
};
