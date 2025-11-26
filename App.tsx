import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StickyCTA from './components/StickyCTA';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Faculty from './pages/Faculty';
import Services from './pages/Services';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-200">
        <Header />
        
        <main className="flex-grow pt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <StickyCTA />
      </div>
    </Router>
  );
};

export default App;