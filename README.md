# Ariefmedia

Project website menggunakan Express.js dengan EJS template engine.

## 📋 Prasyarat
- Node.js versi stable terbaru (dalam kasus ini versi 24.11.1)
- npm (biasanya sudah terinstall bersama Node.js)

## 🚀 Cara Menjalankan Project

### 1. **Clone Repository**
```bash
git clone https://github.com/mikhsanfarizan/projects-ariefmedia.git
cd ariefmedia
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Setup Environment Variables**
Buat file `.env` di root project:
```bash
cp .env.example .env
```

Isi file `.env` dengan konfigurasi yang diperlukan:
```env
SITE_TITLE=Nama Website Anda
SITE_DESCRIPTION=Deskripsi website
SITE_TEXT_LOGO=Logo Text
SITE_WHATSAPP_NUMBER=08123456789
PORT=3000
```

### 4. **Menjalankan Development Server**
```bash
npm run dev
```
Server akan berjalan di `http://localhost:3000` dengan hot-reload menggunakan nodemon.

### 5. **Menjalankan Production Server**
```bash
npm start
```

## 📁 Struktur Project
```
ariefmedia/
├── app.js              # Entry point aplikasi
├── package.json        # Konfigurasi project
├── .env               # Environment variables
├── controllers/       # Logic business
├── routes/           # Routing aplikasi
├── views/            # Template EJS
├── public/           # File static (CSS, JS, images)
├── middlewares/      # Middleware functions
└── utils/            # Helper functions
```

## ⚙️ Perintah yang Tersedia

| Perintah | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan server development dengan nodemon |
| `npm start` | Jalankan server production |
| `npm install` | Install semua dependencies |

## 🌐 Akses Aplikasi
Setelah server berjalan, buka browser dan akses:
- **Development**: `http://localhost:3000`
- **Production**: `http://localhost:3000` (atau sesuai PORT di .env)

## 🔧 Fitur yang Digunakan
- **Express.js v5** - Web framework
- **EJS** - Template engine
- **express-ejs-layouts** - Layout management
- **dotenv** - Environment variable management
- **nodemon** - Development server auto-restart

## 📝 Catatan
- Project menggunakan ES Modules (`"type": "module"`)
- Semua import harus menyertakan ekstensi `.js`
- Gunakan `process.env` untuk mengakses environment variables