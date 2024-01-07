import React, { memo } from 'react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { ColumnDto } from '@/models/interfaces/ColumnDto';

type ColumnsProps = {
  columns: ColumnDto[];
};

function Columns(props: ColumnsProps) {
  const { columns } = props;
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <td key={column.id}>
            <div>
              {column.name} <ArrowDropDownRoundedIcon />
            </div>
          </td>
        ))}
      </tr>
    </thead>
  );
}

export default memo(Columns);
