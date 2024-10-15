import React from 'react';

const Footer = () => {
  return (
    <footer className="px-16 py-5 mt-28 w-full text-3xl text-black  max-md:px-5 max-md:mt-10 max-md:max-w-full "style={{ position: 'static' }}>
      <nav>
        <ul className="flex justify-center
        gap-12 list-none p-0 m-0 
        ">
          <li><a className ="text-gray-500 hover:text-blue-600" href="#help">Help</a></li>
          <li><a className ="text-gray-500 hover:text-blue-600" href="#about">About</a></li>
          <li><a className ="text-gray-500 hover:text-blue-600"  href="#privacy">Privacy</a></li>
          <li><a className ="text-gray-500 hover:text-blue-600" href="#terms">Terms</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;