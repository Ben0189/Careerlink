using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserColumnAndSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "ContactNumber",
                table: "Users",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "ContactNumber", "CreatedDate", "EmailName", "FirstName", "LastName", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, 1234567890L, new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(3998), "john.doe@example.com", "John", "Doe", new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4057) },
                    { 2, 9876543210L, new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4062), "jane.smith@example.com", "Jane", "Smith", new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4065) },
                    { 3, 5551234567L, new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4069), "alice.johnson@example.com", "Alice", "Johnson", new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4071) }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "CreatedDate", "Description", "UpdatedDate", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4248), "Looking for a software engineering job.", new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4253), 1 },
                    { 2, new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4257), "Excited about new opportunities in data science.", new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4259), 2 },
                    { 3, new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4262), "Interested in remote work positions.", new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4264), 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3);

            migrationBuilder.AlterColumn<int>(
                name: "ContactNumber",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
