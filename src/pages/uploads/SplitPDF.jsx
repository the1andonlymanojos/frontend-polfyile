import React, { useState } from "react";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/Header";
import axios from "axios";

const BASE_URL = 'https://file-service.manojshivagange.tech'; // Update with your backend upload URL
const PDF_SERVICE_URL = 'https://pdf-service.manojshivagange.tech'; // Update with your PDF service URL

async function initiateFileUpload(file) {
  const uploadRequest = {
    hash: '12345abcde', // You may calculate a real hash here if needed
    name: file.name,
    size: file.size
  };

  try {
    const response = await axios.post(`${BASE_URL}/upload/initiate`, uploadRequest);
    console.log('Initiate file upload response:', response.data);
    return response.data.eTag;  // Returns the eTag identifier
  } catch (error) {
    console.error('Error initiating file upload:', error.response?.data);
    return null;
  }
}

async function uploadFileChunk(identifier, file) {
  const CHUNK_SIZE = 1024 * 1024; // 1 MB
  let currentByte = 0;

  while (currentByte < file.size) {
    const end = Math.min(currentByte + CHUNK_SIZE, file.size);
    const chunk = file.slice(currentByte, end); // Get the current chunk

    const contentRange = `bytes ${currentByte}-${end - 1}/${file.size}`;

    try {
      const response = await axios.put(
        `${BASE_URL}/upload/${identifier}`,
        chunk,
        {
          headers: {
            'Content-Range': contentRange,
              'Content-Type': file.type // Set content type for chunk
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
    const resp = await axios.post(`${PDF_SERVICE_URL}/split`, {
      etags: [etag],
    });

    console.log('Merge PDF response:', resp.data);
    return resp.data; // Assuming it contains the PDF URL or similar info
  } catch (error) {
    console.error('Error merging PDFs:', error.response?.data);
    return null;
  }
}

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

    try {
      const etag = await initiateFileUpload(file);
      if (!etag) {
        alert("Error initiating file upload");
        return;
      }

      await uploadFileChunk(etag, file);

      const resp = await mergePDF(etag);
      if (!resp) {
        alert("Error splitting PDF");
        return;
      }

      for (const respElement of resp) {
        let downloadUrl = `${BASE_URL}/download/${respElement}`;
        setConvertedFileUrl(downloadUrl);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
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
      <div className="flex flex-col items-center px-4 md:px-0 w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-10 md:mt-20 mb-4 md:mb-6 text-gray-800 text-center">
          Split PDF
        </h2>
        <h3 className="text-xl md:text-2xl mt-0 mb-6 md:mb-10 text-gray-800 text-center">
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
          className="mt-3 bg-blue-500 text-white px-8 md:px-20 py-4 md:py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg md:text-xl text-center w-full md:w-auto"
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
          className="mt-8 bg-green-500 text-white px-8 md:px-20 py-3 rounded-lg hover:bg-green-600 transition ease-in-out duration-300 text-lg md:text-xl w-full md:w-auto"
        >
          Split PDF
        </button>

        {convertedFileUrl && (
          <div className="mt-10 bg-blue-500 text-white px-6 md:px-10 py-3 md:py-5 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg md:text-xl text-center w-full md:w-auto">
            <a
              href={convertedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
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