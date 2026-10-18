using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InternAI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("student")]
        [Authorize(Roles = "Student")]
        public IActionResult Student()
        {
            return Ok(new
            {
                message = "Student endpointine başarıyla eriştin!"
            });
        }

        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public IActionResult Admin()
        {
            return Ok(new
            {
                message = "Admin endpointine başarıyla eriştin!"
            });
        }
    }
}