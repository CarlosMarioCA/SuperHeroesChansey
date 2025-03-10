import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "fomantic-ui-react";
import { useNavigate } from "react-router-dom";

const CitizenView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({ name: "", username: "" });
  const [heroes, setHeroes] = useState([]);
  const [heroCases, setHeroCases] = useState([]);
  const [activeCases, setActiveCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log("Current userId:", userId);

        // Fetch user data
        const userResponse = await fetch(
          `http://localhost:5050/api/citizens/${userId}`
        );
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch heroes
        const heroesResponse = await fetch(
          "http://localhost:5050/api/superheroes"
        );
        const heroesData = await heroesResponse.json();
        setHeroes(heroesData);

        // Fetch cases with populated data
        const casesResponse = await fetch(`http://localhost:5050/api/cases`);
        const casesData = await casesResponse.json();
        console.log("All cases:", casesData);

        // Filter cases using the correct citizen ID comparison
        const userCases = casesData.filter(
          (c: any) => c.citizen._id === userId || c.citizen === userId
        );
        console.log("Filtered user cases:", userCases);
        setActiveCases(userCases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedHero) {
      const fetchHeroCases = async () => {
        try {
          const response = await fetch(
            `http://localhost:5050/api/superheroes/${selectedHero}/cases`
          );
          const data = await response.json();
          setHeroCases(data);
        } catch (error) {
          console.error("Error fetching hero cases:", error);
        }
      };
      fetchHeroCases();
    }
  }, [selectedHero]);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getSelectedCaseDetails = () => {
    const selectedCaseData = activeCases.find(
      (c: any) => c._id === selectedCase
    );
    if (!selectedCaseData) return null;

    return {
      title: selectedCaseData.title,
      description: selectedCaseData.description,
      priority: selectedCaseData.priority,
      heroName: selectedCaseData.hero?.name || "No asignado",
      status: selectedCaseData.status,
    };
  };

  return (
    <div className="custom-container">
      <header className="custom-header">
        <Button
          color="yellow"
          size="large"
          className="custom-button"
          onClick={() => navigate("/create-case")}
        >
          Crear Caso
        </Button>
        <h1>Bienvenido {userData.name}</h1>
        <Button
          color="yellow"
          size="large"
          className="custom-button"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </header>

      <div className="main-content">
        <div className="left-panel" style={{ padding: "30px" }}>
          <h2>Héroes Activos</h2>
          <div className="galeria">
            <img src="/images/imagen1.jpg" alt="Imagen 1" />
            <img src="/images/imagen2.jpg" alt="Imagen 2" />
            <img src="/images/imagen3.jpg" alt="Imagen 3" />
            <img src="/images/imagen4.jpg" alt="Imagen 4" />
            <img src="/images/imagen5.jpg" alt="Imagen 5" />
            <img src="/images/imagen6.jpg" alt="Imagen 6" />
          </div>
        </div>

        <div className="right-panel">
          <div className="chat-section">
            <select
              onChange={(e) => {
                setSelectedHero(e.target.value);
                setSelectedCase(null);
              }}
              value={selectedHero || ""}
            >
              <option value="">Selecciona un Héroe</option>
              {heroes.map((hero: any) => (
                <option key={hero._id} value={hero._id}>
                  {hero.name}
                </option>
              ))}
            </select>

            <div className="chat-box">
              <h4>
                Chat con{" "}
                {heroes.find((h: any) => h._id === selectedHero)?.name || "..."}
              </h4>
              <div className="messages">
                {selectedHero && chatMessages[selectedHero]?.length ? (
                  chatMessages[selectedHero].map((msg, index) => (
                    <p key={index} className="message">
                      {msg}
                    </p>
                  ))
                ) : (
                  <p className="info">Todavía no hay mensajes.</p>
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
                onKeyPress={handleKeyPress}
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
              onChange={(e) => setSelectedCase(e.target.value)}
              value={selectedCase || ""}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="">Selecciona un caso activo</option>
              {activeCases.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>

            {selectedCase && (
              <div className="case-box" style={{ marginBottom: "10px" }}>
                {(() => {
                  const caseDetails = getSelectedCaseDetails();
                  return caseDetails ? (
                    <>
                      <h4>{caseDetails.title}</h4>
                      <p>
                        <strong>Descripción:</strong> {caseDetails.description}
                      </p>
                      <p>
                        <strong>Prioridad:</strong> {caseDetails.priority}
                      </p>
                      <p>
                        <strong>Héroe Asignado:</strong> {caseDetails.heroName}
                      </p>
                      <p>
                        <strong>Estado:</strong> {caseDetails.status}
                      </p>
                    </>
                  ) : null;
                })()}
              </div>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ padding: "15px", width: "30%", color: "red" }}>
                Denunciar Superheroe
              </button>
              <button style={{ padding: "10px", width: "70%", color: "green" }}>
                Caso Resuelto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenView;
