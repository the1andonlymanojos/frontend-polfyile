import React from "react";
import Header from "../components/landingpage/header";
import Hero from "../components/landingpage/Hero";
import Footer from "../components/landingpage/Footer";
import backgroundImage from "../components/img/background.svg";

const LandingPage = () => {
  return (
    <div
      className="flex overflow-hidden flex-col bg-white bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Correctly reference the imported image
      }}
    >
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
