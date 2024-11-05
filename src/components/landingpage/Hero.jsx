import React from "react";
import migrationImage from "../../components/img/migration.png";

export default function Hero() {
  return (
    <section className="w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-20 mt-10 md:mt-24 overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-8 md:gap-5">
        <div className="w-full md:w-[45%] flex flex-col justify-center">
          <h2
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-black"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            All-in-One <br /> File <span className="text-sky-600">Powerhouse</span>
          </h2>
          <p className="mt-4 md:mt-6 lg:mt-8 text-lg sm:text-xl md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl text-black">
            We build File Tools to make your life easier. Access an easy-to-use File Solution with all features you need. Convert files to PDF, from PDF, merge, fill, sign, and compress PDFs within a few clicks.
          </p>
          <div className="mt-6 md:mt-8 lg:mt-10 2xl:mt-12 flex justify-center md:justify-start">
            <a
              href="/Home"
              className="inline-flex items-center justify-center px-6 py-4 text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white bg-black rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="w-full md:w-[55%] mt-8 md:mt-0 flex items-center justify-center">
          <img
            src={migrationImage}
            alt="File migration illustration"
            className="w-full h-auto object-contain max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
          />
        </div>
      </div>
    </section>
  );
}
