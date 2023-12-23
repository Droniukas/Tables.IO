import styles from "./page.module.scss";

import Table from "./_tables/table/Table";
import { TableData } from "@/models/interfaces/TableData";
import { JobApplicationStatus } from "@/models/enums/JobApplicationStatus";

async function getTableData(userId: number): Promise<TableData> {
  const res = await fetch(`https://localhost:7086/api/Table/${userId}`);
  return await res.json();
}

export default async function Home() {
  // const tableData = await getTableData(1);
  // console.log(tableData);

  const tableData: TableData = {
    id: 1,
    columns: [
      { id: 1, name: "Position" },
      { id: 2, name: "Company" },
      { id: 3, name: "Location" },
      { id: 4, name: "Date applied" },
      { id: 5, name: "Status" },
    ],
    rows: [
      {
        id: 1,
        position: ".Net Developer",
        company: "Divitech",
        location: "Remote",
        dateApplied: "2023-09-19T00:00:00",
        status: JobApplicationStatus.NO_RESPONSE,
      },
      {
        id: 2,
        position: "Frontend engineer - React",
        company: "Maxima",
        location: "Vilnius, Lithuania",
        dateApplied: "2023-09-18T00:00:00",
        status: JobApplicationStatus.REJECTED,
      },
      {
        id: 3,
        position: "Data analyst",
        company: "Senukai",
        location: "Šiauliai, Lithuania",
        dateApplied: "2023-09-13T00:00:00",
        status: JobApplicationStatus.GOT_INTERVIEW,
      },
      {
        id: 4,
        position: "Estimator",
        company: "Intus windows",
        location: "Remote",
        dateApplied: "2023-09-20T00:00:00",
        status: JobApplicationStatus.GOT_JOB_OFFER,
      },
    ],
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tablesDiv}>
        <div className={styles.topDiv}>Top</div>
        <Table tableData={tableData} />
      </div>
    </div>
  );
}
