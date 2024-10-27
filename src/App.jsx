import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Help from "./pages/Help";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Term from "./pages/Term"; // Keep this import
import CompressImage from "./components/DragAndDropForImage/DragAndDrop"; // Keep this import
import Home from "./pages/Home"; // Keep this import
import ResizeImage from "./components/DragAndDropForImage/Resize"; // Keep this import
import CropImage from "./components/DragAndDropForImage/Crop"; // Keep this import
import ConvertImage from "./components/DragAndDropForImage/ConvertImage";
import WaterMarkImage from "./components/DragAndDropForImage/WaterMark";
import RotateImage from "./components/DragAndDropForImage/Rotate";
import HtmlImage from "./components/DragAndDropForImage/HtmlToImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/About" element={<About />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Term" element={<Term />} /> {/* Keep this route */}
        <Route path="/CompressImage" element={<CompressImage />} /> {/* Keep this route */}
        <Route path="/Home" element={<Home />} /> {/* Keep this route */}
        <Route path="/ResizeImage" element={<ResizeImage />} /> {/* Keep this route */}
        <Route path="/CropImage" element={<CropImage />} /> {/* Keep this route */}
        <Route path="/ConvertImage" element={<ConvertImage />} /> {/* Keep this route */}
        <Route path="/WaterMarkImage" element={<WaterMarkImage />} /> {/* Keep this route */}
        <Route path="/RotateImage" element={<RotateImage />} /> {/* Keep this route */}
        <Route path="/HtmlImage" element={<HtmlImage />} /> {/* Keep this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
