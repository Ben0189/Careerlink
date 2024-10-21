using Career_link_webapi.Services;
using Microsoft.AspNetCore.Mvc;
using Career_link_webapi.Data.Entities;
using Career_link_webapi.Models;

namespace Career_link_webapi.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        public PostController(IPostService taskService)
        {
            _postService = taskService;
        }

        [HttpGet("allpost")]
        public async Task<IActionResult> GetAllTask()
        {
            return Ok(await _postService.GetPosts());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskByID(int id)
        {
            return Ok(await _postService.GetPostById(id));
        }

        [HttpGet("users/{userId}")]
        public async Task<IActionResult> GetTaskByUserId(string userId)
        {
            return Ok(await _postService.GetPostsByUserId(userId));
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<PostDTO>>> SearchPost([FromQuery] int experienceLevel, [FromQuery] List<int> skillIds)
        {
            if (skillIds == null || skillIds.Count == 0)
            {
                return BadRequest("List of skill IDs is required.");
            }
            var posts = await _postService.SearchPost(experienceLevel, skillIds);
            return Ok(posts);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePost([FromBody] PostDTO postDto)
        {
            if (postDto == null)
            {
                return BadRequest("Post data is required.");
            }
            try
            {
                var createdPostId = await _postService.CreatePost(postDto);

                return Ok(new { PostId = createdPostId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{postId}")]
        public async Task<IActionResult> UpdatePost(int postId, [FromBody] PostDTO postDto)
        {
            if (postDto == null)
            {
                return BadRequest("Post data is required.");
            }
            try
            {
                var resultMessage = await _postService.UpdatePost(postId, postDto);
                return Ok(resultMessage);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            try
            {
                var resultMessage = await _postService.DeletePost(postId);
                return Ok(resultMessage);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
