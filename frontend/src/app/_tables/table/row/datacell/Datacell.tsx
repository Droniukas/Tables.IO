'use client';

import React, { ChangeEvent, memo, useRef, useState, KeyboardEvent } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { TextareaAutosize } from '@mui/material';
import styles from './datacell.module.scss';

type DatacellProps = {
  isDropdown?: boolean;
  className?: string;
  children?: React.ReactNode;
  initialText?: string;
  textClassName?: string;
  iconClassName?: string;
  isLastColumn?: boolean;
};

function Datacell(props: DatacellProps) {
  const { isDropdown, className, children, initialText, textClassName, iconClassName, isLastColumn } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const datacellRef = useRef<HTMLTableCellElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialText);

  const onOutsideClick = (event: MouseEvent) => {
    if (!textareaRef.current?.contains(event.target as Node)) {
      setIsEditing(false);
      document.removeEventListener('mousedown', onOutsideClick);
    }
  };

  const onTextareaEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditing(false);
    }
  };

  const onEditIconClick = () => {
    setIsEditing(true);
    document.addEventListener('mousedown', onOutsideClick);
  };

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <td className={`${styles.datacellContainer}`}>
      <div className={`${className} ${styles.datacell}`} ref={datacellRef}>
        {isEditing ? (
          <TextareaAutosize
            value={value}
            autoFocus
            onFocus={(event) => event.target.setSelectionRange(event.target.value.length, event.target.value.length)}
            onChange={(event) => onInputChange(event)}
            ref={textareaRef}
            className={styles.textarea}
            onKeyDown={onTextareaEnterPress}
          />
        ) : (
          <div
            className={`${styles.datacellData} ${textClassName} ${isDropdown ? styles.dropdownEdit : styles.textEdit}`}
          >
            {value}
            {isLastColumn ? (
              <div className={styles.iconContainer}>
                <ExpandMoreRoundedIcon className={`${styles.icon} ${iconClassName}`} />
              </div>
            ) : (
              <div className={styles.iconContainer} onClick={onEditIconClick}>
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
