<?php
/**
 * Database Connection & Initialization (SQLite)
 * Content Planner Sosial Media
 */

$dbPath = __DIR__ . '/database.sqlite';

try {
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Create Tables if not exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            platform TEXT NOT NULL,
            format TEXT NOT NULL,
            pillar TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'ide',
            scheduled_at DATETIME,
            caption TEXT,
            hook TEXT,
            cta TEXT,
            hashtags TEXT,
            media_path TEXT,
            pic TEXT,
            notes TEXT,
            likes INTEGER DEFAULT 0,
            comments INTEGER DEFAULT 0,
            shares INTEGER DEFAULT 0,
            reach INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS pillars (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            target_percentage INTEGER DEFAULT 20,
            color TEXT DEFAULT '#4F46E5'
        );

        CREATE TABLE IF NOT EXISTS ideas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            platform TEXT NOT NULL,
            pillar TEXT,
            notes TEXT,
            status TEXT DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // Check if posts table is empty, if so, seed dummy data
    $count = $pdo->query("SELECT COUNT(*) FROM posts")->fetchColumn();
    if ($count == 0) {
        $today = date('Y-m-d');
        $seeds = [
            [
                'title' => '5 Kesalahan Fatal Content Creator Pemula',
                'platform' => 'instagram',
                'format' => 'reels',
                'pillar' => 'edukasi',
                'status' => 'terjadwal',
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('+1 day 19:00:00')),
                'hook' => 'Stop posting kalau masih ngelakuin 5 hal ini di 2026!',
                'caption' => "Banyak yang rajin posting tapi followers segitu-gitu aja. Ternyata ini 5 blunder terbesar yang sering nggak disadari...\n\n1. Nggak ada hook 3 detik pertama\n2. Audio pecah/visual gelap\n3. Tidak ada CTA yang jelas\n4. Topik gado-gado tanpa pilar\n5. Kurang konsisten membaca insight\n\nSimpan postingan ini biar nggak kelupaan pas bikin konten besok! ✨",
                'cta' => 'Share ke temen kamu yang baru mulai ngonten!',
                'hashtags' => '#tipsngonten #contentcreator #reelsindonesia #socialmediatips #strategikonten',
                'pic' => 'Sarah (Creator)',
                'notes' => 'Gunakan background music trending lo-fi, teks judul tebal warna kuning di frame pertama.',
                'likes' => 0, 'comments' => 0, 'shares' => 0, 'reach' => 0
            ],
            [
                'title' => 'Tutorial Bikin Desain Carousel di Canva 10 Menit',
                'platform' => 'instagram',
                'format' => 'carousel',
                'pillar' => 'tips_trik',
                'status' => 'produksi',
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('+3 days 12:00:00')),
                'hook' => 'Cara rahasia bikin carousel estetik tanpa ribet!',
                'caption' => "Slide 1-7 berisi panduan step by step layout grid Canva, font pairing rekomendasi, dan trik seamless slide yang bikin audiens betah swipe sampai akhir!\n\nKomentar 'MAU' nanti mimin kirimkan link template gratisnya di DM kamu!",
                'cta' => 'Ketik "MAU" di kolom komentar buat dapetin templatenya!',
                'hashtags' => '#tutorialcanva #carouselinstagram #desainkonten #canvatips #freedesign',
                'pic' => 'Rian (Designer)',
                'notes' => 'Ada 6 slide. Warna palet brand biru navy & oranye. Slide terakhir mockup template.',
                'likes' => 0, 'comments' => 0, 'shares' => 0, 'reach' => 0
            ],
            [
                'title' => 'A Day in My Life: Behind The Scene Produksi Studio',
                'platform' => 'tiktok',
                'format' => 'reels',
                'pillar' => 'behind_the_scene',
                'status' => 'scripting',
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('+4 days 16:30:00')),
                'hook' => 'Kalian penasaran ga sih apa yang terjadi di balik kamera waktu shooting?',
                'caption' => "Chaos tapi seru banget! Dari lighting mati mendadak sampai ganti script 3 kali. Inilah realita tim kreatif kami setiap minggu ☕🎬",
                'cta' => 'Follow untuk lihat kelucuan tim kita berikutnya!',
                'hashtags' => '#adayinmylife #behindthescenes #kantorlife #tiktokindonesia #teamwork',
                'pic' => 'Dina (Videographer)',
                'notes' => 'Fast-paced cut, sound efek lucu pas lighting jatuh, suara voiceover santai.',
                'likes' => 0, 'comments' => 0, 'shares' => 0, 'reach' => 0
            ],
            [
                'title' => 'Flash Sale Gajian: Diskon Up to 50% Khusus Hari Ini',
                'platform' => 'tiktok',
                'format' => 'reels',
                'pillar' => 'promosi',
                'status' => 'review',
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('+2 days 20:00:00')),
                'hook' => 'Peringatan! Promo ini cuma bertahan 24 jam sebelum harga balik normal!',
                'caption' => "Payday promo arrives! Dapatkan produk unggulan kami dengan diskon gila-gilaan sampai 50% + Gratis Ongkir ke seluruh Indonesia. Link di bio ya keranjang kuning siap di-checkout!",
                'cta' => 'Klik keranjang kuning sekarang sebelum kehabisan stok!',
                'hashtags' => '#promogajian #flashsale #racuntiktok #diskonspesial #belanjaonline',
                'pic' => 'Andi (Marketing)',
                'notes' => 'Tampilkan unboxing cepat dan label diskon bergerak.',
                'likes' => 0, 'comments' => 0, 'shares' => 0, 'reach' => 0
            ],
            [
                'title' => 'Cara Kami Meningkatkan Omset Bisnis 300% via LinkedIn',
                'platform' => 'linkedin',
                'format' => 'thread',
                'pillar' => 'inspirasi',
                'status' => 'published',
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('-2 days 09:00:00')),
                'hook' => 'Banyak yang mengira LinkedIn cuma untuk cari kerja. Ini kesalahan besar.',
                'caption' => "Tahun lalu kami mengubah pendekatan B2B kami dari cold-pitching menjadi content-first thought leadership.\n\nHasilnya:\n- Inbound leads naik 320%\n- Closing rate meningkat dari 8% ke 24%\n\nBerikut 4 pilar strategi yang kami terapkan secara konsisten selama 6 bulan...",
                'cta' => 'Bagaimana strategi konten B2B di perusahaan Anda? Mari diskusi di kolom komentar.',
                'hashtags' => '#b2bmarketing #linkedintips #businessgrowth #leadership #contentmarketing',
                'pic' => 'Sarah (Creator)',
                'notes' => 'Format text panjang dengan bullet point rapi dan grafik pertumbuhan.',
                'likes' => 342, 'comments' => 58, 'shares' => 29, 'reach' => 8400
            ],
            [
                'title' => 'Full Breakdown: Algoritma YouTube 2026 & Cara Optimasi SEO',
                'platform' => 'youtube',
                'format' => 'video_panjang',
                'pillar' => 'edukasi',
                'status' => 'published',
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('-5 days 18:00:00')),
                'hook' => 'Apakah CTR atau Retention yang lebih penting di YouTube sekarang?',
                'caption' => "Di video komprehensif 15 menit ini, kami membedah data analitik dari 50+ channel YouTube untuk membuktikan faktor apa saja yang paling memicu rekomendasi browse features YouTube.",
                'cta' => 'Subscribe dan aktifkan lonceng notifikasi untuk tips algoritma terupdate!',
                'hashtags' => '#youtubeseo #algoritmayoutube #youtubetips #digitalmarketing #creatorjourney',
                'pic' => 'Sarah (Creator)',
                'notes' => 'Thumbnail warna kontras dengan ekspresi wajah dan teks besar "ALGORITMA 2026".',
                'likes' => 1250, 'comments' => 184, 'shares' => 95, 'reach' => 24500
            ],
            [
                'title' => 'Meme: Ketika Klien Minta Revisi Jam 11 Malam',
                'platform' => 'twitter',
                'format' => 'single_image',
                'pillar' => 'hiburan',
                'status' => 'ide',
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('+5 days 21:00:00')),
                'hook' => '"Mas, bisa ganti font dikit aja gak? Besok pagi mau dipresentasiin"',
                'caption' => "Momen ketika laptop udah mau ditutup tapi suara WA berbunyi nyaring...\nSiapa yang pernah ngalamin juga? Tolong ngaku 😭",
                'cta' => 'Retweet kalau kamu pernah jadi korban revisi mendadak!',
                'hashtags' => '#relateable #kerjaremote #freelancelife #desainermeme #humorkantor',
                'pic' => 'Rian (Designer)',
                'notes' => 'Gunakan template meme cat crying atau Pedro Pascal meme.',
                'likes' => 0, 'comments' => 0, 'shares' => 0, 'reach' => 0
            ]
        ];

        $stmt = $pdo->prepare("
            INSERT INTO posts (title, platform, format, pillar, status, scheduled_at, hook, caption, cta, hashtags, pic, notes, likes, comments, shares, reach)
            VALUES (:title, :platform, :format, :pillar, :status, :scheduled_at, :hook, :caption, :cta, :hashtags, :pic, :notes, :likes, :comments, :shares, :reach)
        ");

        foreach ($seeds as $item) {
            $stmt->execute($item);
        }
    }

    // Seed Pillars if empty
    $pillarCount = $pdo->query("SELECT COUNT(*) FROM pillars")->fetchColumn();
    if ($pillarCount == 0) {
        $pillars = [
            ['Edukasi', 30, '#3B82F6'],
            ['Tips & Trik', 25, '#10B981'],
            ['Promosi & Jualan', 20, '#EF4444'],
            ['Behind The Scene', 10, '#8B5CF6'],
            ['Hiburan & Meme', 10, '#F59E0B'],
            ['Inspirasi & Cerita', 5, '#EC4899']
        ];
        $pStmt = $pdo->prepare("INSERT INTO pillars (name, target_percentage, color) VALUES (?, ?, ?)");
        foreach ($pillars as $p) {
            $pStmt->execute($p);
        }
    }

    // Seed Ideas if empty
    $ideaCount = $pdo->query("SELECT COUNT(*) FROM ideas")->fetchColumn();
    if ($ideaCount == 0) {
        $ideas = [
            ['Q&A Menjawab Pertanyaan Paling Sering dari Followers', 'instagram', 'edukasi', 'Kumpulkan stiker pertanyaan dari story minggu ini'],
            ['Review Gear / Setup Murah untuk Creator Pemula', 'tiktok', 'tips_trik', 'Sorot mic wireless budget 100 ribuan vs mic mahal'],
            ['Studi Kasus: Brand Lokal yang Sukses Viral Tanpa Iklan', 'linkedin', 'inspirasi', 'Bahas strategi user generated content (UGC) mereka'],
            ['Polling: Mana Desain Packaging Baru yang Paling Kalian Suka?', 'threads', 'hiburan', 'Posting 2 pilihan desain A vs B']
        ];
        $iStmt = $pdo->prepare("INSERT INTO ideas (title, platform, pillar, notes) VALUES (?, ?, ?, ?)");
        foreach ($ideas as $idItem) {
            $iStmt->execute($idItem);
        }
    }

} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}

