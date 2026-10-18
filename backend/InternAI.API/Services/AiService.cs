using System.Text.Json;
using System.Net.Http.Json;
using InternAI.API.Models;
using MongoDB.Driver;

namespace InternAI.API.Services;

public class AiService
{
    private readonly HttpClient _httpClient;
    private readonly MongoDbService _mongoDb;

    public AiService(
        HttpClient httpClient,
        MongoDbService mongoDb)
    {
        _httpClient = httpClient;
        _mongoDb = mongoDb;

        _httpClient.BaseAddress =
            new Uri("http://localhost:11434/");
    }


    // =========================================================
    // NORMAL AI SOHBETİ
    // =========================================================

    public async Task<string> AskAsync(
        List<AiChatMessage> messages)
    {
        var conversation = string.Join(
            "\n",
            messages.Select(m =>
                $"{(m.Role == "user"
                    ? "Öğrenci"
                    : "Intern AI")}: {m.Content}"
            )
        );

        var prompt = $"""
        Sen InternAI adlı bir eğitim platformunda çalışan yapay zeka asistanısın.

        Görevin yazılım mühendisliği öğrencilerine derslerinde yardımcı olmaktır.

        Cevap kuralları:
        - Her zaman Türkçe cevap ver.
        - Türkçeyi doğal ve akıcı kullan.
        - Öğrencinin seviyesine uygun, sade ve anlaşılır anlat.
        - Gereksiz uzun cevaplar verme.
        - Sorunun cevabını doğrudan ver.
        - Teknik terimleri gerektiğinde kısa şekilde açıkla.
        - Algoritma, veri yapıları ve programlama konularında küçük örnekler kullan.
        - Kod gerekiyorsa temiz ve doğru kod yaz.
        - Bilmediğin bir konuda kesin bilgi uydurma.
        - Yazım kurallarına uy.
        - Öğrenci bir konuyu anlamadığını söylüyorsa konuyu daha basit şekilde açıkla.
        - Önceki konuşmaları dikkate al ve sorular arasında bağ kur.

        Konuşma geçmişi:

        {conversation}

        Şimdi öğrencinin son mesajına cevap ver.
        """;

        var request = new
        {
            model = "qwen2.5:7b",
            prompt = prompt,
            stream = false
        };

        var response = await _httpClient.PostAsJsonAsync(
            "api/generate",
            request
        );

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<OllamaResponse>();

        return result?.Response
            ?? "AI cevap veremedi.";
    }


    // =========================================================
    // AI QUIZ OLUŞTURMA
    // =========================================================

    public async Task<Quiz> GenerateQuizAsync(
        string topicName,
        string studentId,
        int questionCount,
        string difficulty)
    {
        topicName = topicName.Trim();
        difficulty = difficulty.Trim();

        questionCount = Math.Clamp(
            questionCount,
            3,
            10
        );


        // =====================================================
        // 1. KONU BUL
        // =====================================================

        // Önce sistemdeki normal konuyu ara
        var topic = await _mongoDb.Topics
            .Find(t =>
                t.Name.ToLower() == topicName.ToLower() &&
                t.IsAiGenerated == false
            )
            .FirstOrDefaultAsync();


        // =====================================================
        // 2. NORMAL KONU YOKSA ÖĞRENCİNİN AI KONUSUNU ARA
        // =====================================================

        if (topic == null)
        {
            topic = await _mongoDb.Topics
                .Find(t =>
                    t.Name.ToLower() == topicName.ToLower() &&
                    t.IsAiGenerated == true &&
                    t.StudentId == studentId
                )
                .FirstOrDefaultAsync();
        }


        // =====================================================
        // 3. HİÇBİR KONU YOKSA ÖĞRENCİYE ÖZEL AI KONUSU OLUŞTUR
        // =====================================================

        if (topic == null)
        {
            topic = new Topic
            {
                Id = MongoDB.Bson.ObjectId
                    .GenerateNewId()
                    .ToString(),

                Name = topicName,

                Description =
                    $"AI tarafından öğrenci için oluşturulan konu: {topicName}",

                StudentId = studentId,

                IsAiGenerated = true
            };

            await _mongoDb.Topics.InsertOneAsync(topic);
        }


        // =====================================================
        // 4. AI QUIZ PROMPT
        // =====================================================

        var prompt = $$"""
        Sen InternAI adlı eğitim platformunda quiz hazırlayan
        yapay zeka asistanısın.

        Quiz konusu:
        {{topic.Name}}

        Konu açıklaması:
        {{topic.Description}}

        Zorluk seviyesi:
        {{difficulty}}

        ÇOK ÖNEMLİ:

        Tam olarak {{questionCount}} adet soru üret.

        Ne eksik ne fazla soru üret.

        Örneğin:
        - İstenen sayı 3 ise tam 3 soru
        - İstenen sayı 5 ise tam 5 soru
        - İstenen sayı 7 ise tam 7 soru
        - İstenen sayı 10 ise tam 10 soru

        Sorular:
        - Türkçe olmalı.
        - Yazılım mühendisliği öğrencisine uygun olmalı.
        - Seçilen zorluk seviyesine uygun olmalı.
        - Açık ve anlaşılır olmalı.
        - 4 seçenek içermeli.
        - Sadece 1 doğru cevap olmalı.
        - Doğru cevap 0, 1, 2 veya 3 şeklinde belirtilmeli.
        - Sorular birbirinin aynısı olmamalı.
        - Her soru farklı bir kavramı ölçmeye çalışmalı.
        - JSON içindeki "questions" dizisinde TAM OLARAK {{questionCount}} eleman bulunmalı.
        - Soru sayısını azaltma veya artırma.
        Zorluk seviyesi:
        Kolay: Temel kavramları ölç.
        Orta: Kavram bilgisi ve uygulamayı ölç.
        Zor: Analiz, problem çözme ve kod yorumlama gerektiren sorular oluştur.

        SADECE aşağıdaki JSON formatında cevap ver.
        Markdown kullanma.
        JSON dışında hiçbir açıklama yazma.

        {
          "title": "AI Quiz - {{topic.Name}}",
          "questions": [
            {
              "text": "Soru metni",
              "options": [
                "A seçeneği",
                "B seçeneği",
                "C seçeneği",
                "D seçeneği"
              ],
              "correctAnswer": 0
            }
          ]
        }
        """;


        // =====================================================
        // 5. OLLAMA'YA İSTEK GÖNDER
        // =====================================================

        var request = new
        {
            model = "qwen2.5:7b",
            prompt = prompt,
            stream = false,
            format = "json"
        };

        var response = await _httpClient.PostAsJsonAsync(
            "api/generate",
            request
        );

        response.EnsureSuccessStatusCode();


        // =====================================================
        // 6. AI CEVABINI OKU
        // =====================================================

        var ollamaResult =
            await response.Content
                .ReadFromJsonAsync<OllamaResponse>();
                Console.WriteLine("========== AI QUIZ RESPONSE ==========");
Console.WriteLine(ollamaResult?.Response);
Console.WriteLine("======================================");

        if (ollamaResult == null ||
            string.IsNullOrWhiteSpace(
                ollamaResult.Response))
        {
            throw new Exception(
                "AI quiz oluşturamadı."
            );
        }


        // =====================================================
        // 7. JSON'U TEMİZLE
        // =====================================================

        var json = ollamaResult.Response.Trim();

        var firstBrace = json.IndexOf('{');
        var lastBrace = json.LastIndexOf('}');

        if (firstBrace < 0 ||
            lastBrace < firstBrace)
        {
            throw new Exception(
                "AI geçerli JSON döndürmedi."
            );
        }

        json = json.Substring(
            firstBrace,
            lastBrace - firstBrace + 1
        );


        // =====================================================
        // 8. JSON'U NESNEYE ÇEVİR
        // =====================================================

        var generatedQuiz =
            JsonSerializer.Deserialize<GeneratedQuiz>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            );

      if (generatedQuiz == null ||
    generatedQuiz.Questions == null ||
    generatedQuiz.Questions.Count == 0)
{
    throw new Exception(
        "AI geçerli soru oluşturamadı."
    );
}


        // =====================================================
        // 9. QUIZ OLUŞTUR
        // =====================================================

        var quiz = new Quiz
        {
            Id = MongoDB.Bson.ObjectId
                .GenerateNewId()
                .ToString(),

            TopicId = topic.Id,

            StudentId = studentId,

            Title = generatedQuiz.Title,

            QuestionCount =
                generatedQuiz.Questions.Count,

            Duration =
                generatedQuiz.Questions.Count * 60,

            IsAiGenerated = true
        };

        await _mongoDb.Quizzes.InsertOneAsync(quiz);


        // =====================================================
        // 10. SORULARI OLUŞTUR
        // =====================================================

        var questions = new List<Question>();

        foreach (
            var generatedQuestion
            in generatedQuiz.Questions)
        {
            if (string.IsNullOrWhiteSpace(
                    generatedQuestion.Text))
            {
                continue;
            }

            if (generatedQuestion.Options == null ||
                generatedQuestion.Options.Count != 4)
            {
                continue;
            }

            if (generatedQuestion.CorrectAnswer < 0 ||
                generatedQuestion.CorrectAnswer > 3)
            {
                continue;
            }

            var question = new Question
            {
                Id = MongoDB.Bson.ObjectId
                    .GenerateNewId()
                    .ToString(),

                QuizId = quiz.Id,

                TopicId = topic.Id,

                Text = generatedQuestion.Text,

                Options = generatedQuestion.Options,

                CorrectAnswer =
                    generatedQuestion.CorrectAnswer
            };

            questions.Add(question);
        }


        // =====================================================
        // 11. GEÇERLİ SORU YOKSA QUIZ'İ SİL
        // =====================================================

       // =====================================================
