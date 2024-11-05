import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md py-4 px-4 sm:px-6">
      <nav className="max-w-7xl mx-auto">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
          <li>
            <Link to="/Help" className="text-gray-500 hover:text-blue-600 transition duration-200">
              Help
            </Link>
          </li>
          <li>
            <Link to="/About" className="text-gray-500 hover:text-blue-600 transition duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/Privacy" className="text-gray-500 hover:text-blue-600 transition duration-200">
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/Term" className="text-gray-500 hover:text-blue-600 transition duration-200">
              Terms
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;