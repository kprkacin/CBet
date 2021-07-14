using Microsoft.EntityFrameworkCore.Migrations;

namespace CBetApi.Migrations
{
    public partial class addedThirdParty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ThirdParty",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThirdParty",
                table: "Users");
        }
    }
}
