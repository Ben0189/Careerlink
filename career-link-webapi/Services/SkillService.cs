using Career_link_webapi.Data;
using Career_link_webapi.Data.Entities;
using Career_link_webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace Career_link_webapi.Services
{

    public interface ISkillService
    {
        Task<string> CreateSkill(SkillDTO skill);
        Task<List<SkillDTO>> GetAllSkills();
        Task<SkillDTO> GetSkillById(int skillId);
        Task<bool> DeleteSkill(int skillId);
        Task<List<Skill>> AddSkillsFromString(string skillsString);
    }

    public class SkillService : ISkillService
    {
        private readonly CareerLinkDbContext _context;

        public SkillService(CareerLinkDbContext context)
        {
            _context = context;
        }

        public async Task<string> CreateSkill(SkillDTO skillDTO)
        {
            var skill = new Skill
            {
                Name = skillDTO.Name
            };
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();
            return $"Create skill {skill.Name} successfully";
        }

        public async Task<List<SkillDTO>> GetAllSkills()
        {
            var skills = await _context.Skills.Include(s => s.Posts).ToListAsync();

            var skillDTOs = skills.Select(skill => new SkillDTO
            {
                SkillId = skill.SkillId,
                Name = skill.Name,
            }).ToList();

            return skillDTOs;
        }

        public async Task<SkillDTO> GetSkillById(int skillId)
        {
            var skill = await _context.Skills.Include(s => s.Posts).FirstOrDefaultAsync(s => s.SkillId == skillId);
            if (skill == null)
            {
                return null;
            }
            var skillDTO = new SkillDTO
            {
                SkillId = skill.SkillId,
                Name = skill.Name
            };
            return skillDTO;
        }

        public async Task<bool> DeleteSkill(int skillId)
        {
            var skill = await _context.Skills.FindAsync(skillId);
            if (skill == null)
            {
                return false;
            }
            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Skill>> AddSkillsFromString(string skillsString)
        {
            var skillNames = skillsString.Split(',').Select(s => s.Trim()).Where(s => !string.IsNullOrEmpty(s)).ToList();
            var skills = skillNames.Select(skillName => new Skill { Name = skillName }).ToList();
            _context.Skills.AddRange(skills);
            await _context.SaveChangesAsync();
            return skills;
        }
    }
}
