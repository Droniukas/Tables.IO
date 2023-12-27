'use client';

import Button from '@/components/button/Button';
import { ButtonColor } from '@/models/enums/ButtonColor';
import { Size } from '@/models/enums/Size';
import { ButtonType } from '@/models/enums/ButtonType';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { TableDto } from '@/models/interfaces/TableDto';
import Rows from './rows/Rows';
import Columns from './columns/Columns';
import styles from './table.module.scss';

type TableProps = {
  tableDto: TableDto;
};

function Table(props: TableProps) {
  const { tableDto } = props;
  const { columns } = tableDto;
  const { rows } = tableDto;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableButtons}>
        <div className={styles.buttonGroup}>
          <Button
            color={ButtonColor.PRIMARY}
            size={Size.MEDIUM}
            active
            buttonType={ButtonType.ICON_RIGHT}
            text="Add row"
            icon={AddRoundedIcon}
            onClick={() => console.log('works')}
          />
          <Button
            color={ButtonColor.PRIMARY}
            size={Size.MEDIUM}
            buttonType={ButtonType.ICON_RIGHT}
            text="Edit layout"
            icon={EditRoundedIcon}
          />
        </div>
        <Button
          color={ButtonColor.PRIMARY}
          size={Size.MEDIUM}
          buttonType={ButtonType.ICON_RIGHT}
          text="2 Rows selected"
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
}

export default Table;
