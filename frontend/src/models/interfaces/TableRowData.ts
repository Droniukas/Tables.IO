import { JobApplicationStatus } from "../enums/JobApplicationStatus";
import { JobApplicationColumns } from "./JobApplicationColumns";

export interface TableRowData {
  // here we can have additional data like date modified
  id: string;
  // only the columns
  columns: JobApplicationColumns;
}
