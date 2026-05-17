using BankMapApp.Server.DTOs;
using BankMapApp.Server.Models;
using Microsoft.AspNetCore.Mvc;


namespace BankMapApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        //login endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _authService.AuthenticateUser(loginDto.Email, loginDto.Password);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            var token = _authService.GenerateJwtToken(user);
            return Ok(new { token });
        }

        //register endpoint
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto request)
        {
            if (!Enum.TryParse(request.Role, true, out UserRole role))
            {
                return BadRequest("Invalid role specified. Please choose either Admin or User.");
            }

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Role = role
            };

            var registeredUser = await _authService.RegisterUser(user, request.Password);
            return Ok(registeredUser);
        }   
    }
}