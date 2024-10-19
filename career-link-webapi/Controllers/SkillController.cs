using Microsoft.AspNetCore.Mvc;
using Career_link_webapi.Services;
using Career_link_webapi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Career_link_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ISkillService _skillService;

        public SkillController(ISkillService skillService)
        {
            _skillService = skillService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSkill([FromBody] SkillDTO skillDTO)
        {
            if (skillDTO == null)
            {
                return BadRequest("Skill information is required.");
            }

            var resultMessage = await _skillService.CreateSkill(skillDTO);

            return Ok(resultMessage);
        }

        [HttpGet]
        public async Task<ActionResult<List<SkillDTO>>> GetAllSkills()
        {
            var skills = await _skillService.GetAllSkills();
            return Ok(skills);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SkillDTO>> GetSkillById(int id)
        {
            var skill = await _skillService.GetSkillById(id);

            if (skill == null)
            {
                return NotFound($"Skill with Id = {id} not found.");
            }

            return Ok(skill);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            var result = await _skillService.DeleteSkill(id);

            if (!result)
            {
                return NotFound($"Skill with Id = {id} not found.");
            }

            return NoContent();
        }

        [HttpPost("add-skills")]
        public async Task<IActionResult> AddSkills([FromBody] string skills)
        {
            if (string.IsNullOrEmpty(skills))
            {
                return BadRequest("Skills string is required.");
            }

            var addedSkills = await _skillService.AddSkillsFromString(skills);
            return Ok(addedSkills);
        }
    }
}
