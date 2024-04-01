using Microsoft.EntityFrameworkCore;
using tables_project_api.Data;
using tables_project_api.Dtos;
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
                .Include(table => table.Rows.Where(row => row.DateRemoved == null)).ThenInclude(row => row.Datacells)
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

        public List<Column> GetColumnsByRowId(int rowId)
        {
            return _context.Tables.Where(table => table.Rows.Any(row => row.Id == rowId)).SelectMany(table => table.Columns)
                .Include(column => column.Datepicker)
                .Include(column => column.Dropdown!.Options)
                .Include(column => column.ColumnColorsValues!.ColorsValues)
                .Include(column => column.ColumnIsBottomRowValue)
                .ToList();
        }

        public List<Column> GetColumnsByTableId(int tableId)
        {
            return _context.Columns.Where(column => column.TableId == tableId)
                .Include(column => column.Datepicker)
                .Include(column => column.Dropdown!.Options)
                .Include(column => column.ColumnColorsValues!.ColorsValues)
                .Include(column => column.ColumnIsBottomRowValue)
                .ToList();
        }

        public Row AddRow(InputRowDto inputRowDto)
        {
            Table? parentTable = _context.Tables.Include(table => table.Columns).Where(table => table.Id == inputRowDto.TableId).FirstOrDefault();

            if (parentTable == null)
            {
                throw new Exception();
            }

            Row row = new Row()
            {
                Table = parentTable,
                Datacells = new List<Datacell>()
            };

            for (var i = 0; i < inputRowDto.DatacellValues.Count; i++)
            {
                string datacellValue = inputRowDto.DatacellValues[i];
                Column datacellColumn = parentTable.Columns.OrderBy(column => column.Id).ToList()[i];
                row.Datacells.Add(new Datacell()
                {
                    Row = row,
                    Value = datacellValue,
                    Column = datacellColumn
                }); 
            }

            _context.Add(row);

            _context.SaveChanges();

            return row;
        }

        public void RemoveRowById(int id)
        {
            Row? row = _context.Rows.Include(row => row.Datacells).Where(row => row.Id == id).FirstOrDefault();
            if (row == null)
            {
                throw new Exception();
            }

            string currentDate = DateTime.UtcNow.Date.ToString();

            row.DateRemoved = currentDate;

            foreach (Datacell datacell in row.Datacells)
            {
                datacell.DateRemoved = currentDate;
            }

            _context.SaveChanges();
        }
    }
}
