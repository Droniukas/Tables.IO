'use client';

import { TableRowDto } from '@/models/interfaces/TableRowDto';
import Button from '@/components/button/Button';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { ButtonColor } from '@/models/enums/ButtonColor';
import { Size } from '@/models/enums/Size';
import { ButtonType } from '@/models/enums/ButtonType';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { Color } from '@/models/enums/Color';
import { memo, useEffect, useState } from 'react';
import { RowForAddingNewRow } from '@/models/interfaces/RowForAddingNewRow';
import Textarea from '@/components/textarea/Textarea';
import { CircularProgress } from '@mui/material';
import { InputURLDto } from '@/models/interfaces/InputURLDto';
import styles from './row.module.scss';
import Datacell from './datacell/Datacell';

type RowProps = {
  row: TableRowDto | RowForAddingNewRow;
  updateDatacellValueById: (datacellId: number, value: string) => void;
  removeRowById: (rowId?: number) => void;
};

function Row(props: RowProps) {
  const { row: _row, updateDatacellValueById, removeRowById } = props;

  const [row, setRow] = useState<TableRowDto | RowForAddingNewRow>(_row);
  useEffect(() => {
    setRow(_row);
  }, [_row]);

  const [isAddingNewRow, setIsAddingNewRow] = useState(false);

  useEffect(() => {
    setIsAddingNewRow(false);
  }, []);

  let rowColorClass = 'row';
  if (!row.isRowForAddingNewRow) {
    switch ((row as TableRowDto).color) {
      case Color.SUCCESS:
        rowColorClass += '-success';
        break;
      case Color.SECONDARY:
        rowColorClass += '-secondary';
        break;
      case Color.NEUTRAL:
        rowColorClass += '-neutral';
        break;
    }
  }

  const generateNewRowFromLink = async (linkedInLink: string) => {
    setIsAddingNewRow(true);

    const body: InputURLDto = { url: linkedInLink };
    const jobData = await (
      await fetch('https://localhost:7086/api/Table/autoGenerateJobData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json();
    setIsAddingNewRow(false);
    removeRowById();

    console.log(jobData);
  };

  return (
    <tr className={`${styles.dataRow} ${styles[rowColorClass]}`}>
      {row.isRowForAddingNewRow ? (
        (row as TableRowDto)?.datacells ? (
          <div>s</div>
        ) : (
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
                  if (!isAddingNewRow) removeRowById();
                }}
                defaultValue=""
                placeholder="Add LinkedIn Link here.."
                disabled={false}
              />
            </div>
          </td>
        )
      ) : (
        <>
          {(row as TableRowDto).datacells.map((datacell) => {
            if (datacell.isLastColumn) {
              return (
                <Datacell
                  key={datacell.id}
                  className={styles.lastRow}
                  textClassName={styles.textData}
                  iconClassName={styles.dropdownIcon}
                  datacell={datacell}
                  onSave={updateDatacellValueById}
                >
                  <div className={styles.tableRowIcons}>
                    <Button
                      icon={MoreHorizRoundedIcon}
                      color={ButtonColor.PRIMARY}
                      size={Size.SMALL}
                      buttonType={ButtonType.ONLY_ICON}
                    />
                    <DragIndicatorRoundedIcon className={styles.draggableIcon} />
                  </div>
                </Datacell>
              );
            }
            return <Datacell key={datacell.id} onSave={updateDatacellValueById} datacell={datacell} />;
          })}
        </>
      )}
    </tr>
  );
}

export default memo(Row);
