// Semua teks & link ada di sini. Edit file ini saja, tidak perlu menyentuh komponen.
// Link/array yang dikosongkan ("" atau []) otomatis disembunyikan di halaman.

export const profile = {
  name: "Nama Kamu", // TODO: ganti dengan namamu
  photo: "", // TODO: taruh fotomu di folder public/, lalu isi misalnya "/foto.jpg". Kosong = foto disembunyikan
  status: "Terbuka untuk belajar, kolaborasi, dan proyek baru",
  headline: "Building things, one project at a time.",
  intro:
    "I'm a student, developer in progress, and someone who enjoys turning ideas into something real.",
};

export const about = {
  tagline: "Not an expert. Just someone who keeps building.",
  paragraphs: [
    "Gue mahasiswa Teknik Informatika semester 5. Gue tertarik sama web development, UI/UX, dan teknologi secara umum, terutama bagian di mana ide berubah jadi sesuatu yang bisa dipakai orang.",
    "Di luar kuliah, gue mengelola komunitas Discord bernama Game Verse dan membangun platform digital untuk komunitas itu. Dari situ gue belajar bahwa bikin sesuatu buat orang lain jauh lebih menantang (dan seru) daripada bikin buat diri sendiri.",
    "Gue belum merasa jadi expert, dan itu oke. Gue lebih suka terus mencoba, salah, lalu memperbaikinya.",
  ],
};

// tech: isi hanya teknologi yang benar-benar kamu pakai di proyek itu.
// demo / source: isi link kalau ada, kosongkan kalau belum.
export const projects = [
  {
    title: "Game Verse",
    kind: "Komunitas Discord",
    description:
      "Komunitas gaming di Discord dengan sistem role, rank, event, dan bot otomatis untuk menjaga server tetap hidup.",
    tech: ["Discord"], // TODO: tambahkan bot framework / bahasa yang kamu pakai
    demo: "",
    source: "",
  },
  {
    title: "GV Platform",
    kind: "Platform komunitas",
    description:
      "Platform untuk anggota Game Verse: login, memberi rating, dan menyampaikan masukan langsung ke pengelola.",
    tech: [], // TODO: isi stack yang kamu pakai
    demo: "",
    source: "",
  },
  {
    title: "Personal Web Projects",
    kind: "Eksperimen",
    description:
      "Tempat untuk proyek website lainnya: latihan, eksperimen, dan hal-hal kecil yang gue bangun sambil belajar.",
    tech: [],
    demo: "",
    source: "",
  },
];

export const skills = {
  used: ["HTML", "CSS", "JavaScript", "React", "Vite"], // TODO: sesuaikan dengan yang benar-benar kamu pakai
  learning: ["UI/UX design", "Web development"], // TODO: sesuaikan
};

// Tidak ada tanggal atau pengalaman kerja. Isi dengan prosesmu sendiri.
export const journey = [
  {
    title: "Mulai dari rasa penasaran",
    text: "Masuk Teknik Informatika dan mulai mencoba hal-hal dasar web. Banyak yang belum paham, tapi justru itu yang bikin lanjut.",
  },
  {
    title: "Membangun Game Verse",
    text: "Mengelola komunitas dan sadar bahwa banyak hal bisa dibantu otomatis: role, rank, event, bot.",
  },
  {
    title: "Bikin GV Platform",
    text: "Mencoba membuat platform sendiri untuk komunitas. Banyak salah, banyak revisi, dan banyak yang dipelajari.",
  },
  {
    title: "Sekarang",
    text: "Masih belajar, masih ship. Fokus merapikan desain, kode, dan cara berpikir.",
  },
];

export const contact = {
  headline: "Got an idea? Let's make it happen.",
  text: "Punya ide, mau kolaborasi, atau sekadar ngobrol soal web? Kirim pesan aja.",
  // TODO: ganti dengan link aslimu. Kosongkan href untuk menyembunyikan.
  links: [
    { label: "Email", value: "email@kamu.com", href: "mailto:email@kamu.com" },
    { label: "GitHub", value: "github.com/username", href: "https://github.com/username" },
    { label: "Discord", value: "username", href: "https://discord.com/users/ID_KAMU" },
    { label: "Instagram", value: "@username", href: "https://instagram.com/username" },
  ],
};
