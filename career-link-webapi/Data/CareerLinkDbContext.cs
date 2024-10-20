using Career_link_webapi.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Career_link_webapi.Data
{
    public class CareerLinkDbContext : IdentityDbContext<User>
    {
        public CareerLinkDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Skill> Skills { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "testuser", // Use a fixed GUID or string ID
                UserName = "predefineduser",
                NormalizedUserName = "PREDEFINEDUSER",
                Email = "predefineduser@example.com",
                NormalizedEmail = "PREDEFINEDUSER@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = "plaintextpassword", // Password stored as plain text (not secure!)
                FirstName = "TestFirstName",
                LastName = "TestLastName",
                IsRecruiter = true
            });

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = "testuser", // Use a fixed GUID or string ID
                Name = "Admin",
                NormalizedName = "ADMIN"
            });

            DateTime fixedDate = new DateTime(2023, 10, 1); // Example fixed date
            
            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    PostId = 1,
                    UserId = "testuser",
                    experienceLevel = 2,
                    Description = "Looking for a software engineering job.",
                    CreatedDate = fixedDate,
                    UpdatedDate = fixedDate
                },
                new Post
                {
                    PostId = 2,
                    UserId = "testuser",
                    experienceLevel=1,
                    Description = "Excited about new opportunities in data science.",
                    CreatedDate = fixedDate,
                    UpdatedDate = fixedDate
                },
                new Post
                {
                    PostId = 3,
                    UserId = "testuser",
                    experienceLevel=3,
                    Description = "Interested in remote work positions.",
                    CreatedDate = fixedDate,
                    UpdatedDate = fixedDate
                }
            );
        }
    }
}

