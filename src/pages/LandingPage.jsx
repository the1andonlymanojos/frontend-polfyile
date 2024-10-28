import React from "react";
import Header from "../components/landingpage/header";
import Hero from "../components/landingpage/Hero";
import Footer from "../components/landingpage/Footer";
import backgroundImage from "../components/img/background.svg";

const LandingPage = () => {
  return (
    <div
      className="flex overflow-hidden flex-col bg-white bg-cover bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Correctly reference the imported image
        marginTop: `50px`,
      }}
    >
      <Header />
      <main className="flex-grow"> {/* Allows the main content to grow and fill the available space */}
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
