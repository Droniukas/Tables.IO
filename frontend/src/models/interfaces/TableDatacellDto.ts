import { TableDatacellDropdownDto } from './TableDatacellDropdownDto';

export interface TableDatacellDto {
  id: number;
  value: string;
  columnId: number;
  isLastColumn?: boolean;
  dropdown?: TableDatacellDropdownDto;
  datepicker?: {};
}
