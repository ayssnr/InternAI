// using InternAI.API.Models;
// using MongoDB.Driver;

// namespace InternAI.API.Services;

// public class QuizService
// {
//     private readonly MongoDbService _mongoDb;

//     public QuizService(MongoDbService mongoDb)
//     {
//         _mongoDb = mongoDb;
//     }

//     public async Task<List<Quiz>> GetAllAsync()
//     {
//         return await _mongoDb.Quizzes
//             .Find(_ => true)
//             .ToListAsync();
//     }

//     public async Task<Quiz?> GetByIdAsync(string id)
//     {
//         return await _mongoDb.Quizzes
//             .Find(q => q.Id == id)
//             .FirstOrDefaultAsync();
//     }

// public async Task<List<Question>> GetQuestionsAsync(string quizId)
// {
//     return await _mongoDb.Questions
//         .Find(q => q.QuizId == quizId)
//         .ToListAsync();
// }
//     public async Task CreateAsync(Quiz quiz)
//     {
//         await _mongoDb.Quizzes.InsertOneAsync(quiz);
//     }
// }
using InternAI.API.Models;
using MongoDB.Driver;
using MongoDB.Bson;
namespace InternAI.API.Services;

public class QuizService
{
    private readonly MongoDbService _mongoDb;

    public QuizService(MongoDbService mongoDb)
    {
        _mongoDb = mongoDb;
    }

    public async Task<List<Quiz>> GetAllAsync()
    {
        return await _mongoDb.Quizzes
            .Find(_ => true)
            .ToListAsync();
    }

    public async Task<Quiz?> GetByIdAsync(string id)
    {
        return await _mongoDb.Quizzes
            .Find(q => q.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<List<Question>> GetQuestionsAsync(string quizId)
    {
        return await _mongoDb.Questions
            .Find(q => q.QuizId == quizId)
            .ToListAsync();
    }

    public async Task CreateAsync(Quiz quiz)
    {
        await _mongoDb.Quizzes.InsertOneAsync(quiz);
    }

    // Eski soruları quizlere bağlamak için

}