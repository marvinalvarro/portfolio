import Section from "./components/Section.jsx";
import Project from "./components/Project.jsx";
import { profile, about, projects, skills, journey, contact } from "./data/content.js";

export default function App() {
  const links = contact.links.filter((l) => l.href);
  const ext = (href) => (href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" });

  return (
    <div className="shell">
      <aside className="profile">
        {profile.photo && (
          <img className="avatar" src={profile.photo} alt={`Foto ${profile.name}`} width="300" height="375" />
        )}
        <p className="profile-name">{profile.name}</p>
        <p className="profile-role">{profile.role || "Mahasiswa Teknik Informatika"}</p>
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

      <div className="content">
        <header className="nav">
          <nav aria-label="Navigasi utama">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main id="top">
          <section className="hero">
            <p className="status"><span className="dot" aria-hidden="true" />{profile.status}</p>
            <h1>{profile.headline}</h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#projects">Lihat Proyek</a>
              <a className="btn" href="#about">Tentang Gue</a>
            </div>
          </section>

          <Section id="about" title="About">
            <p className="pull">{about.tagline}</p>
            {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </Section>

          <Section id="projects" title="Selected projects">
            {projects.map((p) => <Project key={p.title} {...p} />)}
          </Section>

          <Section id="skills" title="Skills & tools">
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
          </Section>

          <Section id="journey" title="My journey">
            <ol className="journey">
              {journey.map((j) => (
                <li key={j.title}>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </li>
              ))}
            </ol>
            <p className="muted">A work in progress, just like the person behind it.</p>
          </Section>

          <Section id="contact" title="Contact">
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
          </Section>
        </main>

        <footer className="footer">
          <span>Less talking, more building.</span>
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </footer>
      </div>
    </div>
  );
}