// 11. SORU SAYISINI KONTROL ET
// =====================================================

if (questions.Count != questionCount)
{
    await _mongoDb.Quizzes.DeleteOneAsync(
        q => q.Id == quiz.Id
    );

    throw new Exception(
        $"AI {questionCount} soru yerine {questions.Count} geçerli soru oluşturdu."
    );
}


        // =====================================================
        // 12. SORULARI MONGODB'YE KAYDET
        // =====================================================

        await _mongoDb.Questions.InsertManyAsync(
            questions
        );


        // Gerçek soru sayısını güncelle
        quiz.QuestionCount = questions.Count;

        return quiz;
    }


    // =========================================================
    // OLLAMA RESPONSE
    // =========================================================

    private class OllamaResponse
    {
        public string Response { get; set; }
            = string.Empty;
    }
}


// =============================================================
// CHAT MESSAGE
// =============================================================

public class AiChatMessage
{
    public string Role { get; set; }
        = string.Empty;

    public string Content { get; set; }
        = string.Empty;
}


// =============================================================
// AI QUIZ JSON
// =============================================================

public class GeneratedQuiz
{
    public string Title { get; set; }
        = string.Empty;

    public List<GeneratedQuestion> Questions { get; set; }
        = new();
}


public class GeneratedQuestion
{
    public string Text { get; set; }
        = string.Empty;

    public List<string> Options { get; set; }
        = new();

    public int CorrectAnswer { get; set; }
}