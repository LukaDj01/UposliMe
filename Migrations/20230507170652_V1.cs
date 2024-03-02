using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UposliMe.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administratori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administratori", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Notifikacije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Poruka = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: true),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifikacije", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Poslodavci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PIB = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    MaticniBroj = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FiksniTelefon = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    MobilniTelefon = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Delatnost = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ulica = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojStana = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    BrojUlaza = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    Informacije = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poslodavci", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Zadrugari",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Telefon = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    JMBG = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    SrednjaSkola = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Fakultet = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Indeks = table.Column<int>(type: "int", nullable: false),
                    LBO = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    BrojRacuna = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ulica = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojStana = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    BrojUlaza = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zadrugari", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Zadruge",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PIB = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    MaticniBroj = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Slika = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    FiksniTelefon = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    MobilniTelefon = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojRacuna = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ulica = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojStana = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    BrojUlaza = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    Informacije = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zadruge", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "NotifikacijeAdministratori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Procitana = table.Column<bool>(type: "bit", nullable: false),
                    AdministratorID = table.Column<int>(type: "int", nullable: true),
                    NotifikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotifikacijeAdministratori", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NotifikacijeAdministratori_Administratori_AdministratorID",
                        column: x => x.AdministratorID,
                        principalTable: "Administratori",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_NotifikacijeAdministratori_Notifikacije_NotifikacijaID",
                        column: x => x.NotifikacijaID,
                        principalTable: "Notifikacije",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "NotifikacijePoslodavci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Procitana = table.Column<bool>(type: "bit", nullable: false),
                    PoslodavacID = table.Column<int>(type: "int", nullable: true),
                    NotifikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotifikacijePoslodavci", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NotifikacijePoslodavci_Notifikacije_NotifikacijaID",
                        column: x => x.NotifikacijaID,
                        principalTable: "Notifikacije",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_NotifikacijePoslodavci_Poslodavci_PoslodavacID",
                        column: x => x.PoslodavacID,
                        principalTable: "Poslodavci",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "NotifikacijeZadrugari",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Procitana = table.Column<bool>(type: "bit", nullable: false),
                    ZadrugarID = table.Column<int>(type: "int", nullable: true),
                    NotifikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotifikacijeZadrugari", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NotifikacijeZadrugari_Notifikacije_NotifikacijaID",
                        column: x => x.NotifikacijaID,
                        principalTable: "Notifikacije",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_NotifikacijeZadrugari_Zadrugari_ZadrugarID",
                        column: x => x.ZadrugarID,
                        principalTable: "Zadrugari",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<double>(type: "float", nullable: false),
                    Komentar = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: true),
                    ZadrugarID = table.Column<int>(type: "int", nullable: true),
                    ZadrugaID = table.Column<int>(type: "int", nullable: true),
                    PoslodavacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Feedbacks_Poslodavci_PoslodavacID",
                        column: x => x.PoslodavacID,
                        principalTable: "Poslodavci",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Feedbacks_Zadrugari_ZadrugarID",
                        column: x => x.ZadrugarID,
                        principalTable: "Zadrugari",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Feedbacks_Zadruge_ZadrugaID",
                        column: x => x.ZadrugaID,
                        principalTable: "Zadruge",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "NotifikacijeZadruge",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Procitana = table.Column<bool>(type: "bit", nullable: false),
                    ZadrugaID = table.Column<int>(type: "int", nullable: true),
                    NotifikacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotifikacijeZadruge", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NotifikacijeZadruge_Notifikacije_NotifikacijaID",
                        column: x => x.NotifikacijaID,
                        principalTable: "Notifikacije",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_NotifikacijeZadruge_Zadruge_ZadrugaID",
                        column: x => x.ZadrugaID,
                        principalTable: "Zadruge",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Oglasi",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: false),
                    BrojPotrebnihRadnika = table.Column<int>(type: "int", nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ulica = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojStana = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    BrojUlaza = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    RokZaPrijavu = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumPostavljanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumIzvrsavanjaPosla = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Novac = table.Column<double>(type: "float", nullable: false),
                    NacinPlacanja = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Odobren = table.Column<bool>(type: "bit", nullable: false),
                    OdabraniRadnici = table.Column<bool>(type: "bit", nullable: false),
                    NapravljenUgovor = table.Column<bool>(type: "bit", nullable: false),
                    Aktuelan = table.Column<bool>(type: "bit", nullable: false),
                    ZadrugaID = table.Column<int>(type: "int", nullable: true),
                    PoslodavacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Oglasi", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Oglasi_Poslodavci_PoslodavacID",
                        column: x => x.PoslodavacID,
                        principalTable: "Poslodavci",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Oglasi_Zadruge_ZadrugaID",
                        column: x => x.ZadrugaID,
                        principalTable: "Zadruge",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "OglasiZadrugari",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZadrugarID = table.Column<int>(type: "int", nullable: true),
                    OglasID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OglasiZadrugari", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OglasiZadrugari_Oglasi_OglasID",
                        column: x => x.OglasID,
                        principalTable: "Oglasi",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_OglasiZadrugari_Zadrugari_ZadrugarID",
                        column: x => x.ZadrugarID,
                        principalTable: "Zadrugari",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Ugovori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Opis = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: false),
                    DatumFormiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ZadrugarID = table.Column<int>(type: "int", nullable: true),
                    ZadrugaID = table.Column<int>(type: "int", nullable: true),
                    PoslodavacID = table.Column<int>(type: "int", nullable: true),
                    OglasID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ugovori", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ugovori_Oglasi_OglasID",
                        column: x => x.OglasID,
                        principalTable: "Oglasi",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Ugovori_Poslodavci_PoslodavacID",
                        column: x => x.PoslodavacID,
                        principalTable: "Poslodavci",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Ugovori_Zadrugari_ZadrugarID",
                        column: x => x.ZadrugarID,
                        principalTable: "Zadrugari",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_Ugovori_Zadruge_ZadrugaID",
                        column: x => x.ZadrugaID,
                        principalTable: "Zadruge",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_PoslodavacID",
                table: "Feedbacks",
                column: "PoslodavacID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_ZadrugaID",
                table: "Feedbacks",
                column: "ZadrugaID");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_ZadrugarID",
                table: "Feedbacks",
                column: "ZadrugarID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijeAdministratori_AdministratorID",
                table: "NotifikacijeAdministratori",
                column: "AdministratorID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijeAdministratori_NotifikacijaID",
                table: "NotifikacijeAdministratori",
                column: "NotifikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijePoslodavci_NotifikacijaID",
                table: "NotifikacijePoslodavci",
                column: "NotifikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijePoslodavci_PoslodavacID",
                table: "NotifikacijePoslodavci",
                column: "PoslodavacID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijeZadrugari_NotifikacijaID",
                table: "NotifikacijeZadrugari",
                column: "NotifikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijeZadrugari_ZadrugarID",
                table: "NotifikacijeZadrugari",
                column: "ZadrugarID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijeZadruge_NotifikacijaID",
                table: "NotifikacijeZadruge",
                column: "NotifikacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_NotifikacijeZadruge_ZadrugaID",
                table: "NotifikacijeZadruge",
                column: "ZadrugaID");

            migrationBuilder.CreateIndex(
                name: "IX_Oglasi_PoslodavacID",
                table: "Oglasi",
                column: "PoslodavacID");

            migrationBuilder.CreateIndex(
                name: "IX_Oglasi_ZadrugaID",
                table: "Oglasi",
                column: "ZadrugaID");

            migrationBuilder.CreateIndex(
                name: "IX_OglasiZadrugari_OglasID",
                table: "OglasiZadrugari",
                column: "OglasID");

            migrationBuilder.CreateIndex(
                name: "IX_OglasiZadrugari_ZadrugarID",
                table: "OglasiZadrugari",
                column: "ZadrugarID");

            migrationBuilder.CreateIndex(
                name: "IX_Ugovori_OglasID",
                table: "Ugovori",
                column: "OglasID");

            migrationBuilder.CreateIndex(
                name: "IX_Ugovori_PoslodavacID",
                table: "Ugovori",
                column: "PoslodavacID");

            migrationBuilder.CreateIndex(
                name: "IX_Ugovori_ZadrugaID",
                table: "Ugovori",
                column: "ZadrugaID");

            migrationBuilder.CreateIndex(
                name: "IX_Ugovori_ZadrugarID",
                table: "Ugovori",
                column: "ZadrugarID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "NotifikacijeAdministratori");

            migrationBuilder.DropTable(
                name: "NotifikacijePoslodavci");

            migrationBuilder.DropTable(
                name: "NotifikacijeZadrugari");

            migrationBuilder.DropTable(
                name: "NotifikacijeZadruge");

            migrationBuilder.DropTable(
                name: "OglasiZadrugari");

            migrationBuilder.DropTable(
                name: "Ugovori");

            migrationBuilder.DropTable(
                name: "Administratori");

            migrationBuilder.DropTable(
                name: "Notifikacije");

            migrationBuilder.DropTable(
                name: "Oglasi");

            migrationBuilder.DropTable(
                name: "Zadrugari");

            migrationBuilder.DropTable(
                name: "Poslodavci");

            migrationBuilder.DropTable(
                name: "Zadruge");
        }
    }
}
