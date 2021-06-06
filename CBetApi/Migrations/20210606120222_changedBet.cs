using Microsoft.EntityFrameworkCore.Migrations;

namespace CBetApi.Migrations
{
    public partial class changedBet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Amount",
                table: "Bets",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Amount",
                table: "Bets",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
