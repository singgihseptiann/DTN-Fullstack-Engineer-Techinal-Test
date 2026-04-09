# DTN Fullstack Engineer Technical Test

Proyek ini adalah aplikasi fullstack yang dirancang untuk mengelola dan memvisualisasikan data mentah dari file CSV, khususnya data telekomunikasi terkait ketersediaan sel (Cell Availability) pada eNodeB.

## 🚀 Teknologi Utama

Proyek ini dibangun menggunakan teknologi terbaru untuk performa dan pengalaman pengembang yang optimal:

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library UI**: [React 19](https://react.dev/), [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Visualisasi**: [Recharts](https://recharts.org/)
- **Komponen**: [Shadcn UI](https://ui.shadcn.com/)
- **Notifikasi**: [Sonner](https://sonner.stevenly.me/)

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) dengan [Mongoose](https://mongoosejs.com/)
- **Parsing**: [csv-parser](https://www.npmjs.com/package/csv-parser)
- **Validasi**: `class-validator` & `class-transformer`

---

## ✨ Fitur Utama

1. **Unggah Data CSV**: Mengunggah file CSV yang berisi data eNodeB ID, Local Cell ID, Result Time, dan Availability Duration.
2. **Pemrosesan Data Otomatis**: Backend secara otomatis mem-parsing CSV dan menangani duplikasi data menggunakan mekanisme *upsert*.
3. **Dashboard Visualisasi**: Menampilkan data dalam bentuk grafik interaktif yang memudahkan analisis tren ketersediaan sel.
4. **Manajemen Workspace**: Menggunakan *npm workspaces* untuk pengelolaan monorepo yang rapi.

---

## 🛠️ Cara Menjalankan Proyek

### Prasyarat
- [Node.js](https://nodejs.org/) (versi terbaru direkomendasikan)
- [MongoDB](https://www.mongodb.com/try/download/community) berjalan di localhost (`mongodb://127.0.0.1:27017/dtn-db`)

### Langkah-langkah

1. **Klon repositori ini** (jika belum).
2. **Instal dependensi** di direktori root:
   ```bash
   npm install
   ```
3. **Jalankan aplikasi dalam mode pengembangan**:
   ```bash
   npm run dev
   ```
   Perintah ini akan menjalankan **Frontend** dan **Backend** secara bersamaan menggunakan `concurrently`.

4. **Akses Aplikasi**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:3001/api](http://localhost:3001/api)

---

## 📁 Struktur Folder

```text
.
├── apps/
│   ├── frontend/     # Aplikasi Next.js 16
│   └── backend/      # Aplikasi NestJS (Port 3001, Prefix /api)
├── packages/         # Shared packages (jika ada)
├── package.json      # Konfigurasi npm workspaces
└── README.md         # Dokumentasi ini
```

## 📝 Catatan Penting
- Pastikan MongoDB Anda sudah berjalan di `localhost:27017` sebelum menjalankan `npm run dev` agar koneksi database berhasil.
- Backend menggunakan port **3001** dengan global prefix **/api**.
