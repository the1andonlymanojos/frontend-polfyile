import React, { useState } from "react";
import "./Home.css"; // You can remove this if you no longer use external CSS.

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenPdf, setIsDropdownOpenPdf] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "pdf") {
      setIsDropdownOpenPdf((prev) => {
        if (prev) return false;
        setIsDropdownOpen(false);
        return true;
      });
    } else {
      setIsDropdownOpen((prev) => {
        if (prev) return false;
        setIsDropdownOpenPdf(false);
        return true;
      });
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const DropdownMenu = ({ isOpen, items }) =>
    isOpen && (
      <div
        className="absolute mt-9 bg-white rounded-md shadow-lg left-0 transform -translate-x-1/4 md:translate-x-0 w-3/4 md:w-52 lg:w-[600px] overflow-hidden"
      >
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 py-1 text-black overflow-auto">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="block px-2 py-2 text-center hover:bg-gray-500 hover:text-white truncate"
                style={{ maxWidth: "100%" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );

  const pdfTools = [
    { label: "Merge PDF", link: "/MergePDF" },
    { label: "Compress PDF", link: "/CompressPDF" },
    { label: "Split PDF", link: "/HtmltoPDF" },
    { label: "Watermark PDF", link: "/AddWatermark" },
    { label: "HTML to PDF", link: "/HtmltoPDF" },
    { label: "JPG to PDF", link: "/ImagetoPDF" },
    { label: "Doc to PDF", link: "/WordtoPDF" },
    { label: "Protect PDF", link: "/ProtectPDF" },
    { label: "PDF to JPG", link: "/PDFtoImage" },
    { label: "Sign PDF", link: "/CompressPDF" },
    { label: "Unlock PDF", link: "/CompressPDF" },
    { label: "Rotate PDF", link: "/WatermarkPDF" },
  ];

  const imageTools = [
    { label: "Compress Image", link: "/CompressImage" },
    { label: "Resize Image", link: "/ResizeImage" },
    { label: "Crop Image", link: "/CropImage" },
    { label: "Convert Image", link: "/ConvertImage" },
    { label: "Watermark", link: "/WaterMarkImage" },
    { label: "Rotate Image", link: "/RotateImage" },
    { label: "HTML to Image", link: "/HtmlImage" },
    { label: "SvgToOther", link: "/SvgImage" },
  ];

  return (
    <div>
      <header className="bg-white w-full h-[100px] fixed top-0 left-0 right-0 z-40 shadow-md px-6 md:px-12">
        <nav className="flex items-center h-full">
          <a className="flex items-center" href="/Home" title="PolyFile">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f8d890c18bf5c16d6918bdd45acbf15a748688ba0804a0fa8082349d5c8f2f?placeholderIfAbsent=true&apiKey=b649485253dc47298996013798279fca"
              alt="PolyFile"
              className="object-contain shrink-0 aspect-[1.02] w-[80px] mt-2.5"
            />
            <h1
              className="ml-2 mt-2 text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              POLYFILE
            </h1>
          </a>

          <div className="relative group">
            <button
              className={`flex ml-20 text-xl md:text-2xl px-4 md:px-6 py-3 rounded-md mt-1.5
              ${isDropdownOpenPdf ? "text-sky-500" : "text-grey-100"}`}
              onClick={() => toggleDropdown("pdf")}
            >
              All PDF Tools
              <span
                className={`ml-2 transition-transform duration-200 ${isDropdownOpenPdf ? "rotate-0" : "rotate-180"}`}
              >
                &#9662;
              </span>
            </button>
            <DropdownMenu isOpen={isDropdownOpenPdf} items={pdfTools} />
          </div>

          <div className="relative group">
            <button
              className={`flex ml-3 text-xl md:text-2xl text-grey-100 px-4 md:px-6 py-3 rounded-md mt-1.5 
              ${isDropdownOpen ? "text-sky-500" : "text-grey-100"}`}
              onClick={() => toggleDropdown("image")}
            >
              All Image Tools
              <span
                className={`ml-2 transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "rotate-180"}`}
              >
                &#9662;
              </span>
            </button>
            <DropdownMenu isOpen={isDropdownOpen} items={imageTools} />
          </div>

          <div
            className="relative group ml-auto"
            onMouseEnter={toggleProfileDropdown}
            onMouseLeave={toggleProfileDropdown}
          >
            <button className="flex text-xl md:text-2xl text-grey-100 px-4 md:px-6 py-3 rounded-md hover:text-sky-500 mt-1.5">
              <i className="fas fa-user-circle fa-2xl mr-0 m-auto"></i>
              <span className="ml-2">
                {isProfileDropdownOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    style={{ position: "relative", top: "5px" }}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 3.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .39.812l-6 7a.5.5 0 0 1-.78 0l-6-7A.5.5 0 0 1 1.5 3.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    style={{ position: "relative", top: "0px" }}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 12.5a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .39-.812l-6-7a.5.5 0 0 0-.78 0l-6 7A.5.5 0 0 0 1.5 12.5z"
                    />
                  </svg>
                )}
              </span>
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute mt-6 w-40 bg-white rounded-md shadow-lg right-0">
                <ul className="py-1 text-black">
                  <li>
                    <a
                      href="/account"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Account Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="/logout"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
