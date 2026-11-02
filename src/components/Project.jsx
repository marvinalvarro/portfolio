const hide = (e) => {
  e.currentTarget.parentElement.classList.remove("has-img");
  e.currentTarget.remove();
};

export default function Project({ title, kind, description, tech = [], demo, source, image }) {
  const ext = { target: "_blank", rel: "noreferrer" };
  return (
    <article className={image ? "project has-img" : "project"}>
      <div className="project-body">
        <div className="project-head">
          <h3>{title}</h3>
          <span className="project-kind">{kind}</span>
        </div>
        <p>{description}</p>
        {tech.length > 0 && <p className="project-tech">{tech.join(", ")}</p>}
        {(demo || source) && (
          <div className="project-links">
            {demo && <a href={demo} {...ext}>Lihat demo</a>}
            {source && <a href={source} {...ext}>Kode</a>}
          </div>
        )}
      </div>
      {image && <img className="project-img" src={image} alt={`Tampilan ${title}`} loading="lazy" onError={hide} />}
    </article>
  );
}