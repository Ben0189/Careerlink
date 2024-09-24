using Career_link_webapi.Data;
using Career_link_webapi.Models;
using Microsoft.EntityFrameworkCore;


namespace Career_link_webapi.Services
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetUsers();
        Task<UserDTO> GetUserById(int id);
        Task<string> CreateUser(UserDTO userDto);
    }

    public class UserService : IUserService
    {
        private readonly CareerLinkDbContext _dbContext;

        public UserService(CareerLinkDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<UserDTO>> GetUsers()
        {
            return await _dbContext.Users
                .Select(x => new UserDTO
                {
                    UserId = x.UserId,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    EmailName = x.EmailName,
                    ContactNumber = x.ContactNumber,
                    CreatedDate = x.CreatedDate,
                    UpdatedDate = x.UpdatedDate
                })
                .ToListAsync();
        }

        public async Task<UserDTO> GetUserById(int id)
        {
            try
            {
                var user = await _dbContext.Users
                    .Where(x => x.UserId == id)
                    .Select(x => new UserDTO
                    {
                        UserId = x.UserId,
                        FirstName = x.FirstName,
                        LastName = x.LastName,
                        EmailName = x.EmailName,
                        ContactNumber = x.ContactNumber,
                        CreatedDate = x.CreatedDate,
                        UpdatedDate = x.UpdatedDate
                    })
                    .FirstOrDefaultAsync();

                if (user == null)
                {
                    throw new Exception($"User with ID {id} not found.");
                }

                return user;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> CreateUser(UserDTO userDto)
        {
            try
            {
                var newUser = new User
                {
                    FirstName = userDto.FirstName,
                    LastName = userDto.LastName,
                    EmailName = userDto.EmailName,
                    ContactNumber = userDto.ContactNumber,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now
                };

                _dbContext.Users.Add(newUser);
                await _dbContext.SaveChangesAsync();

                return "User created successfully.";
            }
            catch (Exception ex)
            {
                return $"An error occurred: {ex.Message}";
            }
        }
        public async Task<string> UpdateUser(int id, UserDTO userDto)
        {
            try
            {
                var existingUser = await _dbContext.Users.FindAsync(id);
                if (existingUser == null)
                {
                    return $"User with ID {id} not found.";
                }

                existingUser.FirstName = userDto.FirstName;
                existingUser.LastName = userDto.LastName;
                existingUser.EmailName = userDto.EmailName;
                existingUser.ContactNumber = userDto.ContactNumber;
                existingUser.UpdatedDate = DateTime.Now;

                _dbContext.Users.Update(existingUser);
                await _dbContext.SaveChangesAsync();

                return "User updated successfully.";
            }
            catch (Exception ex)
            {
                return $"An error occurred: {ex.Message}";
            }
        }
        public async Task<string> DeleteUser(int id)
        {
            try
            {
                var user = await _dbContext.Users.FindAsync(id);
                if (user == null)
                {
                    return $"User with ID {id} not found.";
                }

                _dbContext.Users.Remove(user);
                await _dbContext.SaveChangesAsync();

                return "User deleted successfully.";
            }
            catch (Exception ex)
            {
                return $"An error occurred: {ex.Message}";
            }
        }
    }
}
