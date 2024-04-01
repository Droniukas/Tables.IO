'use client';

import { memo, useEffect, useState } from 'react';

import { InputURLDto } from '@/models/interfaces/InputURLDto';
import Textarea from '@/components/textarea/Textarea';
import { CircularProgress } from '@mui/material';
import { TableRowDto } from '@/models/interfaces/TableRowDto';
import styles from './row.module.scss';

type RowForAddingNewRowProps = {
  onCancel: () => void;
  onSubmit: (row: TableRowDto) => void;
  tableId: number;
};

function RowForAddingNewRow(props: RowForAddingNewRowProps) {
  const { onCancel, onSubmit, tableId } = props;
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);

  useEffect(() => {
    setIsAddingNewRow(false);
  }, []);

  const generateNewRowFromLink = async (linkedInLink: string) => {
    setIsAddingNewRow(true);
    console.log(tableId);

    const body: InputURLDto = { url: linkedInLink, tableId };
    const newRow: TableRowDto = await (
      await fetch('https://localhost:7086/api/Table/autoGenerateJobData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json();

    onSubmit(newRow);
    setIsAddingNewRow(false);
  };

  return (
    <tr className={`${styles.dataRow}`}>
      <td colSpan={100} aria-label="Add LinkedIn Link">
        <div
          className={`${styles['overlay-background']} ${styles.overlay} ${
            isAddingNewRow ? styles['overlay-active'] : ''
          }`}
        >
          <CircularProgress
            style={{
              color: '#738191',
            }}
            className={`${styles.overlay}} ${isAddingNewRow ? styles['overlay-active'] : ''}`}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Textarea
            onEnter={generateNewRowFromLink}
            onOutsideClick={() => {
              if (!isAddingNewRow) onCancel();
            }}
            defaultValue=""
            placeholder="Add LinkedIn Link here.."
            disabled={false}
          />
        </div>
      </td>
    </tr>
  );
}

export default memo(RowForAddingNewRow);
