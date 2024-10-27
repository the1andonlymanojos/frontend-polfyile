import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from "../img/background.svg";
import Header from "../../components/Home/Header";
import Cropper from 'react-easy-crop';

// Utility function to handle image cropping
const getCroppedImg = async (imageSrc, crop) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const fileUrl = URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/png');
  });
};

const FileItem = ({ file, index, moveFile, removeFile, selectForCropping }) => {
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
      className="relative w-52 h-52 border rounded-lg shadow-md p-2 flex flex-col items-center justify-center bg-white cursor-pointer"
      onClick={() => selectForCropping(file)}
    >
      {file.preview ? (
        <img
          src={file.preview}
          alt={file.name}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <p className="text-gray-800 text-sm truncate">{file.name}</p>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeFile(index);
        }}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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

function Drag() {
  const [files, setFiles] = useState([]);
  const [croppingFile, setCroppingFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files).filter((file) => file.type.startsWith('image/'));
    const filesWithPreview = selectedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    const filesWithPreview = droppedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
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

  const selectForCropping = (file) => {
    setCroppingFile(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = async () => {
    if (!croppingFile) return;
    try {
      const croppedImage = await getCroppedImg(croppingFile.preview, croppedAreaPixels);
      setFiles((prevFiles) =>
        prevFiles.map((file) => (file === croppingFile ? { ...file, preview: croppedImage } : file))
      );
      alert('Image cropped successfully!');
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const saveCroppedImage = () => {
    setCroppingFile(null); // Close the cropping modal
    setCroppedAreaPixels(null); // Reset cropped area
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
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mt-7 mb-6 text-gray-800">Image Upload with Cropping & Reordering</h2>

          <div
            className="w-96 h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
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
            className="mt-9 bg-blue-500 text-white px-20 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300"
          >
            Or Click to Select Files
          </label>

          <div className="mt-9 grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <FileItem
                key={index}
                index={index}
                file={file}
                moveFile={moveFile}
                removeFile={removeFile}
                selectForCropping={selectForCropping}
              />
            ))}
          </div>

          {croppingFile && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative w-full max-w-md h-full max-h-md bg-white rounded-lg shadow-lg p-4 flex flex-col">
                <h3 className="text-center text-gray-700 mb-2">Crop Image</h3>
                <Cropper
                  image={croppingFile.preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // Change aspect ratio as needed
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setCroppingFile(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={cropImage}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Crop
                  </button>
                  <button
                    onClick={saveCroppedImage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default Drag;
