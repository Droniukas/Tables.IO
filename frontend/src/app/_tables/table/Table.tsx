import React from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import styles from "./table.module.scss";
import { TableData } from "@/models/interfaces/TableData";
import TablesSeperator from "../tablesSeperator/TablesSeperator";
import { JobApplicationStatus } from "@/models/enums/JobApplicationStatus";
import { JobApplicationTableDataRow } from "@/models/interfaces/JobApplicationTableDataRow";
import Button from "@/components/button/Button";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Color } from "@/models/enums/Color";
import { Size } from "@/models/enums/Size";
import { ButtonType } from "@/models/enums/ButtonType";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";

type MainTableProps = {
  tableData: TableData;
};

const MainTable = (props: MainTableProps) => {
  const { tableData } = props;
  const columnNames = tableData.columnNames;
  const rows = tableData.rows;

  // all performance heavier calculations like these two below should be memoized and handled
  const notRejectedStatusRows: JobApplicationTableDataRow[] = rows.filter(
    (row) => row.status !== JobApplicationStatus.REJECTED
  );

  const rejectedStatusRows: JobApplicationTableDataRow[] = rows.filter(
    (row) => row.status === JobApplicationStatus.REJECTED
  );

  const mapRow = (row: JobApplicationTableDataRow) => {
    const { company, dateApplied, location, position, status } = row;

    return (
      <tr key={row.id} className={styles.dataRow}>
        <td>{position}</td>
        <td>{company}</td>
        <td>{location}</td>
        <td>{dateApplied}</td>
        <td>
          <span>{status}</span>
          <div className={styles.tableRowIcons}>
            <Button
              icon={MoreHorizRoundedIcon}
              color={Color.PRIMARY}
              size={Size.SMALL}
              type={ButtonType.ONLY_ICON}
            />
            <DragIndicatorRoundedIcon className={styles.draggableIcon} />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columnNames.map((columnName) => (
            <td key={columnName}>
              <div>
                {columnName} <ArrowDropDownRoundedIcon />
              </div>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {notRejectedStatusRows.map(mapRow)}
        <TablesSeperator />
        {rejectedStatusRows.map(mapRow)}
      </tbody>
    </table>
  );
};

export default MainTable;
