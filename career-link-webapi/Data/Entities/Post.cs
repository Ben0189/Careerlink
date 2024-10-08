using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Career_link_webapi.Data.Entities;

public class Post
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int PostId { get; set; }

    public string UserId { get; set; }

    public string Description { get; set; }

    public int experienceLevel { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    // Navigation property for the related user
    [ForeignKey("UserId")]
    public User User { get; set; }
    public ICollection<Skill> Skills { get; set; } = new List<Skill>();

}

