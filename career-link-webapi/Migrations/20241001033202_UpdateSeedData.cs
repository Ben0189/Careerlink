using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "120511b5-2390-4b3c-9c09-53fb56e0ac1e", "88a5d32b-8f46-48d6-8e28-6548c3440015" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "Description", "UpdatedDate", "UserId1" },
                values: new object[] { new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Excited about new opportunities in data science.", new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate", "UserId1" },
                values: new object[] { new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "4dfd906d-4191-4bbc-8cc9-d2751eb6fc9b", "e1708193-cac0-4a7c-b3b3-fe71802caec2" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2400), new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2430) });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "Description", "UpdatedDate", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), "Excited about new opportunitÍies in data science.", new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), 0 });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), 0 });
        }
    }
}
