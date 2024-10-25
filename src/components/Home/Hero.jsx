import React from "react";
import { TextParallaxContentExample } from "./TextParallaxContentExample";
import Tools from "./Tools";

const Hero = () => {
  return (
    <>
      <body>
        <div className=" relative mt-40 py-[30px] px-[45px] text-center h-[250px]">
          <h1 className="font-semibold text-6xl leading-tight text-[#33333b] text-center mx-auto mb-1">
            Every tool you could want to edit Files in bulk
          </h1>
          <h2 className="leading-relaxed text-3xl font-normal text-[#47474f] max-w-[980px] mx-auto mb-[28px]">
            Your online File editor is here and forever free!
          </h2>
        </div>

        <TextParallaxContentExample />
        <Tools />

        <div className=" relative mt-40 py-[0px] px-[45px] text-center h-[250px]">
          <h1 className="font-semibold text-6xl leading-tight text-[#33333b] text-center mx-auto mb-3">
            Your trusted online File editor, loved by users worldwide
          </h1>
          <h2 className="leading-relaxed text-3xl font-normal text-[#47474f] max-w-[1200px] mx-auto mb-[28px] mt-[20px]">
            PolyFile is your simple solution for editing images online. Access
            all the tools you need to enhance your images easily, straight from
            the web, with 100% security.
          </h2>
        </div>
      </body>
    </>
  );
};

export default Hero;
