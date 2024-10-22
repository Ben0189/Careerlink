using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddTitleColumnToPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "3b6a2b73-20a1-4385-bfab-5399f2010717", "727407d1-c804-4aa9-9338-9a960a9e82c8" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                column: "Title",
                value: "Software Engineer");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                column: "Title",
                value: "Software Engineer");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                column: "Title",
                value: "Software Engineer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Posts");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "87e95b48-bfb5-4833-a938-6c6228b09213", "60400758-cc65-43b5-bda0-5c794c8f7b2c" });
        }
    }
}
