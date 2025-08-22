using Microsoft.AspNetCore.SignalR;
using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace BankMapApp.Server.Dto
{
    public class PoiCreateDto
    {
        public string Name { get; set; }

        [Required]
        public string Type { get; set; } = string.Empty; // "Point" or "LineString"

        [Required]
        public Geometry Geometry { get; set; } = null!; //was of type Geometry

        public JsonElement Data { get; set; }

        //public int UserId { get; set; } // Foreign key to User, nullable for public POIs

        //public Guid? BankBranchId { get; set; }
    }
}