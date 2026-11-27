/**
 * DATA RESMI & PLACEHOLDER — STT SILA DHARMA
 * Seke Truna Truni Banjar Bukit Sakti, Desa Lokapaksa, Kecamatan Seririt, Kabupaten Buleleng, Bali.
 * Referensi kanal resmi: https://www.instagram.com/sttsiladharma/
 */

window.STT_DATA = {
  org: {
    name: "STT Sila Dharma",
    fullName: "Seke Truna Truni Sila Dharma",
    banjar: "Banjar Bukit Sakti",
    desa: "Desa Lokapaksa",
    kecamatan: "Kecamatan Seririt",
    kabupaten: "Kabupaten Buleleng, Bali",
    postalCode: "81153",
    locationShort: "Br. Bukit Sakti, Desa Lokapaksa · Seririt",
    locationFull: "Banjar Bukit Sakti, Desa Lokapaksa, Kecamatan Seririt, Kabupaten Buleleng, Bali 81153",
    tagline: "SATU SEMANGAT, SATU KEBERSAMAAN.",
    footerMotto: "BERSAMA MEMBANGUN KEBERSAMAAN DAN MENJAGA TRADISI.",
    instagramHandle: "@sttsiladharma",
    instagramUrl: "https://www.instagram.com/sttsiladharma/",
    whatsappDisplay: "[+62 8XX-XXXX-XXXX]",
    email: "[kontak@sttsiladharma.org]",
    // === TUJUAN FORMULIR KONTAK — ISI DI SINI ===
    // Nomor WhatsApp pengurus: format internasional, hanya angka (tanpa +, spasi, atau strip). Contoh: "6281234567890"
    whatsappNumber: "",
    // Email pengurus penerima pesan. Contoh: "sttsiladharma@gmail.com"
    emailTo: "",
    ketuaNama: "[NAMA KETUA STT SILA DHARMA]",
    ketuaPeriode: "Periode [202X – 202X]",
    sambutanSingkat:
      "Om Swastyastu. Selamat datang di portal resmi Seke Truna Truni (STT) Sila Dharma Banjar Bukit Sakti, Desa Lokapaksa, Kecamatan Seririt. Website ini hadir sebagai media informasi kegiatan, dokumentasi, transparansi kepengurusan, serta ruang kebersamaan pemuda-pemudi dalam menjaga adat dan tradisi.",
    // Koordinat terverifikasi Desa Lokapaksa, Seririt, Buleleng (Wikidata Q13094728)
    mapCenter: [-8.199878, 114.921292],
    mapZoom: 15
  },

  heroSlides: [
    {
      title: "Selamat Datang\nWebsite Resmi STT Sila Dharma",
      subtitle: "Seke Truna Truni Banjar Bukit Sakti, Desa Lokapaksa, Kecamatan Seririt — Satu Semangat, Satu Kebersamaan.",
      image: "assets/images/hero/hero-slide-1.svg",
      ctaLabel: "Kenali Kami",
      ctaRoute: "tentang"
    },
    {
      title: "Menjaga Adat,\nTradisi & Kebersamaan Banjar",
      subtitle: "Pusat informasi kegiatan ngayah, gotong royong, upacara adat, dan kreativitas pemuda Banjar Bukit Sakti.",
      image: "assets/images/hero/hero-slide-2.svg",
      ctaLabel: "Lihat Kegiatan",
      ctaRoute: "kegiatan"
    },
    {
      title: "Dokumentasi Resmi\n@sttsiladharma",
      subtitle: "Arsip foto dan video kegiatan Seke Truna Truni Sila Dharma Desa Lokapaksa, Seririt, Buleleng.",
      image: "assets/images/hero/hero-slide-3.svg",
      ctaLabel: "Buka Galeri",
      ctaRoute: "galeri"
    }
  ],

  // Titik lokasi di wilayah Desa Lokapaksa / Br. Bukit Sakti (koordinat referensi Desa Lokapaksa, sesuaikan pin tepat Balai Banjar)
  mapPoints: [
    {
      id: "poi-balai",
      name: "Balai Banjar Bukit Sakti (Sekretariat STT)",
      category: "Balai Banjar",
      shortCode: "BB",
      coords: [-8.199878, 114.921292],
      desc: "Pusat sangkep rutin, sekretariat STT Sila Dharma, dan titik kumpul kegiatan pemuda Banjar Bukit Sakti, Desa Lokapaksa. (Sesuaikan pin koordinat persis jika diperlukan)."
    },
    {
      id: "poi-pura",
      name: "Area Pura / Kegiatan Adat Br. Bukit Sakti",
      category: "Pura & Adat",
      shortCode: "PA",
      coords: [-8.1979, 114.9228],
      desc: "Lokasi pelaksanaan ngayah, upacara adat, dan persembahyangan bersama anggota STT Sila Dharma."
    },
    {
      id: "poi-lapangan",
      name: "Area Olahraga & Aktivitas Pemuda",
      category: "Fasilitas Pemuda",
      shortCode: "OL",
      coords: [-8.2018, 114.9196],
      desc: "Titik kegiatan olahraga, latihan seni, dan aktivitas kepemudaan Desa Lokapaksa."
    },
    {
      id: "poi-kantor-desa",
      name: "Wilayah Desa Lokapaksa, Seririt",
      category: "Wilayah Desa",
      shortCode: "DL",
      coords: [-8.1986, 114.9189],
      desc: "Desa Lokapaksa terdiri dari 9 Banjar Dinas di Kecamatan Seririt, Kabupaten Buleleng, termasuk Banjar Bukit Sakti."
    }
  ],

  // Ringkasan Keanggotaan (adaptasi "Administrasi Penduduk" → Data Keanggotaan STT)
  membershipStats: [
    { icon: "users", value: "[XX]", label: "Total Anggota", note: "Data placeholder" },
    { icon: "user", value: "[XX]", label: "Truna (Pemuda)", note: "Anggota putra" },
    { icon: "user-round", value: "[XX]", label: "Truni (Pemudi)", note: "Anggota putri" },
    { icon: "layers", value: "6", label: "Bidang Kerja", note: "Struktur aktif" }
  ],

  // SOTK — Struktur Organisasi & Tata Kerja STT Sila Dharma
  sotk: [
    { id: "p-1", nama: "[NAMA KETUA]", jabatan: "Ketua STT Sila Dharma", group: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/ketua-placeholder.svg" },
    { id: "p-2", nama: "[NAMA WAKIL KETUA]", jabatan: "Wakil Ketua", group: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "p-3", nama: "[NAMA SEKRETARIS I]", jabatan: "Sekretaris I", group: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "p-4", nama: "[NAMA SEKRETARIS II]", jabatan: "Sekretaris II", group: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "p-5", nama: "[NAMA BENDAHARA I]", jabatan: "Bendahara I", group: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "p-6", nama: "[NAMA BENDAHARA II]", jabatan: "Bendahara II", group: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" }
  ],

  bidang: [
    { id: "b-1", nama: "Bidang Adat, Agama & Budaya", koordinator: "[Nama Koordinator]", deskripsi: "Mengkoordinasikan ngayah, upacara adat, dan pelestarian tradisi di Banjar Bukit Sakti.", periode: "202X – 202X" },
    { id: "b-2", nama: "Bidang Sosial & Gotong Royong", koordinator: "[Nama Koordinator]", deskripsi: "Menggerakkan kerja bakti banjar, kebersihan lingkungan, dan aksi sosial kemasyarakatan.", periode: "202X – 202X" },
    { id: "b-3", nama: "Bidang Olahraga & Kepemudaan", koordinator: "[Nama Koordinator]", deskripsi: "Menyelenggarakan olahraga rutin, turnamen persahabatan, dan pengembangan minat bakat.", periode: "202X – 202X" },
    { id: "b-4", nama: "Bidang Humas, Media & Dokumentasi", koordinator: "[Nama Koordinator]", deskripsi: "Mengelola dokumentasi foto/video, publikasi informasi, dan Instagram @sttsiladharma.", periode: "202X – 202X" },
    { id: "b-5", nama: "Bidang Usaha & Penggalian Dana", koordinator: "[Nama Koordinator]", deskripsi: "Merancang kegiatan usaha mandiri dan pengelolaan dana kegiatan secara transparan.", periode: "202X – 202X" },
    { id: "b-6", nama: "Bidang Perlengkapan & Keamanan", koordinator: "[Nama Koordinator]", deskripsi: "Menyiapkan sarana acara banjar dan mendukung kelancaran pelaksanaan kegiatan.", periode: "202X – 202X" }
  ],

  events: [
    {
      id: "gotong-royong-bukit-sakti",
      title: "[Gotong Royong Kebersihan Banjar Bukit Sakti]",
      status: "upcoming",
      statusLabel: "Mendatang",
      category: "Gotong Royong",
      date: "[DD Bulan 2026]",
      time: "[07.00 WITA – Selesai]",
      location: "Banjar Bukit Sakti, Desa Lokapaksa, Seririt",
      image: "assets/images/events/event-02.svg",
      summary: "Kerja bakti bersama anggota Seke Truna Truni Sila Dharma untuk menjaga kebersihan balai banjar, jalan desa, dan area pura.",
      description: [
        "Placeholder deskripsi kegiatan resmi STT Sila Dharma Banjar Bukit Sakti. Silakan ganti dengan jadwal, perlengkapan, dan informasi teknis resmi.",
        "Kegiatan gotong royong memperkuat kebersamaan pemuda-pemudi sekaligus menjaga kenyamanan lingkungan Desa Lokapaksa."
      ],
      agenda: [
        "[07.00 WITA] — Berkumpul di Balai Banjar Bukit Sakti",
        "[07.30 WITA] — Pembersihan lingkungan dan penataan fasilitas bersama",
        "[10.30 WITA] — Istirahat dan kebersamaan anggota"
      ],
      gallery: ["assets/images/events/event-02.svg", "assets/images/gallery/galeri-02.svg"]
    },
    {
      id: "sangkep-rutin-stt",
      title: "[Sangkep Rutin Bulanan STT Sila Dharma]",
      status: "ongoing",
      statusLabel: "Sedang Berlangsung",
      category: "Kegiatan Organisasi",
      date: "[DD Bulan 2026]",
      time: "[19.00 WITA – Selesai]",
      location: "Balai Banjar Bukit Sakti, Desa Lokapaksa",
      image: "assets/images/events/event-03.svg",
      summary: "Forum musyawarah rutin pengurus dan anggota membahas program kerja, evaluasi kegiatan, serta persiapan agenda adat.",
      description: [
        "Sangkep rutin menjadi ruang musyawarah mufakat bagi seluruh Truna dan Truni Banjar Bukit Sakti.",
        "Ganti informasi tanggal dan pokok bahasan sesuai agenda sangkep terbaru."
      ],
      agenda: [
        "[19.00 WITA] — Pembukaan dan presensi anggota",
        "[19.20 WITA] — Laporan pengurus inti dan bidang",
        "[20.00 WITA] — Diskusi program kerja dan penutup"
      ],
      gallery: ["assets/images/events/event-03.svg", "assets/images/gallery/galeri-03.svg"]
    },
    {
      id: "ngayah-upacara-adat",
      title: "[Ngayah & Pelaksanaan Upacara Adat Desa]",
      status: "upcoming",
      statusLabel: "Mendatang",
      category: "Upacara dan Tradisi",
      date: "[DD Bulan 2026]",
      time: "[Sesuai Jadwal Adat]",
      location: "Pura / Wilayah Banjar Bukit Sakti, Lokapaksa",
      image: "assets/images/events/event-01.svg",
      summary: "Partisipasi aktif anggota STT Sila Dharma dalam persiapan sarana upacara dan pelestarian tradisi adat Bali.",
      description: [
        "Placeholder jadwal ngayah dan kegiatan upacara adat di Banjar Bukit Sakti, Desa Lokapaksa.",
        "Keterlibatan Seke Truna Truni menjadi pilar utama pelestarian warisan adat dan budaya di tingkat banjar."
      ],
      agenda: [
        "Persiapan sarana upacara bersama",
        "Persembahyangan bersama anggota STT",
        "Penataan kembali area pura dan balai banjar"
      ],
      gallery: ["assets/images/events/event-01.svg", "assets/images/gallery/galeri-01.svg"]
    },
    {
      id: "hut-stt-sila-dharma",
      title: "[Peringatan HUT STT Sila Dharma Banjar Bukit Sakti]",
      status: "past",
      statusLabel: "Riwayat",
      category: "Perayaan Hari Besar",
      date: "[DD Bulan 2025]",
      time: "[17.00 – 22.00 WITA]",
      location: "Balai Banjar Bukit Sakti, Desa Lokapaksa",
      image: "assets/images/events/event-04.svg",
      summary: "Perayaan hari jadi organisasi sebagai momentum evaluasi, rasa syukur, dan kebersamaan seluruh generasi muda.",
      description: [
        "Placeholder arsip peringatan HUT STT Sila Dharma. Ganti dengan edisi HUT, tema resmi, dan foto dokumentasi asli dari @sttsiladharma."
      ],
      agenda: [
        "Seremonial pembukaan dan sambutan",
        "Pemotongan tumpeng kebersamaan",
        "Hiburan dan dokumentasi bersama"
      ],
      gallery: ["assets/images/events/event-04.svg", "assets/images/gallery/galeri-04.svg"]
    },
    {
      id: "olahraga-pemuda-lokapaksa",
      title: "[Pertandingan Olahraga Pemuda Banjar]",
      status: "past",
      statusLabel: "Riwayat",
      category: "Olahraga",
      date: "[DD Bulan 2025]",
      time: "[15.30 – 18.00 WITA]",
      location: "Desa Lokapaksa, Kecamatan Seririt",
      image: "assets/images/events/event-05.svg",
      summary: "Kegiatan olahraga bersama untuk menjaga kebugaran, sportivitas, dan solidaritas antaranggota STT.",
      description: [
        "Placeholder dokumentasi olahraga STT Sila Dharma. Sesuaikan cabang olahraga dan foto asli kegiatan."
      ],
      agenda: ["Pemanasan bersama", "Pertandingan persahabatan", "Foto bersama"],
      gallery: ["assets/images/events/event-05.svg", "assets/images/gallery/galeri-05.svg"]
    },
    {
      id: "bakti-sosial-stt",
      title: "[Aksi Bakti Sosial & Kepedulian Warga]",
      status: "past",
      statusLabel: "Riwayat",
      category: "Sosial",
      date: "[DD Bulan 2024]",
      time: "[08.00 – 12.00 WITA]",
      location: "Banjar Bukit Sakti, Desa Lokapaksa",
      image: "assets/images/events/event-06.svg",
      summary: "Wujud kepedulian sosial anggota STT Sila Dharma kepada masyarakat sekitar di Desa Lokapaksa.",
      description: [
        "Placeholder kegiatan bakti sosial STT Sila Dharma Banjar Bukit Sakti."
      ],
      agenda: ["Persiapan paket bantuan", "Penyaluran bersama pengurus", "Dokumentasi"],
      gallery: ["assets/images/events/event-06.svg", "assets/images/gallery/galeri-06.svg"]
    }
  ],

  gallery: [
    { id: "g-1", title: "Kebersamaan Anggota STT Sila Dharma", category: "Kegiatan Organisasi", year: "2026", type: "photo", src: "/assets/images/gallery/foto-01.webp", caption: "Anggota STT Sila Dharma berfoto bersama di depan tembok pura Banjar Bukit Sakti." },
    { id: "g-2", title: "Ogoh-ogoh di Tengah Pawai", category: "Upacara dan Tradisi", year: "2026", type: "photo", src: "/assets/images/gallery/foto-02.webp", caption: "Ogoh-ogoh diarak melewati jalan desa di antara warga dan anggota STT." },
    { id: "g-3", title: "Mengarak Ogoh-ogoh Bersama", category: "Upacara dan Tradisi", year: "2026", type: "photo", src: "/assets/images/gallery/foto-03.webp", caption: "Anggota STT memikul ogoh-ogoh dengan bale-bale bambu." },
    { id: "g-4", title: "Semangat di Pawai Ogoh-ogoh", category: "Upacara dan Tradisi", year: "2026", type: "photo", src: "/assets/images/gallery/foto-04.webp", caption: "Anggota STT Sila Dharma berfoto bersama ogoh-ogoh di tepi jalan." },
    { id: "g-5", title: "Kebersamaan di Depan Ogoh-ogoh", category: "Upacara dan Tradisi", year: "2026", type: "photo", src: "/assets/images/gallery/foto-05.webp", caption: "Seluruh anggota dan warga berkumpul bersama ogoh-ogoh di pertigaan banjar." },
    { id: "g-6", title: "Berkumpul Bersama Ogoh-ogoh", category: "Upacara dan Tradisi", year: "2026", type: "photo", src: "/assets/images/gallery/foto-06.webp", caption: "Anggota STT berfoto bersama setelah ogoh-ogoh diarak." },
    { id: "g-7", title: "Foto Bersama Seusai Pawai", category: "Upacara dan Tradisi", year: "2026", type: "photo", src: "/assets/images/gallery/foto-07.webp", caption: "Anggota STT merayakan kebersamaan di bawah ogoh-ogoh." }
  ],

  news: [
    {
      id: "berita-1",
      title: "[Pengumuman Jadwal Sangkep Rutin STT Sila Dharma Br. Bukit Sakti]",
      date: "[DD Bulan 2026]",
      category: "Pengumuman",
      image: "assets/images/events/event-03.svg",
      summary: "Pemberitahuan resmi jadwal sangkep bulanan di Balai Banjar Bukit Sakti, Desa Lokapaksa untuk seluruh anggota Truna dan Truni.",
      content: [
        "Artikel ini merupakan placeholder pengumuman resmi STT Sila Dharma Banjar Bukit Sakti, Desa Lokapaksa, Kecamatan Seririt.",
        "Ganti isi artikel ini dengan jadwal sangkep, agenda pembahasan, dan informasi resmi dari pengurus.",
        "Pembaruan rutin juga tersedia melalui akun Instagram resmi @sttsiladharma."
      ]
    },
    {
      id: "berita-2",
      title: "[Dokumentasi Gotong Royong Kebersihan Lingkungan Banjar Bukit Sakti]",
      date: "[DD Bulan 2026]",
      category: "Kegiatan",
      image: "assets/images/events/event-02.svg",
      summary: "Ringkasan pelaksanaan aksi gotong royong anggota Seke Truna Truni Sila Dharma menjaga kebersihan wilayah banjar.",
      content: [
        "Placeholder liputan kegiatan gotong royong STT Sila Dharma di Banjar Bukit Sakti, Desa Lokapaksa.",
        "Kegiatan ini melibatkan anggota aktif secara kolaboratif untuk menjaga lingkungan tetap bersih dan nyaman."
      ]
    },
    {
      id: "berita-3",
      title: "[Peran Seke Truna Truni dalam Melestarikan Tradisi di Desa Lokapaksa]",
      date: "[DD Bulan 2025]",
      category: "Budaya & Tradisi",
      image: "assets/images/events/event-01.svg",
      summary: "Catatan kebersamaan generasi muda Banjar Bukit Sakti dalam meneruskan nilai adat, ngayah, dan solidaritas sosial.",
      content: [
        "Placeholder tulisan budaya dan refleksi kepemudaan STT Sila Dharma.",
        "Seke Truna Truni berperan penting menjaga adat istiadat Bali agar terus lestari di tengah perkembangan zaman."
      ]
    },
    {
      id: "berita-4",
      title: "[Rekap Kegiatan & Dokumentasi Tahunan @sttsiladharma]",
      date: "[DD Bulan 2025]",
      category: "Dokumentasi",
      image: "assets/images/events/event-04.svg",
      summary: "Kilas balik berbagai agenda kebersamaan, sosial, dan budaya yang dilaksanakan oleh STT Sila Dharma.",
      content: [
        "Placeholder rekap dokumentasi tahunan STT Sila Dharma Banjar Bukit Sakti, Seririt, Buleleng."
      ]
    }
  ],

  members: [
    { id: "m-01", nama: "[Nama Anggota 01]", jabatan: "Ketua STT", status: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/ketua-placeholder.svg" },
    { id: "m-02", nama: "[Nama Anggota 02]", jabatan: "Wakil Ketua", status: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-03", nama: "[Nama Anggota 03]", jabatan: "Sekretaris I", status: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-04", nama: "[Nama Anggota 04]", jabatan: "Bendahara I", status: "Pengurus Inti", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-05", nama: "[Nama Anggota 05]", jabatan: "Koordinator Adat & Budaya", status: "Koordinator Bidang", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-06", nama: "[Nama Anggota 06]", jabatan: "Koordinator Sosial & Gotong Royong", status: "Koordinator Bidang", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-07", nama: "[Nama Anggota 07]", jabatan: "Koordinator Olahraga", status: "Koordinator Bidang", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-08", nama: "[Nama Anggota 08]", jabatan: "Koordinator Humas & Dokumentasi", status: "Koordinator Bidang", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-09", nama: "[Nama Anggota 09]", jabatan: "Anggota Truna", status: "Anggota Aktif", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-10", nama: "[Nama Anggota 10]", jabatan: "Anggota Truni", status: "Anggota Aktif", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-11", nama: "[Nama Anggota 11]", jabatan: "Anggota Truna", status: "Anggota Aktif", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" },
    { id: "m-12", nama: "[Nama Anggota 12]", jabatan: "Anggota Truni Baru", status: "Anggota Baru", periode: "202X – 202X", photo: "assets/images/members/member-placeholder.svg" }
  ]
};
