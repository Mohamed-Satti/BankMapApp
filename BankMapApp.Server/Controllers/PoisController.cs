using BankMapApp.Server.Data;
using BankMapApp.Server.Dto;
using BankMapApp.Server.Models;
using BankMapApp.Server.Services.Pois;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.Json;

namespace BankMapApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PoisController : ControllerBase
    {
        private readonly IPoisService _poisService;

        public PoisController(IPoisService poisService)
        {
            _poisService = poisService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPois()
        {
            var currentUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(!int.TryParse(currentUserIdString, out int userId))
            {
                return Unauthorized("User is not authenticated. Please login!");
            }

            if(User.IsInRole("Admin"))
            {
                var pois = await _poisService.GetAllPoisForAdmin();
                return Ok(pois);
            }
            else
            {
                var userPois = await _poisService.GetUserPois(userId);
                return Ok(userPois);
            }
        }

        // POST api/pois
        [HttpPost]
        public async Task<IActionResult> CreatePoi([FromBody] PoiCreateDto poiDto)
        {
            //_context.PointsOfInterest.Add(poi);
            //await _context.SaveChangesAsync();
            //return CreatedAtAction(nameof(GetById), new { id = poi.Id }, poi);
            
            var currentUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(currentUserIdString, out int userId))
            {
                return Unauthorized("User is not authenticated. Please login!");
            }
            var poi = new Poi
            {
                Type = poiDto.Type,
                Name = poiDto.Name,
                Geometry = poiDto.Geometry,
                Data = JsonDocument.Parse(poiDto.Data.GetRawText()),
                UserId = userId
            };

            var createdPoi = await _poisService.CreatePoi(poi);
            if (createdPoi == null)
            {
                return BadRequest("Failed to create Point of Interest.");
            } 
            return CreatedAtAction(nameof(GetPois), new { id = createdPoi.Id }, createdPoi);
        }

        // PUT api/pois/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePoi(int id, [FromBody] PoiUpdateDto poiDto)
        {
            var currentUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(currentUserIdString, out int userId))
            {
                return Unauthorized();
            }
            var existingPoi = await _poisService.GetPoiById(id);
           if (existingPoi == null)
            {
                return NotFound("Point of Interest not found.");
            }
            if (existingPoi.UserId != userId && !User.IsInRole("Admin"))
            {
                return Forbid("You do not have permission to update this Point of Interest.");
            }

            existingPoi.Type = poiDto.Type;
            existingPoi.Name = poiDto.Name;
            existingPoi.Geometry = poiDto.Geometry;
            existingPoi.Data = JsonDocument.Parse(poiDto.Data.GetRawText());
            var updatedPoi = await _poisService.UpdatePoi(existingPoi);
            if (updatedPoi == null)
            {
                return BadRequest("Failed to update Point of Interest.");
            }

            //await _poisService.UpdatePoi(existingPoi); //use these lines if you want to return NoContent
            //return NoContent();

            return Ok(updatedPoi);

        }

        // DELETE api/pois/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePoi(int id)
        {
            var currentUserIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(currentUserIdString, out int userId))
            {
                return Unauthorized("User is not authenticated. Please login!");
            }
            var existingPoi = await _poisService.GetPoiById(id);
            if (existingPoi == null)
            {
                return NotFound("Point of Interest not found.");
            }
            if (existingPoi.UserId != userId && !User.IsInRole("Admin"))
            {
                return Forbid("You do not have permission to delete this Point of Interest.");
            }

            await _poisService.DeletePoi(id);
            return NoContent();
        }
    }
}

//PREVIOUS VERSIONS
//public class PoisController : ControllerBase
//{
//    private readonly AppDbContext _context;

//    public PoisController(AppDbContext context)
//    {
//        _context = context;
//    }

//    // GET api/pois
//    [HttpGet]
//    public async Task<ActionResult<IEnumerable<Poi>>> GetAll()
//    {
//        return await _context.PointsOfInterest.ToListAsync();
//    }

//    // GET api/pois/{id}
//    [HttpGet("{id}")]
//    public async Task<ActionResult<Poi>> GetById(int id)
//    {
//        var poi = await _context.PointsOfInterest.FindAsync(id);
//        if (poi == null) return NotFound();
//        return poi;
//    }

//    // POST api/pois
//    [HttpPost]
//    public async Task<ActionResult<Poi>> Create(Poi poi)
//    {
//        _context.PointsOfInterest.Add(poi);
//        await _context.SaveChangesAsync();
//        return CreatedAtAction(nameof(GetById), new { id = poi.Id }, poi);
//    }

//    // PUT api/pois/{id}
//    [HttpPut("{id}")]
//    public async Task<IActionResult> Update(int id, Poi poi)
//    {
//        if (id != poi.Id) return BadRequest();

//        _context.Entry(poi).State = EntityState.Modified;
//        await _context.SaveChangesAsync();

//        return NoContent();
//    }

//    // DELETE api/pois/{id}
//    [HttpDelete("{id}")]
//    public async Task<IActionResult> Delete(int id)
//    {
//        var poi = await _context.PointsOfInterest.FindAsync(id);
//        if (poi == null) return NotFound();

//        _context.PointsOfInterest.Remove(poi);
//        await _context.SaveChangesAsync();

//        return NoContent();
//    }
//}


