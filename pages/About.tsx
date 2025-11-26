import React, { useState } from 'react';
import { Quote, ChevronDown, ChevronUp, Heart, Cross, Users } from 'lucide-react';

// Helper Component for Expandable Text
interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength = 150, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className={`text-gray-700 leading-relaxed text-justify transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-[6em] overflow-hidden relative'}`}>
         {shouldTruncate && !isExpanded ? `${text.slice(0, maxLength)}...` : text}
      </div>
      
      {shouldTruncate && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-xs font-bold uppercase tracking-wider text-cics-main flex items-center gap-1 hover:text-green-800 transition-colors focus:outline-none"
        >
          {isExpanded ? (
            <>Read Less <ChevronUp size={14} /></>
          ) : (
            <>Read More <ChevronDown size={14} /></>
          )}
        </button>
      )}
    </div>
  );
};

const About: React.FC = () => {
  const missionText = "To equip students with a thorough understanding, innovative capabilities, and strong ethical foundations in information and computer sciences. We aim to nurture a learning community dedicated to continuous education, technological progress, and positive societal impact.";
  
  const visionText = "To become a leader in information and computer studies, noted for our academic excellence, pioneering research, and significant community involvement. We strive to produce graduates who are competitive on a global scale and drive technological innovation and social progress.";

  const researchText = "The College of Information and Computer Studies (CICS) serves as a dynamic center for pioneering research at the intersection of technology and societal advancement. Harnessing the latest innovations in Information Technology (IT) and Computer Science (CS), we address pressing challenges and prepare our students to excel as future leaders in these evolving disciplines. Our faculty fosters an environment of academic excellence and professional growth. Our research initiatives align with global sustainability goals, including SDG 9 - Industry, Innovation, and Infrastructure, focusing on building resilient, inclusive technological foundations, and promoting innovation. Moreover, our dedication to SDG 4 - Quality Education ensures accessible, high-quality learning experiences for all. Through collaborative efforts supporting SDG 17 - Partnerships for the Goals, we engage with diverse stakeholders to enhance global sustainability and drive meaningful societal impact.";

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      
      {/* Introduction & Dean's Message Section */}
      <div className="flex flex-col lg:flex-row gap-8 animate-slide-up">
        {/* Left: Introduction */}
        <div className="lg:w-1/2 bg-white rounded-3xl p-8 shadow-xl border-l-8 border-cics-main flex flex-col justify-center">
          <h2 className="text-4xl font-serif font-bold text-cics-dark mb-6">
            About the College
          </h2>
          <div className="space-y-4 text-gray-700 text-justify leading-relaxed font-sans">
            <p>
              The College of Information and Computer Studies (CICS) is a leader in technological education, committed to academic excellence, innovation, and ethical standards. We foster a dynamic and inclusive environment where students, faculty, and industry partners work together to address and solve intricate technological issues.
            </p>
            <p>
              CICS inspires and prepares future leaders who excel in their professions and make meaningful contributions to the global digital landscape.
            </p>
          </div>
        </div>
        
        {/* Right: Dean's Message */}
        <div className="lg:w-1/2 relative mt-12 lg:mt-0">
           <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-100 h-full relative z-10">
               <div className="absolute -top-10 left-8 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 z-20">
                  <img src="Images/Dean.png" alt="Dean" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="mt-12">
                 <Quote className="text-cics-main/20 absolute top-8 right-8" size={80} />
                 <h3 className="text-2xl font-bold text-cics-dark mb-4 pl-2">Message from the Dean</h3>
                 <p className="text-gray-600 italic mb-6 leading-relaxed relative z-10">
                   "The field of computing is moving faster than ever, and we are here to ensure you stay ahead of the curve. We don't just teach you how to code; we teach you how to create, innovate, and lead with integrity."
                 </p>
                 <div className="border-t border-gray-200 pt-4">
                    <div className="text-cics-main font-bold text-lg">Mitschek, Marivic R.</div>
                    <div className="text-gray-500 text-sm font-serif uppercase tracking-widest">Dean, CICS</div>
                 </div>
               </div>
           </div>
           {/* Decorative background element */}
           <div className="absolute top-4 -right-4 w-full h-full bg-green-900/10 rounded-3xl -z-10"></div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="animate-slide-up delay-100">
        <h3 className="text-3xl font-serif font-bold text-center text-cics-dark mb-8 relative inline-block w-full">
          <span className="relative z-10 bg-gray-200 px-4">Our Core Values</span>
          <div className="absolute top-1/2 left-0 w-full h-px bg-cics-main/30 -z-0"></div>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Faith */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-yellow-500 group">
             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-500 transition-colors duration-300">
                <Cross size={24} className="text-yellow-600 group-hover:text-white" />
             </div>
             <h4 className="text-xl font-bold text-gray-800 mb-3">Faith</h4>
             <p className="text-gray-600 text-sm leading-relaxed text-justify">
               To look upon anything with the eyes of faith, do anything in view of God and to attribute all to God.
             </p>
          </div>

          {/* Zeal for Service */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-red-500 group">
             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-500 transition-colors duration-300">
                <Heart size={24} className="text-red-600 group-hover:text-white" />
             </div>
             <h4 className="text-xl font-bold text-gray-800 mb-3">Zeal for Service</h4>
             <p className="text-gray-600 text-sm leading-relaxed text-justify">
               The active expression of faith in gospel witness and service, oriented towards the integral salvation of persons, particularly the poor and the marginalized.
             </p>
          </div>

          {/* Communion in Mission */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-blue-500 group">
             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                <Users size={24} className="text-blue-600 group-hover:text-white" />
             </div>
             <h4 className="text-xl font-bold text-gray-800 mb-3">Communion in Mission</h4>
             <p className="text-gray-600 text-sm leading-relaxed text-justify">
               A relationship for the mission anchored in our relationship with God.
             </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up delay-200">
        <div className="bg-white rounded-[2rem] p-8 shadow-xl text-center border-t-8 border-cics-main hover:shadow-2xl transition-all duration-300 group">
          <div className="bg-cics-main/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cics-main transition-colors duration-300">
             <span className="text-2xl font-serif font-bold text-cics-main group-hover:text-white">M</span>
          </div>
          <h3 className="text-3xl font-bold text-cics-dark mb-4">Mission</h3>
          <ExpandableText text={missionText} maxLength={120} className="items-center text-center" />
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-xl text-center border-t-8 border-cics-main hover:shadow-2xl transition-all duration-300 group">
           <div className="bg-cics-main/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cics-main transition-colors duration-300">
             <span className="text-2xl font-serif font-bold text-cics-main group-hover:text-white">V</span>
          </div>
          <h3 className="text-3xl font-bold text-cics-dark mb-4">Vision</h3>
          <ExpandableText text={visionText} maxLength={120} className="items-center text-center" />
        </div>
      </div>

      {/* Research Focus */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-[2rem] p-10 shadow-xl border-l-8 border-cics-main animate-slide-up delay-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <Quote size={200} />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-cics-dark mb-6">Research Focus</h3>
          <ExpandableText text={researchText} maxLength={300} />
        </div>
      </div>

      {/* Organizational Structure & Accreditations Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-cics-dark to-black rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-fade-in delay-300">
        {/* Background texture overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
        ></div>

        {/* Org Chart */}
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-md relative z-10 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-8 text-center drop-shadow-md border-b border-white/20 pb-4">Organizational Structure</h3>
          
          <div className="flex flex-col items-center gap-6 scale-90 sm:scale-100 origin-top">
            <div className="bg-white text-cics-dark font-bold py-3 px-6 rounded-lg shadow-lg w-48 text-center z-10 transform hover:scale-105 transition-transform cursor-default">
              Dean, CICS
            </div>
            {/* Connector Line */}
            <div className="h-8 w-1 bg-white/50 -my-4"></div>
            
            <div className="bg-white text-cics-dark font-bold py-2 px-6 rounded-lg shadow-lg w-56 text-center z-10 text-sm transform hover:scale-105 transition-transform cursor-default">
              Associate Dean, CICS
            </div>
            
            {/* Branching Lines */}
            <div className="relative w-full flex justify-center h-8 -my-4">
              <div className="w-1/2 border-t-2 border-r-2 border-l-2 border-white/50 rounded-t-xl h-full"></div>
            </div>

            <div className="flex justify-center gap-4 w-full">
              <div className="bg-white text-cics-dark font-bold py-2 px-4 rounded-lg shadow-lg text-xs w-32 text-center transform hover:scale-105 transition-transform cursor-default">
                Secretary to the Dean
              </div>
              <div className="bg-white text-cics-dark font-bold py-2 px-4 rounded-lg shadow-lg text-xs w-32 text-center transform hover:scale-105 transition-transform cursor-default">
                CSD Chair
              </div>
            </div>
            
             <div className="flex justify-center gap-4 w-full">
              <div className="bg-white text-cics-dark font-bold py-2 px-4 rounded-lg shadow-lg text-xs w-32 text-center transform hover:scale-105 transition-transform cursor-default">
                ITD Chair
              </div>
              <div className="bg-white text-cics-dark font-bold py-2 px-4 rounded-lg shadow-lg text-xs w-48 text-center transform hover:scale-105 transition-transform cursor-default">
                Secretary to the Chair, CSD
              </div>
            </div>
            
            <div className="bg-white text-cics-dark font-bold py-2 px-6 rounded-lg shadow-lg w-64 text-center mt-2 text-sm transform hover:scale-105 transition-transform cursor-default">
               Supervisor, Computer Laboratory
            </div>
            
            <button className="bg-black/50 hover:bg-black hover:text-green-300 text-white text-xs py-2 px-6 rounded-full mt-4 transition-all border border-white/20">
              View Full Structure
            </button>
          </div>
        </div>

        {/* Accreditations */}
        <div className="bg-white/95 rounded-2xl p-6 z-10 shadow-inner flex flex-col justify-between">
           <div>
             <h3 className="text-2xl font-bold text-cics-dark mb-6 text-right border-b-4 border-cics-main pb-2">
               Accreditations & Affiliations
             </h3>
             
             <div className="mb-8">
               <h4 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-cics-main rounded-full"></span> Academic
               </h4>
               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-md mb-4 hover:shadow-lg transition-all hover:-translate-x-1 border border-gray-200">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-[8px] text-center font-bold text-blue-800 border border-gray-300">
                    CHED
                  </div>
                  <div>
                     <p className="font-bold text-sm text-gray-800">Center of Development (COD)</p>
                     <p className="text-xs text-gray-500">Center of Excellence (COE) in IT Education</p>
                  </div>
               </div>
               
               <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-md hover:shadow-lg transition-all hover:-translate-x-1 border border-gray-200">
                   <div className="w-14 h-12 bg-black text-white flex items-center justify-center font-bold text-xs shrink-0 rounded">
                      PICAB
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-800">Philippine Information & Computing Education Accreditation Board</p>
                   </div>
               </div>
             </div>
           </div>

           <div>
             <h4 className="font-bold text-lg mb-3 text-right text-gray-800 flex items-center justify-end gap-2">
                Industry Partners <span className="w-2 h-2 bg-cics-main rounded-full"></span>
             </h4>
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-16 hover:shadow-md transition-shadow grayscale hover:grayscale-0">
                   <span className="text-blue-500 font-bold text-sm">CISCO</span>
                </div>
                 <div className="bg-blue-900 text-white p-2 rounded-lg shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow grayscale hover:grayscale-0">
                   <span className="font-bold text-[10px]">Microsoft Learn</span>
                </div>
                 <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center h-16 hover:shadow-md transition-shadow grayscale hover:grayscale-0">
                   <span className="text-red-600 font-bold text-sm">ORACLE</span>
                </div>
                 <div className="bg-blue-900 text-white p-2 rounded-lg shadow-sm flex items-center justify-center h-16 hover:shadow-md transition-shadow grayscale hover:grayscale-0">
                   <span className="font-bold text-[10px]">AWS educate</span>
                </div>
             </div>
           </div>
        </div>

      </div>

    </div>
  );
};

export default About;