using InternAI.API.Models;
using InternAI.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly QuizService _quizService;

    public QuizController(QuizService quizService)
    {
        _quizService = quizService;
    }

    // GET: api/Quiz
    [HttpGet]
    public async Task<ActionResult<List<Quiz>>> GetAll()
    {
        var quizzes = await _quizService.GetAllAsync();

        return Ok(quizzes);
    }

    // GET: api/Quiz/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Quiz>> GetById(string id)
    {
        var quiz = await _quizService.GetByIdAsync(id);

        if (quiz == null)
            return NotFound(new { message = "Quiz bulunamadı." });

        return Ok(quiz);
    }

    // GET: api/Quiz/{id}/questions
    [HttpGet("{id}/questions")]
    public async Task<ActionResult<List<Question>>> GetQuestions(string id)
    {
        var questions = await _quizService.GetQuestionsAsync(id);

        if (questions.Count == 0)
            return NotFound(new { message = "Bu quiz için soru bulunamadı." });

        return Ok(questions);
    }

    // POST: api/Quiz
    [HttpPost]
    public async Task<ActionResult> Create(Quiz quiz)
    {
        await _quizService.CreateAsync(quiz);

        return Ok(new
        {
            message = "Quiz başarıyla oluşturuldu.",
            quiz
        });
    }
  
}