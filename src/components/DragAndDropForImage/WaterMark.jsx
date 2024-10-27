import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from "../img/background.svg";
import Header from "../../components/Home/Header";

const FileItem = ({ file, index, removeFile, addWatermark }) => {
  const [, ref] = useDrag({
    type: 'file',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'file',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        // Optional: Move file logic can be added here
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
        onClick={() => addWatermark(file)}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
      >
        Add Watermark
      </button>
    </div>
  );
};

function DragAndWatermarkApp() {
  const [files, setFiles] = useState([]);
  const [watermarkText, setWatermarkText] = useState('Watermark'); // Default watermark text
  const [watermarkedImages, setWatermarkedImages] = useState([]);

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
    setWatermarkedImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove)); // Remove watermarked image as well
  };

  const addWatermark = async (file) => {
    const originalImg = new Image();
    originalImg.src = URL.createObjectURL(file);

    originalImg.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = originalImg.width;
      canvas.height = originalImg.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(originalImg, 0, 0);
      ctx.font = '20px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; // White with transparency
      ctx.textAlign = 'center';
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 20); // Position watermark

      canvas.toBlob((blob) => {
        const watermarkedFile = new File([blob], `watermarked_${file.name}`, { type: file.type });
        setWatermarkedImages((prevImages) => [...prevImages, URL.createObjectURL(watermarkedFile)]);
      }, file.type);
    };
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
        <h2 className="text-4xl font-bold mt-7 mb-6 text-gray-800">Add Watermark to Images</h2>
        <p className='text-xl pb-6 mb-5'>Upload JPG, PNG, SVG or GIF images to add a watermark.</p>

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

        <div>
          <label htmlFor="watermarkText" className="text-gray-700">Watermark Text:</label>
          <input
            type="text"
            id="watermarkText"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            className="ml-2 p-1 border rounded"
          />
        </div>

        <div className="mt-9 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <FileItem
              key={index}
              index={index}
              file={file}
              removeFile={removeFile}
              addWatermark={addWatermark}
            />
          ))}
        </div>

        <h3 className="mt-8 text-2xl font-bold text-gray-800">Watermarked Images:</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {watermarkedImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Watermarked ${index + 1}`}
              className="w-40 h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default DragAndWatermarkApp;
