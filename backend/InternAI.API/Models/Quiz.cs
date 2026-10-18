using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternAI.API.Models;

public class Quiz
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    public string TopicId { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public int QuestionCount { get; set; }

    public int Duration { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string StudentId { get; set; } = string.Empty;

    public bool IsAiGenerated { get; set; }
}