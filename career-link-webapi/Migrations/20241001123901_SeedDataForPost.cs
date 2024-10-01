using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataForPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "testuser", null, "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UpdatedDate", "UserName" },
                values: new object[] { "testuser", 0, "95fb762f-5853-4626-be0a-75c62d793b07", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "predefineduser@example.com", true, false, null, "PREDEFINEDUSER@EXAMPLE.COM", "PREDEFINEDUSER", "plaintextpassword", null, false, "e0356612-2a19-410e-b804-c65d7d335f88", false, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "predefineduser" });

            migrationBuilder.InsertData(
                table: "Post",
                columns: new[] { "PostId", "CreatedDate", "Description", "UpdatedDate", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Looking for a software engineering job.", new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "testuser" },
                    { 2, new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Excited about new opportunities in data science.", new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "testuser" },
                    { 3, new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Interested in remote work positions.", new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "testuser" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "testuser");

            migrationBuilder.DeleteData(
                table: "Post",
                keyColumn: "PostId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Post",
                keyColumn: "PostId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Post",
                keyColumn: "PostId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser");
        }
    }
}
