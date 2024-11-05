import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Video from "../img/Invoices icons.gif";
import { Link } from "react-router-dom";

export const TextParallaxContentExample = () => {
  return (
    <div className="overflow-hidden">
      <TextParallaxContent imgUrl={Video} />
      <ExampleContent />
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading }) => {
  return (
    <div className="w-full px-4 md:w-[80%] lg:w-[60%] mx-auto md:px-0">
      <div className="relative h-[60vh] md:h-[80vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(60vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl md:h-[calc(70vh-24px)]"
    />
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-white px-4 text-center"
    >
      <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-2">{heading}</h2>
      <p className="text-base md:text-xl lg:text-2xl">{subheading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-16 pt-8 md:pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-2xl md:text-3xl font-bold md:col-span-4">
      About our Website
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-base md:text-xl text-neutral-600">
        Poly File is designed to be a powerful, all-in-one platform for file
        manipulation tasks, utilizing a wide array of open-source software. The
        platform will be built with scalability and flexibility in mind,
        allowing it to handle a diverse range of file formats and operations.
      </p>
      <p className="mb-8 text-base md:text-xl text-neutral-600">
        The microservice-based backend will ensure that each file operation is
        handled by a dedicated service, promoting ease of maintenance and
        scalability.
      </p>
      <Link 
        to="#pdf-tools" 
        className="inline-block w-full md:w-auto rounded bg-neutral-900 px-6 md:px-9 py-3 md:py-4 text-lg md:text-xl text-white transition-colors hover:bg-neutral-700"
      >
        Try Now <FiArrowUpRight className="inline ml-2" />
      </Link>
    </div>
  </div>
);

export default TextParallaxContentExample;
