namespace Career_link_webapi.Models;
public class PostDTO
{
    public int UserId { get; set; }

    public string Description { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }
}