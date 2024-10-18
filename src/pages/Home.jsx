import React from "react";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import backgroundImage from "../components/img/background.svg";



export default function Home() {
  return (
    <div
      className="flex overflow-hidden flex-col bg-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <main>
      <Hero/>
      </main>
    </div>
  );
}