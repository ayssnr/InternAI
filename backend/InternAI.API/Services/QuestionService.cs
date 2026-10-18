using InternAI.API.Models;
using MongoDB.Driver;

namespace InternAI.API.Services;

public class QuestionService
{
    private readonly MongoDbService _mongoDb;

    public QuestionService(MongoDbService mongoDb)
    {
        _mongoDb = mongoDb;
    }

    public async Task<List<Question>> GetAllAsync()
    {
        return await _mongoDb.Questions
            .Find(_ => true)
            .ToListAsync();
    }

    public async Task<Question?> GetByIdAsync(string id)
    {
        return await _mongoDb.Questions
            .Find(q => q.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<List<Question>> GetByTopicIdAsync(string topicId)
    {
        return await _mongoDb.Questions
            .Find(q => q.TopicId == topicId)
            .ToListAsync();
    }

    public async Task CreateAsync(Question question)
    {
        await _mongoDb.Questions.InsertOneAsync(question);
    }
}