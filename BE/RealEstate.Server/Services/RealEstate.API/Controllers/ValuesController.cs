using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstate.ApplicationService.AuthModule.Abstracts;
using RealEstate.Utils.ConstantVariables.Shared;
using RealEstate.Utils.CustomException;

namespace RealEstate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IUserService _service;

        public ValuesController(IUserService service) {
            _service = service;
        }
        [Authorize]
        [HttpGet("Ping")]
        public IActionResult Get() {
            return Ok("Pong");
        }
        [HttpPost("valid")]
        public IActionResult Check(string u, string p)
        {
            return Ok(_service.ValidateUser(u, p));
        }
    }
}
