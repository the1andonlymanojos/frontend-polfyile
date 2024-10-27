import React, { useState } from "react";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/header";

function SplitPDF() {
  const [file, setFile] = useState(null);
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

    try {
      const response = await fetch("YOUR_BACKEND_SPLIT_URL", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setConvertedFileUrl(data.splitFileUrl); // Assuming the response returns a URL for the split files
        alert("PDF split successfully!");
      } else {
        alert("Failed to split PDF");
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
          Split PDF
        </h2>
        <h3 className="text-2xl mt-0 mb-10 text-gray-800">
          Separate whole set for easy conversion into independent PDF files.
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

        <button
          onClick={handleUpload}
          className="mt-8 bg-green-500 text-white px-20 py-3 rounded-lg hover:bg-green-600 transition ease-in-out duration-300 text-xl"
        >
          Split PDF
        </button>

        {convertedFileUrl && (
          <div className="mt-10 bg-blue-500 text-white px-10 py-5 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-xl">
            <a
              href={convertedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Split PDF Files
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default SplitPDF;
