namespace Career_link_webapi.Models
{
    public class UserRegisterDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsRecruiter { get; set; }
    }
}