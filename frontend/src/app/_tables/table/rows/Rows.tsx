import { TableDataRow } from '@/models/interfaces/TableDataRow';
import TablesSeperator from '../../tablesSeperator/TablesSeperator';
import Row from '../row/Row';

type RowsProps = {
  rows: TableDataRow[];
};

function Rows(props: RowsProps) {
  const { rows } = props;

  // should all performance heavier calculations like these two below be memoized/handled for performance in nextjs?
  const topRows: TableDataRow[] = rows.filter((row) => !row.isBottomRow);
  const bottomRows: TableDataRow[] = rows.filter((row) => row.isBottomRow);

  const mapRow = (row: TableDataRow) => <Row key={row.id} row={row} />;

  return (
    <tbody>
      {topRows.map(mapRow)}
      <TablesSeperator />
      {bottomRows.map(mapRow)}
    </tbody>
  );
}

export default Rows;
