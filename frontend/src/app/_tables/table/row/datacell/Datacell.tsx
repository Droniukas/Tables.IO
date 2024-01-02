'use client';

import React, { memo, useState, useCallback } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { TableDatacellDto } from '@/models/interfaces/TableDatacellDto';
import Textarea from '@/components/textarea/Textarea';
import styles from './datacell.module.scss';

type DatacellProps = {
  className?: string;
  children?: React.ReactNode;
  textClassName?: string;
  iconClassName?: string;
  datacell: TableDatacellDto;
  onSave: (datacellId: number, value: string) => void;
};

function Datacell(props: DatacellProps) {
  const { className, children, textClassName, iconClassName, onSave, datacell } = props;

  const isDropdown = datacell.dropdown !== undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(datacell.value);

  const handleSave = useCallback(
    (id: number, newValue: string) => {
      setIsEditing(false);
      onSave(id, newValue);
    },
    [onSave]
  );

  return (
    <td className={`${styles.datacellContainer}`}>
      <div className={`${className} ${styles.datacell}`}>
        {isEditing ? (
          <Textarea
            onEnter={() => handleSave(datacell.id, value)}
            onOutsideClick={() => handleSave(datacell.id, value)}
            onChange={(event) => setValue(event.target.value)}
            value={value}
          />
        ) : (
          <div
            className={`${styles.datacellData} ${textClassName} ${isDropdown ? styles.dropdownEdit : styles.textEdit}`}
          >
            {value}
            {datacell.isLastColumn ? (
              <div className={styles.iconContainer}>
                <ExpandMoreRoundedIcon className={`${styles.icon} ${iconClassName}`} />
              </div>
            ) : (
              <div className={styles.iconContainer} onClick={() => setIsEditing(true)}>
                <EditRoundedIcon className={`${styles.icon} ${iconClassName}`} />
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </td>
  );
}

export default memo(Datacell);
