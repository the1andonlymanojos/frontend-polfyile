import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from "../../components/img/background.svg";
import Header from "../Home/Header";

const FileItem = ({ file, index, moveFile, removeFile, convertImage, conversionStatus, downloadUrl }) => {
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
        onClick={() => convertImage(file, index)}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
      >
        Convert
      </button>
      {conversionStatus && <p className="text-xs mt-1 text-blue-600">{conversionStatus}</p>}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`converted_${file.name}`}
          className="text-blue-500 hover:text-blue-700 text-xs mt-2"
        >
          Download
        </a>
      )}
    </div>
  );
};

function DragAndConvertApp() {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [convertToFormat, setConvertToFormat] = useState('jpeg');
  const [conversionStatus, setConversionStatus] = useState(null);

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

  const convertImage = async (file, index) => {
    setConversionStatus("Converting...");

    try {
      const originalImg = new Image();
      originalImg.src = URL.createObjectURL(file);

      originalImg.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = originalImg.width;
        canvas.height = originalImg.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(originalImg, 0, 0);

        canvas.toBlob((blob) => {
          const convertedFile = new File([blob], `converted_${file.name.split('.')[0]}.${convertToFormat}`, { type: `image/${convertToFormat}` });
          const downloadUrl = URL.createObjectURL(blob);

          setConvertedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = { convertedFile, downloadUrl };
            return updatedFiles;
          });
          setConversionStatus(`Converted to ${convertToFormat.toUpperCase()}`);
        }, `image/${convertToFormat}`);
      };
    } catch (error) {
      console.error("Error converting image:", error);
      setConversionStatus("Conversion failed");
    }
  };

  const convertAllImages = () => {
    files.forEach((file, index) => {
      convertImage(file, index);
    });
  };

  const downloadAllImages = () => {
    convertedFiles.forEach((fileData, index) => {
      const link = document.createElement("a");
      link.href = fileData.downloadUrl;
      link.download = fileData.convertedFile.name;
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
        <h2 className="text-4xl font-bold mt-7 mb-6 text-gray-800">Convert Image</h2>
        <p className="text-xl pb-6 mb-5">
          Convert images to JPG, PNG, or GIF format.
        </p>
        <div
          className="w-96 h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg"
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

        <div className="mt-4 flex gap-4 items-center">
          <label htmlFor="convertToFormat" className="text-gray-700">Convert to Format:</label>
          <select
            id="convertToFormat"
            value={convertToFormat}
            onChange={(e) => setConvertToFormat(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="gif">GIF</option>
          </select>
        </div>

        <button
          onClick={convertAllImages}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ease-in-out duration-300"
        >
          Convert All Images
        </button>

        <button
          onClick={downloadAllImages}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ease-in-out duration-300"
          disabled={convertedFiles.length === 0}
        >
          Download All Images
        </button>

        <div className="mt-9 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <FileItem
              key={index}
              index={index}
              file={file}
              moveFile={moveFile}
              removeFile={removeFile}
              convertImage={convertImage}
              conversionStatus={conversionStatus}
              downloadUrl={convertedFiles[index]?.downloadUrl}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default DragAndConvertApp;
