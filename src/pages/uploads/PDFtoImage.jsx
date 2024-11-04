import React, {useEffect, useRef, useState} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/Header";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
//import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';


pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// Constants
const BASE_URL = 'https://file-service.manojshivagange.tech'; // Update with your backend upload URL
const PDF_SERVICE_URL = 'https://pdf-service.manojshivagange.tech'; // Update with your PDF service URL

// Function to initiate the file upload
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

async function mergePDF(etag) {
  try {
    const resp = await axios.post(`${PDF_SERVICE_URL}/convert-pdf-to-images`, {
      etags: [etag]
    });

    console.log('Merge PDF response:', resp.data);
    return resp.data; // Assuming it contains the PDF URL or similar info
  } catch (error) {
    console.error('Error merging PDFs:', error.response?.data);
    return null;
  }
}

const FileItem = ({ file, index, moveFile, removeFile }) => {
  const [, ref] = useDrag({
    type: "file",
    item: { index },
  });

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
    <div
      ref={(node) => ref(drop(node))}
      className="relative w-full h-40 border rounded-lg shadow-md p-2 flex items-center justify-center bg-white"
    >
      <p className="text-gray-800 text-sm truncate">{file.name}</p>
      <button
        onClick={() => removeFile(index)}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

function PDFtoImage() {
  const [files, setFiles] = useState([]);
  const [PDFtoimageUrl, setPDFtoimageUrl] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles(droppedFiles);
  };

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
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

    const etag = await initiateFileUpload(files[0]);
    if (!etag) {
      alert("Error initiating file upload");
      return;
    }
    console.log('eTag:', etag);
    await uploadFileChunk(etag, files[0]);
    const data = await mergePDF(etag);
    if (!data) {
      alert("Error merging PDFs");
      return;
    }
    data.forEach((etag) => {
      const downloadUrl = `${BASE_URL}/download/${etag}`;
      console.log('Download URL:', downloadUrl);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = `file_${etag}.pdf`;
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
    setPDFtoimageUrl(data[0]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div
        className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex flex-col items-center w-full max-w-6xl px-4 py-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-10 sm:mt-20 mb-4 sm:mb-6 text-gray-800 text-center">
            PDF to Image
          </h2>
          <h3 className="text-xl sm:text-2xl mt-0 mb-6 sm:mb-10 text-gray-800 text-center">
            Convert each PDF page into an image or extract all images contained in a PDF.
          </h3>

          <div
            className="w-full max-w-2xl h-60 sm:h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-gray-600 text-center text-lg sm:text-xl">Drag & Drop PDF files here</p>
            <input
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleFiles}
              className="hidden"
              id="fileInput"
            />
          </div>

          <label
            htmlFor="fileInput"
            className="mt-6 sm:mt-9 bg-blue-500 text-white px-8 sm:px-20 py-4 sm:py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg sm:text-xl"
          >
            Click to Select Files
          </label>

          <div className="mt-6 sm:mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {files.map((file, index) => (
              <FileItem
                key={`${file.name}-${index}`}
                index={index}
                file={file}
                moveFile={moveFile}
                removeFile={removeFile}
              />
            ))}
          </div>

        
            <button
              onClick={handleUpload}
              className="mt-6 sm:mt-8 bg-green-500 text-white px-8 sm:px-10 py-3 sm:py-5 rounded-lg cursor-pointer hover:bg-green-600 transition ease-in-out duration-300 text-lg sm:text-xl"
            >
              Convert Files
            </button>
          

          {PDFtoimageUrl && (
            <a
              href={PDFtoimageUrl}
              download="converted_file.pdf"
              className="mt-6 sm:mt-10 bg-blue-500 text-white px-8 sm:px-10 py-3 sm:py-5 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg sm:text-xl"
            >
              Download Converted File
            </a>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default PDFtoImage;