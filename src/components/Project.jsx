export default function Project({ title, kind, description, tech, demo, source }) {
  return (
    <article className="project">
      <div className="project-head">
        <h3>{title}</h3>
        <span className="project-kind">{kind}</span>
      </div>
      <p>{description}</p>
      {tech.length > 0 && <p className="project-tech">{tech.join(", ")}</p>}
      {(demo || source) && (
        <div className="project-links">
          {demo && <a href={demo} target="_blank" rel="noreferrer">Lihat demo</a>}
          {source && <a href={source} target="_blank" rel="noreferrer">Source code</a>}
        </div>
      )}
    </article>
  );
}