//////////////////////////////////////////////////////
//using BankMapApp.Server.Models;
//using BankMapApp.Server.Dto;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System.Security.Claims;
//using BankMapApp.Server.Data;

//namespace BankMapApp.Server.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [Authorize]
//    public class PointOfInterestController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public PointOfInterestController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // GET: api/PointOfInterest
//        [HttpGet]
//        [Authorize(Roles = "Admin")]
//        public async Task<ActionResult<IEnumerable<PointOfInterestReadDto>>> GetAllPOIs()
//        {
//            var pois = await _context.PointsOfInterest
//                .AsNoTracking()
//                .Include(p => p.User)
//                .Select(p => new PointOfInterestReadDto
//                {
//                    Id = p.Id,
//                    Name = p.Name,
//                    Type = p.Type,
//                    Geometry = p.Geometry,
//                    OwnerId = p.OwnerId,
//                    BankBranchId = p.BankBranchId,
//                    CreatedAt = p.CreatedAt
//                })
//                .ToListAsync();

//            return Ok(pois);
//        }

//        // GET: api/PointOfInterest/My
//        [HttpGet("My")]
//        [Authorize(Roles = "User,Admin")]
//        public async Task<ActionResult<IEnumerable<PointOfInterestReadDto>>> GetMyPOIs()
//        {
//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            var pois = await _context.PointsOfInterest
//                .AsNoTracking()
//                .Where(p => p.OwnerId.ToString() == userId)
//                .Select(p => new PointOfInterestReadDto
//                {
//                    Id = p.Id,
//                    Name = p.Name,
//                    Type = p.Type,
//                    Geometry = p.Geometry,
//                    OwnerId = p.OwnerId,
//                    BankBranchId = p.BankBranchId,
//                    CreatedAt = p.CreatedAt
//                })
//                .ToListAsync();

//            return Ok(pois);
//        }

//        // GET: api/PointOfInterest/{id}
//        [HttpGet("{id:guid}")]
//        [Authorize(Roles = "User,Admin")]
//        public async Task<ActionResult<PointOfInterestReadDto>> GetPOI(Guid id)
//        {
//            var poi = await _context.PointsOfInterest
//                .AsNoTracking()
//                .FirstOrDefaultAsync(p => p.Id == id);

//            if (poi == null) return NotFound();

//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            if (User.IsInRole("Admin") || poi.OwnerId.ToString() == userId)
//            {
//                var dto = new PointOfInterestReadDto
//                {
//                    Id = poi.Id,
//                    Name = poi.Name,
//                    Type = poi.Type,
//                    Geometry = poi.Geometry,
//                    OwnerId = poi.OwnerId,
//                    BankBranchId = poi.BankBranchId,
//                    CreatedAt = poi.CreatedAt
//                };
//                return Ok(dto);
//            }

//            return Forbid();
//        }

//        // POST: api/PointOfInterest
//        [HttpPost]
//        [Authorize(Roles = "User,Admin")]
//        public async Task<ActionResult<PointOfInterestReadDto>> CreatePOI(PointOfInterestCreateDto dto)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            var poi = new PointOfInterest
//            {
//                Id = Guid.NewGuid(),
//                Name = dto.Name,
//                Type = dto.Type,
//                Geometry = dto.Geometry,
//                OwnerId = Guid.Parse(userId),
//                BankBranchId = dto.BankBranchId,
//                CreatedAt = DateTime.UtcNow
//            };

//            _context.PointsOfInterest.Add(poi);
//            await _context.SaveChangesAsync();

//            var readDto = new PointOfInterestReadDto
//            {
//                Id = poi.Id,
//                Name = poi.Name,
//                Type = poi.Type,
//                Geometry = poi.Geometry,
//                OwnerId = poi.OwnerId,
//                BankBranchId = poi.BankBranchId,
//                CreatedAt = poi.CreatedAt
//            };

//            return CreatedAtAction(nameof(GetPOI), new { id = poi.Id }, readDto);
//        }

//        // PUT: api/PointOfInterest/{id}
//        [HttpPut("{id:guid}")]
//        [Authorize(Roles = "User,Admin")]
//        public async Task<IActionResult> UpdatePOI(Guid id, PointOfInterestUpdateDto dto)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            var existingPOI = await _context.PointsOfInterest.FindAsync(id);
//            if (existingPOI == null) return NotFound();

//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            if (!User.IsInRole("Admin") && existingPOI.OwnerId.ToString() != userId)
//                return Forbid();

//            existingPOI.Name = dto.Name;
//            existingPOI.Type = dto.Type;
//            existingPOI.Geometry = dto.Geometry;
//            existingPOI.BankBranchId = dto.BankBranchId;

//            await _context.SaveChangesAsync();
//            return NoContent();
//        }

//        // DELETE: api/PointOfInterest/{id}
//        [HttpDelete("{id:guid}")]
//        [Authorize(Roles = "User,Admin")]
//        public async Task<IActionResult> DeletePOI(Guid id)
//        {
//            var poi = await _context.PointsOfInterest.FindAsync(id);
//            if (poi == null) return NotFound();

//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            if (!User.IsInRole("Admin") && poi.OwnerId.ToString() != userId)
//                return Forbid();

//            _context.PointsOfInterest.Remove(poi);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }
//    }
//}
