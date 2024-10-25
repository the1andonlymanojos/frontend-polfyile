import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Term from "./pages/Term";
import Drag from "./pages/DragAndDrop";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Help" element={<Help/>} />
      <Route path="/About" element={<About/>} />
      <Route path="/Privacy" element={<Privacy/>} />
      <Route path="/Term" element={<Term/>} />
      <Route path="/Drag" element={<Drag/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
