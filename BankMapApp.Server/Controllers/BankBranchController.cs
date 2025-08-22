//NOT USED FOR NOW

//using BankMapApp.Server.Data;
//using BankMapApp.Server.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Authorization;

//// This controller handles CRUD operations for bank branches
//namespace BankMapApp.Server.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class BankBranchController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public BankBranchController(AppDbContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<BankBranch>>> GetAll()
//        {
//            return await _context.BankBranches.ToListAsync();
//        }

//        [Authorize(Roles = "Admin")]
//        [HttpPost]
//        public async Task<ActionResult> Create(BankBranch branch)
//        {
//            _context.BankBranches.Add(branch);
//            await _context.SaveChangesAsync();
//            return Ok(branch);
//        }

//        [Authorize(Roles = "Admin")]
//        [HttpPut("{id}")]
//        public async Task<ActionResult> Update(Guid id, BankBranch updatedBranch)
//        {
//            var branch = await _context.BankBranches.FindAsync(id);
//            if (branch == null) return NotFound();

//            branch.Name = updatedBranch.Name;
//            branch.Geometry = updatedBranch.Geometry;

//            await _context.SaveChangesAsync();
//            return Ok(branch);
//        }

//        [Authorize(Roles = "Admin")]
//        [HttpDelete("{id}")]
//        public async Task<ActionResult> Delete(Guid id)
//        {
//            var branch = await _context.BankBranches.FindAsync(id);
//            if (branch == null) return NotFound();

//            _context.BankBranches.Remove(branch);
//            await _context.SaveChangesAsync();
//            return NoContent();
//        }
//    }
//}
