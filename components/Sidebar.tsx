import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-cics-dark to-green-900 rounded-l-3xl rounded-r-lg p-6 text-white shadow-2xl h-full flex flex-col gap-8">
      
      <div className="animate-fade-in">
        <div className="bg-white/10 backdrop-blur-md text-white py-2 px-4 rounded mb-4 font-bold uppercase text-sm tracking-wider shadow-md border border-white/10">
          About CICS
        </div>
        <p className="text-gray-300 text-sm italic mb-4">
          Empowering the future through excellence in IT and CS education.
        </p>
      </div>

      <div className="animate-fade-in delay-100">
        <h3 className="font-bold text-green-300 uppercase mb-3 border-b border-green-700/50 pb-2">
          Information Technology
        </h3>
        <ul className="space-y-3 text-sm font-sans">
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
            <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> System Administration
          </li>
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
             <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> Web and Mobile Application
          </li>
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
             <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> Database Management
          </li>
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
             <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> Networking and Cybersecurity
          </li>
        </ul>
      </div>

      <div className="animate-fade-in delay-200">
        <h3 className="font-bold text-green-300 uppercase mb-3 border-b border-green-700/50 pb-2">
          Computer Science
        </h3>
        <ul className="space-y-3 text-sm font-sans">
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
             <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> Algorithm Design and Analysis
          </li>
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
             <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> Software Engineering
          </li>
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
             <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> AI and Machine Learning
          </li>
          <li className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group">
             <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;</span> Game Development
          </li>
        </ul>
      </div>

      <div className="mt-auto animate-slide-up">
        <Link to="/programs" className="block w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-center py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 border border-white/20">
          Explore our Programs
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;