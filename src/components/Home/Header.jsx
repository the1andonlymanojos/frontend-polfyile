import React, { useState } from "react";
import "./Home.css";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenPdf, setIsDropdownOpenPdf] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Function to toggle dropdown on hover
  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "pdf") {
      setIsDropdownOpenPdf((prev) => {
        // If the PDF dropdown is currently open, close it and return false.
        if (prev) {
          // Close the image dropdown if it's open.
          return false;
        }
        // Otherwise, open the PDF dropdown and close the image dropdown.
        setIsDropdownOpen(false); // Ensure the image dropdown is closed.
        return true; // Open the PDF dropdown.
      });
    } else {
      setIsDropdownOpen((prev) => {
        // If the image dropdown is currently open, close it and return false.
        if (prev) {
          // Close the PDF dropdown if it's open.
          return false;
        }
        // Otherwise, open the image dropdown and close the PDF dropdown.
        setIsDropdownOpenPdf(false); // Ensure the PDF dropdown is closed.
        return true; // Open the image dropdown.
      });
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Reusable Dropdown Component
  const DropdownMenu = ({ isOpen, items }) =>
    isOpen && (
      <div
        className="absolute mt-9 w-52 bg-white rounded-md shadow-lg"
        style={{ width: "600px", left: "0", transform: "translateX(-10%)" }}
      >
        <ul className="grid grid-cols-4 gap-3 py-1 text-black">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="block px-2 py-2 text-center hover:bg-gray-500 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );

  // Dropdown data
  const pdfTools = [
    { label: "Convert to PDF", link: "/convert-to-pdf" },
    { label: "Merge PDF", link: "/merge-pdf" },
    { label: "Compress PDF", link: "/compress-pdf" },
    { label: "Sign PDF", link: "/sign-pdf" },
    { label: "Unlock PDF", link: "/unlock-pdf" },
    { label: "Annotate PDF", link: "/annotate-pdf" },
    { label: "Watermark PDF", link: "/watermark-pdf" },
    { label: "PDF to Word", link: "/convert-to-word" },
    { label: "PDF to Text", link: "/convert-from-pdf" },
    { label: "Extract Pages", link: "/extract-pages" },
    { label: "Batch Convert", link: "/batch-convert-pdf" },
    { label: "HTML to PDF", link: "/html-to-pdf" },
    { label: "PDF to PPT", link: "/convert-pdf-ppt" },
    { label: "Embed PDF", link: "/embed-pdf" },
    { label: "Doc to PDF", link: "/convert-doc-to-pdf" },
    { label: "PDF to HTML", link: "/convert-pdf-html" },
  ];

  const imageTools = [
    { label: "Compress Image", link: "/compress-image" },
    { label: "Resize Image", link: "/resize-image" },
    { label: "Crop Image", link: "/crop-image" },
    { label: "Convert Image", link: "/convert-image" },
    { label: "Watermark", link: "/watermark-image" },
    { label: "Rotate Image", link: "/rotate-image" },
    { label: "HTML to Image", link: "/html-to-image" },
    { label: "Convert Image", link: "/convert-image" },
  ];

  return (
    <div>
      <header className="header">
        <nav className="flex items-center bg-white position-relative">
          {/* Brand Section */}
          <a className="flex items-center" href="/Home" title="PolyFile">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f8d890c18bf5c16d6918bdd45acbf15a748688ba0804a0fa8082349d5c8f2f?placeholderIfAbsent=true&apiKey=b649485253dc47298996013798279fca"
              alt="PolyFile"
              className="object-contain shrink-0 aspect-[1.02] w-[80px] mt-2.5"
            />
            <h1
              className="ml-2 mt-2 text-5xl font-bold"
              style={{ fontFamily: "'DM Serif Text', serif" }}
            >
              POLYFILE
            </h1>
          </a>

          {/* PDF Tools Dropdown */}
          <div className="relative group">
            <button
              className={`flex ml-20 text-2xl px-6 py-3 rounded-md mt-1.5
              ${isDropdownOpenPdf ? "text-sky-500 " : "text-grey-100"}`}
              onClick={() => toggleDropdown("pdf")}
            >
              All PDF Tools
              <span
                className={`ml-2 ${
                  isDropdownOpenPdf ? "rotate-0" : "rotate-180"
                }`}
              >
                &#9662;
              </span>
            </button>
            <DropdownMenu isOpen={isDropdownOpenPdf} items={pdfTools} />
          </div>

          {/* Image Tools Dropdown */}
          <div className="relative group">
            <button
              className={`flex ml-3 text-2xl text-grey-100 px-6 py-3 rounded-md  mt-1.5 
              ${isDropdownOpen ? "text-sky-500 " : "text-grey-100"}`}
              onClick={() => toggleDropdown("image")}
            >
              All Image Tools
              <span
                className={`ml-2 ${isDropdownOpen ? "rotate-0" : "rotate-180"}`}
              >
                &#9662;
              </span>
            </button>
            <DropdownMenu isOpen={isDropdownOpen} items={imageTools} />
          </div>

          {/* profile section */}
          {/* Profile Section */}
          <div
            className="relative group ml-auto" // Ensure the profile section is aligned to the right
            onMouseEnter={toggleProfileDropdown}
            onMouseLeave={toggleProfileDropdown}
          >
            <button className="flex text-2xl text-grey-100 px-6 py-3 rounded-md hover:text-sky-500 mt-1.5">
              <i className="fas fa-user-circle fa-2xl  mr-0 m-auto"></i>{" "}
              {/* User icon */}
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
              <div className="absolute mt-6 w-40  bg-white rounded-md shadow-lg right-0">
                <div className="dropdown-arrow ml-3"></div>
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
