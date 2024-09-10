
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class CandidatesController : ControllerBase
{
    private readonly CandidateService _CandidateService;

    public CandidatesController(CandidateService CandidateService)
    {
        _CandidateService = CandidateService;
    }

    [HttpGet]
    public ActionResult<List<Candidate>> GetAllCandidates()
    {
        return Ok(_CandidateService.GetAllCandidates());
    }

    [HttpGet("{id}")]
    public ActionResult<Candidate> GetCandidateById(int id)
    {
        var profile = _CandidateService.GetCandidateById(id);
        if (profile == null) return NotFound();
        return Ok(profile);
    }

    [HttpPost]
    public ActionResult AddCandidate([FromBody] Candidate profile)
    {
        _CandidateService.AddCandidate(profile);
        return CreatedAtAction(nameof(GetCandidateById), new { id = profile.CandidateId }, profile);
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCandidate(int id)
    {
        _CandidateService.DeleteCandidate(id);
        return NoContent();
    }
}
