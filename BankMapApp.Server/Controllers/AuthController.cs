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


//PREVIOUS VERSION
//namespace BankMapApp.Server.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly AppDbContext _context;
//        private readonly IConfiguration _configuration;

//        public AuthController(AppDbContext context, IConfiguration configuration)
//        {
//            _context = context;
//            _configuration = configuration;
//        }

//        //register endpoint
//        [HttpPost("register")]
//        [AllowAnonymous]
//        public async Task<IActionResult> Register([FromBody] RegisterDto request)
//        {
//            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
//                return BadRequest("User already exists with the same email address.");

//            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

//            var user = new User
//            {
//                FirstName = request.FirstName,
//                LastName = request.LastName,
//                Email = request.Email,
//                PasswordHash = passwordHash,
//                Role = request.Role
//            };

//            _context.Users.Add(user);
//            await _context.SaveChangesAsync();

//            return Ok("User registered successfully.");
//        }

//        //login endpoint
//        [HttpPost("login")]
//        public IActionResult Login([FromBody] LoginDto loginDto)
//        {
//            if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
//            {
//                return BadRequest("Email and password are required.");
//            }

//            var user = _context.Users.FirstOrDefault(u => u.Email == loginDto.Email);
//            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
//            {
//                return Unauthorized("Invalid email or password.");
//            }

//            var token = GenerateJwtToken(user);
//            return Ok(new
//            {
//                Token = token,
//                Email = user.Email,
//                Role = user.Role
//            });
//        }

//        private string GenerateJwtToken(User user)
//        {
//            var claims = new[]
//            {
//                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
//                new Claim(ClaimTypes.Name, user.Email),
//                new Claim(ClaimTypes.Role, user.Role.ToString()),
//            };



//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//            var token = new JwtSecurityToken(
//                issuer: _configuration["Jwt:Issuer"],
//                audience: _configuration["Jwt:Audience"],
//                claims: claims,
//                expires: DateTime.UtcNow.AddHours(2),
//                signingCredentials: creds
//            );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}