import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from "../../components/img/background.svg";
import Header from "../Home/Header";

const FileItem = ({ file, index, moveFile, removeFile, resizeImage, resizingStatus, downloadUrl }) => {
  const [, ref] = useDrag({
    type: 'file',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'file',
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
      className="relative w-full h-32 sm:w-40 sm:h-40 border rounded-lg shadow-md p-2 flex flex-col items-center justify-center bg-white"
    >
      {file.type.startsWith('image/') ? (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <p className="text-gray-800 text-sm truncate">{file.name}</p>
      )}
      <button
        onClick={() => removeFile(index)}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
      >
        {/* Delete icon */}
      </button>
      <button
        onClick={() => resizeImage(file, index)}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
      >
        Resize
      </button>
      {resizingStatus && <p className="text-xs mt-1 text-blue-600">{resizingStatus}</p>}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`resized_${file.name}`}
          className="text-blue-500 hover:text-blue-700 text-xs mt-2"
        >
          Download
        </a>
      )}
    </div>
  );
};

function DragAndResizeApp() {
  const [files, setFiles] = useState([]);
  const [resizedFiles, setResizedFiles] = useState([]);
  const [resizePercentage, setResizePercentage] = useState(100);
  const [resizingStatus, setResizingStatus] = useState(null);

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files).filter((file) => file.type.startsWith('image/'));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
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

  const resizeImage = async (file, index) => {
    setResizingStatus("Resizing...");

    try {
      const originalImg = new Image();
      originalImg.src = URL.createObjectURL(file);

      originalImg.onload = async () => {
        const canvas = document.createElement("canvas");
        const scaleFactor = resizePercentage / 100;

        canvas.width = originalImg.width * scaleFactor;
        canvas.height = originalImg.height * scaleFactor;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], `resized_${file.name}`, { type: file.type });
          const downloadUrl = URL.createObjectURL(blob);

          setResizedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = { resizedFile, downloadUrl };
            return updatedFiles;
          });
          setResizingStatus(`Resized to ${canvas.width}x${canvas.height}px`);
        }, file.type);
      };
    } catch (error) {
      console.error("Error resizing image:", error);
      setResizingStatus("Resize failed");
    }
  };

  const resizeAllImages = () => {
    files.forEach((file, index) => {
      resizeImage(file, index);
    });
  };

  const downloadAllImages = () => {
    resizedFiles.forEach((fileData) => {
      const link = document.createElement("a");
      link.href = fileData.downloadUrl;
      link.download = fileData.resizedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
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
        <h2 className="text-3xl sm:text-4xl font-bold mt-7 mb-6 text-gray-800">Resize Image</h2>
        <p className="text-lg sm:text-xl pb-6 mb-5 text-center">
          Resize JPG, PNG, SVG, or GIF by specifying new dimensions in pixels or resizing by percentage.
        </p>
        <div
          className="w-80 sm:w-96 h-64 sm:h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="text-gray-600 text-center">Drag & Drop files here</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
            className="hidden"
            id="fileInput"
          />
        </div>

        <label
          htmlFor="fileInput"
          className="mt-9 bg-blue-500 text-white px-20 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Or Click to Select Files
        </label>

        <div className="mt-4 flex gap-2 sm:gap-4 items-center">
          <label htmlFor="resizePercentage" className="text-gray-700">Resize Percentage (0-200%):</label>
          <input
            type="number"
            id="resizePercentage"
            value={resizePercentage}
            min={0}
            max={200}
            onChange={(e) => setResizePercentage(parseInt(e.target.value, 10))}
            className="p-1 border rounded"
          />
        </div>

        <button
          onClick={resizeAllImages}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ease-in-out duration-300"
        >
          Resize All Images
        </button>

        <button
          onClick={downloadAllImages}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ease-in-out duration-300"
          disabled={resizedFiles.length === 0}
        >
          Download All Images
        </button>

        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {files.map((file, index) => (
            <FileItem
              key={index}
              index={index}
              file={file}
              moveFile={moveFile}
              removeFile={removeFile}
              resizeImage={resizeImage}
              resizingStatus={resizingStatus}
              downloadUrl={resizedFiles[index]?.downloadUrl}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default DragAndResizeApp;
