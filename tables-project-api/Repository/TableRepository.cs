using Microsoft.EntityFrameworkCore;
using tables_project_api.Data;
using tables_project_api.Interfaces;
using tables_project_api.Models;

namespace tables_project_api.Repository
{
    public class TableRepository : ITableRepository
    {
        private readonly DataContext _context;

        public TableRepository(DataContext context)
        {
            this._context = context;
        }

        public Table? GetTableByUserId(int userId)
        {
            return _context.Tables
                .Include(table => table.Columns).ThenInclude(column => column.Datepicker)
                .Include(table => table.Columns).ThenInclude(column => column.Dropdown!.Options)
                .Include(table => table.Columns).ThenInclude(column => column.ColumnColorsValues!.ColorsValues)
                .Include(table => table.Columns).ThenInclude(column => column.ColumnIsBottomRowValue)
                .Include(table => table.Rows).ThenInclude(row => row.Datacells)
                .Where(table => table.UserId == userId).FirstOrDefault();
        }

        public void UpdateDatacellValueById(int id, string newValue)
        {
            Datacell? datacell = _context.Datacells.Find(id);
            if (datacell == null) { throw new Exception("Invalid datacell update Id"); }
            datacell.Value = newValue;
            _context.SaveChanges();
        }

        public Row? GetRowByDatacellId(int datacellId)
        {
            return _context.Rows.Include(row => row.Datacells).FirstOrDefault(row => row.Datacells.Any(datacell => datacell.Id == datacellId));
        }

        public ICollection<Column> GetColumnsByRowId(int rowId)
        {
            return _context.Tables.Where(table => table.Rows.Any(row => row.Id == rowId)).SelectMany(table => table.Columns)
                .Include(column => column.Datepicker)
                .Include(column => column.Dropdown!.Options)
                .Include(column => column.ColumnColorsValues!.ColorsValues)
                .Include(column => column.ColumnIsBottomRowValue)
                .ToList();
        }
    }
}
