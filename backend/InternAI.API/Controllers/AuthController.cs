using InternAI.API.DTOs;
using InternAI.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _authService.Register(request);

        if (!result)
        {
            return BadRequest(new
            {
                message = "Bu email zaten kayıtlı."
            });
        }

        return Ok(new
        {
            message = "Kayıt başarılı."
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var token = await _authService.Login(request);

        if (token == null)
        {
            return Unauthorized(new
            {
                message = "Email veya şifre hatalı."
            });
        }

        return Ok(new
        {
            token
        });
    }
}