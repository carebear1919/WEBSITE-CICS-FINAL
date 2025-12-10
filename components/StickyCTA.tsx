
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, GraduationCap, Calendar, MessageCircle, Monitor, Code, X, CheckCircle, User, Building } from 'lucide-react';

const { useNavigate } = ReactRouterDOM;

// --- Reusable Modal Component ---
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-xl text-cics-dark flex items-center gap-2">
            {title}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

const StickyCTA: React.FC = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<'apply' | 'visit' | 'counselor' | 'success' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveModal('success');
    }, 1500);
  };

  // --- Modal Content Renderers ---

  const renderApplyForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 mb-4">
        <p className="font-bold mb-1">Applications for A.Y. 2025-2026 are open!</p>
        <p>Please fill out your preliminary details below.</p>
      </div>
      <div>
         <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
         <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input required type="text" className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-cics-main outline-none" placeholder="Juan Dela Cruz" />
         </div>
      </div>
      <div>
         <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
         <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input required type="email" className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-cics-main outline-none" placeholder="juan@example.com" />
         </div>
      </div>
      <div>
         <label className="block text-sm font-bold text-gray-700 mb-1">Program of Interest</label>
         <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-cics-main outline-none appearance-none bg-white">
              <option>BS Computer Science</option>
              <option>BS Information Technology</option>
              <option>Associate in Computer Technology</option>
            </select>
         </div>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-cics-dark font-bold py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
      >
        {isSubmitting ? 'Processing...' : <>Proceed to Application <ArrowRight size={18} /></>}
      </button>
    </form>
  );

  const renderVisitForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-sm text-green-800 mb-4">
        <p>Schedule a guided tour with our student ambassadors.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
           <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none" placeholder="Juan" />
        </div>
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
           <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none" placeholder="Dela Cruz" />
        </div>
      </div>
      <div>
         <label className="block text-sm font-bold text-gray-700 mb-1">Preferred Date</label>
         <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input required type="date" className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-3 focus:ring-2 focus:ring-cics-main outline-none" />
         </div>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-cics-main hover:bg-green-800 text-white font-bold py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
      >
        {isSubmitting ? 'Scheduling...' : <>Schedule Visit <Building size={18} /></>}
      </button>
    </form>
  );

  const renderCounselorForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
       <p className="text-sm text-gray-600 leading-relaxed mb-4">
         Our academic counselors are here to help you choose the program that best fits your career goals.
       </p>
      <div>
         <label className="block text-sm font-bold text-gray-700 mb-1">Contact Details</label>
         <input required type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none mb-2" placeholder="Your Email Address" />
         <input required type="tel" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none" placeholder="Mobile Number" />
      </div>
      <div>
         <label className="block text-sm font-bold text-gray-700 mb-1">Topic</label>
         <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none">
            <option>Program Curriculum</option>
            <option>Career Opportunities</option>
            <option>Scholarships</option>
            <option>Other</option>
         </select>
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
      >
        {isSubmitting ? 'Sending...' : <>Request Call Back <Phone size={18} /></>}
      </button>
    </form>
  );

  const renderSuccess = () => (
    <div className="text-center py-6">
       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
         <CheckCircle size={40} className="text-cics-main" />
       </div>
       <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Received!</h3>
       <p className="text-gray-600">
         We will be in touch with you shortly.
       </p>
       <button onClick={() => setActiveModal(null)} className="mt-6 text-cics-main font-bold hover:underline">
         Close Window
       </button>
    </div>
  );

  return (
    <>
      <footer className="w-full bg-gradient-to-b from-cics-dark to-green-950 pt-16 pb-8 text-white mt-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          
          {/* Minimized & Integrated CTA Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 mb-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
            <div className="text-center lg:text-left max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-white leading-tight">
                    Ready to shape the future?
                </h2>
                <p className="text-green-100/90 text-sm md:text-base font-light">
                    Join a community of innovators. Your journey starts here at CICS.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 w-full lg:w-auto">
                <button 
                    onClick={() => setActiveModal('apply')} 
                    className="bg-yellow-500 hover:bg-yellow-400 text-cics-dark font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                >
                    <GraduationCap size={18} />
                    Apply Now
                </button>
                
                <button 
                    onClick={() => setActiveModal('visit')}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-6 rounded-lg transition-all hover:border-white/50 flex items-center gap-2 text-sm"
                >
                    <MapPin size={18} /> Visit Campus
                </button>

                <button 
                    onClick={() => setActiveModal('counselor')}
                    className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-6 rounded-lg transition-all hover:border-white/50 flex items-center gap-2 text-sm"
                >
                    <MessageCircle size={18} /> Talk to a Counselor
                </button>
            </div>
          </div>

          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-t border-white/10 pt-12">
            
            {/* Brand Column */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg shrink-0">
                    <img src="Images/Logo.jpg" alt="Logo" className="w-full h-full object-contain"/>
                  </div>
                  <div className="leading-tight">
                      <h3 className="font-bold text-lg">CICS</h3>
                      <p className="text-[10px] text-green-300 font-serif uppercase tracking-widest">DLSU-Dasmariñas</p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Empowering the next generation of tech leaders through excellence in education, research, and innovation.
                </p>
                <div className="flex gap-2 pt-2">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                      <a key={i} href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all text-gray-400 border border-white/5 hover:border-green-400">
                        <Icon size={14} />
                      </a>
                  ))}
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="font-bold text-sm mb-4 text-gray-100 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                      { label: 'About Us', path: '/about' },
                      { label: 'Academic Programs', path: '/programs' },
                      { label: 'Faculty & Staff', path: '/faculty' },
                      { label: 'Student Services', path: '/services' },
                  ].map((link) => (
                      <li key={link.label}>
                        <button 
                          onClick={() => handleNav(link.path)} 
                          className="hover:text-yellow-400 transition-colors flex items-center gap-2 group w-full text-left"
                        >
                            <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-yellow-500" />
                            {link.label}
                        </button>
                      </li>
                  ))}
                </ul>
            </div>

            {/* Programs */}
            <div>
                <h4 className="font-bold text-sm mb-4 text-gray-100 uppercase tracking-wider">Programs</h4>
                <div className="space-y-3">
                  <button onClick={() => handleNav('/programs')} className="block w-full text-left group hover:bg-white/5 p-2 -ml-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-2 mb-0.5">
                          <Code size={14} className="text-blue-400"/>
                          <span className="font-bold text-sm text-gray-200 group-hover:text-blue-300">Computer Science</span>
                      </div>
                      <span className="text-[10px] text-gray-500 block group-hover:text-gray-400 ml-6">Software Eng. & Game Dev</span>
                  </button>
                  
                  <button onClick={() => handleNav('/programs')} className="block w-full text-left group hover:bg-white/5 p-2 -ml-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-2 mb-0.5">
                          <Monitor size={14} className="text-green-400"/>
                          <span className="font-bold text-sm text-gray-200 group-hover:text-green-300">Information Tech</span>
                      </div>
                      <span className="text-[10px] text-gray-500 block group-hover:text-gray-400 ml-6">Web & Network Systems</span>
                  </button>
                </div>
            </div>

            {/* Contact Info */}
            <div>
                <h4 className="font-bold text-sm mb-4 text-gray-100 uppercase tracking-wider">Contact Us</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                      <MapPin size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                      <span className="text-xs">Gregorio Zaide Bldg, DLSU-D,<br/>Cavite, Philippines 4114</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <Phone size={16} className="text-yellow-500 shrink-0" />
                      <span className="text-xs">(046) 481-1900 loc 3087</span>
                  </li>
                  <li className="flex items-center gap-3">
                      <Mail size={16} className="text-yellow-500 shrink-0" />
                      <span className="text-xs">cics.dean@dlsud.edu.ph</span>
                  </li>
                </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-wider font-medium">
            <p className="text-center md:text-left">
                &copy; {new Date().getFullYear()} CICS. All Rights Reserved.
            </p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <span className="text-gray-700">|</span>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Interactive Modals --- */}
      <Modal 
        isOpen={activeModal === 'apply'} 
        onClose={() => setActiveModal(null)} 
        title="Start Application"
      >
        {renderApplyForm()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'visit'} 
        onClose={() => setActiveModal(null)} 
        title="Schedule Visit"
      >
        {renderVisitForm()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'counselor'} 
        onClose={() => setActiveModal(null)} 
        title="Speak with a Counselor"
      >
        {renderCounselorForm()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'success'} 
        onClose={() => setActiveModal(null)} 
        title=""
      >
        {renderSuccess()}
      </Modal>
    </>
  );
};

export default StickyCTA;
