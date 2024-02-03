'use client';

import { InputDatacellValueDto } from '@/models/interfaces/InputDatacellValueDto';
import { TableDto } from '@/models/interfaces/TableDto';
import { useCallback, useState } from 'react';
import Columns from './columns/Columns';
import Rows from './rows/Rows';
import styles from './table.module.scss';
import TableButtons from './TableButtons';

type TableProps = {
  tableDto: TableDto;
};

function Table(props: TableProps) {
  const { tableDto } = props;
  const [tableData, setTableData] = useState<TableDto>(tableDto);

  const { columns, topRows, bottomRows } = tableData;

  const getData = async () => {
    const data = await fetch(`https://localhost:7086/api/Table/${1}`, { cache: 'no-store' });
    return data.json();
  };

  const updateDatacellValueById = useCallback(async (datacellId: number, value: string) => {
    const body: InputDatacellValueDto = { value };

    await fetch(`https://localhost:7086/api/Table/updateDatacellValueById/${datacellId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const newData = await getData();
    setTableData(newData);
  }, []);

  return (
    <>
      <TableButtons />
      <table className={styles.table}>
        <Columns columns={columns} />
        <Rows topRows={topRows} bottomRows={bottomRows} updateDatacellValueById={updateDatacellValueById} />
      </table>
      <div className={styles.pagination}>Pagination</div>
    </>
  );
}

export default Table;
