import { useEffect, useRef, useState } from "react";
import Section from "./components/Section.jsx";
import Project from "./components/Project.jsx";
import { profile, about, projects, skills, certificates, journey, contact } from "./data/content.js";

const SLIDES = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "projects", label: "Proyek" },
  { id: "skills", label: "Skill" },
  { id: "certificates", label: "Sertifikat" },
  { id: "journey", label: "Jejak" },
  { id: "contact", label: "Kontak" },
];
const last = SLIDES.length - 1;
const clamp = (i) => Math.max(0, Math.min(last, i));
const startIndex = () => Math.max(0, SLIDES.findIndex((s) => s.id === window.location.hash.slice(1)));
const wib = () =>
  new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" }).replace(".", ":");

const icon = (n) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${n}/${n}-original.svg`;
const ICONS = {
  html: "html5", css: "css3", javascript: "javascript", "node.js": "nodejs",
  react: "react", vite: "vite", "ui/ux design": "figma", git: "git",
  github: "github", python: "python", php: "php", mysql: "mysql", typescript: "typescript",
};
const Chip = ({ name }) => {
  const key = ICONS[name.toLowerCase()];
  return (
    <li className="chip">
      {key && <img src={icon(key)} alt="" width="20" height="20" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />}
      {name}
    </li>
  );
};

const MENU = [
  ["🏠", "Kembali ke bagian paling atas"],
  ["🙋", "Siapa saya dan apa yang saya kerjakan"],
  ["🚀", "Game Verse, GV Platform, dan lainnya"],
  ["🧰", "Teknologi yang dipakai dan dipelajari"],
  ["🎓", "Sertifikat dan kursus yang sudah diselesaikan"],
  ["🧭", "Perjalanan belajar sejauh ini"],
  ["✉️", "Email, GitHub, Discord, Instagram"],
];

export default function App() {
  const [index, setIndex] = useState(startIndex);
  const [time, setTime] = useState(wib);
  const [open, setOpen] = useState(false);
  const [cert, setCert] = useState(null);
  const touch = useRef(null);
  const go = (i) => setIndex(clamp(i));
  const step = (d) => setIndex((i) => clamp(i + d));

  const links = contact.links.filter((l) => l.href);
  const cv = links.find((l) => l.label === "CV");
  const ext = (href) => (href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" });

  useEffect(() => {
    window.history.replaceState(null, "", `#${SLIDES[index].id}`);
    document.querySelector(".tab.on")?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [index]);

  useEffect(() => {
    const id = setInterval(() => setTime(wib()), 30000);
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Escape") { setOpen(false); setCert(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => { clearInterval(id); window.removeEventListener("keydown", onKey); };
  }, []);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  const content = [
    <div className="hero" key="home">
      <p className="status">Sidoarjo, sekarang pukul {time} WIB</p>
      <h1>{profile.headline}</h1>
      <p className="hero-intro">{profile.intro}</p>
      <div className="hero-actions">
        <button className="btn btn-solid" onClick={() => go(2)}>Lihat proyek</button>
        <button className="btn" onClick={() => go(1)}>Tentang saya</button>
        {cv && <a className="btn" href={cv.href} {...ext(cv.href)}>Unduh CV</a>}
      </div>
    </div>,

    <Section id="about" title="Tentang" key="about">
      <p className="pull">{about.tagline}</p>
      {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </Section>,

    <Section id="projects" title="Proyek pilihan" key="projects">
      {projects.map((p) => <Project key={p.title} {...p} />)}
    </Section>,

    <Section id="skills" title="Skill dan tools" key="skills">
      <div className="skills">
        <div>
          <h3>Sudah dipakai di proyek</h3>
          <ul className="chips">{skills.used.map((s) => <Chip key={s} name={s} />)}</ul>
        </div>
        <div>
          <h3>Sedang dipelajari</h3>
          <ul className="chips">{skills.learning.map((s) => <Chip key={s} name={s} />)}</ul>
        </div>
      </div>
    </Section>,

    <Section id="certificates" title="Sertifikat" key="certificates">
      <ul className="certs">
        {certificates.map((c) => (
          <li key={c.title}>
            <button className="cert" onClick={() => setCert(c)}>
              <span className="cert-thumb">
                <img src={c.image} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
                <span className="cert-eye" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
                </span>
              </span>
              <span className="cert-title">{c.title}</span>
              <span className="cert-meta">{c.issuer}, {c.year}</span>
            </button>
          </li>
        ))}
      </ul>
    </Section>,

    <Section id="journey" title="Jejak belajar" key="journey">
      <ol className="journey">
        {journey.map((j) => (
          <li key={j.title}>
            <h3>{j.title}</h3>
            <p>{j.text}</p>
          </li>
        ))}
      </ol>
    </Section>,

    <Section id="contact" title="Kontak" key="contact">
      <p className="pull big">{contact.headline}</p>
      <p>{contact.text}</p>
      <ul className="contact-list">
        {links.map((l) => (
          <li key={l.label}>
            <span>{l.label}</span>
            <a href={l.href} {...ext(l.href)}>{l.value}</a>
          </li>
        ))}
      </ul>
    </Section>,
  ];

  return (
    <div className={open ? "app menu-open" : "app"}>
      <aside className="profile">
        {profile.photo && (
          <img className="avatar" src={profile.photo} alt={`Foto ${profile.name}`} width="300" height="375" />
        )}
        <div className="profile-text">
          <p className="profile-name">{profile.name}</p>
          <p className="profile-role">{profile.role || "Mahasiswa Teknik Informatika"}</p>
        </div>
        <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Buka menu" aria-expanded={open}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="4" r="1.8" /><circle cx="10" cy="10" r="1.8" /><circle cx="10" cy="16" r="1.8" /></svg>
        </button>
        <ul className="profile-links">
          {links.map((l) => (
            <li key={l.label}><a href={l.href} {...ext(l.href)}>{l.label}</a></li>
          ))}
        </ul>
      </aside>

      <div className="stage">
        <nav className="tabs" aria-label="Navigasi utama">
          {SLIDES.map((s, i) => (
            <button key={s.id} className={i === index ? "tab on" : "tab"} onClick={() => go(i)} aria-current={i === index ? "page" : undefined}>
              {s.label}
            </button>
          ))}
        </nav>

        <main className="viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {content.map((c, i) => (
              <div className="slide" key={SLIDES[i].id} inert={i !== index ? "" : undefined} aria-hidden={i !== index}>
                <div className="slide-inner">{c}</div>
              </div>
            ))}
          </div>
        </main>

        <div className="controls">
          <button className="arrow" onClick={() => step(-1)} disabled={index === 0} aria-label="Halaman sebelumnya">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3 5 8l5 5" /></svg>
          </button>
          <button className="arrow" onClick={() => step(1)} disabled={index === last} aria-label="Halaman berikutnya">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 3 5 5-5 5" /></svg>
          </button>
        </div>
      </div>

      {cert && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={cert.title} onClick={() => setCert(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={cert.image} alt={`Sertifikat ${cert.title}`} />
            <figcaption><strong>{cert.title}</strong><span>{cert.issuer}, {cert.year}</span></figcaption>
            <button className="arrow lb-close" onClick={() => setCert(null)} aria-label="Tutup">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m2 2 10 10M12 2 2 12" /></svg>
            </button>
          </figure>
        </div>
      )}

      <div className="scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Menu" inert={open ? undefined : ""}>
        <div className="drawer-head">
          <h2>Menu</h2>
          <button className="arrow" onClick={() => setOpen(false)} aria-label="Tutup menu">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m2 2 10 10M12 2 2 12" /></svg>
          </button>
        </div>
        {SLIDES.map((s, i) => (
          <button key={s.id} className={i === index ? "menu-item on" : "menu-item"} onClick={() => { go(i); setOpen(false); }}>
            <span className="menu-text"><strong>{s.label}</strong><span className="sub">{MENU[i][1]}</span></span>
            <svg className="menu-chev" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
          </button>
        ))}
        <p className="menu-label">Tautan</p>
        <div className="menu-links">
          {links.map((l) => <a key={l.label} href={l.href} {...ext(l.href)}>{l.label}</a>)}
        </div>
      </aside>
    </div>
  );
}