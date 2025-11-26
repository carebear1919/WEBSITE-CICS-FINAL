
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Youtube, Linkedin, Send, CheckCircle, X, Globe, ArrowRight } from 'lucide-react';

// --- Modal Component ---
const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 animate-slide-up overflow-hidden text-center p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={40} className="text-cics-main" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <button 
            onClick={onClose}
            className="w-full bg-cics-main text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
            Close
        </button>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full animate-fade-in pb-16">
      
      {/* Hero Header */}
      <div className="bg-cics-dark py-16 text-center text-white shadow-xl relative overflow-hidden mb-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-wide">Contact Us</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto font-light">
            Have questions? We'd love to hear from you. Reach out to our team or visit us on campus.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Side */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 animate-slide-up">
               <h2 className="text-2xl font-bold text-cics-dark mb-6 flex items-center gap-2">
                 <Globe size={24} className="text-cics-main"/> Get in Touch
               </h2>
               
               <div className="space-y-6">
                 <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="p-3 bg-green-50 text-cics-main rounded-xl group-hover:bg-cics-main group-hover:text-white transition-colors shadow-sm">
                       <Mail size={20} />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</label>
                       <p className="font-semibold text-gray-700 group-hover:text-cics-main transition-colors">cics.dean@university.edu.ph</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 group cursor-pointer">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                       <Phone size={20} />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</label>
                       <p className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">(046) 481-1900 loc 3087</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl shadow-sm">
                       <MapPin size={20} />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Visit Us</label>
                       <p className="font-semibold text-gray-700 text-sm">
                         College of Information and Computer Studies<br/>
                         Gregorio Zaide Bldg., DLSU-D
                       </p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl shadow-sm">
                       <Clock size={20} />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Office Hours</label>
                       <p className="font-semibold text-gray-700 text-sm">
                         Monday - Friday<br/>
                         8:00 AM - 5:00 PM
                       </p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-gradient-to-r from-cics-dark to-cics-main rounded-[2rem] shadow-xl p-8 text-white animate-slide-up delay-100">
               <h3 className="font-bold mb-6 uppercase text-sm tracking-widest opacity-80">Follow Us</h3>
               <div className="flex gap-4">
                 <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 hover:scale-110 transition-all backdrop-blur-sm border border-white/20">
                    <Facebook size={24} />
                 </a>
                 <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-red-600 hover:scale-110 transition-all backdrop-blur-sm border border-white/20">
                    <Youtube size={24} />
                 </a>
                 <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-700 hover:scale-110 transition-all backdrop-blur-sm border border-white/20">
                    <Linkedin size={24} />
                 </a>
               </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col animate-slide-up delay-200">
               <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                    <p className="text-gray-500 text-sm">We respond to inquiries within 24 hours.</p>
                  </div>
                  <div className="hidden md:block bg-green-100 text-cics-main p-3 rounded-full">
                     <Send size={24} />
                  </div>
               </div>
               
               <div className="p-8 flex-1">
                  <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <input 
                              type="text" 
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all" 
                              placeholder="Juan Dela Cruz" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 bg-gray-50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all" 
                              placeholder="juan@example.com" 
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                        <textarea 
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="w-full h-48 border border-gray-300 bg-gray-50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all resize-none" 
                          placeholder="How can we help you with your academic journey?"
                        ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-cics-main text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>Send Message <ArrowRight size={20} /></>
                      )}
                    </button>
                  </form>
               </div>
            </div>
          </div>

        </div>

        {/* Map Section */}
        <div className="bg-white rounded-[2rem] shadow-xl p-4 border border-gray-100 animate-slide-up delay-300">
           <div className="rounded-3xl overflow-hidden h-[400px] w-full relative group">
              <iframe 
                src="https://maps.google.com/maps?q=College%20of%20Information%20and%20Computer%20Studies%2C%20De%20La%20Salle%20University%20-%20Dasmari%C3%B1as&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Campus Map"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 max-w-xs">
                 <h4 className="font-bold text-cics-dark flex items-center gap-2"><MapPin size={16} /> Locate Us</h4>
                 <p className="text-xs text-gray-600 mt-1">College of Information and Computer Studies<br/>Gregorio Zaide Bldg, DLSU-D</p>
              </div>
           </div>
        </div>

      </div>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Contact;
