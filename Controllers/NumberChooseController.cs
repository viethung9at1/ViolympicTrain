using Microsoft.AspNetCore.Mvc;
namespace ViolympicTest;
[ApiController]
[Route("[controller]")]
public class NumberChooseController:ControllerBase{
    [HttpGet]
    public IEnumerable<NumberChoose> Get(){
        return null;
        
    }
}