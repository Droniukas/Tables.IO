import { Column } from './Column';
import { TableDataRow } from './TableDataRow';

export interface TableData {
  id: number;
  columns: Column[];
  rows: TableDataRow[];
}
