import { TableDatacellDropdownDto } from './TableDatacellDropdownDto';

export interface TableDatacellDto {
  id: number;
  value: string;
  isLastColumn?: boolean;
  dropdown?: TableDatacellDropdownDto;
  datepicker?: {};
}
