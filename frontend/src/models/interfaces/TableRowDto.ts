import { Color } from '../enums/Color';
import { TableDatacellDto } from './TableDatacellDto';

export interface TableRowDto {
  id: number;
  color: Color;
  isBottomRow?: boolean;
  datacells: TableDatacellDto[];
}
