import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import backgroundImage from "../../components/img/background.svg";
import Header from "../Home/Header";
import browserImageCompression from 'browser-image-compression';

const FileItem = ({ file, index, removeFile, compressedData }) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {compressedData && (
        <div className="mt-2 text-center text-gray-700 text-xs">
          <p>{`Original: ${(compressedData.originalSize / 1024).toFixed(2)} KB`}</p>
          <p>{`Compressed: ${(compressedData.compressedSize / 1024).toFixed(2)} KB`}</p>
          <p>{`Saved: ${compressedData.savedPercentage}%`}</p>
          {/* Download button for individual files */}
          <a
            href={compressedData.downloadUrl}
            download={file.name.replace(/\.[^/.]+$/, "_compressed.jpg")} // Adjust file extension as necessary
            className="text-blue-500 hover:text-blue-700 text-xs mt-2"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

function Drag() {
  const [files, setFiles] = useState([]);
  const [compressedFilesData, setCompressedFilesData] = useState([]);
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [isCompressed, setIsCompressed] = useState(false);

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files).filter((file) => file.type.startsWith('image/'));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    setDownloadLinks((prevLinks) => prevLinks.filter((_, index) => index !== indexToRemove));
  };

  const moveFile = (fromIndex, toIndex) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  };

  const compressAllImages = async () => {
    const compressedDataArray = await Promise.all(files.map(async (file) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        initialQuality: compressionQuality,
      };
      const compressedFile = await browserImageCompression(file, options);
      const savedPercentage = ((file.size - compressedFile.size) / file.size * 100).toFixed(2);

      const compressedBlob = new Blob([compressedFile], { type: compressedFile.type });
      const downloadUrl = URL.createObjectURL(compressedBlob);

      return {
        originalSize: file.size,
        compressedSize: compressedFile.size,
        savedPercentage,
        downloadUrl,
      };
    }));

    setCompressedFilesData(compressedDataArray);
    setDownloadLinks(compressedDataArray.map((data) => data.downloadUrl));
    setIsCompressed(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div
        className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16 max-w-screen-lg mx-auto"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mt-7 mb-6 text-gray-800">Compress Image</h2>
          <p className='text-xl pb-6 mb-5'>Compress JPG, PNG, SVG or GIF with the best quality and compression. Reduce the filesize of your images at once.</p>
          <div
            className="w-full sm:w-96 h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg"
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
            className="mt-9 bg-blue-500 text-white px-20 py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300"
          >
            Or Click to Select Files
          </label>

          <div className="mt-4">
            <label htmlFor="compressionQuality" className="text-gray-700">
              Compression Quality: {Math.round(compressionQuality * 100)}%
            </label>
            <input
              type="range"
              id="compressionQuality"
              min="0.1"
              max="1"
              step="0.1"
              value={compressionQuality}
              onChange={(e) => setCompressionQuality(e.target.valueAsNumber)}
              className="ml-3"
            />
          </div>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <FileItem
                key={index}
                index={index}
                file={file}
                removeFile={removeFile}
                compressedData={compressedFilesData[index]}
              />
            ))}
          </div>

          <button
            onClick={compressAllImages}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300"
          >
            Compress All
          </button>

          {isCompressed && (
            <a
              href={downloadLinks.length > 0 ? downloadLinks[0] : '#'}
              download="compressed_images.zip"
              className={`mt-6 bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition ease-in-out duration-300 ${downloadLinks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Download All
            </a>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default Drag;
