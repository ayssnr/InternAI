using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternAI.API.Models;

public class StudentProgress
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    public string StudentId { get; set; } = string.Empty;

public int ElapsedSeconds { get; set; }
    public string QuizId { get; set; } = string.Empty;

    public string QuizTitle { get; set; } = string.Empty;

    public string TopicId { get; set; } = string.Empty;

    public int Score { get; set; }

    public int TotalQuestions { get; set; }

    public DateTime LastQuizDate { get; set; }
}