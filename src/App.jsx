import React from "react";
import Header from "./components/header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import backgroundImage from "./components/img/background.svg";

const App = () => {
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

export default App;
