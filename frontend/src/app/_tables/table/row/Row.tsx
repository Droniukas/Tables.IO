import { JobApplicationTableDataRow } from "@/models/interfaces/JobApplicationTableDataRow";
import React, { memo } from "react";
import Button from "@/components/button/Button";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Color } from "@/models/enums/Color";
import { Size } from "@/models/enums/Size";
import { ButtonType } from "@/models/enums/ButtonType";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import styles from "./row.module.scss";
import { JobApplicationStatus } from "@/models/enums/JobApplicationStatus";
import Datacell from "./datacell/Datacell";

type RowProps = {
  row: JobApplicationTableDataRow;
  specialDatalessRow?: boolean;
};

const Row = (props: RowProps) => {
  const { row, specialDatalessRow } = props;
  const { company, dateApplied, location, position, status } = row;

  let jobStatusClass = "row";
  if (!specialDatalessRow) {
    switch (status) {
      case JobApplicationStatus.GOT_JOB_OFFER:
        jobStatusClass += "-got-job-offer";
        break;
      case JobApplicationStatus.GOT_INTERVIEW:
        jobStatusClass += "-got-interview";
        break;
      case JobApplicationStatus.REJECTED:
        jobStatusClass += "-rejected";
        break;
    }
  }

  return (
    <>
      {specialDatalessRow ? (
        <div>ss</div>
      ) : (
        <tr className={`${styles.dataRow} ${styles[jobStatusClass]}`}>
          <Datacell initialText={position} />
          <Datacell initialText={company} />
          <Datacell initialText={location} />
          <Datacell initialText={dateApplied} />
          <Datacell
            isDropdown
            className={styles.lastRow}
            textClassName={styles.textData}
            iconClassName={styles.dropdownIcon}
            initialText={status}
          >
            <div className={styles.tableRowIcons}>
              <Button
                icon={MoreHorizRoundedIcon}
                color={Color.PRIMARY}
                size={Size.SMALL}
                buttonType={ButtonType.ONLY_ICON}
              />
              <DragIndicatorRoundedIcon className={styles.draggableIcon} />
            </div>
          </Datacell>
        </tr>
      )}
    </>
  );
};

export default memo(Row);
