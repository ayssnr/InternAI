using InternAI.API.Models;
using InternAI.API.Settings;
using MongoDB.Driver;

namespace InternAI.API.Services;

public class MongoDbService
{
    private readonly IMongoDatabase _database;
  
    public MongoDbService(IConfiguration configuration)
    {
        var settings = configuration
            .GetSection("MongoDbSettings")
            .Get<MongoDbSettings>();

        var client = new MongoClient(settings!.ConnectionString);

        _database = client.GetDatabase(settings.DatabaseName);

        // Collections
        Topics = _database.GetCollection<Topic>("Topics");

        StudentProgress = _database.GetCollection<StudentProgress>("StudentProgress");
        Quizzes = _database.GetCollection<Quiz>("Quizzes");

        Questions = _database.GetCollection<Question>("Questions");
        Assignments = _database.GetCollection<Assignment>("Assignments");
    }

    public IMongoCollection<User> Users =>
        _database.GetCollection<User>("Users");

    public IMongoCollection<Topic> Topics { get; }

    public IMongoCollection<StudentProgress> StudentProgress { get; }
      public IMongoCollection<Quiz> Quizzes { get; }

    public IMongoCollection<Question> Questions { get; }
    public IMongoCollection<Assignment> Assignments { get; }
}