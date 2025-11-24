import "./BlogSection.css";

function BlogSection() {

  const posts = [
    {
      id: 1,
      titulo: "Secretos para un bizcocho esponjoso",
      descripcion: "Aprende técnicas profesionales para lograr texturas suaves.",
      imagen: "/img/blog1.jpg",
      link: "/blog/1"
    },
    {
      id: 2,
      titulo: "¿Cómo elegir el pastel ideal?",
      descripcion: "Guía rápida para escoger el postre perfecto para cada ocasión.",
      imagen: "/img/blog2.jpg",
      link: "/blog/2"
    },
    {
      id: 3,
      titulo: "Decoraciones fáciles y elegantes",
      descripcion: "Detalles que transforman un pastel en una obra de arte.",
      imagen: "/img/blog3.jpg",
      link: "/blog/3"
    }
  ];

  return (
    <section className="blog-section">
      <h2 className="blog-title">De nuestro blog</h2>

      <div className="blog-grid">
        {posts.map((p) => (
          <div className="blog-card" key={p.id}>
            <img src={p.imagen} alt={p.titulo} className="blog-img" />

            <h3 className="blog-card-title">{p.titulo}</h3>
            <p className="blog-card-desc">{p.descripcion}</p>

            <a className="blog-btn" href={p.link}>
              Leer más →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
