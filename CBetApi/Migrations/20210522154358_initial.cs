using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CBetApi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<double>(type: "double precision", nullable: false),
                    Amount = table.Column<double>(type: "double precision", nullable: false),
                    CountryId = table.Column<int>(type: "integer", nullable: true),
                    Coeficient = table.Column<float>(type: "real", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    PayoutAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bets_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Code", "Name" },
                values: new object[,]
                {
                    { 1, "AF", "Afghanistan" },
                    { 123, "NC", "New Caledonia" },
                    { 124, "NZ", "New Zealand" },
                    { 125, "NI", "Nicaragua" },
                    { 126, "NE", "Niger" },
                    { 127, "NG", "Nigeria" },
                    { 128, "MK", "North Macedonia" },
                    { 129, "NO", "Norway" },
                    { 130, "OM", "Oman" },
                    { 131, "PK", "Pakistan" },
                    { 122, "NL", "Netherlands" },
                    { 132, "PA", "Panama" },
                    { 134, "PY", "Paraguay" },
                    { 135, "PE", "Peru" },
                    { 136, "PH", "Philippines" },
                    { 137, "PN", "Pitcairn" },
                    { 138, "PL", "Poland" },
                    { 139, "PT", "Portugal" },
                    { 140, "QA", "Qatar" },
                    { 141, "RO", "Romania" },
                    { 142, "RU", "Russia" },
                    { 133, "PG", "Papua New Guinea" },
                    { 143, "RW", "Rwanda" },
                    { 121, "NP", "Nepal" },
                    { 119, "MM", "Burma" },
                    { 99, "LI", "Liechtenstein" },
                    { 100, "LT", "Lithuania" },
                    { 101, "LU", "Luxembourg" },
                    { 102, "MG", "Madagascar" },
                    { 103, "MW", "Malawi" },
                    { 104, "MY", "Malaysia" },
                    { 105, "MV", "Maldives" },
                    { 106, "ML", "Mali" },
                    { 107, "MT", "Malta" },
                    { 120, "NA", "Namibia" },
                    { 108, "MH", "Marshall Islands" },
                    { 110, "MU", "Mauritius" },
                    { 111, "MX", "Mexico" },
                    { 112, "FM", "Micronesia" },
                    { 113, "MD", "Moldova" },
                    { 114, "MC", "Monaco" },
                    { 115, "MN", "Mongolia" },
                    { 116, "ME", "Montenegro" },
                    { 117, "MA", "Morocco" },
                    { 118, "MZ", "Mozambique" },
                    { 109, "MR", "Mauritania" },
                    { 98, "LY", "Libya" },
                    { 144, "KN", "Saint Kitts and Nevis" },
                    { 146, "VC", "Saint Vincent and the Grenadines" },
                    { 171, "TZ", "Tanzania" },
                    { 172, "TH", "Thailand" },
                    { 173, "TL", "Timor-Leste" },
                    { 174, "TG", "Togo" },
                    { 175, "TT", "Trinidad and Tobago" },
                    { 176, "TN", "Tunisia" },
                    { 177, "TR", "Turkey" },
                    { 178, "UG", "Uganda" },
                    { 179, "UA", "Ukraine" },
                    { 170, "TJ", "Tajikistan" },
                    { 180, "AE", "United Arab Emirates" },
                    { 182, "US", "US" },
                    { 183, "UY", "Uruguay" },
                    { 184, "UZ", "Uzbekistan" },
                    { 185, "VU", "Vanuatu" },
                    { 186, "VE", "Venezuela" },
                    { 187, "VN", "Vietnam" },
                    { 188, "YE", "Yemen" },
                    { 189, "ZM", "Zambia" },
                    { 190, "ZW", "Zimbabwe" },
                    { 181, "GB", "United Kingdom" },
                    { 145, "LC", "Saint Lucia" },
                    { 169, "TW", "Taiwan" },
                    { 167, "CH", "Switzerland" },
                    { 147, "WS", "Samoa" },
                    { 148, "SM", "San Marino" },
                    { 149, "ST", "Sao Tome and Principe" },
                    { 150, "SA", "Saudi Arabia" },
                    { 151, "SN", "Senegal" },
                    { 152, "RS", "Serbia" },
                    { 153, "SC", "Seychelles" },
                    { 154, "SL", "Sierra Leone" },
                    { 155, "SG", "Singapore" },
                    { 168, "SY", "Syria" },
                    { 156, "SK", "Slovakia" },
                    { 158, "SB", "Solomon Islands" },
                    { 159, "SO", "Somalia" },
                    { 160, "ZA", "South Africa" },
                    { 161, "SS", "South Sudan" },
                    { 162, "ES", "Spain" },
                    { 163, "LK", "Sri Lanka" },
                    { 164, "SD", "Sudan" },
                    { 165, "SR", "Suriname" },
                    { 166, "SE", "Sweden" },
                    { 157, "SI", "Slovenia" },
                    { 97, "LR", "Liberia" },
                    { 96, "LS", "Lesotho" },
                    { 95, "LB", "Lebanon" },
                    { 26, "BF", "Burkina Faso" },
                    { 27, "BI", "Burundi" },
                    { 28, "CV", "Cabo Verde" },
                    { 29, "KH", "Cambodia" },
                    { 30, "CM", "Cameroon" },
                    { 31, "CA", "Canada" },
                    { 32, "KY", "Cayman Islands" },
                    { 33, "CF", "Central African Republic" },
                    { 34, "TD", "Chad" },
                    { 25, "BG", "Bulgaria" },
                    { 35, "CL", "Chile" },
                    { 37, "CO", "Colombia" },
                    { 38, "KM", "Comoros" },
                    { 39, "CG", "Congo (Brazzaville)" },
                    { 40, "CD", "Congo (Kinshasa)" },
                    { 41, "CR", "Costa Rica" },
                    { 42, "CI", "Cote d'Ivoire" },
                    { 43, "HR", "Croatia" },
                    { 44, "CU", "Cuba" },
                    { 45, "CY", "Cyprus" },
                    { 36, "CN", "China" },
                    { 46, "CZ", "Czechia" },
                    { 24, "BN", "Brunei" },
                    { 22, "BW", "Botswana" },
                    { 2, "AL", "Albania" },
                    { 3, "DZ", "Algeria" },
                    { 4, "AO", "Angola" },
                    { 5, "AG", "Antigua and Barbuda" },
                    { 6, "AR", "Argentina" },
                    { 7, "AM", "Armenia" },
                    { 8, "AU", "Australia" },
                    { 9, "AT", "Austria" },
                    { 10, "AZ", "Azerbaijan" },
                    { 23, "BR", "Brazil" },
                    { 11, "BS", "Bahamas" },
                    { 13, "BD", "Bangladesh" },
                    { 14, "BB", "Barbados" },
                    { 15, "BY", "Belarus" },
                    { 16, "BE", "Belgium" },
                    { 17, "BZ", "Belize" },
                    { 18, "BJ", "Benin" },
                    { 19, "BT", "Bhutan" },
                    { 20, "BO", "Bolivia" },
                    { 21, "BA", "Bosnia and Herzegovina" },
                    { 12, "BH", "Bahrain" },
                    { 47, "DK", "Denmark" },
                    { 48, "DJ", "Djibouti" },
                    { 49, "DM", "Dominica" },
                    { 75, "HU", "Hungary" },
                    { 76, "IS", "Iceland" },
                    { 77, "IN", "India" },
                    { 78, "ID", "Indonesia" },
                    { 79, "IR", "Iran" },
                    { 80, "IQ", "Iraq" },
                    { 81, "IE", "Ireland" },
                    { 82, "IL", "Israel" },
                    { 83, "IT", "Italy" },
                    { 74, "HN", "Honduras" },
                    { 84, "JM", "Jamaica" },
                    { 86, "JO", "Jordan" },
                    { 87, "KZ", "Kazakhstan" },
                    { 88, "KE", "Kenya" },
                    { 89, "KR", "Korea, South" },
                    { 90, "KS", "Kosovo" },
                    { 91, "KW", "Kuwait" },
                    { 92, "KG", "Kyrgyzstan" },
                    { 93, "LA", "Laos" },
                    { 94, "LV", "Latvia" },
                    { 85, "JP", "Japan" },
                    { 73, "HT", "Haiti" },
                    { 72, "GY", "Guyana" },
                    { 71, "GW", "Guinea-Bissau" },
                    { 50, "DO", "Dominican Republic" },
                    { 51, "EC", "Ecuador" },
                    { 52, "EG", "Egypt" },
                    { 53, "SV", "El Salvador" },
                    { 54, "GQ", "Equatorial Guinea" },
                    { 55, "ER", "Eritrea" },
                    { 56, "EE", "Estonia" },
                    { 57, "SZ", "Eswatini" },
                    { 58, "ET", "Ethiopia" },
                    { 59, "FJ", "Fiji" },
                    { 60, "FI", "Finland" },
                    { 61, "FR", "France" },
                    { 62, "GA", "Gabon" },
                    { 63, "GM", "Gambia" },
                    { 64, "GE", "Georgia" },
                    { 65, "DE", "Germany" },
                    { 66, "GH", "Ghana" },
                    { 67, "GR", "Greece" },
                    { 68, "GD", "Grenada" },
                    { 69, "GT", "Guatemala" },
                    { 70, "GN", "Guinea" },
                    { 191, "GL", "Global" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "Password", "Username" },
                values: new object[] { 2, "email@email.em", "Test2", "TestLast", "testpass", "TestUserName" });

            migrationBuilder.CreateIndex(
                name: "IX_Bets_CountryId",
                table: "Bets",
                column: "CountryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bets");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
