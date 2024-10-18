import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

function App() {
  return (

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Help" element={<Help/>} />
      <Route path="/About" element={<About/>} />
      <Route path="/Privacy" element={<Privacy/>} />
      </Routes>
      </BrowserRouter>

  );
}

export default App;