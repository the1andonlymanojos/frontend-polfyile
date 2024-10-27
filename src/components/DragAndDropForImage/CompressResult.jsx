import React from 'react';

const CompressionResult = ({ originalSize, compressedSize, savedPercentage }) => {
  const savedKB = ((originalSize - compressedSize) / 1024).toFixed(2);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold text-2xl">
            {savedPercentage}%
          </div>
          <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-gray-500 text-sm">SAVED</p>
        </div>
        <p className="text-gray-800 mt-2 text-lg font-semibold">Your Images are now {savedPercentage}% smaller!</p>
        <p className="text-gray-600">{(originalSize / 1024).toFixed(2)} KB → {(compressedSize / 1024).toFixed(2)} KB</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <ActionButton icon="resize" label="Resize IMAGE" />
        <ActionButton icon="crop" label="Crop IMAGE" />
        <ActionButton icon="rotate" label="Rotate IMAGE" />
        <ActionButton icon="convert" label="Convert from JPG" />
        <ActionButton icon="watermark" label="Watermark IMAGE" />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
  <button className="flex items-center justify-between w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50">
    <div className="flex items-center gap-3">
      <span className={`icon-${icon} w-6 h-6 bg-blue-500 text-white rounded-full p-1`}></span>
      <span className="text-gray-700 font-medium">{label}</span>
    </div>
    <span className="text-blue-500 text-lg">›</span>
  </button>
);

export default CompressionResult;
