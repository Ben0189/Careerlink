using Career_link_webapi.Services;
using Microsoft.AspNetCore.Mvc;

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
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostDTO postDto)
        {
            if (id != postDto.Id)
            {
            return BadRequest("Post ID mismatch");
            }

            var updatedPost = await _postService.UpdatePost(id, postDto);
            if (updatedPost == null)
            {
            return NotFound();
            }

            return Ok(updatedPost);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _postService.GetPostById(id);
            if (post == null)
            {
            return NotFound();
            }

            await _postService.DeletePost(id);
            return NoContent();
        }
    }
}
