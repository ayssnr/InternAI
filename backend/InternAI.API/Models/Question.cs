using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternAI.API.Models
{
    public class Question
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
   [BsonRepresentation(BsonType.ObjectId)]
        public string QuizId { get; set; } = string.Empty;

        [BsonRepresentation(BsonType.ObjectId)]
        public string TopicId { get; set; } = string.Empty;

        public string Text { get; set; } = string.Empty;

        public List<string> Options { get; set; } = new();

        public int CorrectAnswer { get; set; }
    }
}