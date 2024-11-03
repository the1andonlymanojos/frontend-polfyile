import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import backgroundImage from "../../components/img/background.svg";
import Header from "../Home/Header";

const HtmlToImageFromUrlApp = () => {
  const [url, setUrl] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const captureRef = useRef(null);

  const handleFetchHtml = async () => {
    try {
      const response = await axios.get(url);
      setHtmlContent(response.data);
      setDownloadUrl(''); // Clear any previous download URL
    } catch (error) {
      console.error('Error fetching HTML:', error);
      alert('Failed to fetch HTML. Please check the URL or your network.');
    }
  };

  const handleCaptureClick = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        setDownloadUrl(imgData);
      });
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'captured-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadUrl(''); // Reset the download URL after download
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-cover bg-no-repeat pt-16"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header />
      <h2 className="text-4xl font-bold mt-7 mb-6 text-gray-800 text-center">HTML to Image Converter</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded p-2 mb-4 w-11/12 md:w-1/2 lg:w-1/3"
      />
      <button
        onClick={handleFetchHtml}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ease-in-out duration-300"
      >
        Fetch HTML
      </button>

      <div ref={captureRef} className="border p-5 bg-white rounded-lg shadow-md mt-5 w-11/12 md:w-1/2 lg:w-1/3">
        <h3 className="text-2xl font-semibold">Fetched HTML Content</h3>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {htmlContent && (
        <button
          onClick={handleCaptureClick}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ease-in-out duration-300"
        >
          Capture Image
        </button>
      )}

      {downloadUrl && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ease-in-out duration-300"
        >
          Download Image
        </button>
      )}
    </div>
  );
};

export default HtmlToImageFromUrlApp;
