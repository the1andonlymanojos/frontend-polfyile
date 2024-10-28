import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full text-3xl text-black px-5 mt-10 max-md:max-w-full">
      <nav>
        <ul className="flex justify-center gap-12 list-none p-0 m-0">
          <li><a className="text-gray-500 hover:text-blue-600" href="/Help">Help</a></li>
          <li><a className="text-gray-500 hover:text-blue-600" href="/About">About</a></li>
          <li><a className="text-gray-500 hover:text-blue-600" href="/Privacy">Privacy</a></li>
          <li><a className="text-gray-500 hover:text-blue-600" href="/Term">Terms</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
