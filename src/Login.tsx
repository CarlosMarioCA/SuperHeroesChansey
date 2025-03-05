import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const endpoint =
        role === "hero" ? "/api/superheroes/login" : "/api/citizens/login";
      const response = await fetch(`http://localhost:5050${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = role === "hero" ? data.superhero : data.citizen;
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", user.username);
        navigate(role === "hero" ? "/hero" : "/citizen");
      } else {
        setError(data.mensaje || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error en el servidor");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1200px",
          marginBottom: "30px",
        }}
      >
        <button className="back-button" onClick={() => navigate("/")}>
          Volver
        </button>
        <button className="admin-button" onClick={() => navigate("/admin")}>
          Admin
        </button>
      </div>

      <div className="login-panel">
        <h1>Iniciar Sesión</h1>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <div className="role-selection">
            <div>
              <div className="role-option">
                <input
                  type="radio"
                  id="citizenCheck"
                  name="role"
                  value="citizen"
                  checked={role === "citizen"}
                  onChange={() => setRole("citizen")}
                />
                <label htmlFor="citizenCheck">Soy un ciudadano</label>
              </div>
              <div className="role-option">
                <input
                  type="radio"
                  id="heroCheck"
                  name="role"
                  value="hero"
                  checked={role === "hero"}
                  onChange={() => setRole("hero")}
                />
                <label htmlFor="heroCheck">Soy un superhéroe</label>
              </div>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="login-button">
              Entrar
            </button>
            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/register")}
              style={{ backgroundColor: "#171ab5" }}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
