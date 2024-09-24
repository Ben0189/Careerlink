using Career_link_webapi.Services;
using Microsoft.AspNetCore.Mvc;

namespace Career_link_webapi.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("alluser")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userService.GetUsers());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByID(int id)
        {
            return Ok(await _userService.GetUserById(id));
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDTO userDTO)
        {
            var result = await _userService.CreateUser(userDTO);
            if (result == "User created successfully."){
                return Ok(new { Message = result });
            }
            else{
                return BadRequest(new { Message = result });
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserDTO userDTO)
        {
            var result = await _userService.UpdateUser(id, userDTO);
            if (result == "User updated successfully.")
            {
            return Ok(new { Message = result });
            }
            else
            {
            return BadRequest(new { Message = result });
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUser(id);
            if (result == "User deleted successfully.")
            {
            return Ok(new { Message = result });
            }
            else
            {
            return BadRequest(new { Message = result });
            }
        }
    }
}
