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
                List<Table> tables = new List<Table>()
                {
                new Table()
                    {
                        Columns = new List<Column>
                        {
                            new Column() { Name= "Position" },
                            new Column() { Name = "Company" },
                            new Column() { Name = "Location" },
                            new Column() { Name = "Date applied" },
                            new Column() { Name= "Status" }
                        },
                        Rows = new List<JobApplicationRow>
                        {
                            new JobApplicationRow()
                            {
                                Position = ".Net Developer",
                                Company = "Divitech",
                                Location = "Remote",
                                DateApplied = new DateTime(2023, 09, 19),
                                Status = "No response",
                            },
                            new JobApplicationRow()
                            {
                                Position = "Frontend engineer - React",
                                Company = "Maxima",
                                Location = "Vilnius, Lithuania",
                                DateApplied = new DateTime(2023, 09, 18),
                                Status = "No response",
                            },
                        },
                        UserId = 1
                    },
                new Table()
                    {
                        Columns = new List<Column>
                        {
                            new Column() { Name= "Position" },
                            new Column() { Name = "Company" },
                            new Column() { Name = "Location" },
                            new Column() { Name = "Date applied" },
                            new Column() { Name= "Status" }
                        },
                        Rows = new List<JobApplicationRow>
                        {
                            new JobApplicationRow()
                            {
                                Position = "Software support",
                                Company = "Hostinger",
                                Location = "Vilnius, Lithuania",
                                DateApplied = new DateTime(2023, 07, 19),
                                Status = "No response",
                            },
                        },
                        UserId = 1
                    },
                };
                dataContext.Tables.AddRange(tables);
                dataContext.SaveChanges();
            }
        }
    }
}
