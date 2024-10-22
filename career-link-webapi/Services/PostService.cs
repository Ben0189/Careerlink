using Career_link_webapi.Data;
using Career_link_webapi.Data.Entities;
using Career_link_webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace Career_link_webapi.Services
{
    public interface IPostService
    {
        Task<List<PostDTO>> GetPosts();
        Task<PostDTO> GetPostById(int id);
        Task<List<PostDTO>> GetPostsByUserId(string userId);
        Task<List<PostDTO>> SearchPost(int experienceLevel, List<int> skillIds);
        Task<int> CreatePost(PostDTO postDto);
        Task<string> UpdatePost(int postId, PostDTO postDto);
        Task<string> DeletePost(int postId);
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
                        .Include(x => x.User)
                        .Select(x => new PostDTO
                        {
                            PostId = x.PostId,
                            User = new UserDTO
                            {
                                UserId = x.User.Id,
                                FirstName = x.User.FirstName,
                                LastName = x.User.LastName,
                                PhoneNumber = x.User.PhoneNumber,
                                Email = x.User.Email,
                            },
                            Title = x.Title,
                            Description = x.Description,
                            ResumeUrl = x.ResumeUrl,
                            CreatedDate = x.CreatedDate,
                            UpdatedDate = x.UpdatedDate,
                            experienceLevel = x.experienceLevel,
                            SkillNames = x.Skills.Select(s => s.Name).ToList()
                        })
                        .ToListAsync();
        }

        public async Task<PostDTO> GetPostById(int id)
        {
            try
            {
                var post = await _dbContext.Posts
                    .Where(x => x.PostId == id)
                    .Include(x => x.User)
                    .Select(x => new PostDTO
                    {
                        PostId = x.PostId,
                        User = new UserDTO
                        {
                            UserId = x.User.Id,
                            FirstName = x.User.FirstName,
                            LastName = x.User.LastName,
                            Email = x.User.Email,
                            PhoneNumber = x.User.PhoneNumber,
                        },
                        Title = x.Title,
                        ResumeUrl = x.ResumeUrl,
                        experienceLevel = x.experienceLevel,
                        Description = x.Description,
                        CreatedDate = x.CreatedDate,
                        UpdatedDate = x.UpdatedDate,
                        SkillNames = x.Skills.Select(s => s.Name).ToList()
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

        public async Task<List<PostDTO>> GetPostsByUserId(string userId)
        {
            try
            {
                var posts = await _dbContext.Posts
                    .Where(x => x.User.Id == userId)
                    .Include(x => x.User)
                    .Select(x => new PostDTO
                    {
                        PostId = x.PostId,
                        User = new UserDTO
                        {
                            UserId = x.User.Id,
                            FirstName = x.User.FirstName,
                            LastName = x.User.LastName,
                            Email = x.User.Email,
                            PhoneNumber = x.User.PhoneNumber,
                        },
                        Title = x.Title,
                        experienceLevel = x.experienceLevel,
                        Description = x.Description,
                        ResumeUrl = x.ResumeUrl,
                        CreatedDate = x.CreatedDate,
                        UpdatedDate = x.UpdatedDate,
                        SkillNames = x.Skills.Select(s => s.Name).ToList()
                    })
                    .ToListAsync();

                if (posts == null || !posts.Any())
                {
                    throw new KeyNotFoundException($"No posts found for User ID {userId}.");
                }

                return posts;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<List<PostDTO>> SearchPost(int experienceLevel, List<int> skillIds)
        {
            var posts = await _dbContext.Posts
                .Include(p => p.Skills)
                .Include(p => p.User)
                .Where(p => p.experienceLevel == experienceLevel)
                .ToListAsync();

            var filteredPosts = posts.Select(post => new
            {
                Post = post,
                MatchingSkillsCount = post.Skills.Count(skill => skillIds.Contains(skill.SkillId))
            }).Where(p => p.MatchingSkillsCount >= 2).OrderByDescending(p => p.MatchingSkillsCount).Select(p => p.Post).ToList();

            var postDtos = filteredPosts.Select(post => new PostDTO
            {
                PostId = post.PostId,
                Title = post.Title,
                Description = post.Description,
                experienceLevel = post.experienceLevel,
                ResumeUrl = post.ResumeUrl,
                CreatedDate = post.CreatedDate,
                UpdatedDate = post.UpdatedDate,
                User = new UserDTO
                {
                    UserId = post.User.Id,
                    FirstName = post.User.FirstName,
                    LastName = post.User.LastName,
                    Email = post.User.Email,
                    PhoneNumber = post.User.PhoneNumber,
                    CreatedDate = post.User.CreatedDate,
                    UpdatedDate = post.User.UpdatedDate
                },
                SkillNames = post.Skills.Select(s => s.Name).ToList()
            }).ToList();
            return postDtos;
        }

        public async Task<int> CreatePost(PostDTO postDto)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == postDto.User.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var newPost = new Post
            {
                User = user,
                Title = postDto.Title,
                Description = postDto.Description,
                experienceLevel = postDto.experienceLevel,
                ResumeUrl = postDto.ResumeUrl,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
            };

            if (postDto.SkillIds != null && postDto.SkillIds.Count > 0)
            {
                newPost.Skills = await _dbContext.Skills.Where(skill => postDto.SkillIds.Contains(skill.SkillId)).ToListAsync();
            }

            _dbContext.Posts.Add(newPost);
            await _dbContext.SaveChangesAsync();
            // return post Id, so that the user can navigate to the newly created post based on id
            return newPost.PostId;
        }

        public async Task<string> UpdatePost(int postId, PostDTO postDto)
        {
            var existingPost = await _dbContext.Posts
                                .Include(p => p.Skills)
                                .FirstOrDefaultAsync(p => p.PostId == postId);

            if (existingPost == null)
            {
                throw new Exception("Post not found");
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == postDto.User.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            existingPost.User = user;
            existingPost.Title = postDto.Title;
            existingPost.ResumeUrl = postDto.ResumeUrl;
            existingPost.Description = postDto.Description;
            existingPost.experienceLevel = postDto.experienceLevel;
            existingPost.UpdatedDate = DateTime.Now;

            if (postDto.SkillIds != null && postDto.SkillIds.Count > 0)
            {
                existingPost.Skills = await _dbContext.Skills
                    .Where(skill => postDto.SkillIds.Contains(skill.SkillId))
                    .ToListAsync();
            }

            await _dbContext.SaveChangesAsync();

            return "Update successfully";
        }

        public async Task<string> DeletePost(int postId)
        {
            var existingPost = await _dbContext.Posts.FirstOrDefaultAsync(p => p.PostId == postId);
            if (existingPost == null)
            {
                throw new Exception("Post not found");
            }
            _dbContext.Posts.Remove(existingPost);
            await _dbContext.SaveChangesAsync();
            return $"Post with ID {postId} has been deleted successfully.";
        }

    }
}
