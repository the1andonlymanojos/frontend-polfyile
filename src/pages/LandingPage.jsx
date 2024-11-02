import React from "react";
import Header from "../components/landingpage/header";
import Hero from "../components/landingpage/Hero";
import Footer from "../components/landingpage/Footer";
import backgroundImage from "../components/img/background.svg";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white bg-cover bg-no-repeat relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-[80px] lg:mt-[100px]">
          <Hero />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
