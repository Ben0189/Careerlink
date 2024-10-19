namespace Career_link_webapi.Models
{
    public class PostDTO
    {
<<<<<<< Updated upstream
        public int PostId { get; set; } // Include PostId for identification
        public UserDTO User { get; set; } // Nested UserDTO to show user information
        public string Description { get; set; } // Post description
        public DateTime CreatedDate { get; set; } // Date when the post was created
        public DateTime UpdatedDate { get; set; } // Date when the post was updated
=======
        public int PostId { get; set; }
        public UserDTO User { get; set; }
        public string Description { get; set; }
        public int experienceLevel { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public List<int> SkillIds { get; set; } = new List<int>();
         public List<string> SkillNames { get; set; } = new List<string>();
>>>>>>> Stashed changes
    }
}
