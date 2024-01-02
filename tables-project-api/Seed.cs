using tables_project_api.Data;
using tables_project_api.Models;

namespace tables_project_api
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            this.dataContext = context;
        }
        public void SeedDataContext()
        {
            if (!dataContext.Tables.Any())
            {
                Column positionColumn = new Column() { Name = "Position" };
                Column companyColumn = new Column() { Name = "Company" };
                Column locationColumn = new Column() { Name = "Location" };
                Column dateAppliedColumn = new Column() { Name = "Date applied", Datepicker = new Datepicker() };
                Column statusColumn = new Column()
                {
                    Name = "Status",
                    Dropdown = new Dropdown()
                    {
                        Options = new List<DropdownOption>()
                        {
                            new DropdownOption()
                            {
                                Value = "No response"
                            },
                            new DropdownOption()
                            {
                                Value = "Got interview"
                            },
                            new DropdownOption()
                            {
                                Value = "Rejected"
                            },
                            new DropdownOption()
                            {
                                Value = "Got job offer"
                            },
                        }
                    },
                    ColumnColorsValues = new ColumnColorsValues()
                    {
                        ColorsValues = new List<ColorValue>
                            {
                                new ColorValue()
                                {
                                    Value = "No response",
                                    Color = "none"
                                },
                                new ColorValue()
                                {
                                    Value = "Got interview",
                                    Color = "secondary"
                                },
                                new ColorValue()
                                {
                                    Value = "Rejected",
                                    Color = "neutral"
                                },
                                new ColorValue()
                                {
                                    Value = "Got job offer",
                                    Color = "success"
                                },
                            }
                    },
                    ColumnIsBottomRowValue = new ColumnIsBottomRowValue()
                    {
                        Value = "Rejected"
                    },
                };

                //List<Column> columns = new List<Column>()
                //{
                //    positionColumn,
                //    companyColumn,
                //    locationColumn,
                //    dateAppliedColumn,
                //    statusColumn,
                //};

                //dataContext.Columns.AddRange(columns);
                //dataContext.SaveChanges();

                List<Table> tables = new List<Table>()
                {
                new Table()
                    {
                        UserId = 1,
                        Columns = new List<Column>
                        {
                            positionColumn,
                            companyColumn,
                            locationColumn,
                            dateAppliedColumn,
                            statusColumn,
                        },
                        Rows = new List<Row>
                        {
                            new Row() {
                                Datacells = new List<Datacell>
                                {
                                    new Datacell()
                                    {
                                        Value = ".Net Developer",
                                        Column = positionColumn,
                                    },
                                    new Datacell()
                                    {
                                        Value = "Divitech",
                                        Column = companyColumn
                                    },
                                    new Datacell()
                                    {
                                        Value = "Remote",
                                        Column = locationColumn
                                    },
                                    new Datacell()
                                    {
                                        Value = new DateTime(2021, 1, 1).ToString(),
                                        Column = dateAppliedColumn
                                    },
                                    new Datacell()
                                    {
                                        Value = "Rejected",
                                        Column = statusColumn
                                    },
                                },
                            },
                            new Row()
                            {
                                Datacells = new List<Datacell>
                                {
                                    new Datacell()
                                    {
                                        Value = "Frontend Developer",
                                        Column = positionColumn
                                    },
                                    new Datacell()
                                    {
                                        Value = "Google",
                                        Column = companyColumn
                                    },
                                    new Datacell()
                                    {
                                        Value = "Remote",
                                        Column = locationColumn
                                    },
                                    new Datacell()
                                    {
                                        Value = new DateTime(2022, 4, 1).ToString(),
                                        Column = dateAppliedColumn
                                    },
                                    new Datacell()
                                    {
                                        Value = "Got interview",
                                        Column = statusColumn
                                    },
                                },
                            },
                        },
                    }
                };
                dataContext.Tables.AddRange(tables);
                dataContext.SaveChanges();
            }
        }
    }
}
