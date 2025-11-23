import "./RecommendedSection.css";
import { useState } from "react";

function RecommendedSection() {
  const tabs = ["Tortas y postres", "Rollos DC", "Cheesecakes", "Pastelería Salada"];
  const [activeTab, setActiveTab] = useState(0);

  // Aquí luego reemplazaremos por productos reales desde la API
  const productosMock = [
    {
      id: 1,
      nombre: "Torta de zanahoria",
      imagen: "/img/mock1.jpg",
      precio: "S/ 68.00 - S/ 120.00",
    },
    {
      id: 2,
      nombre: "Torta de pecanas",
      imagen: "/img/mock2.jpg",
      precio: "S/ 68.00 - S/ 120.00",
    },
    {
      id: 3,
      nombre: "Tiramisú DC",
      imagen: "/img/mock3.jpg",
      precio: "S/ 70.00 - S/ 130.00",
    },
    {
      id: 4,
      nombre: "Tres leches DC",
      imagen: "/img/mock4.jpg",
      precio: "S/ 40.00 - S/ 72.00",
    },
  ];

  return (
    <section className="recommended-container">
      <h2 className="recommended-title">Recomendados para ti</h2>

      {/* TABS */}
      <div className="recommended-tabs">
        {tabs.map((t, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="recommended-grid">
        {productosMock.map((prod) => (
          <div key={prod.id} className="recommended-card">
            <img src={prod.imagen} alt={prod.nombre} className="recommended-img" />

            <h3 className="prod-name">{prod.nombre}</h3>
            <p className="prod-price">{prod.precio}</p>

            <button className="prod-btn">Seleccionar Opciones</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedSection;
