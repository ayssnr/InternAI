using InternAI.API.Models;
using InternAI.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Security.Claims;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StudentController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public StudentController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    // =========================
    // ÖĞRENCİNİN ÖDEVLERİ
    // =========================

    [HttpGet("assignments")]
    public async Task<IActionResult> GetMyAssignments()
    {
        var studentId =
            User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(studentId))
        {
            return Unauthorized(new
            {
                message = "Öğrenci kimliği bulunamadı."
            });
        }

        var assignments = await _mongoDbService.Assignments
            .Find(x => x.StudentId == studentId)
            .SortBy(x => x.DueDate)
            .ToListAsync();

        var topics = await _mongoDbService.Topics
            .Find(FilterDefinition<Topic>.Empty)
            .ToListAsync();

        var result = assignments.Select(assignment =>
        {
            var topic = topics.FirstOrDefault(
                x => x.Id == assignment.TopicId
            );

            return new
            {
                id = assignment.Id,
                topicId = assignment.TopicId,
                topicName = topic?.Name ?? "Bilinmeyen konu",
                title = assignment.Title,
                description = assignment.Description,
                dueDate = assignment.DueDate,
                isCompleted = assignment.IsCompleted,
                createdAt = assignment.CreatedAt
            };
        });

        return Ok(result);
    }

    // =========================
// ÖDEVİ TAMAMLANDI OLARAK İŞARETLE
// =========================

[HttpPut("assignments/{id}/complete")]
public async Task<IActionResult> CompleteAssignment(string id)
{
    var studentId =
        User.FindFirstValue(ClaimTypes.NameIdentifier);

    if (string.IsNullOrEmpty(studentId))
    {
        return Unauthorized(new
        {
            message = "Öğrenci kimliği bulunamadı."
        });
    }

    // Sadece giriş yapan öğrencinin kendi ödevini
    // güncelleyebilmesini sağlıyoruz.
    var filter = Builders<Assignment>.Filter.And(
        Builders<Assignment>.Filter.Eq(x => x.Id, id),
        Builders<Assignment>.Filter.Eq(x => x.StudentId, studentId)
    );

    var update = Builders<Assignment>.Update
        .Set(x => x.IsCompleted, true);

    var result = await _mongoDbService.Assignments
        .UpdateOneAsync(filter, update);

    if (result.MatchedCount == 0)
    {
        return NotFound(new
        {
            message = "Ödev bulunamadı."
        });
    }

    return Ok(new
    {
        message = "Ödev başarıyla tamamlandı.",
        isCompleted = true
    });
}
}