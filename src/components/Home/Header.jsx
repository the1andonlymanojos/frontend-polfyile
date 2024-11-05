import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, Menu, User } from 'lucide-react';
import './Home.css';

export default function Header() {
  const [isDropdownOpenPdf, setIsDropdownOpenPdf] = useState(false);
  const [isDropdownOpenImage, setIsDropdownOpenImage] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === 'pdf') {
      setIsDropdownOpenPdf(!isDropdownOpenPdf);
      setIsDropdownOpenImage(false);
    } else if (dropdownType === 'image') {
      setIsDropdownOpenImage(!isDropdownOpenImage);
      setIsDropdownOpenPdf(false);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpenPdf(false);
    setIsDropdownOpenImage(false);
  };

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setIsDropdownOpenPdf(false);
        setIsDropdownOpenImage(false);
      }
    };

    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);

  const pdfTools = [
    { label: "Merge PDF", link: "/MergePDF" },
    { label: "Compress PDF", link: "/CompressPDF" },
    { label: "Split PDF", link: "/HtmltoPDF" },
    { label: "Watermark PDF", link: "/AddWatermark" },
    { label: "JPG to PDF", link: "/ImagetoPDF" },
    { label: "Doc to PDF", link: "/WordtoPDF" },
    { label: "Protect PDF", link: "/ProtectPDF" },
    { label: "PDF to JPG", link: "/PDFtoImage" },
  ];

  const imageTools = [
    { label: "Compress Image", link: "/CompressImage" },
    { label: "Resize Image", link: "/ResizeImage" },
    { label: "Convert Image", link: "/ConvertImage" },
    { label: "Watermark", link: "/WaterMarkImage" },
    { label: "Rotate Image", link: "/RotateImage" },
    { label: "SvgToOther", link: "/SvgImage" },
  ];

  const DropdownMenu = ({ isOpen, items }) => (
    isOpen && (
      <div className="absolute mt-2 bg-white rounded-md shadow-lg left-0 w-full md:w-52 lg:w-[600px] overflow-hidden z-50">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 py-1 text-black overflow-auto">
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="block px-2 py-2 text-center hover:bg-gray-500 hover:text-white truncate">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  );

  return (
    <>
      <style jsx>{`
        body, html {
          overflow: auto;
          padding-top: 10px;
          margin: 0;
        }
      `}</style>
      <header className="bg-white w-full h-[100px] fixed top-0 left-0 right-0 z-40 shadow-md px-4 md:px-6 lg:px-12">
        <nav className="flex items-center justify-between h-full">
          <a href="/Home" className="flex items-center" title="PolyFile">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f8d890c18bf5c16d6918bdd45acbf15a748688ba0804a0fa8082349d5c8f2f?placeholderIfAbsent=true&apiKey=b649485253dc47298996013798279fca"
              alt="PolyFile"
              className="object-contain shrink-0 aspect-[1.02] w-[80px] mt-2.5"
            />
            <h1 className="ml-2 mt-2 text-2xl md:text-3xl font-bold" style={{ fontFamily: "'DM Serif Text', serif" }}>
              POLYFILE
            </h1>
          </a>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group dropdown-container">
              <button
                className={`flex text-xl lg:text-2xl px-4 lg:px-6 py-3 rounded-md mt-1.5 ${isDropdownOpenPdf ? "text-sky-500" : "text-gray-700"}`}
                onClick={() => toggleDropdown('pdf')}
              >
                All PDF Tools
                {isDropdownOpenPdf ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
              </button>
              <DropdownMenu isOpen={isDropdownOpenPdf} items={pdfTools} />
            </div>

            <div className="relative group dropdown-container">
              <button
                className={`flex text-xl lg:text-2xl px-4 lg:px-6 py-3 rounded-md mt-1.5 ${isDropdownOpenImage ? "text-sky-500" : "text-gray-700"}`}
                onClick={() => toggleDropdown('image')}
              >
                All Image Tools
                {isDropdownOpenImage ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
              </button>
              <DropdownMenu isOpen={isDropdownOpenImage} items={imageTools} />
            </div>
          </div>

          <div className="flex items-center">
            <div
              className="relative group"
              onMouseEnter={toggleProfileDropdown}
              onMouseLeave={toggleProfileDropdown}
            >
              <button className="flex text-xl lg:text-2xl text-gray-700 px-4 lg:px-6 py-3 rounded-md hover:text-sky-500 mt-1.5">
                <User className="w-6 h-6 mr-2" />
                {isProfileDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg right-0 z-50">
                  <ul className="py-1 text-black">
                    <li>
                      <a href="/account" className="block px-4 py-2 hover:bg-gray-100">
                        Account Settings
                      </a>
                    </li>
                    <li>
                      <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button className="md:hidden text-gray-700 hover:text-sky-500" onClick={toggleMobileMenu}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-[100px] overflow-y-auto">
          <div className="px-4 py-2">
            <button
              className="flex items-center text-lg font-semibold mb-4"
              onClick={toggleMobileMenu}
            >
              <ChevronLeft className="mr-2" /> Back
            </button>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">All PDF Tools</h2>
              <ul className="pl-4">
                {pdfTools.map((tool, index) => (
                  <li key={index}>
                    <a href={tool.link} className="block py-2 hover:text-sky-500">{tool.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">All Image Tools</h2>
              <ul className="pl-4">
                {imageTools.map((tool, index) => (
                  <li key={index}>
                    <a href={tool.link} className="block py-2 hover:text-sky-500">{tool.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}