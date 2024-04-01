'use client';

import { InputDatacellValueDto } from '@/models/interfaces/InputDatacellValueDto';
import { TableDto } from '@/models/interfaces/TableDto';
import { useCallback, useState } from 'react';
import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { ColumnDto } from '@/models/interfaces/ColumnDto';
import { TableDatacellDto } from '@/models/interfaces/TableDatacellDto';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Columns from './columns/Columns';
import styles from './table.module.scss';
import TableButtons from './TableButtons';
import RowForAddingNewRow from './row/RowForAddingNewRow';
import Row from './row/Row';
import TablesSeperator from '../tablesSeperator/TablesSeperator';

type TableProps = {
  tableDto: TableDto;
};

function Table(props: TableProps) {
  const { tableDto } = props;
  const [rows, setRows] = useState<TableRowDto[]>(tableDto.rows);
  const [columns] = useState<ColumnDto[]>(tableDto.columns);
  const [hasRowForAddingNewRow, setHasRowForAddingNewRow] = useState<boolean>(false);

  const updateDatacellValueById = useCallback(
    async (datacellId: number, value: string) => {
      const body: InputDatacellValueDto = { value };

      const newRow = await (
        await fetch(`https://localhost:7086/api/Table/updateDatacellValueById/${datacellId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
      ).json();

      const newRows = rows.map((row) => {
        if (row.datacells.some((datacell: TableDatacellDto) => datacell.id === datacellId)) {
          return newRow;
        }
        return row;
      });

      setRows(newRows);
    },
    [rows]
  );

  const onAddRowClick = useCallback(() => {
    setHasRowForAddingNewRow(true);
  }, []);

  const onRemoveRowById = useCallback(async (rowId: number) => {
    await fetch(`https://localhost:7086/api/Table/removeRowById/${rowId}`, {
      method: 'DELETE',
    });
    setRows((prevRows) => prevRows.filter((row) => row!.id !== rowId));
  }, []);

  const onAddNewRow = useCallback((row: TableRowDto) => {
    setRows((prevRows) => [...prevRows, row]);
    setHasRowForAddingNewRow(false);
  }, []);

  const onCancelAddNewRow = () => {
    setHasRowForAddingNewRow(false);
  };

  const topRows = rows.filter((row) => !row.isBottomRow) as TableRowDto[];
  const bottomRows = rows.filter((row) => row.isBottomRow) as TableRowDto[];

  const mapRow = (row: TableRowDto) => (
    <Row key={row.id} row={row} updateDatacellValueById={updateDatacellValueById} removeRowById={onRemoveRowById} />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TableButtons onAddRowClick={onAddRowClick} />
      <table className={styles.table}>
        <Columns columns={columns} />
        <tbody>
          {hasRowForAddingNewRow && (
            <RowForAddingNewRow onSubmit={onAddNewRow} onCancel={onCancelAddNewRow} tableId={tableDto.id} />
          )}
          {topRows.map(mapRow)}
          <TablesSeperator />
          {bottomRows.map(mapRow)}
        </tbody>
      </table>
      <div className={styles.pagination}>Pagination</div>
    </LocalizationProvider>
  );
}

export default Table;
