using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace BankMapApp.Server.Dto
{
    public class PoiUpdateDto
    {
        [Required]
        public string Type { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        [Required]
        public Geometry Geometry { get; set; }
        public JsonElement Data { get; set; }

        //public Guid? BankBranchId { get; set; }
    }
}