import { Column } from "./Column";
import { JobApplicationTableDataRow } from "./JobApplicationTableDataRow";

export interface TableData {
  // here we can other data relative to the whole table
  id: number;
  columns: Column[];
  // rows: TableDataRow[]; // should be this for further implementation
  rows: JobApplicationTableDataRow[];
}
