'use client';

import Button from '@/components/button/Button';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { ButtonColor } from '@/models/enums/ButtonColor';
import { Size } from '@/models/enums/Size';
import { ButtonType } from '@/models/enums/ButtonType';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { Color } from '@/models/enums/Color';
import { memo, useEffect, useState, KeyboardEvent, MouseEvent, Fragment } from 'react';
import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { Menu, MenuItem } from '@mui/material';
import styles from './row.module.scss';
import Datacell from './datacell/Datacell';

type RowProps = {
  row: TableRowDto;
  updateDatacellValueById: (datacellId: number, value: string) => void;
  removeRowById: (rowId: number) => void;
};

function Row(props: RowProps) {
  const { row: _row, updateDatacellValueById, removeRowById } = props;

  const [row, setRow] = useState<TableRowDto>(_row);
  useEffect(() => {
    setRow(_row);
  }, [_row]);

  let rowColorClass = 'row';
  switch (row.color) {
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

  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const openDropdown = Boolean(anchorEl);

  const handleOpenDropdown = (event: KeyboardEvent | MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <tr className={`${styles.dataRow} ${styles[rowColorClass]}`}>
      {row.datacells.map((datacell) => {
        if (datacell.isLastColumn) {
          return (
            <Fragment key={datacell.id}>
              <Menu open={openDropdown} onClose={handleCloseDropdown} anchorEl={anchorEl}>
                <MenuItem
                  onClick={() => {
                    handleCloseDropdown();
                    removeRowById(row.id);
                  }}
                >
                  Delete row
                </MenuItem>
              </Menu>
              <Datacell
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
                    onClick={handleOpenDropdown}
                  />
                  <DragIndicatorRoundedIcon className={styles.draggableIcon} />
                </div>
              </Datacell>
            </Fragment>
          );
        }
        return <Datacell key={datacell.id} onSave={updateDatacellValueById} datacell={datacell} />;
      })}
    </tr>
  );
}

export default memo(Row);
