using InternAI.API.Models;
using InternAI.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Security.Claims;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TopicsController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public TopicsController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetTopics()
    {
        // Giriş yapan öğrencinin ID'sini al
        var studentId = User.FindFirstValue(
            ClaimTypes.NameIdentifier
        );

        if (string.IsNullOrWhiteSpace(studentId))
        {
            return Unauthorized(new
            {
                message = "Öğrenci ID bulunamadı."
            });
        }

        // Normal konular + sadece bu öğrencinin AI konuları
      var filter = Builders<Topic>.Filter.Or(

    // Sistem konuları:
    // IsAiGenerated alanı false olanlar
    // VEYA eski kayıtlarda bu alan hiç olmayanlar
    Builders<Topic>.Filter.Ne(
        t => t.IsAiGenerated,
        true
    ),

    // Öğrencinin kendi AI konuları
    Builders<Topic>.Filter.And(
        Builders<Topic>.Filter.Eq(
            t => t.IsAiGenerated,
            true
        ),
        Builders<Topic>.Filter.Eq(
            t => t.StudentId,
            studentId
        )
    )
);

        var topics = await _mongoDbService.Topics
            .Find(filter)
            .ToListAsync();

        return Ok(topics);
    }
}