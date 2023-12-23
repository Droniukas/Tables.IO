import { DatacellType } from "@/models/enums/DatacellType";
import React from "react";
import styles from "./datacell.module.scss";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

type DatacellProps = {
  isDropdown?: boolean;
  className?: string;
  children?: React.ReactNode;
  text?: string;
  textClassName?: string;
  iconClassName?: string;
};

const Datacell = (props: DatacellProps) => {
  const {
    isDropdown,
    className,
    children,
    text,
    textClassName,
    iconClassName,
  } = props;
  return (
    <td className={`${styles.datacellContainer}`}>
      <div className={`${className} ${styles.datacell}`}>
        <div
          className={`${styles.datacellData} ${textClassName} ${
            isDropdown ? styles.dropdownEdit : styles.textEdit
          }`}
        >
          {text}
          {isDropdown ? (
            <div className={styles.iconContainer}>
              <ExpandMoreRoundedIcon
                className={`${styles.icon} ${iconClassName}`}
              />
            </div>
          ) : (
            <div className={styles.iconContainer}>
              <EditRoundedIcon className={`${styles.icon} ${iconClassName}`} />
            </div>
          )}
        </div>
        {children}
      </div>
    </td>
  );
};

export default Datacell;
