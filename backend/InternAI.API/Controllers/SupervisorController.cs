using InternAI.API.Models;
using InternAI.API.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace InternAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SupervisorController : ControllerBase
{
    private readonly MongoDbService _mongoDbService;

    public SupervisorController(MongoDbService mongoDbService)
    {
        _mongoDbService = mongoDbService;
    }


[HttpGet("students")]
public async Task<IActionResult> GetStudents()
{
    var students = await _mongoDbService.Users
        .Find(x => x.Role == UserRole.Student)
        .ToListAsync();

    var result = students.Select(student => new
    {
        id = student.Id,
        name = student.Name,
        email = student.Email
    });

    return Ok(result);
}

[HttpGet("students-with-progress")]
public async Task<IActionResult> GetStudentsWithProgress()
{
    var students = await _mongoDbService.Users
        .Find(x => x.Role == UserRole.Student)
        .ToListAsync();

    var progressList = await _mongoDbService.StudentProgress
        .Find(FilterDefinition<StudentProgress>.Empty)
        .ToListAsync();

    var result = students.Select(student =>
    {
        var progress = progressList
            .Where(x => x.StudentId == student.Id)
            .ToList();

        var averageScore = progress.Count > 0
            ? progress.Average(x =>
                x.TotalQuestions > 0
                    ? (double)x.Score / x.TotalQuestions * 100
                    : 0)
            : 0;

        var lastQuiz = progress
            .OrderByDescending(x => x.LastQuizDate)
            .FirstOrDefault();

        return new
        {
            id = student.Id,
            name = student.Name,
            email = student.Email,

            quizCount = progress.Count,

            averageScore = Math.Round(averageScore, 1),

            lastQuizDate = lastQuiz?.LastQuizDate,

            lastQuizTitle = lastQuiz?.QuizTitle ?? "Henüz quiz yok"
        };
    });

    return Ok(result);
}

[HttpGet("students-needing-help")]
public async Task<IActionResult> GetStudentsNeedingHelp()
{
    var students = await _mongoDbService.Users
        .Find(x => x.Role == UserRole.Student)
        .ToListAsync();

    var progressList = await _mongoDbService.StudentProgress
        .Find(FilterDefinition<StudentProgress>.Empty)
        .ToListAsync();

    var result = students
        .Select(student =>
        {
            var progress = progressList
                .Where(x => x.StudentId == student.Id)
                .ToList();

            var averageScore = progress.Count > 0
                ? progress.Average(x =>
                    x.TotalQuestions > 0
                        ? (double)x.Score / x.TotalQuestions * 100
                        : 0)
                : 0;

            return new
            {
                id = student.Id,
                name = student.Name,
                email = student.Email,
                averageScore = Math.Round(averageScore, 1),
                quizCount = progress.Count
            };
        })
        .Where(x => x.averageScore < 50)
        .OrderBy(x => x.averageScore)
        .ToList();

    return Ok(result);
}

[HttpPost("topics")]
public async Task<IActionResult> CreateTopic([FromBody] Topic topic)
{
    if (string.IsNullOrWhiteSpace(topic.Name))
    {
        return BadRequest(new
        {
            message = "Konu adı boş olamaz."
        });
    }

    if (string.IsNullOrWhiteSpace(topic.Description))
    {
        return BadRequest(new
        {
            message = "Konu açıklaması boş olamaz."
        });
    }

    topic.Id = string.Empty;

    await _mongoDbService.Topics.InsertOneAsync(topic);

    return Ok(new
    {
        message = "Konu başarıyla oluşturuldu.",
        topic
    });
}


// TÜM KONULARI GETİR
[HttpGet("topics")]
public async Task<IActionResult> GetTopics()
{
    var topics = await _mongoDbService.Topics
        .Find(FilterDefinition<Topic>.Empty)
        .ToListAsync();

    return Ok(topics);
}


// KONU GÜNCELLE
[HttpPut("topics/{id}")]
public async Task<IActionResult> UpdateTopic(
    string id,
    [FromBody] Topic updatedTopic)
{
    if (string.IsNullOrWhiteSpace(updatedTopic.Name))
    {
        return BadRequest(new
        {
            message = "Konu adı boş olamaz."
        });
    }

    if (string.IsNullOrWhiteSpace(updatedTopic.Description))
    {
        return BadRequest(new
        {
            message = "Konu açıklaması boş olamaz."
        });
    }

    var existingTopic = await _mongoDbService.Topics
        .Find(x => x.Id == id)
        .FirstOrDefaultAsync();

    if (existingTopic == null)
    {
        return NotFound(new
        {
            message = "Konu bulunamadı."
        });
    }

    var update = Builders<Topic>.Update
        .Set(x => x.Name, updatedTopic.Name.Trim())
        .Set(x => x.Description, updatedTopic.Description.Trim());

    await _mongoDbService.Topics.UpdateOneAsync(
        x => x.Id == id,
        update
    );

    return Ok(new
    {
        message = "Konu başarıyla güncellendi."
    });
}


// KONU SİL
[HttpDelete("topics/{id}")]
public async Task<IActionResult> DeleteTopic(string id)
{
    var result = await _mongoDbService.Topics.DeleteOneAsync(
        x => x.Id == id
    );

    if (result.DeletedCount == 0)
    {
        return NotFound(new
        {
            message = "Konu bulunamadı."
        });
    }

    return Ok(new
    {
        message = "Konu başarıyla silindi."
    });
}

// =========================
// ÖDEV ATAMA
// =========================

[HttpPost("assignments")]
public async Task<IActionResult> CreateAssignment(
    [FromBody] Assignment assignment)
{
    if (string.IsNullOrWhiteSpace(assignment.StudentId))
    {
        return BadRequest(new
        {
            message = "Öğrenci seçmelisin."
        });
    }

    if (string.IsNullOrWhiteSpace(assignment.TopicId))
    {
        return BadRequest(new
        {
            message = "Konu seçmelisin."
        });
    }

    if (string.IsNullOrWhiteSpace(assignment.Title))
    {
        return BadRequest(new
        {
            message = "Ödev başlığı boş olamaz."
        });
    }

    // Öğrenci gerçekten var mı?
    var student = await _mongoDbService.Users
        .Find(x =>
            x.Id == assignment.StudentId &&
            x.Role == UserRole.Student)
        .FirstOrDefaultAsync();

    if (student == null)
    {
        return NotFound(new
        {
            message = "Öğrenci bulunamadı."
        });
    }

    // Konu gerçekten var mı?
    var topic = await _mongoDbService.Topics
        .Find(x => x.Id == assignment.TopicId)
        .FirstOrDefaultAsync();

    if (topic == null)
    {
        return NotFound(new
        {
            message = "Konu bulunamadı."
        });
    }

    if (assignment.DueDate <= DateTime.UtcNow)
    {
        return BadRequest(new
        {
            message = "Son teslim tarihi gelecekte olmalıdır."
        });
    }

    assignment.Id = string.Empty;
    assignment.Title = assignment.Title.Trim();
    assignment.Description = assignment.Description?.Trim() ?? string.Empty;
    assignment.IsCompleted = false;
    assignment.CreatedAt = DateTime.UtcNow;

    await _mongoDbService.Assignments
        .InsertOneAsync(assignment);

    return Ok(new
    {
        message = "Ödev başarıyla atandı.",
        assignment
    });
}


[HttpGet("assignments")]
public async Task<IActionResult> GetAssignments()
{
    var assignments = await _mongoDbService.Assignments
        .Find(FilterDefinition<Assignment>.Empty)
        .SortByDescending(x => x.CreatedAt)
        .ToListAsync();

    var students = await _mongoDbService.Users
        .Find(x => x.Role == UserRole.Student)
        .ToListAsync();

    var topics = await _mongoDbService.Topics
        .Find(FilterDefinition<Topic>.Empty)
        .ToListAsync();

    var result = assignments.Select(assignment =>
    {
        var student = students
            .FirstOrDefault(x => x.Id == assignment.StudentId);

        var topic = topics
            .FirstOrDefault(x => x.Id == assignment.TopicId);

        return new
        {
            id = assignment.Id,
            studentId = assignment.StudentId,
            studentName = student?.Name ?? "Bilinmeyen öğrenci",
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


[HttpDelete("assignments/{id}")]
public async Task<IActionResult> DeleteAssignment(string id)
{
    var result = await _mongoDbService.Assignments
        .DeleteOneAsync(x => x.Id == id);

    if (result.DeletedCount == 0)
    {
        return NotFound(new
        {
            message = "Ödev bulunamadı."
        });
    }

    return Ok(new
    {
        message = "Ödev başarıyla silindi."
    });
}
// =========================
// SORU EKLE
// =========================

[HttpPost("questions")]
public async Task<IActionResult> CreateQuestion(
    [FromBody] Question question)
{
    // Konu seçilmiş mi?
    if (string.IsNullOrWhiteSpace(question.TopicId))
    {
        return BadRequest(new
        {
            message = "Soru eklemek için önce bir konu seçmelisin."
        });
    }

    // Konu gerçekten var mı?
    var topic = await _mongoDbService.Topics
        .Find(x => x.Id == question.TopicId)
        .FirstOrDefaultAsync();

    if (topic == null)
    {
        return NotFound(new
        {
            message = "Seçilen konu bulunamadı."
        });
    }

    // Soru metni kontrolü
    if (string.IsNullOrWhiteSpace(question.Text))
    {
        return BadRequest(new
        {
            message = "Soru metni boş olamaz."
        });
    }

    // En az 2 seçenek
    if (question.Options == null || question.Options.Count < 2)
    {
        return BadRequest(new
        {
            message = "En az 2 seçenek eklemelisin."
        });
    }

    // Boş seçenek kontrolü
    if (question.Options.Any(x => string.IsNullOrWhiteSpace(x)))
    {
        return BadRequest(new
        {
            message = "Seçenekler boş olamaz."
        });
    }

    // Doğru cevap geçerli mi?
    if (
        question.CorrectAnswer < 0 ||
        question.CorrectAnswer >= question.Options.Count
    )
    {
        return BadRequest(new
        {
            message = "Doğru cevap geçerli bir seçenek olmalıdır."
        });
    }

    question.Id = string.Empty;
    question.Text = question.Text.Trim();

    question.Options = question.Options
        .Select(x => x.Trim())
        .ToList();

    await _mongoDbService.Questions.InsertOneAsync(question);

    return Ok(new
    {
        message = "Soru başarıyla eklendi.",
        question
    });
}

[HttpGet("dashboard")]
public async Task<IActionResult> GetDashboard()
{
    // ==========================================
    // 1. TOPLAM ÖĞRENCİ
    // ==========================================

    var studentList = await _mongoDbService.Users
        .Find(x => x.Role == UserRole.Student)
        .ToListAsync();

    var studentCount = studentList.Count;


    // ==========================================
    // 2. TOPLAM KONU
    // ==========================================

    var topicCount = await _mongoDbService.Topics
        .CountDocumentsAsync(
            FilterDefinition<Topic>.Empty
        );


    // ==========================================
    // 3. TOPLAM SORU
    // ==========================================

    var questionCount = await _mongoDbService.Questions
        .CountDocumentsAsync(
            FilterDefinition<Question>.Empty
        );


    // ==========================================
    // 4. TÜM QUIZ İLERLEMELERİ
    // ==========================================

    var progressList = await _mongoDbService.StudentProgress
        .Find(FilterDefinition<StudentProgress>.Empty)
        .SortByDescending(x => x.LastQuizDate)
        .ToListAsync();


    // ==========================================
    // 5. ÖĞRENCİ BAŞARI ORANLARI
    // ==========================================

    var studentPerformance = studentList
        .Select(student =>
        {
            var progress = progressList
                .Where(x => x.StudentId == student.Id)
                .ToList();

            var averageScore = progress.Count > 0
                ? progress.Average(x =>
                    x.TotalQuestions > 0
                        ? (double)x.Score / x.TotalQuestions * 100
                        : 0)
                : 0;

            return new
            {
                StudentId = student.Id,
                Name = student.Name,
                Score = Math.Round(averageScore, 1)
            };
        })
        .ToList();


    // ==========================================
    // 6. EN BAŞARILI 5 ÖĞRENCİ
    // ==========================================

    var topStudents = studentPerformance
        .OrderByDescending(x => x.Score)
        .Take(5)
        .Select(x => new
        {
            studentId = x.StudentId,
            name = x.Name,
            score = x.Score
        })
        .ToList();


    // ==========================================
    // 7. DESTEĞE İHTİYAÇ DUYANLAR
    // BAŞARI ORANI %50'NİN ALTINDA
    // ==========================================

    var studentsNeedHelp = studentPerformance
        .Where(x => x.Score < 50)
        .OrderBy(x => x.Score)
        .Take(5)
        .Select(x => new
        {
            studentId = x.StudentId,
            name = x.Name,
            score = x.Score
        })
        .ToList();


    // ==========================================
    // 8. SON ÖĞRENCİ AKTİVİTELERİ
    // ==========================================

    var recentActivities = progressList
        .Take(10)
        .Select(progress =>
        {
            var student = studentList
                .FirstOrDefault(x =>
                    x.Id == progress.StudentId);

            var scorePercentage =
                progress.TotalQuestions > 0
                    ? (double)progress.Score /
                      progress.TotalQuestions * 100
                    : 0;

            return new
            {
                student = student?.Name ??
                          "Bilinmeyen Öğrenci",

                action =
                    $"{progress.QuizTitle} quizini tamamladı",

                status = "Tamamlandı",

                time = progress.LastQuizDate
                    .ToLocalTime()
                    .ToString("dd.MM.yyyy HH:mm")
            };
        })
        .ToList();


    // ==========================================
    // 9. AKTİF ÖDEV SAYISI
    // ==========================================

    var activeAssignmentCount =
        await _mongoDbService.Assignments
            .CountDocumentsAsync(
                x =>
                    !x.IsCompleted &&
                    x.DueDate > DateTime.UtcNow
            );


    // ==========================================
    // RESPONSE
    // ==========================================

    return Ok(new
    {
        studentCount,
        topicCount,
        questionCount,
        activeAssignmentCount,

        topStudents,

        studentsNeedHelp,

        recentActivities
    });
}

}