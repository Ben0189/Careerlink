using Career_link_webapi.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Career_link_webapi.Data
{
    public class CareerLinkDbContext : IdentityDbContext<User>
    {
        public CareerLinkDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Post> Posts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    PostId = 1,
                    Description = "Looking for a software engineering job.",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                },
                new Post
                {
                    PostId = 2,
                    Description = "Excited about new opportunities in data science.",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                },
                new Post
                {
                    PostId = 3,
                    Description = "Interested in remote work positions.",
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                }
            );
        }
    }
}

