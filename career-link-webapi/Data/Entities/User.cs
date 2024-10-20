using Career_link_webapi.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Career_link_webapi.Data;
public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public ICollection<Post> Posts { get; set; }
}


