﻿using Career_link_webapi.Data;
using Career_link_webapi.Data.Entities;
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
                        .Include(x => x.User) 
                        .Select(x => new PostDTO
                        {
                            PostId = x.PostId, 
                            User = new UserDTO 
                            {
                                UserId = x.User.Id,
                                UserName = x.User.UserName,
                                Email = x.User.Email,
                            },
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
                    .Include(x => x.User)
                    .Select(x => new PostDTO
                    {
                        User = new UserDTO 
                                    {
                                        UserId = x.User.Id,
                                        UserName = x.User.UserName,
                                        Email = x.User.Email,
                                    },
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
    }
}
