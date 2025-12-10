
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'About' | 'Announcements' | 'Events' | 'Life'>('About');

  const tabs = [
    { id: 'About', label: 'About Us' },
    { id: 'Announcements', label: 'Latest Announcements' },
    { id: 'Events', label: 'Events' },
    { id: 'Life', label: 'Campus Life' },
  ] as const;

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-900 overflow-hidden shadow-2xl mb-8 animate-fade-in">
        <img 
          src="Images/Banner1.jpg" 
          alt="Students in Lab" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cics-dark via-cics-main/60 to-transparent flex flex-col justify-center px-8 md:px-24">
          <div className="max-w-3xl animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-serif text-white font-bold mb-6 drop-shadow-2xl leading-tight">
              “Empowering Future Innovators in Technology”
            </h2>
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-2 px-6 rounded-full border-2 border-white/30 shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105 flex items-center">
                Apply Now <span className="ml-2 text-xl">&gt;</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Images overlay on the right */}
        <div className="hidden lg:flex absolute right-0 top-0 h-full w-1/3 gap-1 animate-fade-in delay-300">
             <img src="Images/Banner2.jpg" className="h-full w-1/2 object-cover border-l border-white/20 shadow-[-10px_0_20px_rgba(0,0,0,0.5)]" alt="Student Life" />
             <img src="Images/Banner3.jpg" className="h-full w-1/2 object-cover border-l border-white/20" alt="Student Group" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Tabs Header */}
            <div className="bg-gradient-to-r from-cics-dark to-green-800 rounded-t-3xl rounded-b-lg p-2 flex flex-wrap justify-between items-center shadow-lg animate-fade-in">
               {tabs.map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 text-center py-3 font-bold text-lg font-sans transition-all duration-300 rounded-lg mx-1 ${
                      activeTab === tab.id
                      ? 'bg-white/10 text-white shadow-inner backdrop-blur-sm border-b-2 border-white/50' 
                      : 'text-green-200 hover:text-white hover:bg-white/5'
                    }`}
                 >
                   {tab.label}
                 </button>
               ))}
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl min-h-[350px] border border-gray-100 animate-slide-up">
              
              {/* About Tab */}
              {activeTab === 'About' && (
                <div className="animate-fade-in">
                  <p className="text-lg text-gray-700 leading-relaxed font-sans mb-6">
                    CICS is a leading institution in technological education, promoting excellence, innovation, ethics, and inclusivity. It provides a collaborative environment for students, faculty, and industry partners to solve complex tech challenges and prepares future professionals to make impactful contributions to the global digital world.
                  </p>
                  <button className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-2 px-6 rounded-full italic shadow-md transition-all hover:shadow-lg">
                    Learn More
                  </button>
                </div>
              )}

              {/* Announcements Tab */}
               {activeTab === 'Announcements' && (
                <div className="animate-fade-in space-y-4">
                   <div className="border-l-4 border-cics-main pl-4 py-3 bg-gray-50 rounded-r-lg shadow-sm hover:shadow-md transition-all hover:bg-green-50 cursor-pointer group">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-cics-dark text-lg group-hover:text-green-700">Midterm Examination Schedule</h4>
                        <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">IMPORTANT</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Please check the student portal for your specific room assignments.</p>
                      <p className="text-xs text-gray-400 mt-2 font-mono">Posted on Oct 24, 2025</p>
                   </div>
                   
                   <div className="border-l-4 border-cics-main pl-4 py-3 bg-gray-50 rounded-r-lg shadow-sm hover:shadow-md transition-all hover:bg-green-50 cursor-pointer group">
                      <h4 className="font-bold text-cics-dark text-lg group-hover:text-green-700">Enrollment for Second Semester</h4>
                      <p className="text-sm text-gray-600 mt-1">Early registration begins on November 15. Scholarship applications are also open.</p>
                      <p className="text-xs text-gray-400 mt-2 font-mono">Posted on Oct 20, 2025</p>
                   </div>

                   <div className="border-l-4 border-gray-400 pl-4 py-3 bg-gray-50 rounded-r-lg shadow-sm hover:shadow-md transition-all hover:bg-gray-100 cursor-pointer group opacity-80">
                      <h4 className="font-bold text-gray-700 text-lg">System Maintenance Notification</h4>
                      <p className="text-sm text-gray-600 mt-1">The online learning platform will be unavailable this Saturday from 10 PM to 2 AM.</p>
                      <p className="text-xs text-gray-400 mt-2 font-mono">Posted on Oct 18, 2025</p>
                   </div>
                </div>
              )}

              {/* Events Tab */}
              {activeTab === 'Events' && (
                <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4 items-start border-b border-gray-100 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="bg-gradient-to-b from-green-100 to-green-200 text-cics-main font-bold rounded-xl p-3 text-center min-w-[80px] shadow-sm">
                            <span className="block text-2xl font-serif">15</span>
                            <span className="text-xs uppercase tracking-wide">Nov</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-cics-dark">Tech Summit 2025</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                               <Clock size={12} /> <span>8:00 AM - 5:00 PM</span>
                               <MapPin size={12} /> <span>University Auditorium</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Join industry leaders as they discuss the future of AI and Cloud Computing.</p>
                            <span className="text-xs font-bold text-green-600 cursor-pointer hover:underline hover:text-green-800">Register Now &rarr;</span>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start border-b border-gray-100 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="bg-gradient-to-b from-blue-100 to-blue-200 text-blue-800 font-bold rounded-xl p-3 text-center min-w-[80px] shadow-sm">
                            <span className="block text-2xl font-serif">02</span>
                            <span className="text-xs uppercase tracking-wide">Dec</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-cics-dark">Annual Hackathon</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                               <Clock size={12} /> <span>48 Hours</span>
                               <MapPin size={12} /> <span>Innovation Lab</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Code, create, and conquer! Theme: Sustainable Technology for Smart Cities.</p>
                            <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline hover:text-blue-800">Learn More &rarr;</span>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start hover:bg-gray-50 p-2 rounded-lg transition-colors md:col-span-2">
                        <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 text-yellow-800 font-bold rounded-xl p-3 text-center min-w-[80px] shadow-sm">
                            <span className="block text-2xl font-serif">10</span>
                            <span className="text-xs uppercase tracking-wide">Dec</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-cics-dark">CICS Christmas Party</h4>
                             <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                               <Clock size={12} /> <span>5:00 PM onwards</span>
                               <MapPin size={12} /> <span>Covered Court</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">A night of music, food, and celebration with the entire CICS community.</p>
                        </div>
                    </div>
                </div>
              )}

              {/* Campus Life Tab */}
              {activeTab === 'Life' && (
                <div className="animate-fade-in">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-1/3 shrink-0">
                           <img 
                             src="https://picsum.photos/400/300?campus" 
                             alt="Campus Life" 
                             className="rounded-2xl shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-500" 
                           />
                           <div className="flex gap-2 mt-4 justify-center">
                              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                              <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                              <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                           </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-2xl text-cics-dark mb-3 font-serif">A Vibrant Community</h4>
                            <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                                Life at CICS is more than just coding. From intense e-sports tournaments to collaborative hackathons and community outreach programs, our students thrive in a balanced ecosystem of work and play. We believe that true innovation happens when creative minds connect.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4">
                               <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                  <h5 className="font-bold text-sm text-cics-main">Student Orgs</h5>
                                  <p className="text-xs text-gray-500 mt-1">Join JPCS, GDSC, or the Robotics Team.</p>
                               </div>
                               <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                  <h5 className="font-bold text-sm text-cics-main">Facilities</h5>
                                  <p className="text-xs text-gray-500 mt-1">24/7 Labs, Esports Arena, and Study Hubs.</p>
                               </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">#CICSWeek</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">#TechInnovators</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">#Animo</span>
                            </div>
                        </div>
                    </div>
                </div>
              )}

            </div>

            {/* Student Achievements Section */}
            <div className="animate-slide-up delay-200">
              <h3 className="text-2xl font-bold text-cics-dark font-serif uppercase mb-4 pl-4 border-l-8 border-cics-main">
                Student Achievements
              </h3>
              
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 shadow-xl border border-white relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Main Featured Achievement */}
                  <div className="w-full md:w-1/3 shrink-0 transform hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src="https://picsum.photos/400/500?random=3" 
                      alt="Champion" 
                      className="w-full h-[350px] object-cover rounded-xl shadow-2xl border-2 border-white"
                    />
                  </div>
                  
                  {/* Achievement Details */}
                  <div className="flex-1 flex flex-col justify-between">
                     <div>
                       <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-md mb-4 border border-gray-100">
                          <h4 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cics-dark to-cics-main font-sans">Pioneering Excellence!</h4>
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full shadow-inner">
                             <ChevronLeft size={20} className="cursor-pointer text-gray-400 hover:text-green-600 transition-colors"/>
                             <span className="font-mono font-bold text-gray-600">1 2 3 4 5 ...</span>
                             <ChevronRight size={20} className="cursor-pointer text-gray-400 hover:text-green-600 transition-colors"/>
                          </div>
                       </div>
                       
                       <p className="text-gray-600 italic font-serif mb-2">November 8, 2025</p>
                       <h5 className="font-bold text-xl text-green-800 mb-2">Victory for the Green and White</h5>
                       <p className="text-sm text-gray-700 leading-relaxed mb-4">
                         As our CICS Pioneers shine at EDUtech_Asia 2025 in Singapore, emerging as Champion in the Planet Protectors (Higher Education League) division powered by Google for Education!
                       </p>
                       <ul className="text-xs text-gray-600 space-y-1 mb-4 bg-white/50 p-4 rounded-lg">
                         <li><strong>Congratulations:</strong></li>
                         <li>Juliana Dunca</li>
                         <li>Brian Garilao</li>
                         <li>Francesca Tuazon</li>
                         <li>Eloiza Lumakang</li>
                         <li>Sir Rolando B. Barammeda</li>
                       </ul>
                       <p className="text-xs italic text-gray-500">
                         Their innovation and dedication to sustainability prove that Lasallian ingenuity knows no bounds.
                       </p>
                     </div>

                     {/* Thumbnails Row */}
                     <div className="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                        <div className="bg-white p-2 shadow-md rounded-lg w-32 shrink-0 hover:shadow-xl transition-shadow cursor-pointer">
                           <img src="https://picsum.photos/100/80" className="w-full h-16 object-cover mb-1 rounded" alt="thumb" />
                           <p className="text-[10px] text-center font-bold text-gray-700">ICTC BUILDING</p>
                        </div>
                        <div className="bg-white p-2 shadow-md rounded-lg w-32 shrink-0 hover:shadow-xl transition-shadow cursor-pointer">
                           <img src="https://picsum.photos/100/80?random=4" className="w-full h-16 object-cover mb-1 rounded" alt="thumb" />
                           <p className="text-[10px] text-center font-bold text-gray-700">CICS</p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
