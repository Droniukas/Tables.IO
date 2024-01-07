import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { memo } from 'react';
import TablesSeperator from '../../tablesSeperator/TablesSeperator';
import Row from '../row/Row';

type RowsProps = {
  topRows: TableRowDto[];
  bottomRows: TableRowDto[];
  updateDatacellValueById: (datacellId: number, value: string) => void;
};

function Rows(props: RowsProps) {
  const { bottomRows, topRows, updateDatacellValueById } = props;

  const mapRow = (row: TableRowDto) => <Row key={row.id} row={row} updateDatacellValueById={updateDatacellValueById} />;

  return (
    <tbody>
      {topRows.map(mapRow)}
      <TablesSeperator />
      {bottomRows.map(mapRow)}
    </tbody>
  );
}

export default memo(Rows);
