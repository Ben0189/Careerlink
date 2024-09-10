using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PostAdsController : ControllerBase
{
    private readonly MyAppContext _context;
    private readonly PostService _postService;

    public PostAdsController(MyAppContext context, PostService postService)
    {
        _context = context;
        _postService = postService;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] Post post)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdPost = await _postService.CreatePost(post);
        return CreatedAtAction(nameof(GetPostById), new { id = createdPost.PostId }, createdPost);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPosts()
    {
        var posts = await _postService.GetAllPosts();
        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPostById(int id)
    {
        var post = await _postService.GetPostById(id);
        if (post == null)
        {
            return NotFound();
        }
        return Ok(post);
    }
    [HttpGet("candidate/{candidateId}")]
    public async Task<IActionResult> GetPostsByCandidateId(int candidateId)
    {
        var posts = await _postService.GetPostsByCandidateId(candidateId);
        return Ok(posts);
    }
}
