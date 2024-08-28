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

        [HttpGet("alltask")]
        public async Task<IActionResult> GetAllTask()
        {
            return Ok(await _postService.GetPosts());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskByID(int id)
        {
            return Ok(await _postService.GetPostById(id));
        }
    }
}
