using InternAI.API.Models;
using InternAI.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionController : ControllerBase
{
    private readonly QuestionService _questionService;

    public QuestionController(QuestionService questionService)
    {
        _questionService = questionService;
    }

    // GET: api/Question
    [HttpGet]
    public async Task<ActionResult<List<Question>>> GetAll()
    {
        var questions = await _questionService.GetAllAsync();

        return Ok(questions);
    }

    // GET: api/Question/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Question>> GetById(string id)
    {
        var question = await _questionService.GetByIdAsync(id);

        if (question == null)
            return NotFound(new { message = "Soru bulunamadı." });

        return Ok(question);
    }

    // GET: api/Question/topic/{topicId}
    [HttpGet("topic/{topicId}")]
    public async Task<ActionResult<List<Question>>> GetByTopicId(string topicId)
    {
        var questions = await _questionService.GetByTopicIdAsync(topicId);

        return Ok(questions);
    }

    // POST: api/Question
    [HttpPost]
    public async Task<ActionResult> Create(Question question)
    {
        await _questionService.CreateAsync(question);

        return Ok(new
        {
            message = "Soru başarıyla oluşturuldu.",
            question
        });
    }
}