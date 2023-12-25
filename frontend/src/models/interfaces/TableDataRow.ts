import { Color } from '../enums/Color';
import { TableDataDatacell } from './TableDataDatacell';

export interface TableDataRow {
  id: number;
  color: Color;
  datacells: TableDataDatacell[];
  isBottomRow?: boolean;
}
