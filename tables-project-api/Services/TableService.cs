using AutoMapper;
using System.Drawing;
using System.Net;
using System.Text;
using System.Text.Json;
using tables_project_api.Dtos;
using tables_project_api.Interfaces;
using tables_project_api.Models;

namespace tables_project_api.Services
{
    public class TableService : ITableService
    {
        private readonly ITableRepository _tableRepository;
        private readonly IMapper _mapper;

        public TableService(ITableRepository tableRepository, IMapper mapper)
        {
            _tableRepository = tableRepository;
            _mapper = mapper;
        }

        public TableReturnDto GetTableByUserId(int userId)
        {
            Table? table = _tableRepository.GetTableByUserId(userId);
            if (table == null) throw new Exception(message: "invalid userId");

            List<Column> columns = table.Columns.ToList();

            return new TableReturnDto()
            {
                Columns = _mapper.Map<ICollection<ColumnReturnDto>>(table.Columns),
                Rows = MapRowsToTableRowDtos(table.Rows, columns),
                //BottomRowColumnId = bottomRowColumn != null ? bottomRowColumn.Id : null,
                //BottomRowValue = bottomRowColumn != null ? bottomRowColumn.ColumnIsBottomRowValue!.Value : null,
            };
        }

        private bool CheckIsBottomRow(Row row, Column? bottomRowColumn)
        {
            return row.Datacells.FirstOrDefault((datacell) => datacell.Column.Id == bottomRowColumn?.Id)?.Value == bottomRowColumn?.ColumnIsBottomRowValue?.Value;
        }

        private ICollection<TableRowReturnDto> MapRowsToTableRowDtos(ICollection<Row> rows, List<Column> columns)
        {
            Column? columnResponsibleForRowIsBottom = GetColumnResponsibleForRowIsBottom(columns);
            Column? columnResponsibleForRowColor = GetColumnResponsibleForRowColor(columns);
            Column lastColumn = columns.Last();

            var outputRows = new List<TableRowReturnDto>();
            foreach (var row in rows)
            {
                outputRows.Add(MapRowToTableRowDto(row, columns, lastColumn, columnResponsibleForRowIsBottom, columnResponsibleForRowColor));
            }
            return outputRows;
        }



        private string GetRowColor(Row row, Column? responsibleColumn)
        {
            if (responsibleColumn == null)
            {
                return "none";
            }

            Datacell? responsibleDatacell = row.Datacells.ToList().Find(datacell => datacell.Column.Id == responsibleColumn.Id);
            if (responsibleDatacell == null)
            {
                return "none";
            }

            foreach (var colorValue in responsibleColumn.ColumnColorsValues!.ColorsValues)
            {
                if (responsibleDatacell.Value.Equals(colorValue.Value))
                {
                    return colorValue.Color;
                }
            }

            return "none";
        }

        private ICollection<TableDatacellReturnDto> GetRowDatacells(Row row, Column lastColumn, List<Column> columns)
        {
            var outputDatacells = new List<TableDatacellReturnDto>();
            foreach (var datacell in row.Datacells)
            {
                Column? coorespondingColumn = columns.Find(column => datacell.Column.Id == column.Id);
                if (coorespondingColumn == null) throw new Exception("No corresponding column for row found");

                outputDatacells.Add(new TableDatacellReturnDto()
                {
                    Id = datacell.Id,
                    Value = datacell.Value,
                    ColumnId = datacell.Column.Id,
                    IsLastColumn = datacell.Column.Id == lastColumn.Id,
                    Dropdown = coorespondingColumn.Dropdown != null ? new DropdownDto() { Options = _mapper.Map<ICollection<DropdownOptionReturnDto>>(coorespondingColumn.Dropdown.Options) } : null,
                    Datepicker = coorespondingColumn.Datepicker != null ? new DatepickerDto() { } : null,
                });
            }

            return outputDatacells;
        }

        public TableRowReturnDto UpdateDatacellValueById(int id, string newValue)
        {
            _tableRepository.UpdateDatacellValueById(id, newValue);
            Row? parentRow = _tableRepository.GetRowByDatacellId(id);

            if (parentRow == null) {
                throw new Exception("No parent row for datacell found");
            }

            List<Column> columns = _tableRepository.GetColumnsByRowId(parentRow.Id).ToList();

            return MapRowToTableRowDto(parentRow, columns, columns.Last(), GetColumnResponsibleForRowIsBottom(columns), GetColumnResponsibleForRowColor(columns));
        }

        private TableRowReturnDto MapRowToTableRowDto(Row row, List<Column> columns, Column lastColumn, Column? columnResponsibleForRowIsBottom, Column? columnResponsibleForRowColor)
        {
            return new TableRowReturnDto() {
                    Id = row.Id,
                    Color = GetRowColor(row, columnResponsibleForRowColor),
                    Datacells = GetRowDatacells(row, lastColumn, columns).OrderBy(datacell => datacell.Id).ToList(),
                    IsBottomRow = CheckIsBottomRow(row, columnResponsibleForRowIsBottom)
                };
        }

        public AutoGeneratedJobDataDto AutoGenerateJobData(InputURLDto inputURLDto)
        {
            ScrapedJobDataDto scrapedData = getScrapedJobData(inputURLDto);
            DateTime currentDate = DateTime.UtcNow.Date;
            return new AutoGeneratedJobDataDto()
            { Company = scrapedData.Company, DateApplied = currentDate, Location = scrapedData.Location, Position = scrapedData.Position };
        }

        private ScrapedJobDataDto getScrapedJobData(InputURLDto inputURLDto)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://127.0.0.1:8000/");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var json = JsonSerializer.Serialize(inputURLDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync("extractData", content).Result;
            if (response.IsSuccessStatusCode)
            {
                Stream? responseContent = response.Content.ReadAsStreamAsync().Result;
                ScrapedJobDataDto? postResponse = JsonSerializer.Deserialize<ScrapedJobDataDto>(responseContent, options);
                if (postResponse == null) throw new Exception("Server error");
                return postResponse;
            }
            else
            {
                if (response.StatusCode == HttpStatusCode.BadRequest)
                {
                    throw new Exception("Invalid URL");
                }
                else
                {
                    throw new Exception("Server error");
                }
            }
        }

        private Column? GetColumnResponsibleForRowIsBottom(List<Column> columns)
        {
            return columns.Find(column => column.ColumnIsBottomRowValue != null);
        }

        private Column? GetColumnResponsibleForRowColor(List<Column> columns)
        {
            return columns.Find(columns => columns.ColumnColorsValues != null);
        }
    }
}
