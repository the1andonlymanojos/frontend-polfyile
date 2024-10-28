import React from "react";
import migrationImage from "../../components/img/migration.png";

const Hero = () => {
  return (
    <section className="flex flex-col items-start pl-20 mt-24 w-full max-md:pl-5 max-md:mt-10 max-lg:px-8 max-sm:px-4">
      <div className="self-stretch max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[45%] max-md:w-full">
            <div className="flex flex-col self-stretch my-auto mr-0 text-black max-md:mt-10 max-md:max-w-full">
              <h2
                className="text-6xl lg:text-8xl md:text-7xl sm:text-5xl max-md:max-w-full"
                style={{
                  fontFamily: "'DM Serif Text', serif",
                  fontWeight: "bold",
                }}
              >
                All-in-One <br /> File{" "}
                <span className="text-sky-600">Powerhouse</span>
              </h2>
              <p className="self-start mt-8 lg:mt-12 text-2xl lg:text-3xl md:text-xl sm:text-lg max-md:mt-6 max-md:max-w-full">
                We build File Tools to make your life easier. Access an
                easy-to-use File Solution with all features you need. Convert
                files to PDF, from PDF, merge, fill, sign, and compress PDFs
                within a few clicks.
              </p>
              <div className="relative mt-8 lg:mt-12">
                <button className="flex shrink-0 max-w-full bg-black h-[50px] lg:h-[57px] rounded-[50px] w-[250px] lg:w-[345px] items-center justify-center">
                  <a className="z-10 text-2xl lg:text-3xl tracking-wide text-white" href="/Home">
                    Get Started
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[55%] max-md:w-full">
            <img
              loading="lazy"
              src={migrationImage}
              alt="Migration illustration"
              className="object-contain grow w-full max-w-full aspect-[1.66] max-md:aspect-[1.5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
