namespace Career_link_webapi.Models
{
    public class UserDTO
    {
        public string UserId { get; set; }     
        public string FirstName { get; set; }  
        public string LastName { get; set; }  
        public string Email { get; set; }   
        public string PhoneNumber { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; } 
    }
}

