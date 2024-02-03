'use client';

import React, { memo } from 'react';
import Button from '@/components/button/Button';
import { ButtonColor } from '@/models/enums/ButtonColor';
import { ButtonType } from '@/models/enums/ButtonType';
import { Size } from '@/models/enums/Size';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import styles from './table.module.scss';

function TableButtons() {
  return (
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
  );
}

export default memo(TableButtons);
