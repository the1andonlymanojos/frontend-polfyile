import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from "../../components/img/background.svg";
import Header from "../Home/Header";
import ImageCropper from "../image-cropthing.jsx";

const FileItem = ({ file, index, moveFile, removeFile, cropImage, cropStatus, downloadUrl }) => {
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
      className="relative w-full sm:w-40 h-40 border rounded-lg shadow-md p-2 flex flex-col items-center justify-center bg-white"
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
        onClick={() => cropImage(file, index)}
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
      >
        Crop
      </button>
      {cropStatus && <p className="text-xs mt-1 text-blue-600">{cropStatus}</p>}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`cropped_${file.name}`}
          className="text-blue-500 hover:text-blue-700 text-xs mt-2"
        >
          Download
        </a>
      )}
    </div>
  );
};

function DragAndCropApp() {
  const [files, setFiles] = useState([]);
  const [croppedFiles, setCroppedFiles] = useState([]);
  const [cropStatus, setCropStatus] = useState(null);

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

  const cropImage = async (file, index) => {
    setCropStatus("Cropping...");

    try {
      const originalImg = new Image();
      originalImg.src = URL.createObjectURL(file);

      originalImg.onload = async () => {
        const canvas = document.createElement("canvas");

        // Crop dimensions
        const cropX = originalImg.width * 0.1;
        const cropY = originalImg.height * 0.1;
        const cropWidth = originalImg.width * 0.8;
        const cropHeight = originalImg.height * 0.8;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(originalImg, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        canvas.toBlob((blob) => {
          const croppedFile = new File([blob], `cropped_${file.name}`, { type: file.type });
          const downloadUrl = URL.createObjectURL(blob);

          setCroppedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = { croppedFile, downloadUrl };
            return updatedFiles;
          });
          setCropStatus(`Cropped to ${cropWidth}x${cropHeight}px`);
        }, file.type);
      };
    } catch (error) {
      console.error("Error cropping image:", error);
      setCropStatus("Crop failed");
    }
  };

  const downloadAllImages = () => {
    croppedFiles.forEach((fileData, index) => {
      const link = document.createElement("a");
      link.href = fileData.downloadUrl;
      link.download = fileData.croppedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div className="p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="border border-gray-300 rounded p-2 mb-4"
        />
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {files.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              index={index}
              moveFile={moveFile}
              removeFile={removeFile}
              cropImage={cropImage}
              cropStatus={cropStatus}
              downloadUrl={croppedFiles[index]?.downloadUrl}
            />
          ))}
        </div>
        {croppedFiles.length > 0 && (
          <button
            onClick={downloadAllImages}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Download All Cropped Images
          </button>
        )}
      </div>
    </DndProvider>
  );
}

export default DragAndCropApp;
