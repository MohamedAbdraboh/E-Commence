using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ECommence.Stores",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ECommence.Stores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ECommence.Branches",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BranchNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StoreId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ECommence.Branches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ECommence.Branches_ECommence.Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "ECommence.Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ECommence.Branches_ECommence.Stores_StoreId1",
                        column: x => x.StoreId1,
                        principalTable: "ECommence.Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ECommence.Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StoreId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ECommence.Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ECommence.Products_ECommence.Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "ECommence.Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ECommence.Products_ECommence.Stores_StoreId1",
                        column: x => x.StoreId1,
                        principalTable: "ECommence.Stores",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ECommence.BranchProducts",
                columns: table => new
                {
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    BranchId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProductId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ECommence.BranchProducts", x => new { x.BranchId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_ECommence.BranchProducts_ECommence.Branches_BranchId1",
                        column: x => x.BranchId1,
                        principalTable: "ECommence.Branches",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ECommence.BranchProducts_ECommence.Products_ProductId1",
                        column: x => x.ProductId1,
                        principalTable: "ECommence.Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ECommence.Branches_BranchNumber",
                table: "ECommence.Branches",
                column: "BranchNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ECommence.Branches_StoreId",
                table: "ECommence.Branches",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ECommence.Branches_StoreId1",
                table: "ECommence.Branches",
                column: "StoreId1");

            migrationBuilder.CreateIndex(
                name: "IX_ECommence.BranchProducts_BranchId1",
                table: "ECommence.BranchProducts",
                column: "BranchId1");

            migrationBuilder.CreateIndex(
                name: "IX_ECommence.BranchProducts_ProductId1",
                table: "ECommence.BranchProducts",
                column: "ProductId1");

            migrationBuilder.CreateIndex(
                name: "IX_ECommence.Products_StoreId",
                table: "ECommence.Products",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ECommence.Products_StoreId1",
                table: "ECommence.Products",
                column: "StoreId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ECommence.BranchProducts");

            migrationBuilder.DropTable(
                name: "ECommence.Branches");

            migrationBuilder.DropTable(
                name: "ECommence.Products");

            migrationBuilder.DropTable(
                name: "ECommence.Stores");
        }
    }
}
