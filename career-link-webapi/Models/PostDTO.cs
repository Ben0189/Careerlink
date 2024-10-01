namespace Career_link_webapi.Models
{
    public class PostDTO
    {
        public int PostId { get; set; } // Include PostId for identification
        public UserDTO User { get; set; } // Nested UserDTO to show user information
        public string Description { get; set; } // Post description
        public DateTime CreatedDate { get; set; } // Date when the post was created
        public DateTime UpdatedDate { get; set; } // Date when the post was updated
    }
}
