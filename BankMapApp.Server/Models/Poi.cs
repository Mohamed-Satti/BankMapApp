using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace BankMapApp.Server.Models
{
    public class Poi
    {
        public int Id { get; set; }

        [Required]
        public string Type { get; set; } // e.g., "BankBranch", "ATM", "Route", "ParkingLot"

        [Required]
        [Column(TypeName = "geography(GeometryZ, 4326)")]
        public Geometry Geometry { get; set; }

        public int? UserId { get; set; } // Foreign key to User, nullable for public POIs
        public User User { get; set; }

        [Column(TypeName = "jsonb")]
        public JsonDocument Data { get; set; } // Stores flexible data (address, contact, etc.)
        public string Name { get; internal set; }
    }


    //public class PointOfInterest //previous class name
    //{
    //    public int Id { get; set; }//guid?
    //    public required string Name { get; set; } //required?
    //    public required string Type { get; set; }  // "Point" or "Line" //required?
    //    public required Geometry Geometry { get; set; }  // Point or LineString //required?
    //    public int OwnerId { get; set; }//guid?
    //    public int? BankBranchId { get; set; }//guid?
    //    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    //}
}