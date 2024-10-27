import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Home from "./pages/Home";
import MergePDF from "./pages/uploads/MergePDF";
import PDFtoImage from "./pages/uploads/PDFtoImage";
import WordtoPDF from "./pages/uploads/WordtoPDF";
import HtmltoPDF from "./pages/uploads/HtmltoPDF";
import ImageToPDF from "./pages/uploads/ImagetoPDF";
import ProtectPDF from "./pages/uploads/ProtectPDF";
import SplitPDF from "./pages/uploads/SplitPDF";
import CompressPDF from "./pages/uploads/CompressPDF";
import AddWatermark from "./pages/uploads/AddWatermark";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/About" element={<About />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/MergePDF" element={<MergePDF />} />
        <Route path="/PDFtoImage" element={<PDFtoImage />} />
        <Route path="/WordtoPDF" element={<WordtoPDF />} />
        <Route path="/HtmltoPDF" element={<HtmltoPDF />} />
        <Route path="/ImagetoPDF" element={<ImageToPDF />} />
        <Route path="/ProtectPDF" element={<ProtectPDF />} />
        <Route path="/SplitPDF" element={<SplitPDF />} />
        <Route path="/CompressPDF" element={<CompressPDF />} />
        <Route path="/AddWatermark" element={<AddWatermark />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
