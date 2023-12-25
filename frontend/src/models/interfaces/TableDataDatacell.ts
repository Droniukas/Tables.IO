export interface TableDataDatacell {
  id: number;
  value: string;
  isLastColumn?: boolean;
  dropdown?: {
    options: {
      id: number;
      value: string;
    }[];
  };
  datepicker?: {};
}
