import React, { useState } from "react";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/Header";

function AddWatermark() {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [opacity, setOpacity] = useState(50); // Default opacity level
  const [position, setPosition] = useState("center");
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("watermarkText", watermarkText);
    formData.append("opacity", opacity);
    formData.append("position", position);

    try {
      const response = await fetch("YOUR_BACKEND_AddWatermark_URL", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setConvertedFileUrl(data.AddWatermarkUrl); // Assuming the response returns a URL for the watermarked file
        alert("Watermark added successfully!");
      } else {
        alert("Failed to add watermark");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("There was an error processing your request.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header />
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold mt-20 mb-6 text-gray-800">
          Add Watermark
        </h2>
        <h3 className="text-2xl mt-0 mb-10 text-gray-800">
          Stamp a text over your PDF in seconds.
        </h3>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileInput}
          className="hidden"
          id="fileInput"
        />

        <label
          htmlFor="fileInput"
          className="mt-3 bg-blue-500 text-white px-20 py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-xl"
        >
          Click to Select PDF File
        </label>

        {file && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">Selected File: {file.name}</p>
          </div>
        )}

        {/* Watermark Text Input */}
        <div className="mt-6 w-full md:w-1/2  text-center">
          <label className="text-gray-700 text-lg mb-2 block">
            Watermark Text:
          </label>
          <input
            type="text"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter watermark text"
          />
        </div>

        {/* Opacity Level Slider */}
        <div className="flex flex-col items-center mt-6 w-full md:w-1/2 lg:w-1/3">
          <label className="text-gray-700 text-lg mb-2">
            Opacity Level: {opacity}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Position Dropdown */}
        <div className="mt-6 w-full md:w-1/2 lg:w-1/3 text-center">
          <label className="text-gray-700 text-lg mb-2 block">
            Position:
          </label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="center">Center</option>
            <option value="top-left">Top-left</option>
            <option value="top-right">Top-right</option>
            <option value="bottom-left">Bottom-left</option>
            <option value="bottom-right">Bottom-right</option>
          </select>
        </div>

        <button
          onClick={handleUpload}
          className="mt-8 bg-green-500 text-white px-20 py-3 rounded-lg hover:bg-green-600 transition ease-in-out duration-300 text-xl"
        >
          Add Watermark
        </button>

        {convertedFileUrl && (
          <div className="mt-10 bg-blue-500 text-white px-10 py-5 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-xl">
            <a
              href={convertedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Watermarked File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddWatermark;
