import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "fomantic-ui-css/semantic.min.css";
import "./App.css";

import LandingPage from "./LandingPage";
import CitizenView from "./CitizenView";
import HeroView from "./HeroView";
import Login from "./Login";
import RegisterView from "./RegisterView";
import CaseCreateView from "./CaseCreateView";
import AdminView from "./AdminView";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
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
