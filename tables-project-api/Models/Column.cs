namespace tables_project_api.Models
{
    public class Column
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Table Table { get; set; }
    }
}
