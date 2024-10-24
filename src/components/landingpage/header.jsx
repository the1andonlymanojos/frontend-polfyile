import React, { useState } from "react";
import SignUpForm from "./SignUpForm"; // Import the SignUpForm component
import LoginForm from "./Login"; // Import the LoginForm component

const Header = () => {
  const [showSignUp, setShowSignUp] = useState(false); // State to control the signup popup
  const [showLogin, setShowLogin] = useState(false); // State to control the login popup

  const handleSignUpClick = () => {
    setShowSignUp(true); // Show the signup form when button is clicked
    setShowLogin(false); // Ensure login form is hidden
  };

  const handleLoginClick = () => {
    setShowLogin(true); // Show the login form when button is clicked
    setShowSignUp(false); // Ensure signup form is hidden
  };

  const handleClosePopup = () => {
    setShowSignUp(false); // Close both popups
    setShowLogin(false);
  };

  return (
    <>
      <header className="flex flex-wrap gap-5 justify-between px-20 pt-9 pb-4 w-full bg-white border border-black border-solid max-md:px-5 max-md:max-w-full">
        <div className="flex gap-3 text-6xl text-black whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f8d890c18bf5c16d6918bdd45acbf15a748688ba0804a0fa8082349d5c8f2f?placeholderIfAbsent=true&apiKey=b649485253dc47298996013798279fca"
            alt=""
            className="object-contain shrink-0 aspect-[1.02] w-[88px]"
          />
          <h1
            className="flex-auto self-start text-40xl m-auto"
            style={{ fontFamily: "'DM Serif Text', serif", fontWeight: "bold" }}
          >
            POLYFILE
          </h1>
        </div>
        <nav className="flex gap-10 self-start mt-5 text-3xl">
          <button
            onClick={handleLoginClick}
            className="px-9 pb-3 text-black  rounded-[50px] max-md:px-5 pt-1 hover:text-sky-700 text-4xl"
          >
            Log in
          </button>
          <button
            onClick={handleSignUpClick}
            className="px-9 pb-3 text-white bg-sky-600 rounded-[50px] max-md:px-5 pt-1 hover:bg-black "
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* Popup modal for SignUpForm */}
      {showSignUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-xl text-gray-600"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-xl text-gray-600"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <LoginForm handleSignUpClick={handleSignUpClick} />{" "}
            {/* Login form displayed inside the popup */}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
