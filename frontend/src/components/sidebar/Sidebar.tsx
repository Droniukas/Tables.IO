'use client';

import { ButtonColor } from '@/models/enums/ButtonColor';
import { Size } from '@/models/enums/Size';
import { ButtonType } from '@/models/enums/ButtonType';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../button/Button';
import styles from './sidebar.module.scss';

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <Link href="/">
        <Button
          color={ButtonColor.PRIMARY}
          size={Size.MEDIUM}
          buttonType={ButtonType.ONLY_ICON_COLORED}
          icon={TableChartRoundedIcon}
          active={pathname === '/'}
        />
      </Link>
      <Link href="/graphs">
        <Button
          color={ButtonColor.PRIMARY}
          size={Size.MEDIUM}
          buttonType={ButtonType.ONLY_ICON_COLORED}
          icon={InsertChartRoundedIcon}
          active={pathname === '/graphs'}
        />
      </Link>
    </div>
  );
}

export default Sidebar;
