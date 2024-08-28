using Career_link_webapi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Career_link_webapi.Data
{
    public class CareerLinkDbContext : DbContext
    {
        public CareerLinkDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
               new User
               {
                   UserId = 1,
                   FirstName = "John",
                   LastName = "Doe",
                   EmailName = "john.doe@example.com",
                   ContactNumber = 1234567890,
                   CreatedDate = DateTime.Now,
                   UpdatedDate = DateTime.Now
               },
               new User
               {
                   UserId = 2,
                   FirstName = "Jane",
                   LastName = "Smith",
                   EmailName = "jane.smith@example.com",
                   ContactNumber = 9876543210,
                   CreatedDate = DateTime.Now,
                   UpdatedDate = DateTime.Now
               },
               new User
               {
                   UserId = 3,
                   FirstName = "Alice",
                   LastName = "Johnson",
                   EmailName = "alice.johnson@example.com",
                   ContactNumber = 5551234567,
                   CreatedDate = DateTime.Now,
                   UpdatedDate = DateTime.Now
               }
           );

            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    PostId = 1,
                    UserId = 1,
                    Description = "Looking for a software engineering job.",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                },
                new Post
                {
                    PostId = 2,
                    UserId = 2,
                    Description = "Excited about new opportunities in data science.",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                },
                new Post
                {
                    PostId = 3,
                    UserId = 3,
                    Description = "Interested in remote work positions.",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                }
            );
        }
    }
}
