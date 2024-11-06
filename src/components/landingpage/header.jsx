import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./Login";
import {browser} from "globals";

const Header = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
    setShowMobileMenu(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
    setShowMobileMenu(false);
  };

  const handleClosePopup = () => {
    setShowSignUp(false);
    setShowLogin(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1041] w-full h-[60px] sm:h-[80px] lg:h-[100px] bg-white px-4 lg:px-6 flex items-center">
        <div className="flex gap-2 sm:gap-3 text-black whitespace-nowrap items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f8d890c18bf5c16d6918bdd45acbf15a748688ba0804a0fa8082349d5c8f2f?placeholderIfAbsent=true&apiKey=b649485253dc47298996013798279fca"
            alt="Polyfile Logo"
            className="object-contain shrink-0 aspect-[1.02] w-[40px] sm:w-[50px] lg:w-[88px]"
          />
          <h1
            className="text-xl sm:text-3xl lg:text-4xl font-bold"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            POLYFILE
          </h1>
        </div>
        <button
          className="sm:hidden ml-auto text-2xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-[1042] bg-white pt-[60px]">
          <nav className="flex flex-col items-center gap-4 p-4">
            <a
              href={"/Home"}
              className="w-full px-4 py-2 text-lg text-black rounded-[50px] hover:text-sky-700 border border-black"
            >
              Get Started
            </a>
          </nav>
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      )}

      {/* Popup modal for SignUpForm */}
      {showSignUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6">
          <div className="relative bg-white p-6 lg:p-8 rounded-lg shadow-lg max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <SignUpForm handleLoginClick={handleLoginClick} />
          </div>
        </div>
      )}

      {/* Popup modal for LoginForm */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6">
          <div className="relative bg-white p-6 lg:p-8 rounded-lg shadow-lg max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <LoginForm handleSignUpClick={handleSignUpClick} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;