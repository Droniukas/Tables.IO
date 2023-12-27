using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tables_project_api.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ColorValue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ColumnColorsValuesId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColorValue", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ColumnColorsValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ColumnId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColumnColorsValues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ColumnIsBottomRowValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ColumnId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColumnIsBottomRowValues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ColumnColorsValuesId = table.Column<int>(type: "int", nullable: true),
                    ColumnIsBottomRowValueId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tables_ColumnColorsValues_ColumnColorsValuesId",
                        column: x => x.ColumnColorsValuesId,
                        principalTable: "ColumnColorsValues",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tables_ColumnIsBottomRowValues_ColumnIsBottomRowValueId",
                        column: x => x.ColumnIsBottomRowValueId,
                        principalTable: "ColumnIsBottomRowValues",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Columns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TableId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Columns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Columns_Tables_TableId",
                        column: x => x.TableId,
                        principalTable: "Tables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rows_Tables_TableId",
                        column: x => x.TableId,
                        principalTable: "Tables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Datepickers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ColumnId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Datepickers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Datepickers_Columns_ColumnId",
                        column: x => x.ColumnId,
                        principalTable: "Columns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dropdowns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ColumnId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dropdowns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dropdowns_Columns_ColumnId",
                        column: x => x.ColumnId,
                        principalTable: "Columns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DateDatacells",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowId = table.Column<int>(type: "int", nullable: false),
                    ColumnId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DateDatacells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DateDatacells_Columns_ColumnId",
                        column: x => x.ColumnId,
                        principalTable: "Columns",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DateDatacells_Rows_RowId",
                        column: x => x.RowId,
                        principalTable: "Rows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TextDatacells",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RowId = table.Column<int>(type: "int", nullable: false),
                    ColumnId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextDatacells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TextDatacells_Columns_ColumnId",
                        column: x => x.ColumnId,
                        principalTable: "Columns",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TextDatacells_Rows_RowId",
                        column: x => x.RowId,
                        principalTable: "Rows",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DropdownOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DropdownId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DropdownOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DropdownOptions_Dropdowns_DropdownId",
                        column: x => x.DropdownId,
                        principalTable: "Dropdowns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ColorValue_ColumnColorsValuesId",
                table: "ColorValue",
                column: "ColumnColorsValuesId");

            migrationBuilder.CreateIndex(
                name: "IX_ColumnColorsValues_ColumnId",
                table: "ColumnColorsValues",
                column: "ColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_ColumnIsBottomRowValues_ColumnId",
                table: "ColumnIsBottomRowValues",
                column: "ColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_Columns_TableId",
                table: "Columns",
                column: "TableId");

            migrationBuilder.CreateIndex(
                name: "IX_DateDatacells_ColumnId",
                table: "DateDatacells",
                column: "ColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_DateDatacells_RowId",
                table: "DateDatacells",
                column: "RowId");

            migrationBuilder.CreateIndex(
                name: "IX_Datepickers_ColumnId",
                table: "Datepickers",
                column: "ColumnId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DropdownOptions_DropdownId",
                table: "DropdownOptions",
                column: "DropdownId");

            migrationBuilder.CreateIndex(
                name: "IX_Dropdowns_ColumnId",
                table: "Dropdowns",
                column: "ColumnId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rows_TableId",
                table: "Rows",
                column: "TableId");

            migrationBuilder.CreateIndex(
                name: "IX_Tables_ColumnColorsValuesId",
                table: "Tables",
                column: "ColumnColorsValuesId");

            migrationBuilder.CreateIndex(
                name: "IX_Tables_ColumnIsBottomRowValueId",
                table: "Tables",
                column: "ColumnIsBottomRowValueId");

            migrationBuilder.CreateIndex(
                name: "IX_TextDatacells_ColumnId",
                table: "TextDatacells",
                column: "ColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_TextDatacells_RowId",
                table: "TextDatacells",
                column: "RowId");

            migrationBuilder.AddForeignKey(
                name: "FK_ColorValue_ColumnColorsValues_ColumnColorsValuesId",
                table: "ColorValue",
                column: "ColumnColorsValuesId",
                principalTable: "ColumnColorsValues",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ColumnColorsValues_Columns_ColumnId",
                table: "ColumnColorsValues",
                column: "ColumnId",
                principalTable: "Columns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ColumnIsBottomRowValues_Columns_ColumnId",
                table: "ColumnIsBottomRowValues",
                column: "ColumnId",
                principalTable: "Columns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tables_ColumnColorsValues_ColumnColorsValuesId",
                table: "Tables");

            migrationBuilder.DropForeignKey(
                name: "FK_ColumnIsBottomRowValues_Columns_ColumnId",
                table: "ColumnIsBottomRowValues");

            migrationBuilder.DropTable(
                name: "ColorValue");

            migrationBuilder.DropTable(
                name: "DateDatacells");

            migrationBuilder.DropTable(
                name: "Datepickers");

            migrationBuilder.DropTable(
                name: "DropdownOptions");

            migrationBuilder.DropTable(
                name: "TextDatacells");

            migrationBuilder.DropTable(
                name: "Dropdowns");

            migrationBuilder.DropTable(
                name: "Rows");

            migrationBuilder.DropTable(
                name: "ColumnColorsValues");

            migrationBuilder.DropTable(
                name: "Columns");

            migrationBuilder.DropTable(
                name: "Tables");

            migrationBuilder.DropTable(
                name: "ColumnIsBottomRowValues");
        }
    }
}
