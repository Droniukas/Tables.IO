import { Color } from '../enums/Color';
import { RowForAddingNewRow } from './RowForAddingNewRow';
import { TableDatacellDto } from './TableDatacellDto';

export interface TableRowDto extends RowForAddingNewRow {
  id: number;
  color: Color;
  datacells: TableDatacellDto[];
  isBottomRow: boolean;
}
