import { useEffect, useRef, useState } from "react";
import Section from "./components/Section.jsx";
import Project from "./components/Project.jsx";
import { profile, about, projects, skills, journey, contact } from "./data/content.js";

const SLIDES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
const last = SLIDES.length - 1;
const clamp = (i) => Math.max(0, Math.min(last, i));
const startIndex = () => Math.max(0, SLIDES.findIndex((s) => s.id === window.location.hash.slice(1)));

export default function App() {
  const [index, setIndex] = useState(startIndex);
  const touch = useRef(null);
  const go = (i) => setIndex(clamp(i));
  const step = (d) => setIndex((i) => clamp(i + d));

  const links = contact.links.filter((l) => l.href);
  const ext = (href) => (href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" });

  useEffect(() => {
    window.history.replaceState(null, "", `#${SLIDES[index].id}`);
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
      <p className="status"><span className="dot" aria-hidden="true" />{profile.status}</p>
      <h1>{profile.headline}</h1>
      <p className="hero-intro">{profile.intro}</p>
      <div className="hero-actions">
        <button className="btn btn-solid" onClick={() => go(2)}>Lihat Proyek</button>
        <button className="btn" onClick={() => go(1)}>Tentang Gue</button>
      </div>
    </div>,

    <Section id="about" title="About" key="about">
      <p className="pull">{about.tagline}</p>
      {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </Section>,

    <Section id="projects" title="Selected projects" key="projects">
      {projects.map((p) => <Project key={p.title} {...p} />)}
    </Section>,

    <Section id="skills" title="Skills & tools" key="skills">
      <div className="skills">
        <div>
          <h3>Sudah dipakai di proyek</h3>
          <p>{skills.used.join(", ")}</p>
        </div>
        <div>
          <h3>Sedang dipelajari</h3>
          <p>{skills.learning.join(", ")}</p>
        </div>
      </div>
      <p className="muted">Still learning. Still shipping.</p>
    </Section>,

    <Section id="journey" title="My journey" key="journey">
      <ol className="journey">
        {journey.map((j) => (
          <li key={j.title}>
            <h3>{j.title}</h3>
            <p>{j.text}</p>
          </li>
        ))}
      </ol>
      <p className="muted">A work in progress, just like the person behind it.</p>
    </Section>,

    <Section id="contact" title="Contact" key="contact">
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
      <p className="muted">Less talking, more building.</p>
    </Section>,
  ];

  return (
    <div className="app">
      <aside className="profile">
        {profile.photo && (
          <img className="avatar" src={profile.photo} alt={`Foto ${profile.name}`} width="300" height="375" />
        )}
        <div className="profile-text">
          <p className="profile-name">{profile.name}</p>
          <p className="profile-role">{profile.role || "Mahasiswa Teknik Informatika"}</p>
        </div>
        <ul className="profile-links">
          {links.map((l) => (
            <li key={l.label}><a href={l.href} {...ext(l.href)}>{l.label}</a></li>
          ))}
        </ul>
        {profile.github && (
          <a className="profile-handle" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">
            github.com/{profile.github}
          </a>
        )}
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
          <div className="pages" role="group" aria-label="Pilih slide">
            {SLIDES.map((s, i) => (
              <button key={s.id} className={i === index ? "page on" : "page"} onClick={() => go(i)} aria-label={`Slide ${i + 1}: ${s.label}`} aria-current={i === index ? "true" : undefined}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="arrows">
            <button className="arrow" onClick={() => step(-1)} disabled={index === 0} aria-label="Slide sebelumnya">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3 5 8l5 5" /></svg>
            </button>
            <button className="arrow" onClick={() => step(1)} disabled={index === last} aria-label="Slide berikutnya">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 3 5 5-5 5" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}