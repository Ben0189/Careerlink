using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class yearsOfExperience : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "yearsOfExperience",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "d685e074-5efb-47d1-a127-95682782593a", "5c1deaaf-c77c-40d2-ab79-87e4f350ce02" });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                column: "yearsOfExperience",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                column: "yearsOfExperience",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                column: "yearsOfExperience",
                value: 3);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "yearsOfExperience",
                table: "Posts");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "8056274a-ff84-4c3c-b1de-0c6c48e03b0b", "c3d64633-fb51-48f9-8828-b336f645749f" });
        }
    }
}
