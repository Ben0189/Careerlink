using Career_link_webapi.Data;
using Career_link_webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace Career_link_webapi.Services
{
    public interface IPostService
    {
        Task<List<PostDTO>> GetPosts(); 
        Task<PostDTO> GetPostById(int id); 
    }

    public class PostService : IPostService
    {
        private readonly CareerLinkDbContext _dbContext;

        public PostService(CareerLinkDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<PostDTO>> GetPosts()
        {
            return await _dbContext.Posts
                .Select(x => new PostDTO
                {
                    UserId = x.UserId,
                    Description = x.Description,
                    CreatedDate = x.CreatedDate,
                    UpdatedDate = x.UpdatedDate
                })
                .ToListAsync();
        }

        public async Task<PostDTO> GetPostById(int id)
        {
            try
            {
                var post = await _dbContext.Posts
                    .Where(x => x.PostId == id)
                    .Select(x => new PostDTO
                    {
                        UserId = x.UserId,
                        Description = x.Description,
                        CreatedDate = x.CreatedDate,
                        UpdatedDate = x.UpdatedDate
                    })
                    .FirstOrDefaultAsync();

                if (post == null)
                {
                    throw new KeyNotFoundException($"Post with ID {id} not found.");
                }

                return post;
            }
            catch (Exception ex)
            {
                throw; 
            }
        }
        public async Task UpdatePost(int id, PostDTO updatedPost)
        {
            var post = await _dbContext.Posts.FindAsync(id);

            if (post == null)
            {
            throw new KeyNotFoundException($"Post with ID {id} not found.");
            }

            post.Description = updatedPost.Description;
            post.UpdatedDate = DateTime.UtcNow;

            _dbContext.Posts.Update(post);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeletePost(int id)
        {
            var post = await _dbContext.Posts.FindAsync(id);

            if (post == null)
            {
                throw new KeyNotFoundException($"Post with ID {id} not found.");
            }

            _dbContext.Posts.Remove(post);
            await _dbContext.SaveChangesAsync();
        }
    }
}
