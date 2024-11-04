import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import backgroundImage from "../../components/img/background.svg";
import Header from "../../components/Home/Header";
import axios from "axios";



// Constants
const BASE_URL = 'https://file-service.manojshivagange.tech'; // Update with your backend upload URL
const PDF_SERVICE_URL = 'https://pdf-service.manojshivagange.tech'; // Update with your PDF service URL

// Function to initiate the file upload
async function initiateFileUpload(file) {
  const uploadRequest = {
    hash: '12345abcde', // You may calculate a real hash here if needed
    name: file.name,
    size: file.size
  };

  try {
    const response = await axios.post(`${BASE_URL}/upload/initiate`, uploadRequest);
    console.log('Initiate file upload response:', response.data);
    return response.data.eTag;  // Returns the eTag identifier
  } catch (error) {
    console.error('Error initiating file upload:', error.response?.data);
    return null;
  }
}

async function uploadFileChunk(identifier, file) {
  const CHUNK_SIZE = 1024 * 1024; // 1 MB
  let currentByte = 0;

  while (currentByte < file.size) {
    const end = Math.min(currentByte + CHUNK_SIZE, file.size);
    const chunk = file.slice(currentByte, end); // Get the current chunk

    const contentRange = `bytes ${currentByte}-${end - 1}/${file.size}`;

    try {
      const response = await axios.put(
        `${BASE_URL}/upload/${identifier}`,
        chunk,
        {
          headers: {
            'Content-Range': contentRange,
              'Content-Type': file.type // Set content type for chunk
          }
        }
      );
      console.log(`Uploaded chunk: ${contentRange}, Response: ${response.status}`);
    } catch (error) {
      console.error(`Error uploading chunk ${contentRange}:`, error.response?.data);
      return;
    }

    currentByte += CHUNK_SIZE;
  }

  console.log('File upload completed.');
}

