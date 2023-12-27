import { JobApplicationStatus } from '@/models/enums/JobApplicationStatus';
import { TableDto } from '@/models/interfaces/TableDto';
import { Color } from '@/models/enums/Color';
import Table from './_tables/table/Table';
import styles from './page.module.scss';

// async function getTableData(userId: number): Promise<TableData> {
//   const res = await fetch(`https://localhost:7086/api/Table/${userId}`);
//   return await res.json();
// }

export default async function Home() {
  // const tableData = await getTableData(1);
  // console.log(tableData);

  // const tableData: TableData = {
  //   id: 1,
  //   columns: [
  //     { id: 1, name: "Position" },
  //     { id: 2, name: "Company" },
  //     { id: 3, name: "Location" },
  //     { id: 4, name: "Date applied" },
  //     { id: 5, name: "Status" },
  //   ],
  //   rows: [
  //     {
  //       id: 1,
  //       position: ".Net Developer",
  //       company: "Divitech",
  //       location: "Remote",
  //       dateApplied: "2023-09-19T00:00:00",
  //       status: JobApplicationStatus.NO_RESPONSE,
  //     },
  //     {
  //       id: 2,
  //       position: "Frontend engineer - React",
  //       company: "Maxima",
  //       location: "Vilnius, Lithuania",
  //       dateApplied: "2023-09-18T00:00:00",
  //       status: JobApplicationStatus.REJECTED,
  //     },
  //     {
  //       id: 3,
  //       position: "Data analyst",
  //       company: "Senukai",
  //       location: "Šiauliai, Lithuania",
  //       dateApplied: "2023-09-13T00:00:00",
  //       status: JobApplicationStatus.GOT_INTERVIEW,
  //     },
  //     {
  //       id: 4,
  //       position: "Estimator",
  //       company: "Intus windows",
  //       location: "Remote",
  //       dateApplied: "2023-09-20T00:00:00",
  //       status: JobApplicationStatus.GOT_JOB_OFFER,
  //     },
  //   ],
  // };

  const tableDto: TableDto = {
    id: 1,
    columns: [
      { id: 1, name: 'Position' },
      { id: 2, name: 'Company' },
      { id: 3, name: 'Location' },
      { id: 4, name: 'Date applied' },
      { id: 5, name: 'Status' },
    ],
    rows: [
      {
        id: 1,
        color: Color.NONE,
        datacells: [
          {
            id: 1,
            value: '.Net Developer',
          },
          {
            id: 2,
            value: 'Divitech',
          },
          {
            id: 3,
            value: 'Remote',
          },
          {
            id: 4,
            value: '2023-09-19T00:00:00',
            datepicker: {},
          },
          {
            id: 5,
            isLastColumn: true,
            value: JobApplicationStatus.NO_RESPONSE,
            dropdown: {
              options: [
                { id: 1, value: 'No response' },
                { id: 2, value: 'Got interview' },
                { id: 3, value: 'Rejected' },
                { id: 4, value: 'Got job offer' },
              ],
            },
          },
        ],
      },
      {
        id: 2,
        color: Color.NEUTRAL,
        isBottomRow: true,
        datacells: [
          {
            id: 1,
            value: 'Frontend engineer - React',
          },
          {
            id: 2,
            value: 'Maxima',
          },
          {
            id: 3,
            value: 'Vilnius, Lithuania',
          },
          {
            id: 4,
            value: '2023-09-18T00:00:00',
            datepicker: {},
          },
          {
            id: 5,
            isLastColumn: true,
            value: JobApplicationStatus.REJECTED,
            dropdown: {
              options: [
                { id: 1, value: 'No response' },
                { id: 2, value: 'Got interview' },
                { id: 3, value: 'Rejected' },
                { id: 4, value: 'Got job offer' },
              ],
            },
          },
        ],
      },
      {
        id: 3,
        color: Color.SECONDARY,
        datacells: [
          {
            id: 1,
            value: 'Data analyst',
          },
          {
            id: 2,
            value: 'Senukai',
          },
          {
            id: 3,
            value: 'Šiauliai, Lithuania',
          },
          {
            id: 4,
            value: '2023-09-13T00:00:00',
            datepicker: {},
          },
          {
            id: 5,
            isLastColumn: true,
            value: JobApplicationStatus.GOT_INTERVIEW,
            dropdown: {
              options: [
                { id: 1, value: 'No response' },
                { id: 2, value: 'Got interview' },
                { id: 3, value: 'Rejected' },
                { id: 4, value: 'Got job offer' },
              ],
            },
          },
        ],
      },
      {
        id: 4,
        color: Color.SUCCESS,
        datacells: [
          {
            id: 1,
            value: 'Estimator',
          },
          {
            id: 2,
            value: 'Intus windows',
          },
          {
            id: 3,
            value: 'Remote',
          },
          {
            id: 4,
            value: '2023-09-20T00:00:00',
            datepicker: {},
          },
          {
            id: 5,
            isLastColumn: true,
            value: JobApplicationStatus.GOT_JOB_OFFER,
            dropdown: {
              options: [
                { id: 1, value: 'No response' },
                { id: 2, value: 'Got interview' },
                { id: 3, value: 'Rejected' },
                { id: 4, value: 'Got job offer' },
              ],
            },
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tablesDiv}>
        <div className={styles.topDiv}>Top</div>
        <Table tableDto={tableDto} />
      </div>
    </div>
  );
}
