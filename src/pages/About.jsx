import React from "react";
<<<<<<< HEAD
import Footer from "../components/Helpfooter";
 import Hero from "../components/AboutMain";
 import Header from "../components/header";
=======
import Footer from "../components/landingpage/Helpfooter";
import Hero from "../components/landingpage/AboutMain";
import Header from "../components/landingpage/header";
>>>>>>> ef5bf031bc521af41557e64796ffa16f1c4cfa80
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
  