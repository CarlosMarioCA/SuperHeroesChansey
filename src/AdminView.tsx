import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Asegúrate de importar los estilos necesarios

const AdminView: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar lógica adicional si es necesario, como limpiar el estado de autenticación
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración. Aquí puedes gestionar los usuarios y otras configuraciones.</p>

      {/* Botón para volver al login */}
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>

      {/* Aquí puedes agregar más contenido del panel de administración */}
    </div>
  );
};

export default AdminView;