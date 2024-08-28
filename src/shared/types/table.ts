export type TableBody = {
  columsCount: number;
  rowsCount: number;
  rows: TableRow[],
  dataStart: number;
  dataEnd: number;
} & StringHtmlData

export type TableRow = {
  columns: TableCell[];
  index: number;
} & StringHtmlData

export type TableCell = {
  data: string,
  bold: boolean;
  gray: boolean;
  index: number;
} & StringHtmlData

type StringHtmlData = {
  dataStart: number;
  dataEnd: number;
}