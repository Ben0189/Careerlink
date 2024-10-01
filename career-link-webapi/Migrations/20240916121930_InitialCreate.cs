using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1571), new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1572) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1574), new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1575) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1577), new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1578) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1436), new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1480) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1484), new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1485) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1487), new DateTime(2024, 9, 16, 22, 19, 30, 601, DateTimeKind.Local).AddTicks(1488) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4248), new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4253) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4257), new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4259) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4262), new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4264) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(3998), new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4057) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4062), new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4065) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4069), new DateTime(2024, 8, 28, 11, 8, 22, 912, DateTimeKind.Local).AddTicks(4071) });
        }
    }
}
