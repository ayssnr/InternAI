using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternAI.API.Models;

public class Topic
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    // AI tarafından oluşturulan konunun sahibi
    // Normal konularda null olacak
    [BsonRepresentation(BsonType.ObjectId)]
    public string? StudentId { get; set; }

    // AI tarafından oluşturulmuş konu mu?
    public bool IsAiGenerated { get; set; } = false;
}