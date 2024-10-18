import React from 'react';


const UserGuidePage = () => {
  return (
    // <div className="container mx-auto py-16 ">
    //   <h1 className="text-7xl font-bold text-center mb-8">Our support team answers the following questions nearly every day</h1>
    //   <p className="text-4xl text-center mb-12 pb-10">
    //   We thought they could be useful for you too
    //   </p>



    // </div>

    <div className="container mx-auto py-16 px-4">
      <h1 className="text-7xl font-bold text-center mb-8">About Our File & PDF Conversion Tool</h1>
      <p className="text-4xl text-center mb-10">
        Our File and PDF Conversion tool is designed to help you manage your documents with ease. Whether you need to convert image files to PDF, extract images from a PDF, or change file formats between common types, this tool .
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0 md:space-x-12 pt-10">
        <div className="md:w-1/3">
          <h2 className="text-5xl font-semibold mb-4">Convert Files</h2>
          <p className="text-3xl">
            Seamlessly convert a variety of file formats such as JPG, PNG, and Word documents into PDFs. Our tool supports batch conversion and ensures your files maintain quality and formatting throughout the process.
          </p>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-5xl font-semibold mb-4">Extract Content</h2>
          <p className="text-3xl">
            Need to extract pages or images from a PDF? Our tool makes it simple to break down a PDF file, letting you extract exactly what you need, whether it's individual pages or embedded images in just few clicks.
          </p>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-5xl font-semibold mb-4">Flexible and User-Friendly</h2>
          <p className="text-3xl">
            With an intuitive drag-and-drop interface, our conversion tool is designed to be quick and easy to use. Upload files from your local device, Google Drive, or Dropbox, and process them.
          </p>
        </div>
      </div>




      <div className="grid md:grid-cols-2 gap-8 mt-40">
        <div className="p-10 bg-white shadow-lg rounded-lg">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">Ease of Use</h2>
          <p className="text-xl text-gray-600">
            Our platform is intuitive and user-friendly, designed for both professionals and beginners. With just a few clicks, you can upload your documents and transform them into the format you need, making the process as smooth as possible.
          </p>
        </div>

        <div className="p-10 bg-white shadow-lg rounded-lg">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">Multiple Conversion Formats</h2>
          <p className="text-xl text-gray-600">
            Whether you're converting PDFs to Word, Excel, PowerPoint, or images, our tool supports a wide range of formats. You can also perform advanced tasks like merging multiple PDFs or compressing files for easier sharing.
          </p>
        </div>

        <div className="p-10 bg-white shadow-lg rounded-lg">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">Cloud Integration</h2>
          <p className="text-xl text-gray-600">
            Seamlessly integrate with your cloud storage platforms like Google Drive and Dropbox. You can upload and save your converted files directly from and to the cloud, ensuring your documents are always accessible.
          </p>
        </div>

        <div className="p-10 bg-white shadow-lg rounded-lg">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">Security and Privacy</h2>
          <p className="text-xl text-gray-600">
            Your privacy is our priority. We ensure that all uploaded files are securely handled and deleted from our servers after processing. Whether converting personal or business documents, you can trust our platform to keep your data safe.
          </p>
        </div>
      </div>
    </div>




  );
};

export default UserGuidePage;