'use client';

import React, { useState, KeyboardEvent, MouseEvent, useEffect } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { TableDatacellDto } from '@/models/interfaces/TableDatacellDto';
import Textarea from '@/components/textarea/Textarea';
import { Menu, MenuItem } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import styles from './datacell.module.scss';

type DatacellProps = {
  className?: string;
  children?: React.ReactNode;
  textClassName?: string;
  iconClassName?: string;
  datacell: TableDatacellDto;
  onSave: (datacellId: number, value: string) => void | Function;
  isEditingByDefault?: boolean;
};

function Datacell(props: DatacellProps) {
  const { className, children, textClassName, iconClassName, onSave, datacell, isEditingByDefault } = props;
  const [datacellValue, setDatacellValue] = useState<string>(datacell.value);
  useEffect(() => {
    setDatacellValue(datacell.value);
  }, [datacell.value]);

  const isDropdown = datacell.dropdown !== null;
  const isDatepicker = datacell.datepicker !== null;

  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const openDropdown = Boolean(anchorEl);

  const [isEditing, setIsEditing] = useState(isDropdown ? false : isEditingByDefault);

  const handleOpen = (event: KeyboardEvent | MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSave = (newValue: string) => {
    setIsEditing(false);
    onSave(datacell.id, newValue);
    setDatacellValue(newValue);
  };

  return (
    <td className={`${styles.datacellContainer}`}>
      <div className={`${className} ${styles.datacell}`}>
        {isEditing ? (
          <Textarea
            onEnter={(newValue) => handleSave(newValue)}
            onOutsideClick={(newValue) => handleSave(newValue)}
            defaultValue={datacellValue}
          />
        ) : (
          <div
            className={`${styles.datacellData} ${textClassName} ${isDropdown ? styles.dropdownEdit : styles.textEdit}`}
          >
            {isDatepicker ? (
              <DatePicker
                sx={{
                  '& .MuiInputBase-root': {
                    padding: 0,
                    '& .MuiInputBase-input': {
                      padding: 0,
                      border: 'none',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                }}
                value={dayjs(datacellValue)}
                onChange={(newValue) => {
                  if (newValue !== null) {
                    onSave(datacell.id, newValue.format('YYYY-MM-DD'));
                  }
                }}
              />
            ) : (
              datacellValue
            )}
            {isDropdown && (
              <Menu open={openDropdown} onClose={handleClose} anchorEl={anchorEl}>
                {datacell.dropdown?.options.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={() => {
                      handleClose();
                      onSave(datacell.id, option.value);
                    }}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </Menu>
            )}
            {isDropdown ? (
              <div
                aria-label="Edit"
                role="button"
                tabIndex={0}
                className={styles.iconContainer}
                onClick={(event) => handleOpen(event)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleOpen(event);
                  }
                }}
              >
                <ExpandMoreRoundedIcon className={`${styles.icon} ${iconClassName}`} />
              </div>
            ) : (
              !isDatepicker &&
              !isDropdown && (
                <div
                  aria-label="Edit"
                  role="button"
                  tabIndex={0}
                  className={styles.iconContainer}
                  onClick={() => setIsEditing(true)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      setIsEditing(true);
                    }
                  }}
                >
                  <EditRoundedIcon className={`${styles.icon} ${iconClassName}`} />
                </div>
              )
            )}
          </div>
        )}
        {children}
      </div>
    </td>
  );
}

export default Datacell;
