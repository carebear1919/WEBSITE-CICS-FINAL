
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Logo from '../Images/Logo.jpg';

const { Link, useLocation } = ReactRouterDOM;

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Academic Programs', path: '/programs' },
    { label: 'Faculty & Staff', path: '/faculty' },
    { label: 'Student Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-cics-dark via-cics-main to-cics-dark text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-green-700/30">
             <img 
               src={Logo}
               alt="CICS Logo" 
               className="w-14 h-14 object-contain" 
             />
          </div>
          <div className="font-serif flex flex-col justify-center drop-shadow-md">
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-wide">COLLEGE OF INFORMATION</h1>
            <h1 className="text-xl md:text-2xl font-bold leading-tight tracking-wide">AND COMPUTER STUDIES</h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-white/20 text-white shadow-inner backdrop-blur-sm border border-white/30'
                  : 'hover:bg-white/10 hover:text-green-100 hover:shadow-md'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden relative">
          <button
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((s) => !s)}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>

          {mobileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl text-cics-dark py-3 z-50">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium hover:bg-gray-100 ${location.pathname === item.path ? 'font-bold' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
