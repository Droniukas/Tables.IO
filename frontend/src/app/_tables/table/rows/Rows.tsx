import React from "react";
import TablesSeperator from "../../tablesSeperator/TablesSeperator";
import Row from "../row/Row";
import { JobApplicationTableDataRow } from "@/models/interfaces/JobApplicationTableDataRow";
import { JobApplicationStatus } from "@/models/enums/JobApplicationStatus";

type RowsProps = {
  rows: JobApplicationTableDataRow[];
};

const Rows = (props: RowsProps) => {
  const { rows } = props;

  // all performance heavier calculations like these two below should be memoized and handled
  const notRejectedStatusRows: JobApplicationTableDataRow[] = rows.filter(
    (row) => row.status !== JobApplicationStatus.REJECTED
  );

  const rejectedStatusRows: JobApplicationTableDataRow[] = rows.filter(
    (row) => row.status === JobApplicationStatus.REJECTED
  );

  const mapRow = (row: JobApplicationTableDataRow) => {
    return <Row key={row.id} row={row} />;
  };

  return (
    <tbody>
      {notRejectedStatusRows.map(mapRow)}
      <TablesSeperator />
      {rejectedStatusRows.map(mapRow)}
    </tbody>
  );
};

export default Rows;
