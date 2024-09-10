public class Candidate
{
    public int CandidateId { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Location { get; set; }
    
    public string Education { get; set; }
    
    public string ProfileSummary { get; set; }
    
    public string Email { get; set; }
    
    public string Phone { get; set; }

    public ICollection<Post> Posts { get; set; }
}

