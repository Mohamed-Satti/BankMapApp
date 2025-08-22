using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using BankMapApp.Server.Models;


namespace BankMapApp.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Poi> Pois { get; set; } // Renamed for clarity and convention

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("postgis");

            // Configure the one-to-many relationship from User to Poi
            modelBuilder.Entity<Poi>()
                .HasOne(p => p.User)
                .WithMany() // No navigation property on User, so we just use WithMany()
                .HasForeignKey(p => p.UserId)
                .IsRequired(false); // Make UserId optional for public POIs

            //Configure the Geo - Spatial property explicitly
            modelBuilder.Entity<Poi>()
                .Property(p => p.Geometry)
                .HasColumnType("geography(Geometry, 4326)"); // Explicitly set geometry type and SRID

            // Configure the JSONB property explicitly
            modelBuilder.Entity<Poi>()
                .Property(p => p.Data)
                .HasColumnType("jsonb");

            base.OnModelCreating(modelBuilder);
        }
    }
}


//PREVIOUS VERSIONS
//namespace BankMapApp.Server.Data
//{
//    public class AppDbContext : DbContext
//    {
//        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }
//        public DbSet<User> Users { get; set; }
//        public DbSet<Poi> PointsOfInterest { get; set; }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.HasPostgresExtension("postgis");

//            modelBuilder.Entity<Poi>()
//                .Property(p => p.Geometry)
//                .HasColumnType("geometry");

//            modelBuilder.Entity<User>();
   
//            base.OnModelCreating(modelBuilder);
//        }
//    }
//}




//namespace BankMapApp.Server.Data
//{
//    public class AppDbContext : DbContext
//    {
//        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
//        public DbSet<User> Users { get; set; }
//        public DbSet<Poi> PointsOfInterest { get; set; }

//        //public DbSet<BankBranch> BankBranches { get; set; }
//        //public DbSet<Role> Roles { get; set; }
//        //public DbSet<ObjectType> ObjectTypes { get; set; }
//        //public DbSet<GeographicObject> GeographicObjects { get; set; }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.HasPostgresExtension("postgis");

//            //modelBuilder.Entity<BankBranch>()
//            //    .Property(b => b.Geometry)
//            //    .HasColumnType("geometry(Polygon, 4326)");

//            modelBuilder.Entity<Poi>()
//                .Property(p => p.Geometry)
//                .HasColumnType("geometry");

//            modelBuilder.Entity<User>();
//            //.HasOne(u => u.Role.ToString())
//            //.WithMany(r => r.Users)
//            //.HasForeignKey(u => u.RoleId);

//            //modelBuilder.Entity<GeographicObject>()
//            //    .HasOne(go => go.User)
//            //    .WithMany(u => u.GeographicObjects)
//            //    .HasForeignKey(go => go.UserId);

//            //modelBuilder.Entity<GeographicObject>()
//            //    .HasOne(go => go.Type)
//            //    .WithMany(ot => ot.GeographicObjects)
//            //    .HasForeignKey(go => go.TypeId);

//            base.OnModelCreating(modelBuilder);
//        }
//    }
//}