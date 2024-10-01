using Career_link_webapi.Data.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Career_link_webapi.Data;
public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string EmailName { get; set; }

    public long ContactNumber { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public ICollection<Post> Posts { get; set; }
}


