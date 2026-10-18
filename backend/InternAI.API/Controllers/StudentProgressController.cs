using InternAI.API.Models;
using InternAI.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StudentProgressController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public StudentProgressController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }

    [HttpPost]
    public async Task<IActionResult> SaveProgress(StudentProgress progress)
    {
        progress.LastQuizDate = DateTime.UtcNow;

        await _mongoDbService.StudentProgress.InsertOneAsync(progress);

        return Ok(progress);
    }

    [HttpGet("{studentId}")]
    public async Task<IActionResult> GetStudentProgress(string studentId)
    {
        var progress = await _mongoDbService.StudentProgress
            .Find(x => x.StudentId == studentId)
            .SortByDescending(x => x.LastQuizDate)
            .ToListAsync();

        return Ok(progress);
    }
}