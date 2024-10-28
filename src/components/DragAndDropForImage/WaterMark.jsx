import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from "../../components/img/background.svg";
import Header from "../Home/Header";

const FileItem = ({ file, index, moveFile, removeFile, addWatermark, downloadUrl }) => {
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
      className="relative w-40 h-40 border rounded-lg shadow-md p-2 flex flex-col items-center justify-center bg-white"
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
        onClick={() => addWatermark(file, index)}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
      >
        Add Watermark
      </button>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`watermarked_${file.name}`}
          className="text-blue-500 hover:text-blue-700 text-xs mt-2"
        >
          Download
        </a>
      )}
    </div>
  );
};

function DragAndWatermarkApp() {
  const [files, setFiles] = useState([]);
  const [watermarkedFiles, setWatermarkedFiles] = useState([]);
  const [watermarkText, setWatermarkText] = useState("Watermark");

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

  const addWatermark = async (file, index) => {
    try {
      const originalImg = new Image();
      originalImg.src = URL.createObjectURL(file);

      originalImg.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = originalImg.width;
        canvas.height = originalImg.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(originalImg, 0, 0);

        // Watermark settings
        ctx.font = "30px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";

        // Watermark position
        const x = canvas.width - 10; // Right
        const y = canvas.height - 10; // Bottom

        ctx.fillText(watermarkText, x, y);

        canvas.toBlob((blob) => {
          const watermarkedFile = new File([blob], `watermarked_${file.name}`, { type: file.type });
          const downloadUrl = URL.createObjectURL(blob);

          setWatermarkedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = { watermarkedFile, downloadUrl };
            return updatedFiles;
          });
        });
      };
    } catch (error) {
      console.error("Error adding watermark:", error);
    }
  };

  const downloadAllImages = () => {
    watermarkedFiles.forEach((fileData) => {
      const link = document.createElement("a");
      link.href = fileData.downloadUrl;
      link.download = fileData.watermarkedFile.name;
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
        <h2 className="text-4xl font-bold mt-7 mb-6 text-gray-800">Add Watermark</h2>
        <p className="text-xl pb-6 mb-5">Drag & Drop files to add a watermark.</p>
        
        <div
          className="w-96 h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300"
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
          className="mt-9 bg-blue-500 text-white px-20 py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Or Click to Select Files
        </label>

        <div className="mt-4">
          <label className="text-gray-700">Watermark Text:</label>
          <input
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            className="p-1 border rounded"
          />
        </div>

        <button
          onClick={downloadAllImages}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Download All Images
        </button>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <FileItem
              key={index}
              index={index}
              file={file}
              moveFile={moveFile}
              removeFile={removeFile}
              addWatermark={addWatermark}
              downloadUrl={watermarkedFiles[index]?.downloadUrl}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default DragAndWatermarkApp;
