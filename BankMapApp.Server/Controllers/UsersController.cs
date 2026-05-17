using BankMapApp.Server.Data;
using BankMapApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        return Ok(await _context.Users.ToListAsync());
    }

    // GET: api/users/{id}
    [HttpGet("{id}")]


    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) { 
            return NotFound("User not found.");
        }
        return Ok(user);
    }

    //ADD more endpoints for updating (POST), and deleting users (DELETE)
}