using InternAI.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StatsController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public StatsController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    [HttpGet]
public async Task<IActionResult> GetStats()
{
    Console.WriteLine("========== STATS ==========");
    Console.WriteLine($"Authenticated: {User.Identity?.IsAuthenticated}");

    foreach (var claim in User.Claims)
    {
        Console.WriteLine($"CLAIM: {claim.Type} = {claim.Value}");
    }

    var studentId = User.FindFirst(
        System.Security.Claims.ClaimTypes.NameIdentifier
    )?.Value;

    Console.WriteLine($"STUDENT ID: {studentId}");

    if (string.IsNullOrEmpty(studentId))
    {
        Console.WriteLine("❌ STUDENT ID BULUNAMADI");
        return Unauthorized();
    }

    var progress = await _mongoDbService.StudentProgress
        .Find(x => x.StudentId == studentId)
        .SortByDescending(x => x.LastQuizDate)
        .ToListAsync();

    var totalQuizzes = progress.Count;
    var totalQuestions = progress.Sum(x => x.TotalQuestions);
    var totalCorrect = progress.Sum(x => x.Score);

    var successRate = totalQuestions > 0
        ? Math.Round(
            (double)totalCorrect / totalQuestions * 100,
            1
        )
        : 0;

    return Ok(new
    {
        totalQuizzes,
        totalQuestions,
        totalCorrect,
        successRate,
        progress
    });
}
}