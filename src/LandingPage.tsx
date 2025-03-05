import React from "react";
import { Container, Header, Button } from "fomantic-ui-react";
import "fomantic-ui-css/semantic.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-fullscreen">
      <div className="landing-container">
        <h1 className="landing-header">Avengers Colombia</h1>
        <h2>Conectando Héroes con Necesidades Reales</h2>
        <p className="custom-paragraph">
          En un país lleno de desafíos, pero también de solidaridad, nace una
          plataforma donde la empatía y la colaboración hacen la diferencia.
          Aquí, los ciudadanos pueden publicar sus necesidades y los héroes,
          personas con habilidades y voluntad de ayudar, pueden responder y
          brindar apoyo de manera desinteresada.
        </p>
        <p className="custom-paragraph">
          Nuestro sistema permite que quienes enfrentan dificultades describan
          su situación en avisos visibles para héroes registrados, quienes
          podrán aceptar y gestionar estas solicitudes. Más que una plataforma,
          somos un puente entre quienes necesitan ayuda y quienes están
          dispuestos a ofrecerla.
        </p>
        <p className="custom-paragraph">
          <strong>
            Porque en Colombia, siempre hay alguien dispuesto a tender una mano.
          </strong>
        </p>
        <Button
          color="yellow"
          size="large"
          className="custom-button"
          onClick={() => navigate("/login")}
        >
          Entrar a la batalla
        </Button>
      </div>
      <div className="image-container">
        <img
          src="public/images/login-image.jpeg"
          alt="Superheroes"
          className="landing-image"
        />
      </div>
    </div>
  );
};

export default LandingPage;
