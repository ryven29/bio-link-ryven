# RYVEN STORE - Halaman Testimoni

## Deskripsi
Halaman testimoni untuk RYVEN STORE yang menampilkan testimoni pelanggan dengan gambar, rating, dan deskripsi produk.

## Struktur File
```
app/
├── testimonial/
│   └── page.js          # Halaman testimoni utama
├── components/
│   ├── Header.js        # Header dengan navigasi
│   └── Footer.js        # Footer
└── next.config.js       # Konfigurasi Next.js untuk gambar eksternal
```

## Cara Menambah Testimoni Baru

### 1. Siapkan Gambar
- Upload gambar testimoni ke hosting gambar (seperti top4top.io, imgur, dll)
- Dapatkan URL gambar yang bisa diakses publik
- Pastikan format gambar adalah JPG, PNG, atau WebP

### 2. Edit Data Testimoni
Buka file `testimonial/page.js` dan tambahkan data testimoni baru ke dalam array `testimonials`:

```javascript
{
    id: 8, // ID unik (increment dari ID terakhir)
    image: "https://example.com/gambar-testimoni.jpg", // URL gambar eksternal
    productName: "Nama Produk",
    price: "Rp 50.000",
    rating: 5, // Rating 1-5 (bisa desimal seperti 4.5)
    description: "Deskripsi testimoni dari pelanggan...",
    customerName: "Nama Pelanggan"
}
```

### 3. Format Data Lengkap
```javascript
const testimonials = [
    // Testimoni yang sudah ada...
    {
        id: 8,
        image: "https://example.com/gambar-baru.jpg",
        productName: "Jasa Claim Nitro Trial",
        price: "Rp 25.000",
        rating: 5,
        description: "Claim Nitro berhasil dengan cepat! Admin ramah dan responsive.",
        customerName: "Nama Pelanggan"
    }
]
```

## Fitur Halaman

### 🎨 **Desain & UI**
- Tema gelap dengan gradien warna
- Animasi smooth menggunakan Framer Motion
- Responsive design untuk desktop dan mobile
- Hover effects pada kartu testimoni

### 📊 **Statistik**
- Jumlah testimoni positif (otomatis update)
- Rating rata-rata (4.8)
- Persentase kepuasan pelanggan (100%)

### ⭐ **Sistem Rating**
- Rating 1-5 bintang
- Support setengah bintang (4.5)
- Bintang kosong untuk rating rendah

### 🖼️ **Gambar**
- Fallback image jika gambar tidak tersedia
- Optimized untuk web
- Aspect ratio konsisten

### 🎯 **Produk yang Ditampilkan**
1. Jasa Claim Nitro Trial
2. Jasa Claim Nitro Trial
3. Joki Quest Discord
4. Akun Telegram Old
5. Joki Quest Discord
6. Xbox Gamepass 1 Month
7. YT Premium 1 Month Invite

## Deployment di Vercel

### 1. Pastikan Konfigurasi Benar
- File `next.config.js` sudah dikonfigurasi untuk domain gambar eksternal
- Semua URL gambar bisa diakses dari internet

### 2. URL Gambar
- Gunakan URL lengkap dari hosting gambar
- Format: `https://example.com/gambar.jpg`
- Pastikan domain sudah ditambahkan di `next.config.js`

### 3. Deploy
- Push ke repository GitHub
- Connect ke Vercel
- Deploy otomatis akan berjalan

## Troubleshooting

### Gambar Tidak Muncul
1. Pastikan URL gambar bisa diakses dari internet
2. Periksa apakah domain sudah ditambahkan di `next.config.js`
3. Pastikan format file didukung (JPG, PNG, WebP)
4. Cek console browser untuk error

### Error di Vercel
1. Pastikan semua URL gambar valid dan bisa diakses
2. Periksa build log di Vercel dashboard
3. Pastikan domain gambar sudah dikonfigurasi dengan benar

## Kontak
Untuk bantuan lebih lanjut, hubungi developer RYVEN STORE.
