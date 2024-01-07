import { ColumnDto } from './ColumnDto';
import { TableRowDto } from './TableRowDto';

export interface TableDto {
  id: number;
  columns: ColumnDto[];
  rows: TableRowDto[];
  bottomRowColumnId?: number;
  bottomRowValue?: string;
}
