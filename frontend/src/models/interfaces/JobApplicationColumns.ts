import { JobApplicationStatus } from "../enums/JobApplicationStatus";

export interface JobApplicationColumns {
  position: string;
  company: string;
  location: string;
  dateApplied: string;
  status: JobApplicationStatus;
}
