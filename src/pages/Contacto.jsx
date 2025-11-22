import "./Contacto.css";

function Contacto() {
  return (
    <section className="contacto-container">
      <h2>Contáctanos</h2>

      <form className="contacto-form">
        <label>Nombre</label>
        <input type="text" placeholder="Tu nombre" />

        <label>Correo</label>
        <input type="email" placeholder="ejemplo@gmail.com" />

        <label>Mensaje</label>
        <textarea rows="5" placeholder="Escribe tu mensaje aquí"></textarea>

        <button type="submit">Enviar Mensaje</button>
      </form>
    </section>
  );
}

export default Contacto;
