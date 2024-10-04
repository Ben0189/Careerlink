using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class RenameExperienceLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "yearsOfExperience",
                table: "Posts",
                newName: "experienceLevel");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "c56a3729-6b59-4546-b22a-1d05f7b9c97f", "813d7233-98b7-4283-a079-cb1169dd6549" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "experienceLevel",
                table: "Posts",
                newName: "yearsOfExperience");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "d685e074-5efb-47d1-a127-95682782593a", "5c1deaaf-c77c-40d2-ab79-87e4f350ce02" });
        }
    }
}
