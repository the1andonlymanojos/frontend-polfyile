import React from "react";
import { TextParallaxContentExample } from "./TextParallaxContentExample";
import Tools from "./Tools";
import PDFTools from "./PDFTools";
import Helpfooter from "../../components/landingpage/Helpfooter";

const Hero = () => {
  return (
    <>
      <div className="mt-40 py-8 px-6 md:px-12 lg:px-20 text-center h-auto">
        <h1 className="font-semibold text-3xl md:text-5xl lg:text-6xl leading-tight text-[#33333b] mx-auto mb-2">
          Every tool you could want to edit Files in bulk
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-[#47474f] max-w-2xl md:max-w-4xl mx-auto mb-7">
          Your online File editor is here and forever free!
        </h2>
      </div>

      <TextParallaxContentExample />

      <div className="text-center mt-20 mb-10">
  <h2
    
    className="text-3xl md:text-4xl lg:text-5xl bg-clip-text hover:text-blue-500 transition-colors duration-300"
  >
    PDF Tools
  </h2>
</div>


      <PDFTools />

      <div className="text-center mt-20 mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl bg-clip-text hover:text-blue-500 transition-colors duration-300">
          Image Tools
        </h2>
      </div>

      <Tools />

      <div className="mt-15 py-8 px-6 md:px-12 lg:px-20 text-center h-auto">
        <h1 className="font-semibold text-3xl md:text-5xl lg:text-6xl leading-tight text-[#33333b] mx-auto mb-4">
          Your trusted online File editor, loved by users worldwide
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-[#47474f] max-w-2xl md:max-w-5xl mx-auto mb-7 mt-5">
          PolyFile is your simple solution for editing images online. Access
          all the tools you need to enhance your images easily, straight from
          the web, with 100% security.
        </h2>
      </div>

      <div className="mt-20">
        <Helpfooter />
      </div>
    </>
  );
};

export default Hero;
