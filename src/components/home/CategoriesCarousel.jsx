import "./CategoriesCarousel.css";

function CategoriesCarousel() {
  const categorias = [
    {
      id: 1,
      nombre: "Pies, Pasteles y Tartas",
      imagen: "/img/cat1.jpg",
    },
    {
      id: 2,
      nombre: "Tortas y Postres",
      imagen: "/img/cat2.jpg",
    },
    {
      id: 3,
      nombre: "Rollos DC",
      imagen: "/img/cat3.jpg",
    },
    {
      id: 4,
      nombre: "Tortas de Chocolate",
      imagen: "/img/cat4.jpg",
    },
  ];

  return (
    <section className="categories-section">
      <h2 className="categories-title">¿Qué estás buscando hoy?</h2>

      <div className="carousel-container">
        <button className="carousel-btn left">{"<"}</button>

        <div className="carousel-track">
          {categorias.map((cat) => (
            <div className="category-card" key={cat.id}>
              <img src={cat.imagen} alt={cat.nombre} />
              <p>{cat.nombre}</p>
            </div>
          ))}
        </div>

        <button className="carousel-btn right">{">"}</button>
      </div>
    </section>
  );
}

export default CategoriesCarousel;
