import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "fomantic-ui-react";
import { useNavigate } from "react-router-dom";

const HeroView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [message, setMessage] = useState("");
  const [citizens, setCitizens] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    specialty: "",
    city: "",
    resolvedCases: 0,
    rating: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroId = localStorage.getItem("userId");
        const heroResponse = await fetch(
          `http://localhost:5050/api/superheroes/${heroId}`
        );
        const heroData = await heroResponse.json();
        setUserData(heroData);

        const citizensResponse = await fetch(
          "http://localhost:5050/api/citizens"
        );
        const citizensData = await citizensResponse.json();
        setCitizens(citizensData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = () => {
    if (selectedHero && message.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const formattedMessage = `${timestamp} ${message}`;
      setChatMessages((prev) => ({
        ...prev,
        [selectedHero]: [...(prev[selectedHero] || []), formattedMessage],
      }));
      setMessage("");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="custom-container">
      <header className="custom-header">
        <Button
          style={{ backgroundColor: "#eab902", color: "white" }}
          size="large"
          className="custom-button"
          onClick={() => navigate("/create-case")}
        >
          Crear Caso
        </Button>
        <h1>Bienvenido {userData.name}</h1>
        <Button
          style={{ backgroundColor: "#eab902", color: "white" }}
          size="large"
          className="custom-button"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </header>

      <div className="main-content">
        <div className="left-panel" style={{ padding: "30px" }}>
          <h2>Perfil del Superhéroe</h2>
          <div
            className="hero-profile"
            style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img
              src="/images/imagen1.jpg"
              alt="Hero Profile"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                marginBottom: "20px",
                border: "5px solid #eab902",
                objectFit: "cover",
              }}
            />
            <div className="hero-info" style={{ textAlign: "left" }}>
              <h3 style={{ color: "#eab902", marginBottom: "20px" }}>
                {userData.name}
              </h3>
              <p>
                <strong>Nombre de Usuario:</strong> {userData.username}
              </p>
              <p>
                <strong>Especialidad:</strong> {userData.specialty}
              </p>
              <p>
                <strong>Ciudad:</strong> {userData.city}
              </p>
              <p>
                <strong>Casos Resueltos:</strong> {userData.resolvedCases || 0}
              </p>
              <p>
                <strong>Valoración:</strong> {userData.rating || "N/A"} ⭐
              </p>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="chat-section">
            <select
              onChange={(e) => setSelectedHero(e.target.value)}
              value={selectedHero || ""}
            >
              <option value="">Selecciona un Ciudadano</option>
              {citizens.map((citizen: any) => (
                <option key={citizen._id} value={citizen._id}>
                  {citizen.name}
                </option>
              ))}
            </select>

            <div className="chat-box">
              <h4>
                Chat con{" "}
                {citizens.find((c: any) => c._id === selectedHero)?.name ||
                  "..."}
              </h4>
              <div className="messages">
                {selectedHero && chatMessages[selectedHero]?.length ? (
                  chatMessages[selectedHero].map((msg, index) => (
                    <p key={index} className="message">
                      {msg}
                    </p>
                  ))
                ) : (
                  <p className="info">No hay mensajes aún.</p>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flex: "85%",
                  padding: "10px",
                  borderRadius: "3px",
                  backgroundColor: "black",
                  color: "white",
                }}
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                style={{ flex: "15%", padding: "10px", borderRadius: "5px" }}
              >
                Enviar
              </button>
            </div>
          </div>

          <div className="cases-section">
            <select
              onChange={(e) => setSelectedCase(Number(e.target.value))}
              value={selectedCase || ""}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="">Selecciona un caso activo</option>
              {/* Add case options here */}
            </select>

            {selectedCase && (
              <div className="case-box" style={{ marginBottom: "10px" }}>
                <h4>Detalles del Caso</h4>
                {/* Add case details here */}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "#eab902",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Marcar como Resuelto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroView;
