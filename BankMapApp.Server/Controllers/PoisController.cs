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
