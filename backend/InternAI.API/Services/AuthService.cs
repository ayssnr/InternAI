using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InternAI.API.DTOs;
using InternAI.API.Models;
using InternAI.API.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace InternAI.API.Services;

public class AuthService
{
    private readonly MongoDbService _mongoDbService;
    private readonly JwtSettings _jwtSettings;

    public AuthService(
        MongoDbService mongoDbService,
        IOptions<JwtSettings> jwtOptions)
    {
        _mongoDbService = mongoDbService;
        _jwtSettings = jwtOptions.Value;
    }

    public async Task<bool> Register(RegisterRequest request)
    {
        var existingUser = await _mongoDbService.Users
            .Find(x => x.Email == request.Email)
            .FirstOrDefaultAsync();

        if (existingUser != null)
        {
            return false;
        }

        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = UserRole.Student
        };

        await _mongoDbService.Users.InsertOneAsync(user);

        return true;
    }

    public async Task<string?> Login(LoginRequest request)
    {
        var user = await _mongoDbService.Users
            .Find(x => x.Email == request.Email)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return null;
        }

        var passwordValid = BCrypt.Net.BCrypt.Verify(
            request.Password,
            user.PasswordHash);

        if (!passwordValid)
        {
            return null;
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}