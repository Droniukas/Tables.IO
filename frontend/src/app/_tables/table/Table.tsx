'use client';

import { InputDatacellValueDto } from '@/models/interfaces/InputDatacellValueDto';
import { TableDto } from '@/models/interfaces/TableDto';
import { useCallback, useState } from 'react';
import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { ColumnDto } from '@/models/interfaces/ColumnDto';
import { TableDatacellDto } from '@/models/interfaces/TableDatacellDto';
import { RowForAddingNewRow } from '@/models/interfaces/RowForAddingNewRow';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Columns from './columns/Columns';
import Rows from './rows/Rows';
import styles from './table.module.scss';
import TableButtons from './TableButtons';

type TableProps = {
  tableDto: TableDto;
};

function Table(props: TableProps) {
  const { tableDto } = props;
  const [rows, setRows] = useState<(TableRowDto | RowForAddingNewRow)[]>(tableDto.rows);
  const [columns] = useState<ColumnDto[]>(tableDto.columns);

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
        if (row.isRowForAddingNewRow) return row;
        if ((row as TableRowDto).datacells.some((datacell: TableDatacellDto) => datacell.id === datacellId)) {
          return newRow;
        }
        return row;
      });

      setRows(newRows);
    },
    [rows]
  );

  const onAddRowClick = useCallback(() => {
    if (rows.some((row) => row.isRowForAddingNewRow)) return;
    setRows((prevRows) => [...prevRows, { isRowForAddingNewRow: true }]);
  }, [rows]);

  const onRemoveRowById = useCallback((rowId?: number) => {
    if (!rowId) {
      setRows((prevRows) => prevRows.filter((row) => !row.isRowForAddingNewRow));
      return;
    }
    // should be some database action for deleting row as well as the code bellow
    setRows((prevRows) => prevRows.filter((row) => (row as TableRowDto).id !== rowId));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TableButtons onAddRowClick={onAddRowClick} />
      <table className={styles.table}>
        <Columns columns={columns} />
        <Rows rows={rows} updateDatacellValueById={updateDatacellValueById} removeRowById={onRemoveRowById} />
      </table>
      <div className={styles.pagination}>Pagination</div>
    </LocalizationProvider>
  );
}

export default Table;
