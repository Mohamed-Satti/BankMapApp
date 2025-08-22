using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

namespace BankMapApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixPoiGeometryType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Geometry>(
                name: "Geometry",
                table: "Pois",
                type: "geography(Geometry, 4326)",
                nullable: false,
                oldClrType: typeof(Geometry),
                oldType: "geography(GeometryZ, 4326)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Geometry>(
                name: "Geometry",
                table: "Pois",
                type: "geography(GeometryZ, 4326)",
                nullable: false,
                oldClrType: typeof(Geometry),
                oldType: "geography(Geometry, 4326)");
        }
    }
}
