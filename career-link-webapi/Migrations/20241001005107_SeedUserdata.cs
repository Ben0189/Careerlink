using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class SeedUserdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserId1",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_UserId1",
                table: "Posts");

            migrationBuilder.AlterColumn<int>(
                name: "UserId1",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Posts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1", null, "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UpdatedDate", "UserName" },
                values: new object[] { "1", 0, "4dfd906d-4191-4bbc-8cc9-d2751eb6fc9b", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "predefineduser@example.com", true, false, null, "PREDEFINEDUSER@EXAMPLE.COM", "PREDEFINEDUSER", "plaintextpassword", null, false, "e1708193-cac0-4a7c-b3b3-fe71802caec2", false, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "predefineduser" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate", "UserId", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2400), new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2430), null, 1 });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "Description", "UpdatedDate", "UserId", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), "Excited about new opportunitÍies in data science.", new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), null, 0 });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate", "UserId", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), new DateTime(2024, 10, 1, 10, 51, 7, 262, DateTimeKind.Local).AddTicks(2440), null, 0 });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_UserId",
                table: "Posts");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.AlterColumn<string>(
                name: "UserId1",
                table: "Posts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                columns: new[] { "CreatedDate", "UpdatedDate", "UserId", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 41, 38, 895, DateTimeKind.Local).AddTicks(4730), new DateTime(2024, 10, 1, 10, 41, 38, 895, DateTimeKind.Local).AddTicks(4760), 0, null });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                columns: new[] { "CreatedDate", "Description", "UpdatedDate", "UserId", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 41, 38, 895, DateTimeKind.Local).AddTicks(4760), "Excited about new opportunities in data science.", new DateTime(2024, 10, 1, 10, 41, 38, 895, DateTimeKind.Local).AddTicks(4770), 0, null });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                columns: new[] { "CreatedDate", "UpdatedDate", "UserId", "UserId1" },
                values: new object[] { new DateTime(2024, 10, 1, 10, 41, 38, 895, DateTimeKind.Local).AddTicks(4770), new DateTime(2024, 10, 1, 10, 41, 38, 895, DateTimeKind.Local).AddTicks(4770), 0, null });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId1",
                table: "Posts",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserId1",
                table: "Posts",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
