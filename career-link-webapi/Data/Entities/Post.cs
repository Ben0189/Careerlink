public class Post
{
    public int PostId { get; set; }
    
    public int CandidateId { get; set; } 
    
    public string Description { get; set; }
    
    public DateTime CreatedDate { get; set; }
    
    public DateTime UpdatedDate { get; set; }
    
    public string Title { get; set; }

    public Candidate Candidate { get; set; }
}