async function mergePDF(etags) {
  try {
    const resp = await axios.post(`${PDF_SERVICE_URL}/convert-images-to-pdf`, {
      etags: etags
    });

    console.log('Merge PDF response:', resp.data);
    return resp.data; // Assuming it contains the PDF URL or similar info
  } catch (error) {
    console.error('Error merging PDFs:', error.response?.data);
    return null;
  }
}

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
  const previewUrl = URL.createObjectURL(file);
  return (
    <div
      ref={(node) => ref(drop(node))}
      className="relative w-full h-40 border rounded-lg shadow-md p-2 flex items-center justify-center overflow-hidden"
    >
      <img
        src={previewUrl}
        alt={file.name}
        className="object-cover w-full h-full rounded-md"
      />
      <button
        onClick={() => removeFile(index)}
        className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full text-red-500 hover:text-red-700"
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

function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    setFiles(droppedFiles);
  };

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
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
    try {
      const uploadPromises = files.map(async (file) => {
        const eTag = await initiateFileUpload(file);
        if (eTag) {
          await uploadFileChunk(eTag, file);
          return eTag;
        } else {
          throw new Error(`Failed to initiate upload for file: ${file.name}`);
        }
      });

      const etags = await Promise.all(uploadPromises);
      const pdfResult = await mergePDF(etags);

      if (pdfResult) {
        alert("Files uploaded and merged successfully!");
        console.log("Merged PDF available at:", pdfResult);

        pdfResult.forEach((etag) => {
          const downloadUrl = `${BASE_URL}/download/${etag}`;
          const anchor = document.createElement('a');
          anchor.href = downloadUrl;
          anchor.download = `file_${etag}.pdf`;
          anchor.style.display = 'none';
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          setConvertedFileUrl(downloadUrl);
        });
      } else {
        alert("Failed to merge files into PDF.");
      }
    } catch (error) {
      console.error("Error during file upload or merge:", error);
      alert("An error occurred during the upload or merge process.");
    }
  };

  return (
  //   <DndProvider backend={HTML5Backend}>
  //     <Header />
  //     <div
  //       className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16"
  //       style={{
  //         backgroundImage: `url(${backgroundImage})`,
  //       }}
  //     >
  //       <div className="flex flex-col items-center">
  //         <h2 className="text-5xl font-bold mt-20 mb-6 text-gray-800">
  //           Image to PDF
  //         </h2>
  //         <h3 className="text-2xl mt-0 mb-10 text-gray-800">
  //           Convert JPEG and PNG images to PDF.
  //         </h3>
  //
  //         <div
  //           className="w-96 h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition ease-in-out duration-300 shadow-lg"
  //           onDrop={handleDrop}
  //           onDragOver={handleDragOver}
  //         >
  //           <p className="text-gray-600 text-center">Drag & Drop Images here</p>
  //           <input
  //             type="file"
  //             multiple
  //             accept="image/jpeg, image/png"
  //             onChange={handleFiles}
  //             className="hidden"
  //             id="fileInput"
  //           />
  //         </div>
  //
  //         <label
  //           htmlFor="fileInput"
  //           className="mt-9 bg-blue-500 text-white px-20 py-8 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-xl"
  //         >
  //           Click to Select Files
  //         </label>
  //
  //         <div className="mt-9 grid grid-cols-3 gap-4">
  //           {files.map((file, index) => (
  //             <FileItem
  //               key={`${file.name}-${index}`}
  //               index={index}
  //               file={file}
  //               moveFile={moveFile}
  //               removeFile={removeFile}
  //             />
  //           ))}
  //         </div>
  //
  //         <button
  //           onClick={handleUpload}
  //           className="mt-2 bg-green-500 text-white px-10 py-5 rounded-lg cursor-pointer hover:bg-green-600 transition ease-in-out duration-300 text-xl"
  //         >
  //           Convert Files
  //         </button>
  //
  //         {convertedFileUrl && (
  //           <a
  //             href={convertedFileUrl}
  //             download="converted_file.pdf"
  //             className="mt-10 bg-blue-500 text-white px-10 py-5 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-xl"
  //           >
  //             Download Converted PDF
  //           </a>
  //         )}
  //       </div>
  //     </div>
  //   </DndProvider>
  //
    <DndProvider backend={HTML5Backend}>
      <Header />
      <div
        className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex flex-col items-center w-full max-w-6xl px-4 py-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-10 mb-4 text-gray-800">
            Image to PDF
          </h2>
          <h3 className="text-xl sm:text-2xl mt-0 mb-8 text-gray-800 text-center">
            Convert JPEG and PNG images to PDF.
          </h3>

          <div
            className="w-full max-w-2xl h-60 sm:h-80 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:bg-opacity-50 transition ease-in-out duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-gray-600 text-center text-lg sm:text-xl">Drag & Drop Images here</p>
            <input
              type="file"
              multiple
              accept="image/jpeg, image/png"
              onChange={handleFiles}
              className="hidden"
              id="fileInput"
            />
          </div>

          <label
            htmlFor="fileInput"
            className="mt-6 sm:mt-8 bg-blue-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg sm:text-xl"
          >
            Click to Select Files
          </label>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
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

            {/* Convert Button */}
            <button
              onClick={handleUpload}
              className="mt-8 bg-green-500 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg cursor-pointer hover:bg-green-600 transition ease-in-out duration-300 text-lg sm:text-xl"
            >
              Convert to PDF
            </button>
          

          {convertedFileUrl && (
            <a
              href={convertedFileUrl}
              download="converted_file.pdf"
              className="mt-6 bg-blue-500 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg cursor-pointer hover:bg-blue-600 transition ease-in-out duration-300 text-lg sm:text-xl"
            >
              Download Converted PDF
            </a>
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default ImageToPDF;
// import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
// import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { useMemo, useState } from 'react';
// import Header from '../../components/Home/Header';
// import backgroundImage from '../../components/img/background.svg';
//
// const FileItem = ({ file, index, removeFile, isActive = false, isOverlay = false }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: file.name,
//   });
//
//   const previewUrl = URL.createObjectURL(file);
//
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isOverlay ? 0.7 : 1, // Set overlay opacity
//     border: isActive ? '2px dashed gray' : '1px solid transparent', // Gray placeholder
//   };
//
//   return (
//       <div
//           ref={setNodeRef}
//           style={style}
//           {...attributes}
//           {...listeners}
//           className={`relative w-full h-auto aspect-[210/297] border rounded-lg shadow-md p-2 flex flex-col items-center justify-center bg-white overflow-hidden ${
//               isOverlay ? 'pointer-events-none' : ''
//           }`}
//       >
//         {!isOverlay && (
//             <button
//                 onClick={(event) => {
//                   event.stopPropagation();
//                   removeFile(index);
//                 }}
//                 onMouseDown={(event) => {
//                   event.stopPropagation();
//                   removeFile(index);
//                   console.log('Mouse down:', file.name);
//                 }}
//                 onMouseEnter={
//                   (event) => {
//                     console.log('Mouse enter:', file.name);
//                   }}
//                 className="absolute top-1 right-1 bg-white bg-opacity-75 rounded-full text-red-500 hover:text-red-700"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//         )}
//         <img src={previewUrl} alt={file.name} className="object-cover w-full h-full rounded-md" />
//         <p className="text-center text-gray-700 text-sm mt-2">Page {index + 1}</p>
//       </div>
//   );
// };
//
// const ImageToPdf = () => {
//   const [files, setFiles] = useState([]);
//   const [activeId, setActiveId] = useState(null);
//
//   const handleDrop = (event) => {
//     event.preventDefault();
//     const newFiles = Array.from(event.dataTransfer.files);
//     setFiles((prev) => [...prev, ...newFiles]);
//   };
//
//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };
//
//   const handleFiles = (event) => {
//     const newFiles = Array.from(event.target.files);
//     setFiles((prev) => [...prev, ...newFiles]);
//   };
//
//   const handleRemoveFile = (index) => {
//     console.log('Removing file:', files[index].name);
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//   };
//
//   const handleDragStart = (event) => {
//     console.log('Drag started:', event.active.id);
//     setActiveId(event.active.id);
//   };
//
//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     setActiveId(null);
//     if (active.id !== over.id) {
//       setFiles((prev) => {
//         const oldIndex = prev.findIndex((file) => file.name === active.id);
//         const newIndex = prev.findIndex((file) => file.name === over.id);
//         return arrayMove(prev, oldIndex, newIndex);
//       });
//     }
//   };
//
//   const activeFile = useMemo(() => files.find((file) => file.name === activeId), [activeId, files]);
//
//   return (
//       <div>
//         <Header />
//         <div
//             className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16"
//             style={{
//               backgroundImage: `url(${backgroundImage})`,
//             }}
//         >
//           <div
//               className="flex flex-col items-center w-full min-h-screen p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
//             <h2 className="text-4xl font-bold mt-10 mb-4 text-gray-800">Image to PDF</h2>
//             <p className="text-lg mt-0 mb-6 text-gray-500 text-center">
//               Easily convert your JPEG and PNG images to a single PDF.
//             </p>
//
//             {/* Drag-and-Drop Area */}
//             <div
//                 className=" min-h-full border-4 border-dashed border-blue-500 rounded-lg flex flex-col items-center justify-center bg-gray-100 hover:bg-blue-100 transition duration-300 shadow-lg cursor-pointer p-8"
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//             >
//               <label htmlFor="fileInput">
//                 <p className="text-lg text-gray-600 font-semibold mb-2">Drag & Drop Images Here</p>
//                 <p className="text-sm text-gray-400">(or click to browse)</p>
//               </label>
//               <DndContext
//                   collisionDetection={closestCenter}
//                   onDragStart={handleDragStart}
//                   onDragEnd={handleDragEnd}
//               >
//                 <SortableContext items={files.map((file) => file.name)}>
//                   <div
//                       className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
//                     {files.map((file, index) => (
//                         <FileItem
//                             key={file.name}
//                             file={file}
//                             index={index}
//                             removeFile={handleRemoveFile}
//                             isActive={file.name === activeId}
//                         />
//                     ))}
//                   </div>
//                 </SortableContext>
//
//                 {/* Drag Overlay for Smooth Animation */}
//                 <DragOverlay>
//                   {activeFile ? (
//                       <FileItem
//                           file={activeFile}
//                           index={files.findIndex((f) => f.name === activeFile.name)}
//                           isOverlay
//                       />
//                   ) : null}
//                 </DragOverlay>
//               </DndContext>
//               <input
//                   type="file"
//                   multiple
//                   accept="image/jpeg, image/png"
//                   onChange={handleFiles}
//                   className="hidden"
//                   id="fileInput"
//               />
//             </div>
//           </div>
//         </div>
//
//       </div>
//   );
// };
//
// export default ImageToPdf;

