import React from "react";
import { Container, Button } from "fomantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "fomantic-ui-css/semantic.min.css";
import "./App.css";
import LandingPage from "./LandingPage";
import CitizenView from "./CitizenView";
import HeroView from "./HeroView";
import Login from "./Login";
import RegisterView from "./RegisterView";
import CaseCreateView from "./CaseCreateView";

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="custom-container">
      <h2>Selecciona tu rol</h2>
      <Button color="blue" onClick={() => navigate("/hero")}>
        Superhéroe
      </Button>
      <Button color="green" onClick={() => navigate("/citizen")}>
        Ciudadano
      </Button>
      <Button color="red" onClick={() => navigate("/admin")}>
        Administrador
      </Button>
    </Container>
  );
};

const AdminView: React.FC = () => (
  <Container className="custom-container">
    <h2>Vista de Administrador</h2>
    <p>Aquí puedes gestionar usuarios y misiones.</p>
  </Container>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/roles" element={<RoleSelection />} />{" "}
        <Route path="/hero" element={<HeroView />} />
        <Route path="/citizen" element={<CitizenView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/create-case" element={<CaseCreateView />} />
      </Routes>
    </Router>
  );
};

export default App;
