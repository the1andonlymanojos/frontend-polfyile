import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/Header";

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
      className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 border rounded-lg shadow-md p-2 flex items-center justify-center bg-white"
    >
      <p className="text-gray-800 text-xs sm:text-sm truncate">{file.name}</p>
      <button
        onClick={() => removeFile(index)}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5"
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

function WordtoPDF() {
  const [files, setFiles] = useState([]);
  const [WordtoPDFUrl, setWordtoPDFUrl] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter(
      (file) =>
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files).filter(
      (file) =>
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
        const data = await response.json();
        setWordtoPDFUrl(data.convertedFileUrl);
        alert("Files uploaded and converted to PDF successfully!");
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
        <div className="flex flex-col items-center max-w-3xl w-full px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-10 sm:mt-16 mb-4 sm:mb-6 text-gray-800">
            Word to PDF
          </h2>
          <h3 className="text-xl sm:text-2xl mt-0 mb-4 sm:mb-8 text-gray-800 text-center">
            Make DOC and DOCX files easy to read by converting them to PDF.
          </h3>

          <div
            className="w-full max-w-lg h-60 sm:h-72 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Drag & Drop Word files here
            </p>
            <input
              type="file"
              multiple
              accept=".doc,.docx"
              onChange={handleFiles}
              className="hidden"
              id="fileInput"
            />
          </div>

          <label
            htmlFor="fileInput"
            className="mt-6 sm:mt-8 bg-blue-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg"
          >
            Select Word Files
          </label>

          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

          {files.length > 0 && (
            <button
              onClick={handleUpload}
              className="mt-8 sm:mt-10 bg-green-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg cursor-pointer hover:bg-green-600 transition ease-in-out duration-300 text-lg"
            >
              Convert Files
            </button>
          )}

          {WordtoPDFUrl && (
            <a
              href={WordtoPDFUrl}
              download="converted_file.pdf"
              className="mt-6 sm:mt-8 bg-blue-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg"
            >
              Download Converted File
            </a>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default WordtoPDF;