import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { memo } from 'react';
import { RowForAddingNewRow } from '@/models/interfaces/RowForAddingNewRow';
import TablesSeperator from '../../tablesSeperator/TablesSeperator';
import Row from '../row/Row';

type RowsProps = {
  rows: (TableRowDto | RowForAddingNewRow)[];
  updateDatacellValueById: (datacellId: number, value: string) => void;
  removeRowById: (rowId?: number) => void;
};

function Rows(props: RowsProps) {
  const { rows, updateDatacellValueById, removeRowById } = props;

  const topRows = rows.filter((row) => !row.isRowForAddingNewRow && !(row as TableRowDto).isBottomRow) as TableRowDto[];
  const bottomRows = rows.filter(
    (row) => !row.isRowForAddingNewRow && (row as TableRowDto).isBottomRow
  ) as TableRowDto[];
  const rowForAddingNewRow = rows.find((row) => row.isRowForAddingNewRow) as RowForAddingNewRow;

  const mapRow = (row: TableRowDto) => (
    <Row key={row.id} row={row} updateDatacellValueById={updateDatacellValueById} removeRowById={removeRowById} />
  );

  return (
    <tbody>
      {rowForAddingNewRow && (
        <Row row={rowForAddingNewRow} updateDatacellValueById={updateDatacellValueById} removeRowById={removeRowById} />
      )}
      {topRows.map(mapRow)}
      <TablesSeperator />
      {bottomRows.map(mapRow)}
    </tbody>
  );
}

export default memo(Rows);
