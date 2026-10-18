using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternAI.API.Models;

public class Assignment
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    public string StudentId { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    public string TopicId { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime DueDate { get; set; }

    public bool IsCompleted { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}