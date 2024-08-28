using System.ComponentModel.DataAnnotations.Schema;

namespace Career_link_webapi.Data.Entities;

public class Post
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int PostId { get; set; }

    public int UserId { get; set; }

    public string Description { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    // Navigation property for the related user
    public User User { get; set; }
}

