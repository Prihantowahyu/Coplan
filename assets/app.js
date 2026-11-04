/**
 * ContentFlow - Core Application JS
 * Dual Storage Engine: PHP API or Browser LocalStorage (GitHub Pages Ready)
 */

const App = {
    currentTab: 'dashboard',
    storageMode: 'detecting', // 'api' or 'local'
    posts: [],
    ideas: [],
    stats: null,
    currentDate: new Date(),
    filter: {
        platform: 'all',
        status: 'all',
        pillar: 'all',
        search: ''
    },
    charts: {
        platform: null,
        pillar: null
    },

    // Viral hooks library data
    hookTemplates: [
        { category: 'FOMO & Urgensi', text: 'Stop posting kalau kamu masih ngelakuin 3 hal ini di 2026!' },
        { category: 'FOMO & Urgensi', text: 'Sebelum nyesel di akhir tahun, kamu wajib tahu trik ini sekarang!' },
        { category: 'FOMO & Urgensi', text: 'Jangan skip video ini kalau kamu gamau rugi jutaan rupiah!' },
        { category: 'Rasa Ingin Tahu (Curiosity)', text: 'Banyak yang belum tahu, ternyata ini rahasia akun kecil bisa dapat jutaan views...' },
        { category: 'Rasa Ingin Tahu (Curiosity)', text: 'Saya menghabiskan 50 jam meriset ini, dan inilah 1 hal yang paling mengejutkan...' },
        { category: 'Rasa Ingin Tahu (Curiosity)', text: 'Ada 1 perbedaan mencolok antara akun yang cepat naik vs akun yang stuck.' },
        { category: 'How-to & Solusi', text: 'Cara mudah [hasil yang diinginkan] cuma dalam waktu [durasi singkat], tanpa [masalah umum]!' },
        { category: 'How-to & Solusi', text: 'Step by step panduan lengkap bikin [konten/desain] profesional khusus pemula.' },
        { category: 'How-to & Solusi', text: '3 Website rahasia yang bakal hemat waktu kerja kamu 90%!' },
        { category: 'Kontroversial & Opini', text: 'Pendapat populer bilang [mitos umum], tapi faktanya justru sebaliknya...' },
        { category: 'Kontroversial & Opini', text: 'Alasan kenapa saya BERHENTI melakukan [kebiasaan umum] tahun ini.' },
        { category: 'Story & Relateable', text: 'Waktu pertama kali mulai, saya hampir menyerah gara-gara satu hal ini...' },
        { category: 'Story & Relateable', text: 'Pernah gak sih kalian ngerasa udah capek bikin konten tapi sepi penonton? Sini merapat.' }
    ],

    // Hashtag library presets
    hashtagPresets: {
        bisnis: '#bisnisonline #strategibisnis #marketingdigital #b2bmarketing #tipsbisnis #entrepreneurindonesia #omsetnaik #jualanonline',
        edukasi: '#belajaronline #tipsdantrik #edukasi #wawasandigital #belajargratis #informasiterkini #infounik #pengetahuan',
        kreator: '#contentcreator #tipsngonten #reelsindonesia #tiktokindonesia #videocreator #creatorjourney #socialmediatips',
        desain: '#desainkonten #canvatips #desainkreatif #microblog #carouselinstagram #desainerindonesia #tipskreatif',
        lifestyle: '#adayinmylife #kantorlife #freelancelife #worklifebalance #produktivitas #kebiasaanpositif #selfgrowth'
    },

    // Initial Seeds for LocalStorage (GitHub Pages / Standalone static)
    defaultSeeds: [
        {
            id: 1,
            title: '5 Kesalahan Fatal Content Creator Pemula',
            platform: 'instagram',
            format: 'reels',
            pillar: 'edukasi',
            status: 'terjadwal',
            scheduled_at: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
            hook: 'Stop posting kalau masih ngelakuin 5 hal ini di 2026!',
            caption: "Banyak yang rajin posting tapi followers segitu-gitu aja. Ternyata ini 5 blunder terbesar yang sering nggak disadari...\n\n1. Nggak ada hook 3 detik pertama\n2. Audio pecah / visual gelap\n3. Tidak ada CTA yang jelas\n4. Topik gado-gado tanpa pilar\n5. Kurang konsisten membaca insight\n\nSimpan postingan ini biar nggak kelupaan pas bikin konten besok! ✨",
            cta: 'Share ke temen kamu yang baru mulai ngonten!',
            hashtags: '#tipsngonten #contentcreator #reelsindonesia #socialmediatips #strategikonten',
            media_path: null,
            pic: 'Sarah (Creator)',
            notes: 'Gunakan background music trending lo-fi, teks judul tebal warna kuning di frame pertama.',
            likes: 0, comments: 0, shares: 0, reach: 0
        },
        {
            id: 2,
            title: 'Tutorial Bikin Desain Carousel di Canva 10 Menit',
            platform: 'instagram',
            format: 'carousel',
            pillar: 'tips_trik',
            status: 'produksi',
            scheduled_at: new Date(Date.now() + 259200000).toISOString().slice(0, 16),
            hook: 'Cara rahasia bikin carousel estetik tanpa ribet!',
            caption: "Slide 1-7 berisi panduan step by step layout grid Canva, font pairing rekomendasi, dan trik seamless slide yang bikin audiens betah swipe sampai akhir!\n\nKomentar 'MAU' nanti mimin kirimkan link template gratisnya di DM kamu!",
            cta: 'Ketik "MAU" di kolom komentar buat dapetin templatenya!',
            hashtags: '#tutorialcanva #carouselinstagram #desainkonten #canvatips #freedesign',
            media_path: null,
            pic: 'Rian (Designer)',
            notes: 'Ada 6 slide. Warna palet brand biru navy & oranye. Slide terakhir mockup template.',
            likes: 0, comments: 0, shares: 0, reach: 0
        },
        {
            id: 3,
            title: 'A Day in My Life: Behind The Scene Produksi Studio',
            platform: 'tiktok',
            format: 'reels',
            pillar: 'behind_the_scene',
            status: 'scripting',
            scheduled_at: new Date(Date.now() + 345600000).toISOString().slice(0, 16),
            hook: 'Kalian penasaran ga sih apa yang terjadi di balik kamera waktu shooting?',
            caption: "Chaos tapi seru banget! Dari lighting mati mendadak sampai ganti script 3 kali. Inilah realita tim kreatif kami setiap minggu ☕🎬",
            cta: 'Follow untuk lihat kelucuan tim kita berikutnya!',
            hashtags: '#adayinmylife #behindthescenes #kantorlife #tiktokindonesia #teamwork',
            media_path: null,
            pic: 'Dina (Videographer)',
            notes: 'Fast-paced cut, sound efek lucu pas lighting jatuh, suara voiceover santai.',
            likes: 0, comments: 0, shares: 0, reach: 0
        },
        {
            id: 4,
            title: 'Flash Sale Gajian: Diskon Up to 50% Khusus Hari Ini',
            platform: 'tiktok',
            format: 'reels',
            pillar: 'promosi',
            status: 'review',
            scheduled_at: new Date(Date.now() + 172800000).toISOString().slice(0, 16),
            hook: 'Peringatan! Promo ini cuma bertahan 24 jam sebelum harga balik normal!',
            caption: "Payday promo arrives! Dapatkan produk unggulan kami dengan diskon gila-gilaan sampai 50% + Gratis Ongkir ke seluruh Indonesia. Link di bio ya keranjang kuning siap di-checkout!",
            cta: 'Klik keranjang kuning sekarang sebelum kehabisan stok!',
            hashtags: '#promogajian #flashsale #racuntiktok #diskonspesial #belanjaonline',
            media_path: null,
            pic: 'Andi (Marketing)',
            notes: 'Tampilkan unboxing cepat dan label diskon bergerak.',
            likes: 0, comments: 0, shares: 0, reach: 0
        },
        {
            id: 5,
            title: 'Cara Kami Meningkatkan Omset Bisnis 300% via LinkedIn',
            platform: 'linkedin',
            format: 'thread',
            pillar: 'inspirasi',
            status: 'published',
            scheduled_at: new Date(Date.now() - 172800000).toISOString().slice(0, 16),
            hook: 'Banyak yang mengira LinkedIn cuma untuk cari kerja. Ini kesalahan besar.',
            caption: "Tahun lalu kami mengubah pendekatan B2B kami dari cold-pitching menjadi content-first thought leadership.\n\nHasilnya:\n- Inbound leads naik 320%\n- Closing rate meningkat dari 8% ke 24%\n\nBerikut 4 pilar strategi yang kami terapkan secara konsisten selama 6 bulan...",
            cta: 'Bagaimana strategi konten B2B di perusahaan Anda? Mari diskusi di kolom komentar.',
            hashtags: '#b2bmarketing #linkedintips #businessgrowth #leadership #contentmarketing',
            media_path: null,
            pic: 'Sarah (Creator)',
            notes: 'Format text panjang dengan bullet point rapi dan grafik pertumbuhan.',
            likes: 342, comments: 58, shares: 29, reach: 8400
        },
        {
            id: 6,
            title: 'Full Breakdown: Algoritma YouTube 2026 & Cara Optimasi SEO',
            platform: 'youtube',
            format: 'video_panjang',
            pillar: 'edukasi',
            status: 'published',
            scheduled_at: new Date(Date.now() - 432000000).toISOString().slice(0, 16),
            hook: 'Apakah CTR atau Retention yang lebih penting di YouTube sekarang?',
            caption: "Di video komprehensif 15 menit ini, kami membedah data analitik dari 50+ channel YouTube untuk membuktikan faktor apa saja yang paling memicu rekomendasi browse features YouTube.",
            cta: 'Subscribe dan aktifkan lonceng notifikasi untuk tips algoritma terupdate!',
            hashtags: '#youtubeseo #algoritmayoutube #youtubetips #digitalmarketing #creatorjourney',
            media_path: null,
            pic: 'Sarah (Creator)',
            notes: 'Thumbnail warna kontras dengan ekspresi wajah dan teks besar "ALGORITMA 2026".',
            likes: 1250, comments: 184, shares: 95, reach: 24500
        },
        {
            id: 7,
            title: 'Meme: Ketika Klien Minta Revisi Jam 11 Malam',
            platform: 'twitter',
            format: 'single_image',
            pillar: 'hiburan',
            status: 'ide',
            scheduled_at: new Date(Date.now() + 432000000).toISOString().slice(0, 16),
            hook: '"Mas, bisa ganti font dikit aja gak? Besok pagi mau dipresentasiin"',
            caption: "Momen ketika laptop udah mau ditutup tapi suara WA berbunyi nyaring...\nSiapa yang pernah ngalamin juga? Tolong ngaku 😭",
            cta: 'Retweet kalau kamu pernah jadi korban revisi mendadak!',
            hashtags: '#relateable #kerjaremote #freelancelife #desainermeme #humorkantor',
            media_path: null,
            pic: 'Rian (Designer)',
            notes: 'Gunakan template meme cat crying atau Pedro Pascal meme.',
            likes: 0, comments: 0, shares: 0, reach: 0
        }
    ],

    defaultIdeas: [
        { id: 1, title: 'Q&A Menjawab Pertanyaan Paling Sering dari Followers', platform: 'instagram', pillar: 'edukasi', notes: 'Kumpulkan stiker pertanyaan dari story minggu ini' },
        { id: 2, title: 'Review Gear / Setup Murah untuk Creator Pemula', platform: 'tiktok', pillar: 'tips_trik', notes: 'Sorot mic wireless budget 100 ribuan vs mic mahal' },
        { id: 3, title: 'Studi Kasus: Brand Lokal yang Sukses Viral Tanpa Iklan', platform: 'linkedin', pillar: 'inspirasi', notes: 'Bahas strategi user generated content (UGC) mereka' },
        { id: 4, title: 'Polling: Mana Desain Packaging Baru yang Paling Kalian Suka?', platform: 'threads', pillar: 'hiburan', notes: 'Posting 2 pilihan desain A vs B' }
    ],

    // Initialize application
    async init() {
        this.bindEvents();
        await this.detectStorageMode();
        await this.loadDashboardData();
        this.renderViralHooks();
    },

    // Detect if PHP API is accessible, else seamlessly use LocalStorage
    async detectStorageMode() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            const res = await fetch('api.php?action=get_stats', { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (res.ok) {
                const json = await res.json();
                if (json && json.success) {
                    this.storageMode = 'api';
                    this.updateStorageBadge('api');
                    return;
                }
            }
        } catch (e) {
            // API not available (e.g. running on GitHub Pages / Static host)
        }

        this.storageMode = 'local';
        this.initLocalStorage();
        this.updateStorageBadge('local');
    },

    updateStorageBadge(mode) {
        const badge = document.getElementById('storageModeBadge');
        if (badge) {
            if (mode === 'api') {
                badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500"></span> Database Server (PHP/SQLite)`;
                badge.className = "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-pointer";
                badge.title = "Aplikasi terhubung ke backend SQLite PHP. Klik untuk opsi cadangan.";
            } else {
                badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Browser Storage (GitHub Pages)`;
                badge.className = "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 cursor-pointer";
                badge.title = "Mode Standalone (Data tersimpan di browser). 100% Gratis di GitHub Pages!";
            }
        }
    },

    initLocalStorage() {
        if (!localStorage.getItem('contentflow_posts')) {
            localStorage.setItem('contentflow_posts', JSON.stringify(this.defaultSeeds));
        }
        if (!localStorage.getItem('contentflow_ideas')) {
            localStorage.setItem('contentflow_ideas', JSON.stringify(this.defaultIdeas));
        }
    },

    bindEvents() {
        // Navigation Tabs
        document.querySelectorAll('.nav-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Search and Filters
        const searchInput = document.getElementById('tableSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filter.search = e.target.value;
                this.renderTableView();
            });
        }

        const platformFilter = document.getElementById('filterPlatform');
        if (platformFilter) {
            platformFilter.addEventListener('change', (e) => {
                this.filter.platform = e.target.value;
                this.applyFilters();
            });
        }

        const statusFilter = document.getElementById('filterStatus');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.filter.status = e.target.value;
                this.applyFilters();
            });
        }

        const pillarFilter = document.getElementById('filterPillar');
        if (pillarFilter) {
            pillarFilter.addEventListener('change', (e) => {
                this.filter.pillar = e.target.value;
                this.applyFilters();
            });
        }

        // Form Submit
        const postForm = document.getElementById('postForm');
        if (postForm) {
            postForm.addEventListener('submit', (e) => this.handlePostSubmit(e));
        }

        // Caption character & hashtag counter
        const captionInput = document.getElementById('formCaption');
        if (captionInput) {
            captionInput.addEventListener('input', () => this.updateCaptionCounters());
        }

        // Status change in form (toggle metrics input if published)
        const formStatus = document.getElementById('formStatus');
        if (formStatus) {
            formStatus.addEventListener('change', (e) => {
                const metricSection = document.getElementById('metricsSection');
                if (metricSection) {
                    metricSection.style.display = e.target.value === 'published' ? 'block' : 'none';
                }
            });
        }

        // JSON file import input
        const importInput = document.getElementById('importJsonInput');
        if (importInput) {
            importInput.addEventListener('change', (e) => this.handleImportJSON(e));
        }
    },

    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.nav-tab').forEach(b => {
            if (b.dataset.tab === tab) {
                b.classList.remove('text-slate-600', 'hover:bg-slate-100');
                b.classList.add('bg-indigo-600', 'text-white', 'shadow-xs');
            } else {
                b.classList.add('text-slate-600', 'hover:bg-slate-100');
                b.classList.remove('bg-indigo-600', 'text-white', 'shadow-xs');
            }
        });

        document.querySelectorAll('.tab-view').forEach(view => {
            view.classList.add('hidden');
        });

        const activeView = document.getElementById(`view-${tab}`);
        if (activeView) {
            activeView.classList.remove('hidden');
        }

        // Refresh tab-specific content
        if (tab === 'dashboard') this.loadDashboardData();
        if (tab === 'calendar') this.renderCalendar();
        if (tab === 'kanban') this.renderKanban();
        if (tab === 'table') this.renderTableView();
        if (tab === 'ideas') this.loadIdeas();
    },

    // ------------------------------------------------------------------------
    // DATA ACCESS LAYER (API vs LocalStorage)
    // ------------------------------------------------------------------------
    async fetchPosts() {
        if (this.storageMode === 'api') {
            try {
                const res = await fetch('api.php?action=get_posts');
                const data = await res.json();
                if (data.success) {
                    this.posts = data.data;
                    return this.posts;
                }
            } catch (err) {
                console.warn('API error, falling back to local:', err);
                this.storageMode = 'local';
                this.initLocalStorage();
            }
        }

        // LocalStorage Mode
        try {
            const raw = localStorage.getItem('contentflow_posts');
            this.posts = raw ? JSON.parse(raw) : [];
        } catch (e) {
            this.posts = [];
        }
        return this.posts;
    },

    async loadDashboardData() {
        await this.fetchPosts();

        if (this.storageMode === 'api') {
            try {
                const res = await fetch('api.php?action=get_stats');
                const data = await res.json();
                if (data.success) {
                    this.stats = data.data;
                    this.renderDashboardStats();
                    return;
                }
            } catch (err) {
                console.warn('API stats error:', err);
            }
        }

        // LocalStorage calculation for stats
        const byStatus = {};
        const byPlatform = {};
        const byPillar = {};
        let totalReach = 0, totalLikes = 0, totalComments = 0, totalShares = 0;

        this.posts.forEach(p => {
            byStatus[p.status] = (byStatus[p.status] || 0) + 1;
            byPlatform[p.platform] = (byPlatform[p.platform] || 0) + 1;
            byPillar[p.pillar] = (byPillar[p.pillar] || 0) + 1;

            if (p.status === 'published') {
                totalReach += Number(p.reach || 0);
                totalLikes += Number(p.likes || 0);
                totalComments += Number(p.comments || 0);
                totalShares += Number(p.shares || 0);
            }
        });

        // Upcoming posts (next 7 days)
        const now = new Date();
        const nextWeek = new Date(Date.now() + 7 * 86400000);
        const upcoming = this.posts
            .filter(p => ['terjadwal', 'review', 'produksi'].includes(p.status) && new Date(p.scheduled_at) >= now && new Date(p.scheduled_at) <= nextWeek)
            .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
            .slice(0, 5);

        // Recent published
        const recentPublished = this.posts
            .filter(p => p.status === 'published')
            .sort((a, b) => new Date(b.scheduled_at) - new Date(a.scheduled_at))
            .slice(0, 5);

        this.stats = {
            total: this.posts.length,
            by_status: byStatus,
            by_platform: byPlatform,
            by_pillar: byPillar,
            metrics: {
                total_reach: totalReach,
                total_likes: totalLikes,
                total_comments: totalComments,
                total_shares: totalShares
            },
            upcoming: upcoming,
            recent_published: recentPublished
        };

        this.renderDashboardStats();
    },

    renderDashboardStats() {
        if (!this.stats) return;

        // Metric counts
        document.getElementById('statTotalPosts').innerText = this.stats.total || 0;
        document.getElementById('statScheduled').innerText = (this.stats.by_status && this.stats.by_status.terjadwal) || 0;
        document.getElementById('statPublished').innerText = (this.stats.by_status && this.stats.by_status.published) || 0;
        
        const totalReach = (this.stats.metrics && this.stats.metrics.total_reach) || 0;
        document.getElementById('statTotalReach').innerText = Number(totalReach).toLocaleString('id-ID');

        const totalEngage = ((this.stats.metrics && this.stats.metrics.total_likes) || 0) + 
                            ((this.stats.metrics && this.stats.metrics.total_comments) || 0) + 
                            ((this.stats.metrics && this.stats.metrics.total_shares) || 0);
        document.getElementById('statTotalEngage').innerText = Number(totalEngage).toLocaleString('id-ID');

        // Render Charts
        this.renderDashboardCharts();

        // Upcoming posts list
        const upcomingContainer = document.getElementById('upcomingList');
        if (upcomingContainer) {
            if (!this.stats.upcoming || this.stats.upcoming.length === 0) {
                upcomingContainer.innerHTML = `<div class="p-4 text-center text-slate-400 text-sm">Tidak ada jadwal konten dalam 7 hari ke depan.</div>`;
            } else {
                upcomingContainer.innerHTML = this.stats.upcoming.map(p => `
                    <div class="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition border border-slate-100">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg flex items-center justify-center text-xs ${this.getPlatformBadgeClass(p.platform)}">
                                <i class="${this.getPlatformIcon(p.platform)}"></i>
                            </span>
                            <div>
                                <h4 class="text-sm font-semibold text-slate-800 line-clamp-1">${this.escapeHtml(p.title)}</h4>
                                <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                    <span><i class="far fa-calendar-alt mr-1"></i>${this.formatDateTime(p.scheduled_at)}</span>
                                    <span>•</span>
                                    <span class="capitalize">${(p.format || '').replace('_', ' ')}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            ${this.getStatusBadge(p.status)}
                            <button onclick="App.openEditModal(${p.id})" class="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white">
                                <i class="fas fa-edit text-xs"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Recent Published List
        const publishedContainer = document.getElementById('recentPublishedList');
        if (publishedContainer) {
            if (!this.stats.recent_published || this.stats.recent_published.length === 0) {
                publishedContainer.innerHTML = `<div class="p-4 text-center text-slate-400 text-sm">Belum ada konten yang berstatus Published.</div>`;
            } else {
                publishedContainer.innerHTML = this.stats.recent_published.map(p => `
                    <div class="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition border border-slate-100">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 rounded-lg flex items-center justify-center text-xs ${this.getPlatformBadgeClass(p.platform)}">
                                <i class="${this.getPlatformIcon(p.platform)}"></i>
                            </span>
                            <div>
                                <h4 class="text-sm font-semibold text-slate-800 line-clamp-1">${this.escapeHtml(p.title)}</h4>
                                <div class="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                    <span><i class="far fa-heart mr-1 text-red-500"></i>${Number(p.likes || 0).toLocaleString()}</span>
                                    <span><i class="far fa-comment mr-1 text-blue-500"></i>${Number(p.comments || 0).toLocaleString()}</span>
                                    <span><i class="far fa-eye mr-1 text-emerald-500"></i>${Number(p.reach || 0).toLocaleString()} Reach</span>
                                </div>
                            </div>
                        </div>
                        <button onclick="App.openPreviewModal(${p.id})" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 bg-white rounded border border-indigo-100 shadow-xs">
                            Lihat Preview
                        </button>
                    </div>
                `).join('');
            }
        }
    },

    renderDashboardCharts() {
        if (!this.stats) return;

        // Platform distribution chart
        const platformCanvas = document.getElementById('chartPlatform');
        if (platformCanvas) {
            if (this.charts.platform) this.charts.platform.destroy();
            const pData = this.stats.by_platform || {};
            const labels = Object.keys(pData).map(k => k.charAt(0).toUpperCase() + k.slice(1));
            const counts = Object.values(pData);

            this.charts.platform = new Chart(platformCanvas, {
                type: 'doughnut',
                data: {
                    labels: labels.length ? labels : ['Belum ada'],
                    datasets: [{
                        data: counts.length ? counts : [1],
                        backgroundColor: ['#E1306C', '#000000', '#FF0000', '#0A66C2', '#111827', '#1877F2', '#10B981'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }
                    },
                    cutout: '65%'
                }
            });
        }

        // Pillar distribution chart
        const pillarCanvas = document.getElementById('chartPillar');
        if (pillarCanvas) {
            if (this.charts.pillar) this.charts.pillar.destroy();
            const piData = this.stats.by_pillar || {};
            const labels = Object.keys(piData).map(k => k.replace(/_/g, ' ').toUpperCase());
            const counts = Object.values(piData);

            this.charts.pillar = new Chart(pillarCanvas, {
                type: 'bar',
                data: {
                    labels: labels.length ? labels : ['Belum ada'],
                    datasets: [{
                        label: 'Jumlah Konten',
                        data: counts.length ? counts : [0],
                        backgroundColor: '#6366F1',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 1 } },
                        x: { ticks: { font: { size: 10 } } }
                    }
                }
            });
        }
    },

    // ------------------------------------------------------------------------
    // CALENDAR VIEW
    // ------------------------------------------------------------------------
    async renderCalendar() {
        await this.fetchPosts();
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        document.getElementById('calendarMonthYear').innerText = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
        const totalDays = new Date(year, month + 1, 0).getDate();
        const prevMonthTotalDays = new Date(year, month, 0).getDate();

        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = '';

        const todayStr = new Date().toISOString().split('T')[0];

        // Previous month filler days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayNum = prevMonthTotalDays - i;
            grid.innerHTML += `
                <div class="calendar-day-cell bg-slate-50/50 p-2 border-b border-r border-slate-100 opacity-40">
                    <span class="text-xs font-semibold text-slate-400">${dayNum}</span>
                </div>
            `;
        }

        // Current month days
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;

            // Find posts for this day
            const dayPosts = this.posts.filter(p => p.scheduled_at && p.scheduled_at.startsWith(dateStr));

            let postBadgesHtml = dayPosts.map(p => `
                <div onclick="event.stopPropagation(); App.openEditModal(${p.id})" 
                     title="${this.escapeHtml(p.title)} (${p.format})" 
                     class="cursor-pointer text-xs p-1.5 mb-1 rounded-md border flex items-center justify-between gap-1 shadow-xs transition hover:scale-[1.02] ${this.getCalendarBadgeStyle(p.platform)}">
                    <div class="flex items-center gap-1.5 truncate">
                        <i class="${this.getPlatformIcon(p.platform)} text-[10px]"></i>
                        <span class="truncate font-medium">${this.escapeHtml(p.title)}</span>
                    </div>
                    <span class="text-[9px] opacity-80 whitespace-nowrap">${p.scheduled_at.includes('T') ? p.scheduled_at.split('T')[1].substring(0, 5) : (p.scheduled_at.split(' ')[1] ? p.scheduled_at.split(' ')[1].substring(0, 5) : '')}</span>
                </div>
            `).join('');

            grid.innerHTML += `
                <div onclick="App.openCreateModal('${dateStr}')" 
                     class="calendar-day-cell bg-white p-2 border-b border-r border-slate-100 cursor-pointer relative group ${isToday ? 'ring-2 ring-indigo-500 ring-inset bg-indigo-50/20' : ''}">
                    <div class="flex items-center justify-between mb-1.5">
                        <span class="text-xs font-bold ${isToday ? 'w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center' : 'text-slate-700'}">${day}</span>
                        <button class="opacity-0 group-hover:opacity-100 transition text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="space-y-1 overflow-y-auto max-h-[85px]">
                        ${postBadgesHtml}
                    </div>
                </div>
            `;
        }

        // Next month filler
        const totalRendered = firstDay + totalDays;
        const remaining = (7 - (totalRendered % 7)) % 7;
        for (let i = 1; i <= remaining; i++) {
            grid.innerHTML += `
                <div class="calendar-day-cell bg-slate-50/50 p-2 border-b border-r border-slate-100 opacity-40">
                    <span class="text-xs font-semibold text-slate-400">${i}</span>
                </div>
            `;
        }
    },

    calendarPrev() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    },

    calendarNext() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    },

    calendarToday() {
        this.currentDate = new Date();
        this.renderCalendar();
    },

    getCalendarBadgeStyle(platform) {
        switch (platform) {
            case 'instagram': return 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100';
            case 'tiktok': return 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200';
            case 'youtube': return 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100';
            case 'linkedin': return 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100';
            case 'twitter': return 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200';
            case 'facebook': return 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100';
            case 'blogspot': return 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100';
            default: return 'bg-gray-100 border-gray-200 text-gray-700';
        }
    },

    // ------------------------------------------------------------------------
    // KANBAN VIEW
    // ------------------------------------------------------------------------
    async renderKanban() {
        await this.fetchPosts();
        const statuses = ['ide', 'scripting', 'produksi', 'review', 'terjadwal', 'published'];
        
        statuses.forEach(status => {
            const container = document.getElementById(`kanban-col-${status}`);
            if (!container) return;

            const filtered = this.posts.filter(p => p.status === status);
            const countBadge = document.getElementById(`kanban-count-${status}`);
            if (countBadge) countBadge.innerText = filtered.length;

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="p-6 text-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-xl my-2">
                        Belum ada konten
                    </div>
                `;
            } else {
                container.innerHTML = filtered.map(p => `
                    <div data-id="${p.id}" class="kanban-card bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-grab mb-3 group">
                        <div class="flex items-center justify-between mb-2">
                            <span class="px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${this.getPlatformBadgeClass(p.platform)}">
                                <i class="${this.getPlatformIcon(p.platform)}"></i>
                                <span class="capitalize">${p.platform}</span>
                            </span>
                            <span class="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium capitalize">
                                ${(p.format || '').replace('_', ' ')}
                            </span>
                        </div>
                        
                        <h4 class="font-bold text-slate-800 text-sm mb-1.5 group-hover:text-indigo-600 transition line-clamp-2">
                            ${this.escapeHtml(p.title)}
                        </h4>
                        
                        ${p.hook ? `
                            <p class="text-xs text-slate-500 italic mb-2 line-clamp-2 bg-slate-50 p-1.5 rounded border border-slate-100">
                                🎯 "${this.escapeHtml(p.hook)}"
                            </p>
                        ` : ''}

                        ${p.media_path ? `
                            <div class="mb-2 rounded-lg overflow-hidden h-28 bg-slate-100 border border-slate-200">
                                <img src="${p.media_path}" alt="Preview" class="w-full h-full object-cover">
                            </div>
                        ` : ''}

                        <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 mt-2">
                            <span class="flex items-center gap-1">
                                <i class="far fa-calendar-alt text-slate-400"></i>
                                ${this.formatDateShort(p.scheduled_at)}
                            </span>
                            <div class="flex items-center gap-1">
                                <button onclick="App.openPreviewModal(${p.id})" class="p-1 text-slate-400 hover:text-indigo-600 rounded" title="Preview Mockup">
                                    <i class="fas fa-eye text-xs"></i>
                                </button>
                                <button onclick="App.openEditModal(${p.id})" class="p-1 text-slate-400 hover:text-indigo-600 rounded" title="Edit Konten">
                                    <i class="fas fa-edit text-xs"></i>
                                </button>
                                <button onclick="App.deletePost(${p.id})" class="p-1 text-slate-400 hover:text-red-600 rounded" title="Hapus">
                                    <i class="fas fa-trash-alt text-xs"></i>
                                </button>
                            </div>
                        </div>

                        ${p.pic ? `
                            <div class="mt-2 text-[11px] text-indigo-600 bg-indigo-50 font-medium px-2 py-0.5 rounded-full inline-block">
                                👤 ${this.escapeHtml(p.pic)}
                            </div>
                        ` : ''}
                    </div>
                `).join('');
            }

            // Initialize SortableJS on this column
            if (!container._sortableInit) {
                new Sortable(container, {
                    group: 'kanban',
                    animation: 150,
                    ghostClass: 'sortable-ghost',
                    chosenClass: 'sortable-chosen',
                    onEnd: async (evt) => {
                        const postId = evt.item.dataset.id;
                        const newStatus = evt.to.id.replace('kanban-col-', '');
                        if (postId && newStatus) {
                            await App.updatePostStatus(postId, newStatus);
                        }
                    }
                });
                container._sortableInit = true;
            }
        });
    },

    async updatePostStatus(id, status) {
        if (this.storageMode === 'api') {
            try {
                const res = await fetch('api.php?action=update_status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, status })
                });
                const data = await res.json();
                if (data.success) {
                    this.showStatusToast(status);
                    await this.fetchPosts();
                    return;
                }
            } catch (err) {
                console.warn('API error updating status:', err);
            }
        }

        // LocalStorage update
        const post = this.posts.find(p => p.id == id);
        if (post) {
            post.status = status;
            localStorage.setItem('contentflow_posts', JSON.stringify(this.posts));
            this.showStatusToast(status);
        }
    },

    showStatusToast(status) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1800,
            timerProgressBar: true
        });
        Toast.fire({
            icon: 'success',
            title: `Status diubah ke: ${status.toUpperCase()}`
        });
    },

    // ------------------------------------------------------------------------
    // TABLE VIEW
    // ------------------------------------------------------------------------
    async renderTableView() {
        await this.fetchPosts();
        let list = [...this.posts];

        // Apply filters
        if (this.filter.platform !== 'all') {
            list = list.filter(p => p.platform === this.filter.platform);
        }
        if (this.filter.status !== 'all') {
            list = list.filter(p => p.status === this.filter.status);
        }
        if (this.filter.pillar !== 'all') {
            list = list.filter(p => p.pillar === this.filter.pillar);
        }
        if (this.filter.search) {
            const q = this.filter.search.toLowerCase();
            list = list.filter(p => 
                (p.title && p.title.toLowerCase().includes(q)) ||
                (p.caption && p.caption.toLowerCase().includes(q)) ||
                (p.pic && p.pic.toLowerCase().includes(q))
            );
        }

        const tbody = document.getElementById('tableBody');
        const countSpan = document.getElementById('tableCount');
        if (countSpan) countSpan.innerText = `${list.length} Konten`;

        if (list.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="py-8 text-center text-slate-400 text-sm">
                        Tidak ada konten yang sesuai dengan filter pencarian.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = list.map(p => `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100">
                <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${this.getPlatformBadgeClass(p.platform)}">
                        <i class="${this.getPlatformIcon(p.platform)}"></i>
                        <span class="capitalize">${p.platform}</span>
                    </span>
                </td>
                <td class="px-4 py-3">
                    <div class="font-bold text-slate-800 text-sm">${this.escapeHtml(p.title)}</div>
                    ${p.hook ? `<div class="text-xs text-slate-500 italic truncate max-w-xs mt-0.5">"${this.escapeHtml(p.hook)}"</div>` : ''}
                </td>
                <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize">
                        ${(p.format || '').replace('_', ' ')}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <span class="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 capitalize">
                        ${(p.pillar || '').replace('_', ' ')}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <div class="text-xs font-medium text-slate-700">${this.formatDateTime(p.scheduled_at)}</div>
                    ${p.pic ? `<div class="text-[11px] text-slate-400">PIC: ${this.escapeHtml(p.pic)}</div>` : ''}
                </td>
                <td class="px-4 py-3">
                    ${this.getStatusBadge(p.status)}
                </td>
                <td class="px-4 py-3 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="App.openPreviewModal(${p.id})" class="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white" title="Preview Mockup">
                            <i class="fas fa-eye text-xs"></i>
                        </button>
                        <button onclick="App.openEditModal(${p.id})" class="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white" title="Edit">
                            <i class="fas fa-edit text-xs"></i>
                        </button>
                        <button onclick="App.deletePost(${p.id})" class="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white" title="Hapus">
                            <i class="fas fa-trash-alt text-xs"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    applyFilters() {
        if (this.currentTab === 'table') {
            this.renderTableView();
        } else if (this.currentTab === 'kanban') {
            this.renderKanban();
        }
    },

    // ------------------------------------------------------------------------
    // IDEAS BANK
    // ------------------------------------------------------------------------
    async loadIdeas() {
        if (this.storageMode === 'api') {
            try {
                const res = await fetch('api.php?action=get_ideas');
                const data = await res.json();
                if (data.success) {
                    this.ideas = data.data;
                    this.renderIdeas();
                    return;
                }
            } catch (err) {
                console.warn('API error fetching ideas:', err);
            }
        }

        // LocalStorage mode
        try {
            const raw = localStorage.getItem('contentflow_ideas');
            this.ideas = raw ? JSON.parse(raw) : [];
        } catch (e) {
            this.ideas = [];
        }
        this.renderIdeas();
    },

    renderIdeas() {
        const grid = document.getElementById('ideasList');
        if (!grid) return;

        if (this.ideas.length === 0) {
            grid.innerHTML = `
                <div class="col-span-3 p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                    <i class="far fa-lightbulb text-4xl mb-3 text-amber-400"></i>
                    <h3 class="font-semibold text-slate-700">Bank Ide Masih Kosong</h3>
                    <p class="text-sm mt-1">Simpan ide konten spontan kamu di sini sebelum dijadwalkan.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.ideas.map(idea => `
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${this.getPlatformBadgeClass(idea.platform)}">
                            <i class="${this.getPlatformIcon(idea.platform)} mr-1"></i>
                            <span class="capitalize">${idea.platform}</span>
                        </span>
                        <span class="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium capitalize">
                            ${(idea.pillar || '').replace('_', ' ')}
                        </span>
                    </div>
                    <h4 class="font-bold text-slate-800 text-base mb-2">${this.escapeHtml(idea.title)}</h4>
                    ${idea.notes ? `<p class="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">${this.escapeHtml(idea.notes)}</p>` : ''}
                </div>
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                    <button onclick="App.convertIdeaToPost(${idea.id})" class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-lg transition hover:bg-indigo-100">
                        <i class="fas fa-arrow-right"></i>
                        <span>Jadikan Konten</span>
                    </button>
                    <button onclick="App.deleteIdea(${idea.id})" class="text-xs text-slate-400 hover:text-red-500 p-1.5 rounded" title="Hapus Ide">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    async saveNewIdea() {
        const title = document.getElementById('ideaTitle').value.trim();
        const platform = document.getElementById('ideaPlatform').value;
        const pillar = document.getElementById('ideaPillar').value;
        const notes = document.getElementById('ideaNotes').value.trim();

        if (!title) {
            Swal.fire('Perhatian', 'Judul ide wajib diisi', 'warning');
            return;
        }

        if (this.storageMode === 'api') {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('platform', platform);
            formData.append('pillar', pillar);
            formData.append('notes', notes);

            const res = await fetch('api.php?action=create_idea', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) {
                Swal.fire('Berhasil!', 'Ide baru telah ditambahkan ke bank ide', 'success');
                document.getElementById('ideaTitle').value = '';
                document.getElementById('ideaNotes').value = '';
                this.closeModal('ideaModal');
                this.loadIdeas();
                return;
            }
        }

        // LocalStorage save
        const newIdea = {
            id: Date.now(),
            title,
            platform,
            pillar,
            notes
        };
        this.ideas.unshift(newIdea);
        localStorage.setItem('contentflow_ideas', JSON.stringify(this.ideas));

        Swal.fire('Berhasil!', 'Ide baru telah ditambahkan ke bank ide', 'success');
        document.getElementById('ideaTitle').value = '';
        document.getElementById('ideaNotes').value = '';
        this.closeModal('ideaModal');
        this.renderIdeas();
    },

    async convertIdeaToPost(id) {
        if (this.storageMode === 'api') {
            const res = await fetch('api.php?action=convert_idea_to_post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${id}`
            });
            const data = await res.json();
            if (data.success) {
                this.showConvertedPrompt(data.data.postId);
                return;
            }
        }

        // LocalStorage convert
        const ideaIdx = this.ideas.findIndex(i => i.id == id);
        if (ideaIdx > -1) {
            const idea = this.ideas[ideaIdx];
            const newPost = {
                id: Date.now(),
                title: idea.title,
                platform: idea.platform,
                format: 'reels',
                pillar: idea.pillar,
                status: 'ide',
                scheduled_at: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
                notes: idea.notes || '',
                hook: '',
                caption: '',
                cta: '',
                hashtags: '',
                media_path: null,
                pic: '',
                likes: 0, comments: 0, shares: 0, reach: 0
            };

            this.posts.unshift(newPost);
            localStorage.setItem('contentflow_posts', JSON.stringify(this.posts));

            this.ideas.splice(ideaIdx, 1);
            localStorage.setItem('contentflow_ideas', JSON.stringify(this.ideas));

            this.showConvertedPrompt(newPost.id);
        }
    },

    showConvertedPrompt(newPostId) {
        Swal.fire({
            title: 'Ide Terkonversi!',
            text: 'Ide telah dipindahkan ke daftar Konten (Status: Ide). Mau langsung edit draf ini?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Ya, Buka Draf',
            cancelButtonText: 'Nanti Saja'
        }).then((result) => {
            if (result.isConfirmed) {
                this.switchTab('kanban');
                this.openEditModal(newPostId);
            } else {
                this.loadIdeas();
            }
        });
    },

    async deleteIdea(id) {
        const confirm = await Swal.fire({
            title: 'Hapus Ide Ini?',
            text: 'Ide yang dihapus tidak dapat dipulihkan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal'
        });
        if (confirm.isConfirmed) {
            if (this.storageMode === 'api') {
                await fetch('api.php?action=delete_idea', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `id=${id}`
                });
            } else {
                this.ideas = this.ideas.filter(i => i.id != id);
                localStorage.setItem('contentflow_ideas', JSON.stringify(this.ideas));
            }
            this.loadIdeas();
        }
    },

    // ------------------------------------------------------------------------
    // VIRAL HOOKS & COPYWRITING HELPER
    // ------------------------------------------------------------------------
    renderViralHooks() {
        const list = document.getElementById('hooksList');
        if (!list) return;

        list.innerHTML = this.hookTemplates.map(hook => `
            <div class="p-3.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition flex items-center justify-between gap-3 group">
                <div>
                    <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">${hook.category}</span>
                    <p class="text-sm font-semibold text-slate-800 mt-0.5">"${hook.text}"</p>
                </div>
                <button onclick="App.copyHookToClipboard('${this.escapeHtml(hook.text)}')" class="shrink-0 px-3 py-1.5 text-xs font-semibold bg-white group-hover:bg-indigo-600 group-hover:text-white text-slate-700 border border-slate-200 group-hover:border-indigo-600 rounded-lg transition shadow-xs">
                    Salin
                </button>
            </div>
        `).join('');
    },

    copyHookToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
            Toast.fire({ icon: 'success', title: 'Hook disalin ke clipboard!' });
        });
    },

    insertHashtags(niche) {
        const tags = this.hashtagPresets[niche];
        const hashtagsInput = document.getElementById('formHashtags');
        if (hashtagsInput && tags) {
            hashtagsInput.value = hashtagsInput.value ? (hashtagsInput.value + ' ' + tags) : tags;
            this.updateCaptionCounters();
        }
    },

    applyFormula(formula) {
        const captionArea = document.getElementById('formCaption');
        if (!captionArea) return;

        let template = '';
        if (formula === 'aida') {
            template = `[ATTENTION - Kalimat Pembuka Menarik]: \n\n[INTEREST - Fakta / Cerita yang relevan]: \n\n[DESIRE - Solusi / Manfaat utama yang didapat]: \n\n[ACTION - Call to Action]: \nKomentar di bawah jika kamu setuju!`;
        } else if (formula === 'pas') {
            template = `[PROBLEM - Masalah yang sering dihadapi]: \n\n[AGITATE - Kenapa masalah ini makin buruk jika dibiarkan]: \n\n[SOLUTION - Cara kami / tips mengatasi masalah ini]: \n\n[CTA]: Simpan postingan ini agar tidak lupa!`;
        } else if (formula === 'bab') {
            template = `[BEFORE - Kondisi sulit sebelum tahu trik ini]: \n\n[AFTER - Hasil luar biasa yang berhasil dicapai]: \n\n[BRIDGE - Jembatan langkah demi langkah menuju hasil tersebut]: `;
        }

        captionArea.value = template;
        this.updateCaptionCounters();
    },

    updateCaptionCounters() {
        const text = (document.getElementById('formCaption')?.value) || '';
        const tags = (document.getElementById('formHashtags')?.value) || '';
        
        const charCount = text.length;
        const hashCount = (tags.match(/#[^\s#]+/g) || []).length;

        const charEl = document.getElementById('charCountDisplay');
        const hashEl = document.getElementById('hashCountDisplay');

        if (charEl) charEl.innerText = `${charCount} karakter (Max IG: 2.200 | X: 280)`;
        if (hashEl) hashEl.innerText = `${hashCount} hashtags (Rekomendasi: 3-8)`;
    },

    // ------------------------------------------------------------------------
    // CREATE / EDIT POST MODAL
    // ------------------------------------------------------------------------
    openCreateModal(prefillDate = null) {
        document.getElementById('modalTitle').innerText = 'Buat Konten Baru';
        document.getElementById('postForm').reset();
        document.getElementById('postId').value = '';
        document.getElementById('mediaPreviewContainer').classList.add('hidden');
        document.getElementById('metricsSection').style.display = 'none';

        if (prefillDate) {
            document.getElementById('formScheduled').value = `${prefillDate}T10:00`;
        } else {
            const tmr = new Date();
            tmr.setDate(tmr.getDate() + 1);
            tmr.setHours(10, 0, 0, 0);
            document.getElementById('formScheduled').value = tmr.toISOString().slice(0, 16);
        }

        this.updateCaptionCounters();
        this.openModal('postModal');
    },

    async openEditModal(id) {
        let p = null;
        if (this.storageMode === 'api') {
            try {
                const res = await fetch(`api.php?action=get_post&id=${id}`);
                const data = await res.json();
                if (data.success && data.data) p = data.data;
            } catch (e) {
                console.warn(e);
            }
        }

        if (!p) {
            p = this.posts.find(item => item.id == id);
        }

        if (!p) {
            Swal.fire('Error', 'Data konten tidak ditemukan', 'error');
            return;
        }

        document.getElementById('modalTitle').innerText = 'Edit Konten';
        document.getElementById('postId').value = p.id;
        document.getElementById('formTitle').value = p.title || '';
        document.getElementById('formPlatform').value = p.platform || 'instagram';
        document.getElementById('formFormat').value = p.format || 'reels';
        document.getElementById('formPillar').value = p.pillar || 'edukasi';
        document.getElementById('formStatus').value = p.status || 'ide';
        
        // Format datetime-local
        if (p.scheduled_at) {
            let formatted = p.scheduled_at;
            if (formatted.includes(' ')) {
                formatted = formatted.replace(' ', 'T').slice(0, 16);
            } else if (formatted.length > 16) {
                formatted = formatted.slice(0, 16);
            }
            document.getElementById('formScheduled').value = formatted;
        }

        document.getElementById('formHook').value = p.hook || '';
        document.getElementById('formCaption').value = p.caption || '';
        document.getElementById('formCta').value = p.cta || '';
        document.getElementById('formHashtags').value = p.hashtags || '';
        document.getElementById('formPic').value = p.pic || '';
        document.getElementById('formNotes').value = p.notes || '';

        // Metrics
        document.getElementById('formLikes').value = p.likes || 0;
        document.getElementById('formComments').value = p.comments || 0;
        document.getElementById('formShares').value = p.shares || 0;
        document.getElementById('formReach').value = p.reach || 0;

        const metricSection = document.getElementById('metricsSection');
        if (metricSection) {
            metricSection.style.display = p.status === 'published' ? 'block' : 'none';
        }

        // Image Preview
        const imgPreview = document.getElementById('mediaPreviewContainer');
        const previewImg = document.getElementById('mediaPreviewImg');
        if (p.media_path) {
            previewImg.src = p.media_path;
            imgPreview.classList.remove('hidden');
        } else {
            imgPreview.classList.add('hidden');
        }

        this.updateCaptionCounters();
        this.openModal('postModal');
    },

    async handlePostSubmit(e) {
        e.preventDefault();
        const form = document.getElementById('postForm');
        const id = document.getElementById('postId').value;

        // If in API mode, submit via multipart form data
        if (this.storageMode === 'api') {
            const formData = new FormData(form);
            const action = id ? 'update_post' : 'create_post';
            try {
                const res = await fetch(`api.php?action=${action}`, { method: 'POST', body: formData });
                const data = await res.json();
                if (data.success) {
                    Swal.fire({ icon: 'success', title: 'Berhasil!', text: data.message, timer: 1500, showConfirmButton: false });
                    this.closeModal('postModal');
                    this.refreshCurrentView();
                    return;
                }
            } catch (err) {
                console.warn('API submit failed, fallback to local save:', err);
            }
        }

        // LocalStorage save handler (handles file via Base64 FileReader)
        const fileInput = document.getElementById('formMedia');
        const file = fileInput?.files?.[0];

        const saveToLocal = (base64Media = null) => {
            const existingPost = id ? this.posts.find(p => p.id == id) : null;
            let finalMedia = base64Media || (existingPost ? existingPost.media_path : null);

            // Check if remove media checked
            const removeMediaCheckbox = form.querySelector('input[name="remove_media"]');
            if (removeMediaCheckbox && removeMediaCheckbox.checked) {
                finalMedia = null;
            }

            const postObj = {
                id: id ? Number(id) : Date.now(),
                title: document.getElementById('formTitle').value.trim(),
                platform: document.getElementById('formPlatform').value,
                format: document.getElementById('formFormat').value,
                pillar: document.getElementById('formPillar').value,
                status: document.getElementById('formStatus').value,
                scheduled_at: document.getElementById('formScheduled').value,
                hook: document.getElementById('formHook').value.trim(),
                caption: document.getElementById('formCaption').value.trim(),
                cta: document.getElementById('formCta').value.trim(),
                hashtags: document.getElementById('formHashtags').value.trim(),
                pic: document.getElementById('formPic').value.trim(),
                notes: document.getElementById('formNotes').value.trim(),
                media_path: finalMedia,
                likes: Number(document.getElementById('formLikes').value || 0),
                comments: Number(document.getElementById('formComments').value || 0),
                shares: Number(document.getElementById('formShares').value || 0),
                reach: Number(document.getElementById('formReach').value || 0)
            };

            if (id) {
                const idx = this.posts.findIndex(p => p.id == id);
                if (idx > -1) this.posts[idx] = postObj;
            } else {
                this.posts.unshift(postObj);
            }

            localStorage.setItem('contentflow_posts', JSON.stringify(this.posts));

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: id ? 'Konten berhasil diperbarui!' : 'Konten baru berhasil disimpan!',
                timer: 1500,
                showConfirmButton: false
            });
            this.closeModal('postModal');
            this.refreshCurrentView();
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = (re) => saveToLocal(re.target.result);
            reader.readAsDataURL(file);
        } else {
            saveToLocal();
        }
    },

    async deletePost(id) {
        const confirm = await Swal.fire({
            title: 'Hapus Konten Ini?',
            text: 'Konten akan dihapus secara permanen dari sistem.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus Konten',
            cancelButtonText: 'Batal'
        });

        if (confirm.isConfirmed) {
            if (this.storageMode === 'api') {
                await fetch('api.php?action=delete_post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `id=${id}`
                });
            }
            this.posts = this.posts.filter(p => p.id != id);
            localStorage.setItem('contentflow_posts', JSON.stringify(this.posts));
            
            Swal.fire('Terhapus', 'Konten berhasil dihapus', 'success');
            this.refreshCurrentView();
        }
    },

    // ------------------------------------------------------------------------
    // PREVIEW MODAL (Social Media Mockup Simulator)
    // ------------------------------------------------------------------------
    async openPreviewModal(id) {
        const post = this.posts.find(p => p.id == id);
        if (!post) return;

        document.getElementById('prevPlatformBadge').className = `px-2.5 py-0.5 rounded-full text-xs font-semibold ${this.getPlatformBadgeClass(post.platform)}`;
        document.getElementById('prevPlatformBadge').innerHTML = `<i class="${this.getPlatformIcon(post.platform)} mr-1"></i> <span class="capitalize">${post.platform}</span>`;

        document.getElementById('prevTitle').innerText = post.title;
        document.getElementById('prevHook').innerText = post.hook ? `"${post.hook}"` : '-';
        document.getElementById('prevFormat').innerText = (post.format || '').replace('_', ' ').toUpperCase();
        document.getElementById('prevPillar').innerText = (post.pillar || '').replace('_', ' ').toUpperCase();
        document.getElementById('prevScheduled').innerText = this.formatDateTime(post.scheduled_at);
        document.getElementById('prevPic').innerText = post.pic || 'Tidak ditentukan';
        document.getElementById('prevNotes').innerText = post.notes || 'Tidak ada catatan visual/audio khusus.';

        const phoneContent = document.getElementById('phoneMockupBody');
        const captionWithBr = this.escapeHtml(post.caption || '').replace(/\n/g, '<br>');
        const hashtagsHtml = post.hashtags ? `<div class="text-indigo-400 mt-2 font-medium">${this.escapeHtml(post.hashtags)}</div>` : '';

        phoneContent.innerHTML = `
            <div class="h-full flex flex-col justify-between text-white p-4 text-xs font-sans relative" style="background: linear-gradient(180deg, #18181b 0%, #09090b 100%);">
                <!-- Top Bar -->
                <div class="flex items-center justify-between pt-6 pb-2 border-b border-zinc-800">
                    <span class="font-bold text-sm tracking-wide">@brand_kamu</span>
                    <i class="fas fa-ellipsis-h text-zinc-400"></i>
                </div>

                <!-- Media Area -->
                <div class="my-auto py-2 text-center">
                    ${post.media_path ? `
                        <img src="${post.media_path}" class="w-full max-h-56 object-cover rounded-xl border border-zinc-700 shadow-md">
                    ` : `
                        <div class="w-full h-44 rounded-xl bg-gradient-to-tr from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4 border border-zinc-700 text-center">
                            <i class="${this.getPlatformIcon(post.platform)} text-4xl mb-2 text-white/80"></i>
                            <div class="font-bold text-sm text-white line-clamp-2">${this.escapeHtml(post.title)}</div>
                            <span class="text-[10px] mt-1 text-zinc-300 capitalize">${(post.format || '').replace('_', ' ')} Mockup</span>
                        </div>
                    `}
                </div>

                <!-- Caption Area & Buttons -->
                <div class="space-y-2 pb-2">
                    <div class="flex items-center justify-between text-lg py-1 text-zinc-300">
                        <div class="flex items-center gap-4">
                            <i class="far fa-heart hover:text-red-500 cursor-pointer"></i>
                            <i class="far fa-comment hover:text-blue-400 cursor-pointer"></i>
                            <i class="far fa-paper-plane hover:text-emerald-400 cursor-pointer"></i>
                        </div>
                        <i class="far fa-bookmark hover:text-amber-400 cursor-pointer"></i>
                    </div>

                    ${post.hook ? `
                        <div class="bg-indigo-950/80 p-2 rounded-lg border border-indigo-800/60 text-indigo-200 font-semibold text-[11px]">
                            🎯 Hook: "${this.escapeHtml(post.hook)}"
                        </div>
                    ` : ''}

                    <div class="max-h-36 overflow-y-auto text-[11px] leading-relaxed text-zinc-300 pr-1">
                        <span class="font-bold text-white mr-1">brand_kamu</span>
                        ${captionWithBr}
                        ${hashtagsHtml}
                        ${post.cta ? `<div class="mt-2 text-amber-300 font-bold">👉 ${this.escapeHtml(post.cta)}</div>` : ''}
                    </div>
                </div>
            </div>
        `;

        this.openModal('previewModal');
    },

    // ------------------------------------------------------------------------
    // EXPORT & IMPORT UTILITIES (CSV & JSON BACKUP)
    // ------------------------------------------------------------------------
    exportCSV() {
        if (this.posts.length === 0) {
            Swal.fire('Info', 'Tidak ada data konten untuk diexport', 'info');
            return;
        }

        const headers = ['ID', 'Judul / Topik', 'Platform', 'Format', 'Pilar', 'Status', 'Jadwal Publikasi', 'Hook', 'Caption', 'CTA', 'Hashtags', 'PIC', 'Likes', 'Comments', 'Shares', 'Reach'];
        const rows = this.posts.map(p => [
            p.id,
            `"${(p.title || '').replace(/"/g, '""')}"`,
            p.platform,
            p.format,
            p.pillar,
            p.status,
            p.scheduled_at,
            `"${(p.hook || '').replace(/"/g, '""')}"`,
            `"${(p.caption || '').replace(/"/g, '""')}"`,
            `"${(p.cta || '').replace(/"/g, '""')}"`,
            `"${(p.hashtags || '').replace(/"/g, '""')}"`,
            `"${(p.pic || '').replace(/"/g, '""')}"`,
            p.likes || 0,
            p.comments || 0,
            p.shares || 0,
            p.reach || 0
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `content_planner_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    },

    exportJSON() {
        const backup = {
            app: 'ContentFlow',
            version: '2.0',
            exported_at: new Date().toISOString(),
            posts: this.posts,
            ideas: this.ideas
        };

        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `contentflow_backup_${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
    },

    triggerImportJSON() {
        document.getElementById('importJsonInput')?.click();
    },

    handleImportJSON(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (Array.isArray(data.posts)) {
                    this.posts = data.posts;
                    localStorage.setItem('contentflow_posts', JSON.stringify(this.posts));
                }
                if (Array.isArray(data.ideas)) {
                    this.ideas = data.ideas;
                    localStorage.setItem('contentflow_ideas', JSON.stringify(this.ideas));
                }

                Swal.fire('Sukses!', 'Cadangan data berhasil dipulihkan!', 'success');
                this.refreshCurrentView();
            } catch (err) {
                Swal.fire('Error', 'Format file JSON cadangan tidak valid', 'error');
            }
        };
        reader.readAsText(file);
    },

    resetSampleData() {
        Swal.fire({
            title: 'Pulihkan Data Contoh?',
            text: 'Data saat ini akan digantikan dengan data contoh bawaan.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Pulihkan',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                this.posts = [...this.defaultSeeds];
                this.ideas = [...this.defaultIdeas];
                localStorage.setItem('contentflow_posts', JSON.stringify(this.posts));
                localStorage.setItem('contentflow_ideas', JSON.stringify(this.ideas));
                Swal.fire('Berhasil', 'Data contoh telah dipulihkan!', 'success');
                this.refreshCurrentView();
            }
        });
    },

    // ------------------------------------------------------------------------
    // HELPERS & MODAL UTILS
    // ------------------------------------------------------------------------
    refreshCurrentView() {
        if (this.currentTab === 'dashboard') this.loadDashboardData();
        if (this.currentTab === 'calendar') this.renderCalendar();
        if (this.currentTab === 'kanban') this.renderKanban();
        if (this.currentTab === 'table') this.renderTableView();
    },

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    },

    getPlatformBadgeClass(platform) {
        return `badge-${platform || 'instagram'}`;
    },

    getPlatformIcon(platform) {
        switch (platform) {
            case 'instagram': return 'fab fa-instagram';
            case 'tiktok': return 'fab fa-tiktok';
            case 'youtube': return 'fab fa-youtube';
            case 'linkedin': return 'fab fa-linkedin-in';
            case 'twitter': return 'fab fa-x-twitter';
            case 'facebook': return 'fab fa-facebook-f';
            case 'threads': return 'fab fa-threads';
            case 'blogspot': return 'fab fa-blogger-b';
            default: return 'fas fa-share-alt';
        }
    },

    getStatusBadge(status) {
        switch (status) {
            case 'ide': return '<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">💡 Ide</span>';
            case 'scripting': return '<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">✍️ Scripting</span>';
            case 'produksi': return '<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">🎨 Produksi</span>';
            case 'review': return '<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">👀 Review</span>';
            case 'terjadwal': return '<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">⏰ Terjadwal</span>';
            case 'published': return '<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">✅ Published</span>';
            default: return `<span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">${status}</span>`;
        }
    },

    formatDateTime(dateStr) {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    formatDateShort(dateStr) {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short'
        });
    },

    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
