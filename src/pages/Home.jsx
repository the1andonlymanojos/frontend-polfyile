import React from "react";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import backgroundImage from "../components/img/background.svg";

export default function Home() {
  return (
    <div
      className="flex overflow-auto flex-col bg-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
        <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
