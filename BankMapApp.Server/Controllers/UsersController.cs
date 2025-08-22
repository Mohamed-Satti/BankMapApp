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

    //Check them later
    //[SwaggerOperation(OperationId = "GetUserById", Tags = new[] { "Users" })]
    //[SwaggerResponse(200, "Success", typeof(User))]
    //[SwaggerResponse(404, "Not Found")]
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

//IntelliSense VERSION (better (uses a service) for future)
//public class UsersController : ControllerBase
//{
//    private readonly IUserService _userService;
//    public UsersController(IUserService userService)
//    {
//        _userService = userService;
//    }
//    // GET: api/users
//    [HttpGet]
//    public async Task<IActionResult> GetAllUsers()
//    {
//        var users = await _userService.GetAllUsersAsync();
//        return Ok(users);
//    }
//    // GET: api/users/{id}
//    [HttpGet("{id}")]
//    public async Task<IActionResult> GetUserById(Guid id)
//    {
//        var user = await _userService.GetUserByIdAsync(id);
//        if (user == null) return NotFound();
//        return Ok(user);
//    }




//}