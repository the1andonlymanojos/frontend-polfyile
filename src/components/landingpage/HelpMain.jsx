import React from 'react';


const UserGuidePage = () => {
  return (
    <div className="container mx-auto py-16 ">
      <h1 className="text-7xl font-bold text-center mb-8 mt-10">Welcome to our user's guide</h1>
      <p className="text-2xl text-center mb-1 pb-10">
        Although we've tried to make it really simple, here's a short guidance to help you through the editing process.
      </p>

      <h2 className="text-5xl font-bold text-left mb-4 pt-20 mb-10 text-gray-400">Organize PDF</h2>

      <hr />

      <div className="pt-10">
        <h3 className="text-4xl font-semibold mb-2">Merge PDF</h3>
        <p className="text-2xl">
          To merge two or more PDFs, select the documents from your device or from your Google Drive or Dropbox account. You can arrange the files however you like before merging them.

          You can also combine several password-protected documents into one. Upload the selected files, process them, and then download your merged file. Check 'Merge PDF' limits for each account type.
        </p>
      </div>

      <div className="pt-10">
        <h3 className="text-4xl font-semibold mb-2">Split PDF</h3>
        <p className="text-2xl">
          To split a PDF into different files, select the document from your device or from your cloud storage accounts such as Google Drive or Dropbox. You can also divide password-protected documents.
          Upload the file to split. You can either split your file by ranges or extract all pages. You can also merge all ranges in one PDF file. Hit the Split PDF button and you'll be good to go. Check 'Split PDF' limits for each account type.
        </p>
      </div>

      <div className="pt-10">
        <h3 className="text-4xl font-semibold mb-2">Remove pages</h3>
        <p className="text-2xl">
          To remove pages from one or multiple PDFs, upload your file from your device or download it from your cloud-connected accounts as Google Drive or Dropbox. You can remove pages from password protected documents as well.
          You will see a thumbnail of every page of your file. When uploading multiple files, the thumbnails of each file will be framed in a different color. You can click on each thumbnail to remove that page. After clicking, a red cross will appear over the thumbnail, showing that the page will be removed. Hit on Remove Pages button to download your processed PDF. Check 'Remove Pages' limits for each account type.
        </p>
      </div>


      <div className="pt-10">
        <h3 className="text-4xl font-semibold mb-2">Extract pages</h3>
        <p className="text-2xl">
          To extract pages from a PDF file, upload your file from your device or from your cloud storage accounts as Google Drive or Dropbox. You can remove pages from password protected documents too.

          You will see a thumbnail of every page of your file. When uploading more than one file, the thumbnails of each file will be framed in a different color. Click on the pages you want to extract. Choose if you want to merge all the extracted pages into a new PDF or download it in a .zip folder. Then, hit the Extract Pages button. Check 'Extract Pages' limits for each account type.
        </p>
      </div>

      <div className="pt-10">
        <h3 className="text-4xl font-semibold mb-2">Organize PDF</h3>
        <p className="text-2xl">
          To organize the pages from a PDF file, upload your file from your device or download it straight from the cloud through your Google Drive or Dropbox account. You can remove pages from password protected documents as well.

          You will see a thumbnail of every page of your file. When uploading more than one file, the thumbnails of each file will be framed in a different color. Then you can remove or drag and drop the thumbnails to rearrange PDF pages however you like. Hit the 'Organize PDF' button to download your new PDF. Check 'Organize PDF' limits for each account type.
        </p>
      </div>


      <h2 className="text-5xl font-bold text-left mb-4 pt-20 mb-10 text-gray-400">OPTIMIZE PDF</h2>

      <hr />

      <div className="pt-10">
        <h3 className="text-4xl font-semibold mb-2">Compress PDF</h3>
        <p className="text-2xl">
          To compress PDF files, select the documents from your device or from your Google Drive or Dropbox account. Upload the file or files to optimize. Choose between extreme, high or regular compression level and then hit the Compress PDF button. The higher compression, the lower file size and quality.
          Click 'Compress PDF' button to download your reduced PDF or save it back to the cloud. Check 'Compress PDF' limits for each account type.
        </p>
      </div>


      <h2 className="text-5xl font-bold text-left mb-4 pt-20 mb-10 text-gray-400">EDIT PDF</h2>

      <hr />

      <div className="pt-10">
        <h3 className="text-4xl font-semibold mb-2">Edit PDF</h3>
        <p className="text-2xl">
          To edit your PDF, upload your file from your device or from your Google Drive or Dropbox account.

          Once inside the PDF viewer, use the top toolbar to navigate through your document. Click on the wheel icon to decide your page setup. You can view a single page or multiple pages at once. To move in and around individual pages, select the hand icon.Use the magnifying glasses to zoom in and out on specific sections of the document.

          To add elements or text to a page, scroll down to the page which you want to edit. Choose from the Text, Image or Shape icons available in the Edit PDF toolbar at the top of the viewer. Use your mouse to resize or move any element as you wish on the same page where it was created.

          To add elements to a different page, navigate to the page and then select a new item from the toolbar. Change the colour, transparency, border color, rotation, format or line thickness of your images, shapes or texts using their property bars. Click the ‘Edit PDF’ button to process your file.
        </p>
      </div>
    </div>






  );
};

export default UserGuidePage;