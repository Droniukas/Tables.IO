import React from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import styles from "./table.module.scss";
import { TableRowData } from "@/models/interfaces/TableRowData";
import TablesSeperator from "../tablesSeperator/TablesSeperator";
import { JobApplicationStatus } from "@/models/enums/JobApplicationStatus";

type MainTableProps = {
  rows: TableRowData[];
};

const MainTable = (props: MainTableProps) => {
  const { rows } = props;

  // all performance heavier calculations should be memoized and handled
  const notRejectedStatusRows: TableRowData[] = rows.filter(
    (row) => row.columns.status !== JobApplicationStatus.REJECTED
  );

  const rejectedStatusRows: TableRowData[] = rows.filter(
    (row) => row.columns.status === JobApplicationStatus.REJECTED
  );
  // maybe 'rows[1].columns' part should substituted with the type itself..
  const columnNames = Object.keys(rows[1].columns);

  const mapRow = (row: TableRowData) => {
    const { company, dateApplied, location, position, status } = row.columns;

    return (
      <tr key={row.id} className={styles.dataRow}>
        <td>{position}</td>
        <td>{company}</td>
        <td>{location}</td>
        <td>{dateApplied}</td>
        <td>{status}</td>
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
        <TablesSeperator columnsLenght={columnNames.length} />
        {rejectedStatusRows.map(mapRow)}
      </tbody>
    </table>
  );
};

export default MainTable;
