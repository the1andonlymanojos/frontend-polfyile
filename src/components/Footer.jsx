import React from 'react';

const Footer = () => {
  return (
    <footer className="px-16 py-5 mt-28 w-full text-3xl text-black bg-white border border-black border-solid max-md:px-5 max-md:mt-10 max-md:max-w-full "style={{ position: 'static' }}>
      <nav>
        <ul className="flex justify-between list-none p-0 m-0">
          <li><a href="#help">Help</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="#terms">Terms</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;