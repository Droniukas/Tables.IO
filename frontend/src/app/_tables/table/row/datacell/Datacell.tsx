'use client';

import React, { useState, KeyboardEvent, MouseEvent } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { TableDatacellDto } from '@/models/interfaces/TableDatacellDto';
import Textarea from '@/components/textarea/Textarea';
import { Menu, MenuItem } from '@mui/material';
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

  const isDropdown = datacell.dropdown !== null;

  const [isEditing, setIsEditing] = useState(false);

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<(EventTarget & Element) | null>(null);
  const openDropdown = Boolean(dropdownAnchorEl);

  const handleOpenDropdown = (event: KeyboardEvent | MouseEvent) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setDropdownAnchorEl(null);
  };

  const handleSave = (newValue: string) => {
    setIsEditing(false);
    onSave(datacell.id, newValue);
  };

  return (
    <td className={`${styles.datacellContainer}`}>
      <div className={`${className} ${styles.datacell}`}>
        {isEditing ? (
          <Textarea
            onEnter={(newValue) => handleSave(newValue)}
            onOutsideClick={(newValue) => handleSave(newValue)}
            defaultValue={datacell.value}
          />
        ) : (
          <div
            className={`${styles.datacellData} ${textClassName} ${isDropdown ? styles.dropdownEdit : styles.textEdit}`}
          >
            {datacell.value}
            {isDropdown && (
              <Menu open={openDropdown} onClose={handleCloseDropdown} anchorEl={dropdownAnchorEl}>
                {datacell.dropdown?.options.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={() => {
                      handleCloseDropdown();
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
                onClick={(event) => handleOpenDropdown(event)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleOpenDropdown(event);
                  }
                }}
              >
                <ExpandMoreRoundedIcon className={`${styles.icon} ${iconClassName}`} />
              </div>
            ) : (
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
            )}
          </div>
        )}
        {children}
      </div>
    </td>
  );
}

export default Datacell;
