import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full text-lg md:text-3xl text-black px-5 max-md:px-2">
      <nav>
        <ul className="flex justify-center gap-8 md:gap-12 list-none p-0 m-0">
          <li>
            <a className="text-gray-500 hover:text-blue-600 transition duration-200" href="/Help">
              Help
            </a>
          </li>
          <li>
            <a className="text-gray-500 hover:text-blue-600 transition duration-200" href="/About">
              About
            </a>
          </li>
          <li>
            <a className="text-gray-500 hover:text-blue-600 transition duration-200" href="/Privacy">
              Privacy
            </a>
          </li>
          <li>
            <a className="text-gray-500 hover:text-blue-600 transition duration-200" href="/Term">
              Terms
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
