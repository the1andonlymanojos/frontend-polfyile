import React from "react";
import Footer from "../components/landingpage/Helpfooter";
import Hero from "../components/landingpage/PrivacyMain";
import Header from "../components/landingpage/header";
import backgroundImage from "../components/img/background.svg";

const Privacy = () => {
  return (
    <div
      className="flex overflow-auto flex-col bg-white bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: '100vh',  // Full viewport height
        width: '100vw',   // Full viewport width
        backgroundSize: 'cover',  // Ensures the image covers the entire container
        backgroundPosition: 'center',  // Centers the image
      }}
    >
      {/* Content */}
      <Header />
      <Hero />
      <Footer />
    </div>

  );
};

export default Privacy;
