using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_UserId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Posts_UserId",
                table: "Posts");

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactNumber = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmailName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "ContactNumber", "CreatedDate", "EmailName", "FirstName", "LastName", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, 1234567890L, new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1436), "john.doe@example.com", "John", "Doe", new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1480) },
                    { 2, 9876543210L, new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1484), "jane.smith@example.com", "Jane", "Smith", new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1485) },
                    { 3, 5551234567L, new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1487), "alice.johnson@example.com", "Alice", "Johnson", new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1488) }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "CreatedDate", "Description", "UpdatedDate", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1571), "Looking for a software engineering job.", new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1572), 1 },
                    { 2, new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1574), "Excited about new opportunities in data science.", new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1575), 2 },
                    { 3, new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1577), "Interested in remote work positions.", new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1578), 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_UserId",
                table: "Posts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
