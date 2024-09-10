using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class PostService
{
    private readonly MyAppContext _context;

    public PostService(MyAppContext context)
    {
        _context = context;
    }

    public async Task<Post> CreatePost(Post post)
    {
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }
    public async Task<IEnumerable<Post>> GetAllPosts()
    {
        return await _context.Posts.ToListAsync();
    }
    public async Task<Post> GetPostById(int id)
    {
        return await _context.Posts.FindAsync(id);
    }
    public async Task<IEnumerable<Post>> GetPostsByCandidateId(int candidateId)
    {
        return await _context.Posts.Where(p => p.CandidateId == candidateId).ToListAsync();
    }

}
