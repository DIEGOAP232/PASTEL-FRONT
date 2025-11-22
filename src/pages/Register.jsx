import "./Register.css";

function Register() {
  return (
    <section className="register-container">
      <h2>Crear Cuenta</h2>

      <form className="register-form">
        <label>Nombre completo</label>
        <input type="text" placeholder="Tu nombre" />

        <label>Correo electrónico</label>
        <input type="email" placeholder="ejemplo@gmail.com" />

        <label>Contraseña</label>
        <input type="password" placeholder="********" />

        <button type="submit">Registrarse</button>
      </form>
    </section>
  );
}

export default Register;
