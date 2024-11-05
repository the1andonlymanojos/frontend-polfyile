import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/Header";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Constants
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

async function uploadFileChunk(identifier, file, setProgress, setStatus) {
  const CHUNK_SIZE = 1024 * 1024; // 1 MB
  let currentByte = 0;
  let uploadedBytes = 0;

  while (currentByte < file.size) {
    const end = Math.min(currentByte + CHUNK_SIZE, file.size);
    const chunk = file.slice(currentByte, end);
    const contentRange = `bytes ${currentByte}-${end - 1}/${file.size}`;

    try {
      const response = await axios.put(`${BASE_URL}/upload/${identifier}`, chunk, {
        headers: {
          'Content-Range': contentRange,
          'Content-Type': file.type,
        },
      });
      uploadedBytes += end - currentByte;
      setProgress(Math.round((uploadedBytes / file.size) * 100));
      setStatus(`Uploading: ${(uploadedBytes / file.size) * 100}%`);
      console.log(`Uploaded chunk: ${contentRange}, Response: ${response.status}`);
    } catch (error) {
      console.error(`Error uploading chunk ${contentRange}:`, error.response?.data);
      setStatus("Error uploading chunk.");
      return;
    }
    currentByte += CHUNK_SIZE;
  }

  setStatus("File upload completed.");
}

async function mergePDF(etag, setStatus) {
  try {
    const resp = await axios.post(`${PDF_SERVICE_URL}/convert-pdf-to-images`, {
      etags: [etag]
    });

    console.log('Merge PDF response:', resp.data);
    return resp.data; // Assuming it contains the PDF URL or similar info
  } catch (error) {
    setStatus("Error merging PDFs.");
    console.error('Error merging PDFs:', error.response?.data);
    return null;
  }
}

const FileItem = ({ file, index, moveFile, removeFile }) => {
  const [, ref] = useDrag({ type: "file", item: { index } });
  const [, drop] = useDrop({
    accept: "file",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveFile(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  return (
      <div ref={(node) => ref(drop(node))} className="relative w-full h-40 border rounded-lg shadow-md p-2 flex items-center justify-center bg-white">
        <p className="text-gray-800 text-sm truncate">{file.name}</p>
        <button onClick={() => removeFile(index)} className="absolute top-1 right-1 text-red-500 hover:text-red-700">✖</button>
      </div>
  );
};

function PDFtoImage() {
  const [files, setFiles] = useState([]);
  const [PDFtoimageUrl, setPDFtoimageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) => file.type === "application/pdf");
    setFiles(droppedFiles);
  };

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files).filter((file) => file.type === "application/pdf");
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const moveFile = (fromIndex, toIndex) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  };

  const handleUpload = async () => {
    if (files.length !== 1) {
      alert("Please upload a single PDF file");
      return;
    }

    setIsUploading(true);
    setStatus("Initializing upload...");
    const etag = await initiateFileUpload(files[0]);
    if (!etag) {
      alert("Error initiating file upload");
      setIsUploading(false);
      return;
    }

    await uploadFileChunk(etag, files[0], setProgress, setStatus);
    setStatus("Merging PDF...");
    const data = await mergePDF(etag, setStatus);
    if (!data) {
      alert("Error merging PDFs, womp womp");
      setIsUploading(false);
      return;
    }

    try {
      const url = `${BASE_URL}/zip`;
      const dataforRequest = { etags: data };
      setStatus("Zipping Files...");
      const response = await axios.post(url, dataforRequest);
      const downloadUrl = `${BASE_URL}/download/${response.data.eTag}`;
      setPDFtoimageUrl(downloadUrl);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setStatus("Conversion completed.");
    } catch (error) {
      console.error(error);
      setStatus("Error during conversion.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
      <DndProvider backend={HTML5Backend}>
        <Header />
        <div className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="flex flex-col items-center w-full max-w-6xl px-4 py-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-10 sm:mt-20 mb-4 sm:mb-6 text-gray-800 text-center">PDF to Image</h2>
            <h3 className="text-xl sm:text-2xl mt-0 mb-6 sm:mb-10 text-gray-800 text-center">Convert each PDF page into an image or extract all images contained in a PDF.</h3>

            <div className="w-full max-w-2xl h-60 sm:h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg" onDrop={handleDrop}>
              <p className="text-gray-600 text-center text-lg sm:text-xl">Drag & Drop PDF files here</p>
              <input type="file" multiple accept="application/pdf" onChange={handleFiles} className="hidden" id="fileInput" />
            </div>

            <label htmlFor="fileInput" className="mt-6 sm:mt-9 bg-blue-500 text-white px-8 sm:px-20 py-4 sm:py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg sm:text-xl">
              Click to Select Files
            </label>

            <div className="mt-6 sm:mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {files.map((file, index) => (
                  <FileItem key={`${file.name}-${index}`} index={index} file={file} moveFile={moveFile} removeFile={removeFile} />
              ))}
            </div>

            {status && <p className="mt-4 text-gray-700">{status}</p>}
            {isUploading&&<div className="w-full bg-gray-300 rounded-full mt-4">
              <div style={{width: `${progress}%`}}
                   className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">{progress}%
              </div>
            </div>}

            <button onClick={handleUpload} disabled={isUploading} className={`mt-6 sm:mt-8 bg-green-500 text-white px-8 sm:px-10 py-3 sm:py-5 rounded-lg ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"} transition ease-in-out duration-300 text-lg sm:text-xl`}>
              {isUploading ? "Uploading..." : "Upload & Convert"}
            </button>

            {PDFtoimageUrl && (
                <a href={PDFtoimageUrl} target="_blank" rel="noopener noreferrer" className="mt-6 sm:mt-9 bg-red-500 text-white px-8 sm:px-10 py-3 sm:py-5 rounded-lg hover:bg-red-600 transition ease-in-out duration-300 text-lg sm:text-xl">
                  Download Image ZIP
                </a>
            )}
          </div>
        </div>
      </DndProvider>
  );
}

export default PDFtoImage;
