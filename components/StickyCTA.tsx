import React from 'react';
import { ArrowRight } from 'lucide-react';

const StickyCTA: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-cics-dark to-cics-main py-8 mt-12 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-6">
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center gap-2 border border-white/20">
          APPLY NOW <ArrowRight size={20} />
        </button>
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 transition-all duration-300 text-lg border border-white/20">
          VISIT CAMPUS
        </button>
        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 transition-all duration-300 text-lg border border-white/20">
          TALK TO A COUNSELOR
        </button>
      </div>
      <div className="text-center text-green-100/70 text-sm mt-6 font-sans">
        College of Information and Computer Studies &nbsp;&nbsp;|&nbsp;&nbsp; @Copyright 2025
      </div>
    </div>
  );
};

export default StickyCTA;