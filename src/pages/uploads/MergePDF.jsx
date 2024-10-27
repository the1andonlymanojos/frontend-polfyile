import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/header";

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
      className="relative w-40 h-40 border rounded-lg shadow-md p-2 flex items-center justify-center bg-white"
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

function Drag() {
  const [files, setFiles] = useState([]);
  const [mergedFileUrl, setMergedFileUrl] = useState(null);

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
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("YOUR_BACKEND_UPLOAD_URL", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Assuming backend returns { mergedFileUrl: 'URL' }
        setMergedFileUrl(data.mergedFileUrl); // Set the URL of the merged file
        alert("Files uploaded and merged successfully!");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
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
          <h2 className="text-5xl font-bold mt-20 mb-6 text-gray-800 ">
            Merge PDF files
          </h2>
          <h3 className="text-2xl mt-0 mb-10 text-gray-800">
            Combine PDFs in the order you want with the easiest PDF merger
            available.
          </h3>

          <div
            className="w-96 h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-gray-600 text-center">
              Drag & Drop PDF files here
            </p>
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
            className="mt-9 bg-blue-500 text-white px-20 py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-xl"
          >
            Click to Select Files
          </label>

          <div className="mt-9 grid grid-cols-3 gap-4">
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
            className="mt-2 bg-green-500 text-white px-10 py-5 rounded-lg cursor-pointer hover:bg-green-600 transition ease-in-out duration-300 text-xl"
          >
            Merge Files
          </button>

          {mergedFileUrl && (
            <a
              href={mergedFileUrl}
              download="merged_file.pdf"
              className="mt-10 bg-blue-500 text-white px-10 py-5 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-xl"
            >
              Download Merged File
            </a>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default Drag;
