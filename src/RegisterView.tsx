import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const RegisterView: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    role: "citizen",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint =
      formData.role === "hero" ? "/api/superheroes" : "/api/citizens";

    const requestBody =
      formData.role === "hero"
        ? {
            ...formData,
            powers: [
              { name: "Por definir", description: "Pendiente", level: 1 },
            ],
            specialties: ["General"],
            contactInfo: {
              email: formData.email,
              phone: "",
            },
            activeStatus: "Disponible",
            score: 0,
          }
        : formData;

    try {
      const response = await fetch(`http://localhost:5050${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.citizen?.id || data.superhero?.id);
        localStorage.setItem("userRole", formData.role);
        localStorage.setItem("username", formData.username);
        navigate(formData.role === "hero" ? "/hero" : "/citizen");
      } else {
        setError(data.mensaje || "Error en el registro");
      }
    } catch (error) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="register-fullscreen">
      <button
        className="back-button-top-left"
        onClick={() => navigate("/login")}
      >
        Volver
      </button>

      <div className="register-content">
        <div className="register-panel">
          <h1>Registro de Usuario</h1>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Nombre Completo:</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="register-input"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="username">Nombre de Usuario:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="register-input"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="register-input"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="register-input"
                required
              />
            </div>

            <div className="role-selection">
              <div className="role-option">
                <input
                  type="radio"
                  id="citizenCheck"
                  name="role"
                  value="citizen"
                  checked={formData.role === "citizen"}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
                <label htmlFor="citizenCheck">Registrarme como ciudadano</label>
              </div>
              <div className="role-option">
                <input
                  type="radio"
                  id="heroCheck"
                  name="role"
                  value="hero"
                  checked={formData.role === "hero"}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
                <label htmlFor="heroCheck">Registrarme como superhéroe</label>
              </div>
            </div>

            <button type="submit" className="register-button">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
