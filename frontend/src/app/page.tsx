import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.tablesDiv}>
        <div className={styles.topDiv}>Top</div>
        <div className={styles.tableContainer}>
          <div className={styles.tableControls}>Controls</div>
          <div className={styles.tableRows}>
            <table>
              <tbody>
                <tr>
                  <td>Company</td>
                  <td>Location</td>
                </tr>
                <tr className={styles.tableDataRow}>
                  <td>Telia</td>
                  <td>Vilnius, Lithuania</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.tablePagination}>Pagination</div>
        </div>
      </div>
    </div>
  );
}
