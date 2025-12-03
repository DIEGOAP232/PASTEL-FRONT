import "./Nosotros.css";

function Nosotros() {
  return (
    <div className="nosotros-page">

      {/* HERO */}
      <section className="nosotros-hero">
        <img src="/src/assets/nosotros/local.jpg" alt="Pastelería" />
        <div className="hero-overlay">
          <h1>Una Dulce Historia</h1>
          <p>Creamos momentos inolvidables con cada postre.</p>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="nosotros-section">
        <div className="nosotros-img">
          <img src="/src/assets/nosotros/equipo.png" alt="Historia" />
        </div>

        <div className="nosotros-text">
          <h2>Nuestra Historia</h2>
          <p>
            Nuestra pastelería nació en 2022 como un pequeño emprendimiento familiar,
            uniendo pasión, recetas tradicionales y el deseo de crear experiencias
            memorables. Con dedicación y amor hemos crecido hasta convertirnos en
            un referente de postres artesanales, manteniendo siempre nuestra esencia:
            <strong> hacer que cada dulce cuente una historia.</strong>
          </p>
        </div>
      </section>

      {/* MISIÓN */}
      <section className="nosotros-section reverse">
        <div className="nosotros-img">
          <img src="/src/assets/nosotros/mision.jpg" alt="Misión" />
        </div>

        <div className="nosotros-text">
          <h2>Nuestra Misión</h2>
          <p>
            Elaborar postres de calidad excepcional, utilizando ingredientes frescos,
            procesos artesanales y un toque único de creatividad, llevando dulzura a
            cada celebración y a cada momento especial de nuestros clientes.
          </p>
        </div>
      </section>

      {/* VISIÓN */}
      <section className="nosotros-section">
        <div className="nosotros-img">
          <img src="/src/assets/nosotros/postres.png" alt="Visión" />
        </div>

        <div className="nosotros-text">
          <h2>Nuestra Visión</h2>
          <p>
            Ser la pastelería líder en innovación y calidad, expandiendo nuestros
            sabores y diseños para convertirnos en un símbolo de excelencia
            en el mundo de la repostería artesanal.
          </p>
        </div>
      </section>

      {/* VALORES */}
      <section className="nosotros-valores">
        <h2>Valores que nos Inspiran</h2>
        <div className="valores-grid">
          <div className="valor-card">✨ Calidad</div>
          <div className="valor-card">❤️ Pasión</div>
          <div className="valor-card">🎨 Creatividad</div>
          <div className="valor-card">🥇 Excelencia</div>
          <div className="valor-card">🤝 Compromiso</div>
        </div>
      </section>

      {/* COBERTURA */}
      <section className="nosotros-cobertura">
        <h2>¿Dónde Atendemos?</h2>
        <p>
          Atendemos en toda Lima Metropolitana con servicio de entrega a domicilio.
          También contamos con un local físico donde podrás disfrutar de nuestros
          postres recién elaborados.
        </p>
      </section>

      {/* SLOGAN FINAL */}
      <section className="nosotros-slogan">
        <h2>“Momentos dulces que duran para siempre.”</h2>
      </section>

    </div>
  );
}

export default Nosotros;
