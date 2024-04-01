using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tables_project_api.Migrations
{
    public partial class Add_column_DateRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DateRemoved",
                table: "Rows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DateRemoved",
                table: "Datacells",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateRemoved",
                table: "Rows");

            migrationBuilder.DropColumn(
                name: "DateRemoved",
                table: "Datacells");
        }
    }
}
