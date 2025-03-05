import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const CaseCreateView: React.FC = () => {
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hero: "",
    location: {
      address: "",
      city: "",
    },
    priority: "medium",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/superheroes");
        const data = await response.json();
        setHeroes(data);
      } catch (error) {
        setError("Error cargando superhéroes");
      }
    };
    fetchHeroes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5050/api/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          citizen: localStorage.getItem("userId"),
          status: "open",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/citizen");
      } else {
        setError(data.mensaje || "Error al crear el caso");
      }
    } catch (error) {
      setError("Error en el servidor");
    }
  };

  return (
    <div className="register-fullscreen">
      <button
        className="back-button-top-left"
        onClick={() => navigate("/citizen")}
      >
        Volver
      </button>

      <div className="register-content">
        <div className="register-panel">
          <h1>Crear Nuevo Caso</h1>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="title">Título del Caso:</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="register-input"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="register-input"
                style={{ height: "100px" }}
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="hero">Superhéroe:</label>
              <select
                id="hero"
                value={formData.hero}
                onChange={(e) =>
                  setFormData({ ...formData, hero: e.target.value })
                }
                className="register-input"
                required
              >
                <option value="">Selecciona un Superhéroe</option>
                {heroes.map((hero: any) => (
                  <option key={hero._id} value={hero._id}>
                    {hero.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="address">Dirección:</label>
              <input
                id="address"
                type="text"
                value={formData.location.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, address: e.target.value },
                  })
                }
                className="register-input"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="city">Ciudad:</label>
              <input
                id="city"
                type="text"
                value={formData.location.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value },
                  })
                }
                className="register-input"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="priority">Prioridad:</label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="register-input"
                required
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>

            <button type="submit" className="register-button">
              Crear Caso
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaseCreateView;
