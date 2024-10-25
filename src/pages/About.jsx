import React from "react";
import Footer from "../components/Helpfooter";
 import Hero from "../components/AboutMain";
 import Header from "../components/header";
import backgroundImage from "../components/img/background.svg";

const About = () => {
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
  <Header/>
  <Hero/>
  <Footer/>
</div>
   
    );
  };
  
  export default About;
  