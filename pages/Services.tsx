
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Users, Monitor, BookOpen, ChevronDown, ChevronUp, Calendar, GraduationCap, Briefcase, Download, AlertCircle, CheckCircle, X, Clock, Check, Server, Wifi } from 'lucide-react';

// --- Reusable Accordion Component ---
const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className={`border rounded-xl overflow-hidden mb-3 bg-white transition-all duration-300 ${isOpen ? 'border-green-200 shadow-md' : 'border-gray-100 shadow-sm hover:border-green-100'}`}>
      <button 
        className={`w-full flex justify-between items-center p-5 text-left font-bold transition-colors ${isOpen ? 'bg-green-50/50 text-cics-main' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        onClick={onClick}
      >
        <span className="flex items-center gap-3">
           <div className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-green-200 text-cics-main' : 'bg-gray-100 text-gray-400'}`}>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
           </div>
           {title}
        </span>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 text-sm text-gray-600 border-t border-green-50 bg-white leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Modal Container Component ---
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 animate-slide-up overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-xl text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-600">
            <X size={18} />
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

// --- Main Page Component ---
const Services: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('enrollment-1');
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'booking' | 'availability' | 'reservation' | 'download' | 'org' | 'success' | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  // --- Actions ---
  const openDownloadModal = (fileName: string) => {
    setModalData({ fileName });
    setActiveModal('download');
  };

  const openBookingModal = () => setActiveModal('booking');
  const openAvailabilityModal = () => setActiveModal('availability');
  const openReservationModal = () => setActiveModal('reservation');
  
  const openOrgModal = (orgName: string, action: string) => {
    setModalData({ orgName, action });
    setActiveModal('org');
  };

  const handleSuccess = (message: string) => {
    setActiveModal(null);
    setTimeout(() => {
        setModalData({ message });
        setActiveModal('success');
    }, 300);
  };

  // --- Render Functions for Specific Modals ---

  const renderBookingContent = () => (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSuccess("Appointment booked successfully! Check your email for confirmation."); }}>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
        <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main focus:border-transparent outline-none" placeholder="Juan Dela Cruz" />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Student ID</label>
        <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main focus:border-transparent outline-none" placeholder="2023-12345" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
           <input required type="date" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none" />
        </div>
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-1">Time</label>
           <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none">
              <option>9:00 AM</option>
              <option>10:00 AM</option>
              <option>1:00 PM</option>
              <option>3:00 PM</option>
           </select>
        </div>
      </div>
      <div>
         <label className="block text-sm font-bold text-gray-700 mb-1">Purpose</label>
         <textarea className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none h-24 resize-none" placeholder="Consultation regarding..."></textarea>
      </div>
      <button type="submit" className="w-full bg-cics-main text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg mt-2">
        Confirm Booking
      </button>
    </form>
  );

  const renderAvailabilityContent = () => {
    const labs = [
        { name: "Lab 1 (Multimedia)", percent: 90, status: "Busy", color: "bg-red-500", text: "text-red-600", bg: "bg-red-50" },
        { name: "Lab 2 (Programming)", percent: 25, status: "Available", color: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
        { name: "Lab 3 (Networking)", percent: 45, status: "Available", color: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
        { name: "Mac Lab", percent: 100, status: "Full", color: "bg-gray-500", text: "text-gray-600", bg: "bg-gray-100" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <Clock size={16} className="text-blue-500"/>
                <span>Real-time status as of {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="space-y-4">
                {labs.map((lab, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                <Monitor size={16} className="text-gray-400"/> {lab.name}
                            </h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${lab.bg} ${lab.text}`}>
                                {lab.status}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`${lab.color} h-2.5 rounded-full transition-all duration-1000`} style={{ width: `${lab.percent}%` }}></div>
                        </div>
                        <p className="text-right text-xs text-gray-400 mt-1">{lab.percent}% Occupied</p>
                    </div>
                ))}
            </div>
            <button onClick={openReservationModal} className="w-full bg-cics-main text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                Reserve a Spot
            </button>
        </div>
    );
  };

  const renderReservationContent = () => (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSuccess("Reservation successful! Please proceed to the lab within 15 minutes."); }}>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Student ID Number</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none" placeholder="202X-XXXX" />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Select Laboratory</label>
            <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cics-main outline-none">
                <option>Lab 2 (Programming)</option>
                <option>Lab 3 (Networking)</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Duration</label>
            <div className="flex gap-2">
                {['1 Hour', '2 Hours', '3 Hours'].map(t => (
                    <button key={t} type="button" className="flex-1 border border-gray-300 py-2 rounded-lg hover:border-cics-main hover:text-cics-main focus:bg-green-50 focus:border-cics-main transition-all text-sm font-semibold">
                        {t}
                    </button>
                ))}
            </div>
        </div>
        <button type="submit" className="w-full bg-cics-main text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg mt-2">
            Confirm Reservation
        </button>
    </form>
  );

  const renderDownloadContent = () => (
    <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Download size={40} className="text-cics-main" />
        </div>
        <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Download File?</h4>
            <p className="text-gray-600 bg-gray-50 py-2 px-4 rounded-lg inline-block font-mono text-sm border border-gray-200">
                {modalData?.fileName}
            </p>
        </div>
        <div className="flex gap-3">
            <button onClick={() => setActiveModal(null)} className="flex-1 py-3 rounded-lg border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
            </button>
            <button 
                onClick={() => handleSuccess(`Started downloading ${modalData?.fileName}`)}
                className="flex-1 py-3 rounded-lg bg-cics-main text-white font-bold hover:bg-green-700 transition-colors shadow-lg"
            >
                Download Now
            </button>
        </div>
    </div>
  );

  const renderOrgContent = () => (
    <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-cics-main">
            <h4 className="font-bold text-gray-800 text-lg">{modalData?.orgName}</h4>
            <p className="text-gray-600 text-sm capitalize">Action: {modalData?.action}</p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
            You are about to be redirected to the official membership/inquiry form for this organization. Please ensure you have your student details ready.
        </p>
        <button 
            onClick={() => handleSuccess(`Redirected to ${modalData?.orgName} form`)}
            className="w-full bg-cics-main text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
            Proceed to Form
        </button>
    </div>
  );

  const renderSuccessContent = () => (
    <div className="text-center space-y-6 py-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check size={40} className="text-cics-main" />
        </div>
        <div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">Success!</h4>
            <p className="text-gray-600">{modalData?.message}</p>
        </div>
        <button 
            onClick={() => setActiveModal(null)}
            className="w-full py-3 rounded-lg bg-gray-800 text-white font-bold hover:bg-black transition-colors"
        >
            Close
        </button>
    </div>
  );

  return (
    <div className="w-full animate-fade-in pb-16">
      
      {/* Page Header */}
      <div className="bg-cics-dark py-16 text-center text-white shadow-xl relative overflow-hidden mb-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-wide">Student Services</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto font-light">
            Your centralized hub for academic support, campus life, and administrative resources.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-16">

        {/* --- 1. Academic Advising & Enrollment --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Enrollment Guidelines */}
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shadow-sm"><Calendar size={24} /></div>
               <h2 className="text-2xl font-bold text-gray-800">Enrollment & Registration</h2>
            </div>
            
            <AccordionItem 
              title="Step 1: Pre-Advising & Course Selection" 
              isOpen={openSection === 'enrollment-1'} 
              onClick={() => toggleSection('enrollment-1')}
            >
              Log in to the Student Portal to view your specialized curriculum. Select the courses for the upcoming semester based on your program checklist. Ensure you have no prerequisite deficiencies.
            </AccordionItem>
            
            <AccordionItem 
              title="Step 2: Assessment & Payment" 
              isOpen={openSection === 'enrollment-2'} 
              onClick={() => toggleSection('enrollment-2')}
            >
              Proceed to the assessment tab to view your total tuition fees. Payments can be made via University Cashier, Bank Transfer, or accredited Payment Centers. Upload your proof of payment if paying online.
            </AccordionItem>

            <AccordionItem 
              title="Step 3: Validation & ID Validation" 
              isOpen={openSection === 'enrollment-3'} 
              onClick={() => toggleSection('enrollment-3')}
            >
              Wait for 2-3 working days for payment validation. Once validated, your Certificate of Registration (COR) will be available for download. Present your COR to the CICS Dean's Office for ID validation sticker.
            </AccordionItem>
          </div>

          {/* Academic Advising Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col justify-between animate-slide-up delay-100 hover:shadow-2xl transition-all duration-300">
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-green-100 text-cics-main rounded-xl shadow-sm"><Users size={24} /></div>
                   <h2 className="text-2xl font-bold text-gray-800">Academic Advising</h2>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Struggling with your subjects or need career advice? Our Program Chairs and Faculty Advisers are here to help. Consultation hours are strictly observed.
                </p>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 mb-6">
                   <h4 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider flex items-center gap-2">
                       <Clock size={14}/> Office Hours
                   </h4>
                   <div className="flex justify-between text-sm text-gray-600 mb-2 pb-2 border-b border-gray-200">
                      <span>Mon - Fri</span>
                      <span className="font-semibold">8:00 AM - 5:00 PM</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-600">
                      <span>Sat (By Appointment)</span>
                      <span className="font-semibold">9:00 AM - 12:00 NN</span>
                   </div>
                </div>
             </div>
             <button 
                onClick={openBookingModal}
                className="w-full bg-cics-main text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200 active:scale-95 transform duration-150 flex items-center justify-center gap-2"
             >
                <Calendar size={18}/> Book an Appointment
             </button>
          </div>
        </section>

        {/* --- 2. Internship & Scholarships --- */}
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] p-8 lg:p-12 shadow-lg border border-gray-100">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* OJT Information */}
              <div className="animate-slide-up">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-orange-100 text-orange-600 rounded-xl shadow-sm"><Briefcase size={24} /></div>
                   <h2 className="text-2xl font-bold text-gray-800">Internship (OJT) Program</h2>
                 </div>
                 <p className="text-gray-600 mb-6 text-justify leading-relaxed">
                   The Practicum (OJT) program is designed to provide students with real-world industry experience. Students are required to complete 486 hours of training at an accredited partner company.
                 </p>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Prerequisites</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                       <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500 shrink-0"/> Must be a 4th-year standing student</li>
                       <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500 shrink-0"/> Completed all major subjects up to 3rd year</li>
                       <li className="flex items-center gap-3"><CheckCircle size={16} className="text-green-500 shrink-0"/> Good moral character certificate</li>
                    </ul>
                 </div>
                 <button 
                    onClick={() => openDownloadModal('OJT_Handbook_2025.pdf')}
                    className="group flex items-center gap-2 text-orange-600 font-bold text-sm bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors w-max"
                 >
                   Download OJT Handbook <Download size={16} className="group-hover:translate-y-1 transition-transform"/>
                 </button>
              </div>

              {/* Scholarships */}
              <div className="animate-slide-up delay-100">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-purple-100 text-purple-600 rounded-xl shadow-sm"><GraduationCap size={24} /></div>
                   <h2 className="text-2xl font-bold text-gray-800">Scholarships</h2>
                 </div>
                 <p className="text-gray-600 mb-6 leading-relaxed">
                   CICS offers various financial assistance programs to deserving students. Application periods open one month before the start of the semester.
                 </p>
                 <div className="space-y-4">
                    <div 
                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-300 transition-all cursor-pointer group hover:shadow-md" 
                        onClick={() => openDownloadModal('Scholarship_Guidelines.pdf')}
                    >
                       <div className="flex justify-between items-start">
                          <div>
                              <h4 className="font-bold text-purple-700 group-hover:text-purple-900 transition-colors">Academic Scholarship</h4>
                              <p className="text-xs text-gray-500 mt-1">100% Tuition discount for Dean's Listers with GPA of 3.75+</p>
                          </div>
                          <Download size={18} className="text-gray-300 group-hover:text-purple-500 transition-colors"/>
                       </div>
                    </div>
                    
                    <div 
                        className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-300 transition-all cursor-pointer group hover:shadow-md" 
                        onClick={() => openDownloadModal('Assistantship_Form.pdf')}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                               <h4 className="font-bold text-purple-700 group-hover:text-purple-900 transition-colors">Student Assistantship</h4>
                               <p className="text-xs text-gray-500 mt-1">Render service hours in exchange for tuition subsidy.</p>
                            </div>
                            <Download size={18} className="text-gray-300 group-hover:text-purple-500 transition-colors"/>
                        </div>
                    </div>
                 </div>
              </div>

           </div>
        </section>

        {/* --- 3. Laboratory Policies --- */}
        <section className="animate-slide-up">
           <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-red-100 text-red-600 rounded-xl shadow-sm"><Monitor size={24} /></div>
               <h2 className="text-2xl font-bold text-gray-800">Computer Laboratory Policies</h2>
           </div>
           
           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-bl-[100%] -mr-16 -mt-16 z-0 transition-transform group-hover:scale-110 duration-700"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                 <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                       <AlertCircle size={20} className="text-red-500"/> General Rules
                    </h3>
                    <ul className="space-y-4 text-sm text-gray-600">
                       <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                          <span className="bg-white text-red-600 font-bold rounded shadow-sm border border-gray-100 px-2 py-1 text-xs">01</span>
                          <span><strong>No ID, No Entry.</strong> Students must wear their uniform and ID at all times.</span>
                       </li>
                       <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                          <span className="bg-white text-red-600 font-bold rounded shadow-sm border border-gray-100 px-2 py-1 text-xs">02</span>
                          <span>Food and drinks are <strong>strictly prohibited</strong> inside the laboratories.</span>
                       </li>
                       <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                          <span className="bg-white text-red-600 font-bold rounded shadow-sm border border-gray-100 px-2 py-1 text-xs">03</span>
                          <span>Do not install unauthorized software or modify system settings.</span>
                       </li>
                    </ul>
                 </div>
                 
                 <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                           <Server size={20} className="text-gray-400"/> Lab Reservation
                        </h3>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        Students may request to use the laboratory for academic projects during free hours. Requests must be filed at least 3 days in advance to ensure availability.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-auto">
                       <button 
                          onClick={openAvailabilityModal}
                          className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 hover:bg-gray-50"
                       >
                          <Wifi size={18}/> Check Status
                       </button>
                       <button 
                          onClick={openReservationModal}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                       >
                          <Monitor size={18}/> Reserve PC
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- 4. Student Organizations --- */}
        <section className="animate-slide-up">
           <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-teal-100 text-teal-600 rounded-xl shadow-sm"><BookOpen size={24} /></div>
               <h2 className="text-2xl font-bold text-gray-800">Student Organizations</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* JPCS */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-blue-500 hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <span className="font-black text-blue-600 text-lg">JPCS</span>
                 </div>
                 <h4 className="font-bold text-lg text-gray-800 mb-2">Junior Philippine Computer Society</h4>
                 <p className="text-sm text-gray-600 mb-6 flex-grow">The official student organization for IT and CS students. We organize workshops, seminars, and tech events.</p>
                 <button 
                    onClick={() => openOrgModal('JPCS', 'join membership')}
                    className="text-blue-600 text-xs font-bold uppercase tracking-wider hover:underline bg-blue-50 px-4 py-2 rounded-full"
                 >
                    Join Membership
                 </button>
              </div>

              {/* CSC */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-green-500 hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <span className="font-black text-green-600 text-lg">CSC</span>
                 </div>
                 <h4 className="font-bold text-lg text-gray-800 mb-2">CICS Student Council</h4>
                 <p className="text-sm text-gray-600 mb-6 flex-grow">The bridge between the students and the administration. We advocate for student rights and welfare.</p>
                 <button 
                    onClick={() => openOrgModal('Student Council', 'contact council')}
                    className="text-green-600 text-xs font-bold uppercase tracking-wider hover:underline bg-green-50 px-4 py-2 rounded-full"
                 >
                    Contact Council
                 </button>
              </div>

               {/* Robotics */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border-t-8 border-orange-500 hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <span className="font-black text-orange-600 text-lg">RC</span>
                 </div>
                 <h4 className="font-bold text-lg text-gray-800 mb-2">Robotics Club</h4>
                 <p className="text-sm text-gray-600 mb-6 flex-grow">For enthusiasts of hardware, electronics, and automation. Build and compete in robotics competitions.</p>
                 <button 
                    onClick={() => openOrgModal('Robotics Club', 'view projects')}
                    className="text-orange-600 text-xs font-bold uppercase tracking-wider hover:underline bg-orange-50 px-4 py-2 rounded-full"
                 >
                    View Projects
                 </button>
              </div>
           </div>
        </section>

        {/* --- 5. Downloadable Forms --- */}
        <section className="bg-cics-main/5 rounded-[2rem] p-8 md:p-12 border border-dashed border-cics-main/20 animate-slide-up mb-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-5">
                 <div className="p-4 bg-white rounded-2xl shadow-md text-cics-main">
                    <FileText size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-cics-dark">Downloadable Forms</h3>
                    <p className="text-sm text-gray-600">Access official documents and request forms anytime.</p>
                 </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                 {['Student Clearance', 'OJT Recommendation', 'Adding/Dropping Form', 'Leave of Absence'].map((form) => (
                    <button 
                       key={form} 
                       onClick={() => openDownloadModal(`${form.replace(/\s/g, '_')}.pdf`)}
                       className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-xl text-sm font-bold shadow-sm border border-gray-200 flex items-center gap-2 transition-all hover:-translate-y-0.5"
                    >
                       <Download size={16} className="text-cics-main" /> {form}
                    </button>
                 ))}
              </div>
           </div>
        </section>

      </div>

      {/* --- Modals Rendered Here --- */}
      <Modal 
        isOpen={activeModal === 'booking'} 
        onClose={() => setActiveModal(null)} 
        title="Book Appointment"
      >
        {renderBookingContent()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'availability'} 
        onClose={() => setActiveModal(null)} 
        title="Laboratory Status"
      >
        {renderAvailabilityContent()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'reservation'} 
        onClose={() => setActiveModal(null)} 
        title="Reserve a Workstation"
      >
        {renderReservationContent()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'download'} 
        onClose={() => setActiveModal(null)} 
        title="Confirm Download"
      >
        {renderDownloadContent()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'org'} 
        onClose={() => setActiveModal(null)} 
        title="Organization Redirect"
      >
        {renderOrgContent()}
      </Modal>

      <Modal 
        isOpen={activeModal === 'success'} 
        onClose={() => setActiveModal(null)} 
        title=""
      >
        {renderSuccessContent()}
      </Modal>

    </div>
  );
};

export default Services;
