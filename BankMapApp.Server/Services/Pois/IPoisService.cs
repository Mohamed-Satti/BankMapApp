using BankMapApp.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace BankMapApp.Server.Services.Pois
{
    public interface IPoisService
    {
        Task<IEnumerable<Poi>> GetAllPoisForAdmin();
        Task<IEnumerable<Poi>> GetUserPois(int userId);
        Task<Poi> GetPoiById(int id);
        Task<Poi> CreatePoi(Poi poi);
        Task<Poi> UpdatePoi(Poi poi);
        Task DeletePoi(int id);
    }
}