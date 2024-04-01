import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { memo } from 'react';
import TablesSeperator from '../../tablesSeperator/TablesSeperator';
import Row from '../row/Row';
import RowForAddingNewRow from '../row/RowForAddingNewRow';

type RowsProps = {
  rows: TableRowDto[];
  hasRowForAddingNewRow: boolean;
  updateDatacellValueById: (datacellId: number, value: string) => void;
  removeRowById: (rowId: number) => void;
  onAddNewRow: (row: TableRowDto) => void;
  onCancelAddNewRow: () => void;
  tableId: number;
};

function Rows(props: RowsProps) {
  const {
    rows,
    hasRowForAddingNewRow,
    tableId,
    updateDatacellValueById,
    removeRowById,
    onAddNewRow,
    onCancelAddNewRow,
  } = props;

  const topRows = rows.filter((row) => !row.isBottomRow) as TableRowDto[];
  const bottomRows = rows.filter((row) => row.isBottomRow) as TableRowDto[];

  const mapRow = (row: TableRowDto) => (
    <Row key={row.id} row={row} updateDatacellValueById={updateDatacellValueById} removeRowById={removeRowById} />
  );

  return (
    <tbody>
      {hasRowForAddingNewRow && (
        <RowForAddingNewRow onSubmit={onAddNewRow} onCancel={onCancelAddNewRow} tableId={tableId} />
      )}
      {topRows.map(mapRow)}
      <TablesSeperator />
      {bottomRows.map(mapRow)}
    </tbody>
  );
}

export default memo(Rows);
