import { JobApplicationTableDataRow } from "./JobApplicationTableDataRow";

export interface TableData {
  // here we can other data relative to the whole table
  id: string;
  columnNames: string[];
  // rows: TableDataRow[]; // should be this for further implementation
  rows: JobApplicationTableDataRow[];
}
