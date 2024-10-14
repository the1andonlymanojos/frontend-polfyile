import React from 'react';
import Header from './components/header';
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default App;