'use client';

import Button from '@/components/button/Button';
import { ButtonColor } from '@/models/enums/ButtonColor';
import { Size } from '@/models/enums/Size';
import { ButtonType } from '@/models/enums/ButtonType';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { TableDto } from '@/models/interfaces/TableDto';
import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { InputDatacellValueDto } from '@/models/interfaces/InputDatacellValueDto';
import { useCallback, useMemo, useState } from 'react';
import Rows from './rows/Rows';
import Columns from './columns/Columns';
import styles from './table.module.scss';

type TableProps = {
  tableDto: TableDto;
};

function Table(props: TableProps) {
  const { tableDto } = props;
  const [tableData, setTableData] = useState<TableDto>(tableDto);
  const { columns } = tableData;
  const { rows } = tableData;

  // should all performance heavier calculations like these two below be memoized/handled for performance in nextjs?
  const checkIsBottomRow = useCallback(
    (row: TableRowDto) =>
      row.datacells.find((datacell) => datacell.columnId === tableData.bottomRowColumnId)?.value ===
      tableData.bottomRowValue,
    []
  );
  const topRows: TableRowDto[] = useMemo(() => rows.filter((row) => !checkIsBottomRow(row)), [tableDto]);
  const bottomRows: TableRowDto[] = useMemo(() => rows.filter((row) => checkIsBottomRow(row)), [tableDto]);

  const updateDatacellValueById = useCallback(async (datacellId: number, value: string) => {
    const body: InputDatacellValueDto = { value };

    await fetch(`https://localhost:7086/api/Table/updateDatacellValueById/${datacellId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    rows
      .find((row) => row.datacells.find((datacell) => datacell.id === datacellId))!
      .datacells.find((datacell) => datacell.id === datacellId)!.value = value;
    

    setTableData((prev) => {
      const outputTable = prev.rows.map((row) => {
        row.datacells.map((datacell) => {
          if (datacell.id === datacellId) {
            datacell.value = value;
          }
          return datacell;
        });
        return outputTable;
      })
    });
  }, []);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableButtons}>
        <div className={styles.buttonGroup}>
          <Button
            color={ButtonColor.PRIMARY}
            size={Size.MEDIUM}
            active
            buttonType={ButtonType.ICON_RIGHT}
            text="Add row"
            icon={AddRoundedIcon}
            onClick={() => console.log('works')}
          />
          <Button
            color={ButtonColor.PRIMARY}
            size={Size.MEDIUM}
            buttonType={ButtonType.ICON_RIGHT}
            text="Edit layout"
            icon={EditRoundedIcon}
          />
        </div>
        <Button
          color={ButtonColor.PRIMARY}
          size={Size.MEDIUM}
          buttonType={ButtonType.ICON_RIGHT}
          text="2 Rows selected"
          icon={CloseRoundedIcon}
        />
      </div>
      <table className={styles.table}>
        <Columns columns={columns} />
        <Rows topRows={topRows} bottomRows={bottomRows} updateDatacellValueById={updateDatacellValueById} />
      </table>
      <div className={styles.pagination}>Pagination</div>
    </div>
  );
}

export default Table;
