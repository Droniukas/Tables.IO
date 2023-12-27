namespace tables_project_api.Models
{
    public class ColumnColorsValues
    {
        public int Id { get; set; }
        public ICollection<ColorValue> ColorsValues { get; set; }
        public Column Column { get; set; }
        // what if I want to restrict the table to only have one ColumnColorsValues? I imagine I would need the Table field, but If I do that, I get a circular reference error.
        //public int TableId { get; set; }
        //public Table Table { get; set; }
    }
}
