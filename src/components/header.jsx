import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between px-20 pt-9 pb-4 w-full bg-white border border-black border-solid max-md:px-5 max-md:max-w-full">
      <div className="flex gap-3 text-6xl text-black whitespace-nowrap  ">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f8d890c18bf5c16d6918bdd45acbf15a748688ba0804a0fa8082349d5c8f2f?placeholderIfAbsent=true&apiKey=b649485253dc47298996013798279fca" alt="" className="object-contain shrink-0 aspect-[1.02] w-[88px]" />
        <h1 className="flex-auto self-start text-40xl m-auto " style={{ fontFamily: "'DM Serif Text', serif", fontWeight: 'bold' }}>POLYFILE</h1>
     
      </div>
      <nav className="flex gap-10 self-start mt-5 text-3xl">
        <a href="#login" className="self-start text-black text-4xl">Log in</a>
        <a href="#signup" className="px-9 pb-3  text-white bg-sky-600 rounded-[50px] max-md:px-5 ">Sign Up</a>
      </nav>
    </header>
  );
};

export default Header;