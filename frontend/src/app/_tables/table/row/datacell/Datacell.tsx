"use client";
import React, { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import styles from "./datacell.module.scss";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { TextareaAutosize } from "@mui/material";

type DatacellProps = {
  isDropdown?: boolean;
  className?: string;
  children?: React.ReactNode;
  initialText?: string;
  textClassName?: string;
  iconClassName?: string;
};

const Datacell = (props: DatacellProps) => {
  const {
    isDropdown,
    className,
    children,
    initialText,
    textClassName,
    iconClassName,
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const datacellRef = useRef<HTMLTableCellElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialText);
  const [textInputWidth, setTextInputWidth] = useState<number | null>();

  const onOutsideClick = (event: MouseEvent) => {
    console.log("onOutsideClick");
    if (!textareaRef.current?.contains(event.target as Node)) {
      setIsEditing(false);
      setTextInputWidth(null);
      document.removeEventListener("mousedown", onOutsideClick);
    }
  };

  const onEnterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
      setTextInputWidth(null);
      document.removeEventListener("keydown", onEnterPress);
    }
  };

  const onEditIconClick = () => {
    let width = datacellRef.current?.getBoundingClientRect().width;
    if (width) width -= 30;
    setTextInputWidth(width);

    setIsEditing(true);
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onEnterPress);
  };

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <td className={`${styles.datacellContainer}`}>
      <div
        className={`${className} ${styles.datacell}`}
        ref={datacellRef}
        style={{ maxWidth: textInputWidth || "none" }}
      >
        {isEditing ? (
          <TextareaAutosize
            value={value}
            autoFocus
            onFocus={(event) =>
              event.target.setSelectionRange(
                event.target.value.length,
                event.target.value.length
              )
            }
            onChange={(event) => onInputChange(event)}
            ref={textareaRef}
            className={styles.textarea}
          />
        ) : (
          <div
            className={`${styles.datacellData} ${textClassName} ${
              isDropdown ? styles.dropdownEdit : styles.textEdit
            }`}
          >
            {value}
            {isDropdown ? (
              <div className={styles.iconContainer}>
                <ExpandMoreRoundedIcon
                  className={`${styles.icon} ${iconClassName}`}
                />
              </div>
            ) : (
              <div className={styles.iconContainer} onClick={onEditIconClick}>
                <EditRoundedIcon
                  className={`${styles.icon} ${iconClassName}`}
                />
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </td>
  );
};

export default memo(Datacell);
