using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddResumeUrlColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResumeUrl",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "74308bd4-01e4-4ecd-a974-f465712b2196", "b27becf2-9ab0-4c10-b438-6a59f5d954d3" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                column: "ResumeUrl",
                value: "https://example.com/resume");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                column: "ResumeUrl",
                value: "https://example.com/resume");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                column: "ResumeUrl",
                value: "https://example.com/resume");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResumeUrl",
                table: "Posts");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "3b6a2b73-20a1-4385-bfab-5399f2010717", "727407d1-c804-4aa9-9338-9a960a9e82c8" });
        }
    }
}
