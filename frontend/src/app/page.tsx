import { Icon } from "@mui/material";
import styles from "./page.module.scss";
import Button from "@/components/button/Button";
import { Color } from "@/models/enums/Color";
import { Size } from "@/models/enums/Size";
import { ButtonType } from "@/models/enums/ButtonType";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Table from "./_tables/table/Table";
import { TableData } from "@/models/interfaces/TableData";
import { JobApplicationStatus } from "@/models/enums/JobApplicationStatus";

export default function Home() {
  const fakeData: TableData = {
    id: "54sdfdsljfh",
    columnNames: ["Position", "Company", "Location", "Date applied", "Status"],
    rows: [
      {
        id: "4fdsfsdf",
        position: "Frontend engineer - React",
        company: "Maxima",
        location: "Vilnius, Lithuania",
        dateApplied: "2023-09-18",
        status: JobApplicationStatus.NO_RESPONSE,
      },
      {
        id: "64fdsfds",
        position: ".Net Developer",
        company: "Divitech",
        location: "Remote",
        dateApplied: "2023-09-19",
        status: JobApplicationStatus.NO_RESPONSE,
      },
    ],
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tablesDiv}>
        <div className={styles.topDiv}>Top</div>
        <div className={styles.tableContainer}>
          <div className={styles.tableButtons}>
            <div className={styles.buttonGroup}>
              <Button
                color={Color.PRIMARY}
                size={Size.MEDIUM}
                active
                type={ButtonType.ICON_RIGHT}
                text='Add row'
                icon={AddRoundedIcon}
              />
              <Button
                color={Color.PRIMARY}
                size={Size.MEDIUM}
                type={ButtonType.ICON_RIGHT}
                text='Edit layout'
                icon={EditRoundedIcon}
              />
            </div>
            <Button
              color={Color.PRIMARY}
              size={Size.MEDIUM}
              type={ButtonType.ICON_RIGHT}
              text='2 Rows selected'
              icon={CloseRoundedIcon}
            />
          </div>
          <Table tableData={fakeData} />
          <div className={styles.pagination}>Pagination</div>
        </div>
      </div>
    </div>
  );
}
