# 🚀 InternAI - Yapay Zeka Destekli Eğitim ve Değerlendirme Yönetim Platformu

InternAI; stajyerler,  ve danışmanlar arasındaki eğitim, görev takibi ve değerlendirme süreçlerini tek bir çatı altında toplayan full-stack bir kurumsal web platformudur. 

Modern katmanlı backend mimarisi, dinamik frontend arayüzü ve yapay zeka (LLM) entegrasyonu ile staj süreçlerini verimli, ölçülebilir ve otomatik hale getirmeyi amaçlar.

---

## 📌 Temel Özellikler

- **Çok Rollü Kullanıcı Yönetimi (RBAC):** Öğrenci/Stajyer, Danışman ve Yönetici (Admin) için özelleştirilmiş dashboard ve yetkilendirme katmanı.
- **Güvenli Kimlik Doğrulama:** JWT (JSON Web Token) tabanlı oturum yönetimi ve claim tabanlı rota koruması.
- **Dinamik Quiz & Değerlendirme Modülü:** Öğrenciler için teknik sınavlar, görev teslimleri ve otomatik puanlama mekanizması.
- **Yapay Zeka (LLM) Desteği:** Öğrenci yanıtlarını ve performans çıktılarını analiz eden yerel LLM (Ollama) entegrasyonu.
- **Gerçek Zamanlı UI & SSR Uyumluluğu:** Angular ile hızlı, tepkisel ve optimize edilmiş kullanıcı arayüzü.

---

## 🛠️ Kullanılan Teknolojiler

### Backend
- **Framework:** .NET Core Web API (C#)
- **Mimari:** RESTful API, Repository Pattern & DTO Yapısı
- **Güvenlik:** JWT Bearer Authentication, Role-based Authorization
- **Dokümantasyon:** Swagger / OpenAPI

### Frontend
- **Framework:** Angular & TypeScript
- **Stil & Arayüz:** Modern CSS / Responsive Tasarım
- **İletişim:** RxJS, HTTP Interceptors (Token yönetimi için)

### Veritabanı & Altyapı
- **Veritabanı:** MongoDB / MS SQL Server
- **Yapay Zeka:** Local LLM / Ollama API Entegrasyonu
- **Sürüm Kontrolü:** Git & GitHub

---

## 📂 Proje Dizin Yapısı

```text
InternalAI/
├── backend/
│   └── Internal.API/           # .NET Core Web API projesi
│       ├── Controllers/        # API uç noktaları (Endpoints)
│       ├── DTOs/               # Veri transfer nesneleri
│       ├── Models/             # Veritabanı modelleri
│       ├── Services/           # İş mantığı (Business logic) & LLM servisleri
│       └── Program.cs          # Uygulama başlangıç ve DI konfigürasyonu
│
├── frontend/
│   └── intern-ai-frontend/     # Angular istemci projesi
│       ├── src/
│       │   ├── app/            # Sayfalar, bileşenler (components) ve servisler
│       │   └── environments/   # Ortam konfigürasyonları
│       └── package.json        # Bağımlılıklar ve scriptler
│
└── README.md                   # Proje tanıtım ve kurulum kılavuzu


⚙️ Kurulum ve Yerel Çalıştırma

Projeyi bilgisayarınızda yerel ortamda çalıştırmak için aşağıdaki adımları sırasıyla uygulayabilirsiniz:

Gereksinimler
.NET SDK (8.0 veya üzeri)

Node.js (v18 veya üzeri) & npm

Angular CLI (npm install -g @angular/cli)

MongoDB (veya yerel bağlantı servisi)

1. Projeyi Klonlayın
Bash
git clone [https://github.com/ayssnr/InternalAI.git](https://github.com/ayssnr/InternalAI.git)
cd InternalAI
2. Backend'i Başlatın (.NET Web API)
Bash
cd backend/Internal.API

# Bağımlılıkları yükleyin
dotnet restore

# API'yi ayağa kaldırın
dotnet run
Backend varsayılan olarak https://localhost:7xxx portunda çalışır. Tarayıcınızdan https://localhost:7xxx/swagger adresine giderek API uç noktalarını test edebilirsiniz.

3. Frontend'i Başlatın (Angular)
Yeni bir terminal sekmesi açın ve frontend dizinine geçin:

Bash
cd frontend/intern-ai-frontend

# Gerekli npm paketlerini yükleyin
npm install

# Geliştirme sunucusunu başlatın
ng serve
Geliştirme sunucusu başladığında tarayıcınızdan http://localhost:4200 adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

🔒 Güvenlik Notu
Hassas veritabanı şifreleri, JWT secret key'leri ve özel API anahtarları .gitignore kuralları gereği repoda paylaşılmamıştır. Yerel ortamda çalıştırmadan önce appsettings.json ve ortam değişkenlerini kendi sisteminize göre yapılandırdığınızdan emin olun.

👩‍💻 Geliştirici
Ayşe Nur Yılmaz - 
GitHub Profilim : https://github.com/ayssnr|
 LinkedIn: linkedin.com/in/aysenuryilmaz3