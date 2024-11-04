import React, { useState } from "react";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/Header";
import axios from "axios";

const BASE_URL = 'https://file-service.manojshivagange.tech';
const PDF_SERVICE_URL = 'https://pdf-service.manojshivagange.tech';

async function initiateFileUpload(file) {
  const uploadRequest = {
    hash: '12345abcde',
    name: file.name,
    size: file.size
  };

  try {
    const response = await axios.post(`${BASE_URL}/upload/initiate`, uploadRequest);
    console.log('Initiate file upload response:', response.data);
    return response.data.eTag;
  } catch (error) {
    console.error('Error initiating file upload:', error.response?.data);
    return null;
  }
}

async function uploadFileChunk(identifier, file) {
  const CHUNK_SIZE = 1024 * 1024;
  let currentByte = 0;

  while (currentByte < file.size) {
    const end = Math.min(currentByte + CHUNK_SIZE, file.size);
    const chunk = file.slice(currentByte, end);
    const contentRange = `bytes ${currentByte}-${end - 1}/${file.size}`;

    try {
      const response = await axios.put(
          `${BASE_URL}/upload/${identifier}`,
          chunk,
          {
            headers: {
              'Content-Range': contentRange,
              'Content-Type': file.type
            }
          }
      );
      console.log(`Uploaded chunk: ${contentRange}, Response: ${response.status}`);
    } catch (error) {
      console.error(`Error uploading chunk ${contentRange}:`, error.response?.data);
      return;
    }

    currentByte += CHUNK_SIZE;
  }

  console.log('File upload completed.');
}

async function mergePDF(etag, compressionQuality) {
  try {
    const resp = await axios.post(`${PDF_SERVICE_URL}/compress`, {
      etags: [etag],
      compressionQuality: compressionQuality
    });

    console.log('Merge PDF response:', resp.data);
    return resp.data;
  } catch (error) {
    console.error('Error merging PDFs:', error.response?.data);
    return null;
  }
}

function CompressPDF() {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(50);
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

    try {
      const identifier = await initiateFileUpload(file);
      if (!identifier) {
        alert("Failed to initiate file upload");
        return;
      }
      await uploadFileChunk(identifier, file);

      const data = await mergePDF(identifier, 0.01 * compressionLevel);
      if (!data) {
        alert("Failed to compress PDF");
        return;
      }
      const downloadUrl = `${BASE_URL}/download/${data[0]}`;
      setConvertedFileUrl(downloadUrl);

      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
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
      <div className="flex flex-col items-center px-4 lg:px-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-10 md:mt-20 mb-4 md:mb-6 text-gray-800">
          Compress PDF
        </h2>
        <h3 className="text-lg md:text-xl lg:text-2xl mt-0 mb-6 md:mb-10 text-gray-800">
          Reduce file size while optimizing for maximal PDF quality.
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
          className="mt-3 bg-blue-500 text-white px-12 md:px-16 lg:px-20 py-3 md:py-6 lg:py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-base md:text-lg lg:text-xl"
        >
          Click to Select PDF File
        </label>

        {file && (
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-gray-600">Selected File: {file.name}</p>
          </div>
        )}

        {/* Compression Level Slider */}
        <div className="flex flex-col items-center mt-6 md:mt-8">
          <label className="text-gray-700 text-base md:text-lg mb-2">
            Select Compression Level: {compressionLevel}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={compressionLevel}
            onChange={(e) => setCompressionLevel(e.target.value)}
            className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
          />
        </div>

        <button
          onClick={handleUpload}
          className="mt-6 md:mt-8 bg-green-500 text-white px-16 md:px-20 lg:px-24 py-2 md:py-3 lg:py-4 rounded-lg hover:bg-green-600 transition ease-in-out duration-300 text-lg md:text-xl"
        >
          Compress PDF
        </button>

        {convertedFileUrl && (
          <div className="mt-8 md:mt-10 bg-blue-500 text-white px-8 py-4 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg md:text-xl">
            <a
              href={convertedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Compressed File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompressPDF;
