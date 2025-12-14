
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Logo from '../Images/Logo.jpg';

const { Link, useLocation } = ReactRouterDOM;

const Header: React.FC = () => {
  const location = useLocation();

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

        {/* Navigation */}
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
      </div>
    </header>
  );
};

export default Header;
