import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "fomantic-ui-react";
import "./App.css";

const AdminView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="custom-container">
      <header className="custom-header">
        <h1>Panel de Administración</h1>
        <Button
          style={{ backgroundColor: "#eab902", color: "white" }}
          size="large"
          className="custom-button"
          onClick={() => navigate("/login")}
        >
          Cerrar Sesión
        </Button>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          gap: "30px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "10px",
          margin: "0 auto",
          maxWidth: "800px",
        }}
      >
        <img
          src="/images/construction.jpg"
          alt="En construcción"
          style={{
            width: "400px",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        <h2
          style={{
            color: "#eab902",
            fontSize: "2.5rem",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Página en Construcción
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: "1.6",
          }}
        >
          Estamos trabajando para traerte las mejores herramientas de
          administración. ¡Vuelve pronto para descubrir nuevas funcionalidades!
        </p>
      </div>
    </div>
  );
};

export default AdminView;
