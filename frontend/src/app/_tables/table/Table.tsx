"use client";
import styles from "./table.module.scss";
import { TableData } from "@/models/interfaces/TableData";
import { JobApplicationStatus } from "@/models/enums/JobApplicationStatus";
import { JobApplicationTableDataRow } from "@/models/interfaces/JobApplicationTableDataRow";
import Columns from "./columns/Columns";
import Rows from "./rows/Rows";
import Button from "@/components/button/Button";
import { Color } from "@/models/enums/Color";
import { Size } from "@/models/enums/Size";
import { ButtonType } from "@/models/enums/ButtonType";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type TableProps = {
  tableData: TableData;
};

const Table = (props: TableProps) => {
  const { tableData } = props;
  const columns = tableData.columns;
  const rows = tableData.rows;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableButtons}>
        <div className={styles.buttonGroup}>
          <Button
            color={Color.PRIMARY}
            size={Size.MEDIUM}
            active
            buttonType={ButtonType.ICON_RIGHT}
            text='Add row'
            icon={AddRoundedIcon}
            onClick={() => console.log("works")}
          />
          <Button
            color={Color.PRIMARY}
            size={Size.MEDIUM}
            buttonType={ButtonType.ICON_RIGHT}
            text='Edit layout'
            icon={EditRoundedIcon}
          />
        </div>
        <Button
          color={Color.PRIMARY}
          size={Size.MEDIUM}
          buttonType={ButtonType.ICON_RIGHT}
          text='2 Rows selected'
          icon={CloseRoundedIcon}
        />
      </div>
      <table className={styles.table}>
        <Columns columns={columns} />
        <Rows rows={rows} />
      </table>
      <div className={styles.pagination}>Pagination</div>
    </div>
  );
};

export default Table;
