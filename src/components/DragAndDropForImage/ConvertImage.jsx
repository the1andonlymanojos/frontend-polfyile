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

// Function to convert image to different formats
const convertImage = (file, format) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
          const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, `.${format}`), {
            type: `image/${format}`,
          });
          const fileUrl = URL.createObjectURL(newFile);
          resolve({ newFile, fileUrl });
        }, `image/${format}`);
      };
    };
    reader.readAsDataURL(file);
  });
};

const FileItem = ({ file, index, moveFile, removeFile, selectForCropping, isCropping, convertFile }) => {
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
      onClick={() => !isCropping && selectForCropping(file)}
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
      <select onChange={(e) => convertFile(file, e.target.value)} className="absolute bottom-1 left-1">
        <option value="">Convert to...</option>
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="gif">GIF</option>
      </select>
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
    try {
      const croppedImage = await getCroppedImg(croppingFile.preview, croppedAreaPixels);
      setFiles((prevFiles) =>
        prevFiles.map((file) => (file === croppingFile ? { ...file, preview: croppedImage } : file))
      );
      setCroppingFile(null);
      alert('Image cropped successfully!');
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const convertFile = async (file, format) => {
    if (!format) return; // No format selected
    const { newFile, fileUrl } = await convertImage(file, format);

    // Add the converted file to the files state
    setFiles((prevFiles) => [
      ...prevFiles,
      { ...newFile, preview: fileUrl },
    ]);
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
            className="w-96 h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg"
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
            className="mt-9 bg-blue-500 text-white px-20 py-8 rounded-lg cursor-pointer"
          >
            Upload Images
          </label>
        </div>

        <div className="flex flex-wrap justify-center mt-6">
          {files.map((file, index) => (
            <FileItem
              key={index}
              index={index}
              file={file}
              moveFile={moveFile}
              removeFile={removeFile}
              selectForCropping={selectForCropping}
              isCropping={!!croppingFile}
              convertFile={convertFile}
            />
          ))}
        </div>

        {croppingFile && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl mb-2">Crop Image</h3>
              <Cropper
                image={croppingFile.preview}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
              <button onClick={cropImage} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                Crop
              </button>
              <button
                onClick={() => setCroppingFile(null)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Drag;
