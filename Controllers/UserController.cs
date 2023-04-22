using Microsoft.AspNetCore.Mvc;
namespace ViolympicTest;
[ApiController]
[Route("[controller]")]
public class UserController:ControllerBase{
    [HttpPost]
    public IActionResult Post(User user){
        if(user.Username == "admin" && user.Password == "admin"){
            return Ok();
        }
        return Unauthorized();
    }
}