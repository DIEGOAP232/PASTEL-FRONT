import "./Login.css";
import { useState, useContext } from "react";
import { loginUsuario } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { saveSession } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUsuario(email, contrasena);

      saveSession(data.token, data.usuario);

      navigate("/"); 
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <section className="login-container">
      <h2>Iniciar Sesión</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="admin@esencia.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}

export default Login;
