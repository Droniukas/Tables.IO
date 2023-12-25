import React from 'react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Column } from '@/models/interfaces/Column';

type ColumnsProps = {
  columns: Column[];
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

export default Columns;
