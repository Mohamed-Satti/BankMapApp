using BankMapApp.Server.Data;
using BankMapApp.Server.Models;
using BankMapApp.Server.Services.Pois;
using Microsoft.EntityFrameworkCore;


public class PoisService : IPoisService
{
    private readonly AppDbContext _context;

    public PoisService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Poi>> GetAllPoisForAdmin()
    {
        return await _context.Pois.ToListAsync();
    }

    public async Task<IEnumerable<Poi>> GetUserPois(int userId)
    {
        // Get user-owned POIs and public bank branches (UserId == null)
        return await _context.Pois
                             .Where(p => p.UserId == userId || p.UserId == null)
                             .ToListAsync();
    }

    public async Task<Poi> GetPoiById(int id)
    {
        return await _context.Pois.FindAsync(id);
    }

    public async Task<Poi> CreatePoi(Poi poi)
    {
        _context.Pois.Add(poi);
        await _context.SaveChangesAsync();
        return poi;
    }

    public async Task<Poi> UpdatePoi(Poi poi)
    {
        _context.Entry(poi).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return poi;
    }

    public async Task DeletePoi(int id)
    {
        var poi = await _context.Pois.FindAsync(id);
        if (poi != null)
        {
            _context.Pois.Remove(poi);
            await _context.SaveChangesAsync();
        }
    }
}