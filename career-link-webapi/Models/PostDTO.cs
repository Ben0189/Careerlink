namespace Career_link_webapi.Models
{
    public class PostDTO
    {
        public int PostId { get; set; }
        public UserDTO User { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int experienceLevel { get; set; }
        public string ResumeUrl { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public List<int> SkillIds { get; set; } = new List<int>();
         public List<string> SkillNames { get; set; } = new List<string>();
    }
}
