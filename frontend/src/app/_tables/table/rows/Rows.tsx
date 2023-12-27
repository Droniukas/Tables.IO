import { TableRowDto } from '@/models/interfaces/TableRowDto';
import TablesSeperator from '../../tablesSeperator/TablesSeperator';
import Row from '../row/Row';

type RowsProps = {
  rows: TableRowDto[];
};

function Rows(props: RowsProps) {
  const { rows } = props;

  // should all performance heavier calculations like these two below be memoized/handled for performance in nextjs?
  const topRows: TableRowDto[] = rows.filter((row) => !row.isBottomRow);
  const bottomRows: TableRowDto[] = rows.filter((row) => row.isBottomRow);

  const mapRow = (row: TableRowDto) => <Row key={row.id} row={row} />;

  return (
    <tbody>
      {topRows.map(mapRow)}
      <TablesSeperator />
      {bottomRows.map(mapRow)}
    </tbody>
  );
}

export default Rows;
