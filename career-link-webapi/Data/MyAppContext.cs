using Microsoft.EntityFrameworkCore;

public class MyAppContext : DbContext
{
    public MyAppContext(DbContextOptions<MyAppContext> options)
        : base(options)
    {
    }

    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<Post> Posts { get; set; }
 

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Candidate>()
            .HasMany(c => c.Posts)
            .WithOne(p => p.Candidate)
            .HasForeignKey(p => p.CandidateId);
    }
}
