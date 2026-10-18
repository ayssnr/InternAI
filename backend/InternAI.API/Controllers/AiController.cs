// using InternAI.API.Services;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using System.Security.Claims;

// namespace InternAI.API.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// [Authorize(Roles = "Student")]
// public class AiController : ControllerBase
// {
//     private readonly AiService _aiService;

//     public AiController(AiService aiService)
//     {
//         _aiService = aiService;
//     }


//     // =========================================================
//     // AI CHAT
//     // =========================================================

//     [HttpPost("ask")]
//     public async Task<IActionResult> Ask(
//         [FromBody] AiChatRequest request)
//     {
//         if (request.Messages == null ||
//             request.Messages.Count == 0)
//         {
//             return BadRequest(new
//             {
//                 message = "Mesaj bulunamadı."
//             });
//         }

//         try
//         {
//             var answer =
//                 await _aiService.AskAsync(
//                     request.Messages
//                 );

//             return Ok(new
//             {
//                 answer
//             });
//         }
//         catch (Exception ex)
//         {
//             return StatusCode(500, new
//             {
//                 message =
//                     "AI servisine bağlanırken hata oluştu.",

//                 error = ex.Message
//             });
//         }
//     }


//     // =========================================================
//     // AI QUIZ GENERATE
//     // =========================================================

//     [HttpPost("generate-quiz")]
//     public async Task<IActionResult> GenerateQuiz(
//         [FromBody] GenerateQuizRequest request)
//     {
//         if (string.IsNullOrWhiteSpace(request.TopicId))
//         {
//             return BadRequest(new
//             {
//                 message = "TopicId boş olamaz."
//             });
//         }

//         if (request.QuestionCount < 3 ||
//             request.QuestionCount > 10)
//         {
//             return BadRequest(new
//             {
//                 message =
//                     "Soru sayısı 3 ile 10 arasında olmalıdır."
//             });
//         }

//         try
//         {
//             // JWT'den öğrencinin ID'sini al
//             var studentId =
//                 User.FindFirstValue(
//                     ClaimTypes.NameIdentifier
//                 );

//             if (string.IsNullOrWhiteSpace(studentId))
//             {
//                 return Unauthorized(new
//                 {
//                     message =
//                         "Öğrenci ID bulunamadı."
//                 });
//             }

//             var quiz =
//                 await _aiService.GenerateQuizAsync(
//                     request.TopicId,
//                     studentId,
//                     request.QuestionCount
//                 );

//             return Ok(new
//             {
//                 message =
//                     "AI quiz başarıyla oluşturuldu.",

//                 quiz
//             });
//         }
//         catch (Exception ex)
//         {
//             return StatusCode(500, new
//             {
//                 message =
//                     "AI quiz oluşturulurken hata oluştu.",

//                 error = ex.Message
//             });
//         }
//     }
// }


// // =============================================================
// // CHAT REQUEST
// // =============================================================

// public class AiChatRequest
// {
//     public List<AiChatMessage> Messages { get; set; }
//         = new();
// }


// // =============================================================
// // QUIZ REQUEST
// // =============================================================

// public class GenerateQuizRequest
// {
//     public string TopicId { get; set; }
//         = string.Empty;

//     public int QuestionCount { get; set; }
// }
using InternAI.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Student")]
public class AiController : ControllerBase
{
    private readonly AiService _aiService;

    public AiController(AiService aiService)
    {
        _aiService = aiService;
    }


    // =========================================================
    // AI CHAT
    // =========================================================

    [HttpPost("ask")]
    public async Task<IActionResult> Ask(
        [FromBody] AiChatRequest request)
    {
        if (request.Messages == null ||
            request.Messages.Count == 0)
        {
            return BadRequest(new
            {
                message = "Mesaj bulunamadı."
            });
        }

        try
        {
            var answer = await _aiService.AskAsync(
                request.Messages
            );

            return Ok(new
            {
                answer
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "AI servisine bağlanırken hata oluştu.",
                error = ex.Message
            });
        }
    }


    // =========================================================
    // AI QUIZ GENERATE
    // =========================================================

    [HttpPost("generate-quiz")]
    public async Task<IActionResult> GenerateQuiz(
        [FromBody] GenerateQuizRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.TopicName))
        {
            return BadRequest(new
            {
                message = "Konu adı boş olamaz."
            });
        }

        if (request.QuestionCount < 3 ||
            request.QuestionCount > 10)
        {
            return BadRequest(new
            {
                message =
                    "Soru sayısı 3 ile 10 arasında olmalıdır."
            });
        }

        if (string.IsNullOrWhiteSpace(request.Difficulty))
        {
            return BadRequest(new
            {
                message = "Zorluk seviyesi seçilmelidir."
            });
        }

        try
        {
            // JWT'den giriş yapan öğrencinin ID'sini al
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

            var quiz = await _aiService.GenerateQuizAsync(
                request.TopicName,
                studentId,
                request.QuestionCount,
                request.Difficulty
            );

            return Ok(new
            {
                message = "AI quiz başarıyla oluşturuldu.",
                quizId = quiz.Id,
                quiz
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "AI quiz oluşturulurken hata oluştu.",
                error = ex.Message
            });
        }
    }
}


// =============================================================
// CHAT REQUEST
// =============================================================

public class AiChatRequest
{
    public List<AiChatMessage> Messages { get; set; }
        = new();
}


// =============================================================
// QUIZ REQUEST
// =============================================================

public class GenerateQuizRequest
{
    public string TopicName { get; set; }
        = string.Empty;

    public int QuestionCount { get; set; }

    public string Difficulty { get; set; }
        = string.Empty;
}