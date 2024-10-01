using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Career_link_webapi.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataForPsdad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_AspNetUsers_UserId",
                table: "Post");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Post",
                table: "Post");

            migrationBuilder.RenameTable(
                name: "Post",
                newName: "Posts");

            migrationBuilder.RenameIndex(
                name: "IX_Post_UserId",
                table: "Posts",
                newName: "IX_Posts_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Posts",
                table: "Posts",
                column: "PostId");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "8274cdd7-e0b1-4054-8341-589de04e38eb", "ea8c5ca8-c493-44d6-a3bc-cc77f3220bd8" });

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_UserId",
                table: "Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Posts",
                table: "Posts");

            migrationBuilder.RenameTable(
                name: "Posts",
                newName: "Post");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_UserId",
                table: "Post",
                newName: "IX_Post_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Post",
                table: "Post",
                column: "PostId");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "testuser",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "95fb762f-5853-4626-be0a-75c62d793b07", "e0356612-2a19-410e-b804-c65d7d335f88" });

            migrationBuilder.AddForeignKey(
                name: "FK_Post_AspNetUsers_UserId",
                table: "Post",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
