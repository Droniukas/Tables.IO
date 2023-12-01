import { JobApplicationStatus } from "../enums/JobApplicationStatus";
import { TableDataRow } from "./TableDataRow";

export interface JobApplicationTableDataRow extends TableDataRow {
  position: string;
  company: string;
  location: string;
  dateApplied: string;
  status: JobApplicationStatus;
}
