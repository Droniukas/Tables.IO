import { TableRowDto } from '@/models/interfaces/TableRowDto';
import { memo } from 'react';
import Button from '@/components/button/Button';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { ButtonColor } from '@/models/enums/ButtonColor';
import { Size } from '@/models/enums/Size';
import { ButtonType } from '@/models/enums/ButtonType';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { Color } from '@/models/enums/Color';
import styles from './row.module.scss';
import Datacell from './datacell/Datacell';

type RowProps = {
  row: TableRowDto;
  specialDatalessRow?: boolean;
};

function Row(props: RowProps) {
  const { row, specialDatalessRow } = props;

  let rowColorClass = 'row';
  if (!specialDatalessRow) {
    switch (row.color) {
      case Color.SUCCESS:
        rowColorClass += '-success';
        break;
      case Color.SECONDARY:
        rowColorClass += '-secondary';
        break;
      case Color.NEUTRAL:
        rowColorClass += '-neutral';
        break;
    }
  }

  return specialDatalessRow ? (
    <div>ss</div>
  ) : (
    <tr className={`${styles.dataRow} ${styles[rowColorClass]}`}>
      {row.datacells.map((datacell) => {
        const isDropdown = datacell.dropdown !== undefined;
        if (datacell.isLastColumn) {
          return (
            <Datacell
              key={datacell.id}
              isDropdown={isDropdown}
              className={styles.lastRow}
              textClassName={styles.textData}
              iconClassName={styles.dropdownIcon}
              initialText={datacell.value}
              isLastColumn
            >
              <div className={styles.tableRowIcons}>
                <Button
                  icon={MoreHorizRoundedIcon}
                  color={ButtonColor.PRIMARY}
                  size={Size.SMALL}
                  buttonType={ButtonType.ONLY_ICON}
                />
                <DragIndicatorRoundedIcon className={styles.draggableIcon} />
              </div>
            </Datacell>
          );
        }
        return <Datacell key={datacell.id} initialText={datacell.value} isDropdown={isDropdown} />;
      })}
    </tr>
  );
}

export default memo(Row);
