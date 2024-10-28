import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./Login";

const Header = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleClosePopup = () => {
    setShowSignUp(false);
    setShowLogin(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1041] w-full h-[80px] lg:h-[100px] bg-white shadow-md shadow-gray-500/30 px-6 flex items-center max-md:px-4">
        <div className="flex gap-3 text-black whitespace-nowrap items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f8d890c18bf5c16d6918bdd45acbf15a748688ba0804a0fa8082349d5c8f2f?placeholderIfAbsent=true&apiKey=b649485253dc47298996013798279fca"
            alt="Polyfile Logo"
            className="object-contain shrink-0 aspect-[1.02] w-[50px] lg:w-[88px]"
          />
          <h1
            className="text-3xl lg:text-4xl font-bold"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            POLYFILE
          </h1>
        </div>
        <nav className="flex gap-6 lg:gap-10 ml-auto text-lg lg:text-3xl">
          <button
            onClick={handleLoginClick}
            className="px-4 lg:px-9 pb-1 lg:pb-3 pt-1 text-black rounded-[50px] hover:text-sky-700"
          >
            Log in
          </button>
          <button
            onClick={handleSignUpClick}
            className="px-4 lg:px-9 pb-1 lg:pb-3 pt-1 text-white bg-sky-600 rounded-[50px] hover:bg-black"
          >
            Sign Up
          </button>
        </nav>
      </header>

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
