
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, BookOpen, Microscope, X, User, Briefcase, Award, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';

// --- Interfaces ---
interface FacultyProfile {
  id: number;
  name: string;
  role: string; // Work Type
  department: string; // CS or IT
  image: string;
  expertise: string[];
  bio: string;
}

interface AdminProfile {
  id: number;
  name: string;
  role: string; // Position
  image: string;
}

// --- Modal Component ---
const FacultyModal: React.FC<{ profile: FacultyProfile | null; onClose: () => void }> = ({ profile, onClose }) => {
  if (!profile) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-slide-up flex flex-col md:flex-row overflow-hidden border border-gray-100">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-red-500 hover:text-white text-gray-800 rounded-full z-20 transition-all backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-2/5 relative h-72 md:h-auto shrink-0 bg-gray-100 group">
          <img 
            src={profile.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random`} 
            alt={profile.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5"></div>
          
          <div className="absolute bottom-6 left-6 text-white md:hidden">
             <span className="bg-cics-main/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block shadow-sm uppercase tracking-wider border border-white/20">{profile.department}</span>
             <h3 className="text-2xl font-bold shadow-black drop-shadow-md leading-tight">{profile.name}</h3>
             <p className="text-sm opacity-90 font-light">{profile.role}</p>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-3/5 p-8 md:p-10 bg-white flex flex-col overflow-y-auto">
          <div className="hidden md:block mb-8 border-b border-gray-100 pb-6">
            <div className="flex justify-between items-start gap-4">
               <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{profile.name}</h3>
                  <p className="text-cics-main font-semibold flex items-center gap-2 text-lg"><Award size={20}/> {profile.role}</p>
               </div>
               <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shrink-0 ${profile.department.includes('Computer Science') ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                 {profile.department === "Computer Science" ? "CS Department" : "IT Department"}
               </span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-500" /> Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((skill, idx) => (
                    <span key={idx} className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
            </div>

            <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-cics-main rounded-l-2xl"></div>
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><User size={16} className="text-cics-main"/> Faculty Profile</h4>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{profile.bio}"
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// --- Faculty Card Component ---
const FacultyCard: React.FC<{ profile: FacultyProfile; delay: number; onViewProfile: (p: FacultyProfile) => void }> = ({ profile, delay, onViewProfile }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full animate-slide-up border border-gray-100 group cursor-pointer overflow-hidden transform hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onViewProfile(profile)}
    >
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img 
          src={profile.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random`} 
          alt={profile.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Floating Badge */}
        <div className="absolute top-4 right-4">
           <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-white/20 text-white ${profile.department === "Computer Science" ? "bg-blue-600/80" : "bg-green-600/80"}`}>
             {profile.department === "Computer Science" ? "CS" : "IT"}
           </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold leading-tight drop-shadow-lg mb-1">{profile.name}</h3>
          <p className="text-xs font-light opacity-90 flex items-center gap-1">
             <Briefcase size={12} className="inline"/> {profile.role}
          </p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between bg-white relative">
        <div className="mb-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Expertise</h4>
          <div className="flex flex-wrap gap-1.5">
             {profile.expertise.slice(0, 3).map((skill, idx) => (
               <span key={idx} className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200 truncate max-w-[100%]">
                 {skill}
               </span>
             ))}
             {profile.expertise.length > 3 && (
                <span className="text-[10px] font-bold text-cics-main bg-green-50 px-2 py-1 rounded-md border border-green-100">
                    +{profile.expertise.length - 3}
                </span>
             )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-50 flex justify-end">
            <span className="text-xs font-bold text-cics-main flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Full Profile <ArrowRight size={14} />
            </span>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const Faculty: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<FacultyProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'Computer Science' | 'Information Technology'>('Computer Science');
  const [searchQuery, setSearchQuery] = useState('');

  const facultyList: FacultyProfile[] = [
    // CS FACULTY
    { id: 1, department: "Computer Science", name: "Barrameda, Rolando B.", role: "Full-time", expertise: ["Graphics","Machine Learning","Natural Language Processing","Artificial Intelligence"], image: "https://i.imgur.com/Xz1O4bj.png", bio: "Sir Rolando is a dedicated Full-time faculty specializing in advanced AI and Graphics." },
    { id: 2, department: "Computer Science", name: "Eduardo, Josephine T.", role: "Full-time", expertise: ["Animation and Image Processing","Animation"], image: "https://i.imgur.com/4wEkRTF.png", bio: "Ms. Josephine brings creativity to code, focusing on Animation and digital processing." },
    { id: 3, department: "Computer Science", name: "Erquita, Marnelli B", role: "Full-time", expertise: ["Intelligent Systems"], image: "https://i.imgur.com/6aO2HFo.png", bio: "Ms. Marnelli specializes in Intelligent Systems, guiding students through complex logic and AI." },
    { id: 4, department: "Computer Science", name: "Herradura, Tita R.", role: "Full-time", expertise: ["Intelligent Systems","Cisco Networking","Empathic Computing","Computer Vision"], image: "https://i.imgur.com/TvIVzKY.png", bio: "Ms. Tita is an expert in Networking and Computer Vision, bridging hardware and software intelligence." },
    { id: 5, department: "Computer Science", name: "Kamantigue, Sheryl D.", role: "Full-time", expertise: ["Intelligent Systems and Network"], image: "https://i.imgur.com/Pw6oWln.png", bio: "Ms. Sheryl focuses on the intersection of Intelligent Systems and robust Network architectures." },
    { id: 20, department: "Computer Science", name: "Manaois, Jennylinde R.", role: "Full-time", expertise: ["Intelligent Systems and Network"], image: "https://i.imgur.com/5ueNL3O.png", bio: "Ms. Jennylinde serves as the Supervisor for the Center for Artificial Intelligence." },
    { id: 21, department: "Computer Science", name: "Bancud, Jan Daenell P.", role: "Part-time", expertise: ["Game Development"], image: "https://i.imgur.com/wlG5pTR.png", bio: "Specializing in Game Development, instructing the next generation of game designers." },
    { id: 22, department: "Computer Science", name: "Cabalsa, Elsie", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/2MD5zPM.png", bio: "An expert programmer dedicated to teaching fundamental and advanced coding techniques." },
    { id: 23, department: "Computer Science", name: "Colocado, Erika Kyle", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/OwcJ61a.png", bio: "Ms. Erika brings industry programming standards into the academic environment." },
    { id: 24, department: "Computer Science", name: "De Ocampo, Gerson", role: "Part-time", expertise: ["Game Development"], image: "https://i.imgur.com/Zfxhx1n.png", bio: "Sir Gerson focuses on interactive entertainment and game engine mechanics." },
    { id: 25, department: "Computer Science", name: "Lodronio, Ranielle T.", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/lgwDTxO.png", bio: "Specializes in software development and algorithmic problem solving." },
    { id: 26, department: "Computer Science", name: "Rollan, Joynalyn P.", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/yc6s74U.png", bio: "Dedicated to building strong programming foundations for CS students." },
    { id: 27, department: "Computer Science", name: "Zapanta, Orlando", role: "Part-time", expertise: ["Programming and Web Design"], image: "", bio: "Focuses on the visual and logical aspects of Web Design and Programming." },

    // IT FACULTY
    { id: 6, department: "Information Technology", name: "Del Rosario, Maria Gloria A.", role: "Full-time", expertise: ["Network Technology"], image: "https://i.imgur.com/xTv0OnQ.png", bio: "Supervisor for Training and Support (CDLM), specializing in Network Tech." },
    { id: 28, department: "Information Technology", name: "Doctor, Juanito Jr. C.", role: "Full-time", expertise: ["Web Development","Systems Applications","DBMS","Mobile Applications"], image: "https://i.imgur.com/OpzTV6M.png", bio: "A full-stack expert covering everything from DBMS to Mobile Apps." },
    { id: 29, department: "Information Technology", name: "Gatpandan, Paulino H., DIT", role: "Full-time", expertise: ["Data Mining","Database Management","Business Analytics"], image: "https://i.imgur.com/XGRCzuk.png", bio: "Dr. Paulino specializes in extracting value from data through mining and analytics." },
    { id: 30, department: "Information Technology", name: "Mayuga, Emelyn D.", role: "Full-time", expertise: ["Web","HCI","PHP"], image: "https://i.imgur.com/N43sYA1.png", bio: "Supervisor of the Computer Laboratory, with a focus on Web and HCI." },
    { id: 31, department: "Information Technology", name: "Mitschek, Marivic R.", role: "Full-time", expertise: ["Analytic and Network"], image: "https://i.imgur.com/c3XR6Wz.png", bio: "The Dean of CICS, specializing in Analytics and Network infrastructure." },
    { id: 32, department: "Information Technology", name: "Mojica, Azenith R.", role: "Full-time", expertise: ["Programming"], image: "https://i.imgur.com/k1uKXG1.png", bio: "Ms. Azenith is dedicated to core programming excellence." },
    { id: 33, department: "Information Technology", name: "Naz, Sherry B.", role: "Full-time", expertise: ["Software Programming"], image: "https://i.imgur.com/7BxRVaW.png", bio: "The ITD Chair, leading the department with expertise in Software Programming." },
    { id: 34, department: "Information Technology", name: "Pamintuan, Evangeline G.", role: "Full-time", expertise: ["Programming"], image: "https://i.imgur.com/qZRVaRk.png", bio: "Ms. Evangeline focuses on developing strong logic and coding skills in students." },
    { id: 35, department: "Information Technology", name: "Rosas, Maryli F., DIT", role: "Full-time", expertise: ["Data Mining","Database","Analytics"], image: "https://i.imgur.com/CtFDbsg.png", bio: "Dr. Maryli is an expert in Data Mining and Database architectures." },
    { id: 36, department: "Information Technology", name: "Sanares, Roda N., DIT", role: "Full-time", expertise: ["Software Engineer","Project Management","HCI"], image: "https://i.imgur.com/ALPvMti.png", bio: "Director of the Center for Digital Learning Management, expert in Project Management." },
    { id: 37, department: "Information Technology", name: "Sermana, Rochelle D.", role: "Full-time", expertise: ["Programming","Multimedia","IOT"], image: "https://i.imgur.com/aFx28fH.png", bio: "Ms. Rochelle explores the cutting edge of IOT and Multimedia programming." },
    { id: 38, department: "Information Technology", name: "Baculod, Joniel M.", role: "Part-time", expertise: ["Web Development"], image: "https://i.imgur.com/YmBUKOj.png", bio: "Specializes in modern Web Development frameworks and practices." },
    { id: 39, department: "Information Technology", name: "Balleras, Randolph M.", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/q8cpbdn.png", bio: "Focused on delivering quality programming instruction." },
    { id: 40, department: "Information Technology", name: "Erolin, Sharon P.", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/WgLMO51.png", bio: "Ms. Sharon brings passion to introductory and advanced programming courses." },
    { id: 41, department: "Information Technology", name: "Galingana, Cesar D.", role: "Part-time", expertise: ["HTML"], image: "https://i.imgur.com/NPbDFtF.png", bio: "Specialist in web markup and frontend fundamentals." },
    { id: 42, department: "Information Technology", name: "Galve, Aronold B.", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/RmU9IWe.png", bio: "Dedicated to student success in programming logic." },
    { id: 43, department: "Information Technology", name: "Lina, Maria Patricia. B.", role: "Part-time", expertise: ["Programming"], image: "https://i.imgur.com/2s6iodW.png", bio: "Ms. Maria Patricia focuses on software development fundamentals." },
    { id: 44, department: "Information Technology", name: "Manalo,Michael Angelo F.", role: "Part-time", expertise: ["Networking"], image: "https://i.imgur.com/7BXMrv8.png", bio: "Mr. Michael brings real-world networking experience to the classroom." },
    { id: 45, department: "Information Technology", name: "Sandagon, Maribel S.", role: "Part-time", expertise: ["Database"], image: "https://i.imgur.com/dr1DT6z.png", bio: "Specializes in database design, management, and SQL." },
    { id: 46, department: "Information Technology", name: "De Vera, Raul M.", role: "Part-time", expertise: ["Networking"], image: "https://i.imgur.com/erW2bYd.png", bio: "Focuses on network infrastructure and connectivity solutions." },
    { id: 47, department: "Information Technology", name: "de las Alas, John Cedrick A.", role: "Part-time", expertise: ["Data Analytics","Business Intelligence"], image: "https://i.imgur.com/7W8uUOk.png", bio: "Expert in transforming data into actionable business intelligence." },
    { id: 48, department: "Information Technology", name: "Flores, Robert T.", role: "Part-time", expertise: ["Web Development","Project Management"], image: "https://i.imgur.com/XKk8fQo.png", bio: "Combines technical web skills with effective project management strategies." },
    { id: 50, department: "Information Technology", name: "Ortile, Dan Angelo A.", role: "Part-time", expertise: ["Full Stack Web Development","Data Analysis"], image: "https://i.imgur.com/HZqnws6.jpeg", bio: "A modern full-stack developer with a knack for data analysis." },
    { id: 51, department: "Information Technology", name: "Uncad, Jayson M.", role: "Part-time", expertise: ["Network","Security"], image: "https://i.imgur.com/CcI3cm2.jpeg", bio: "Specializes in securing network infrastructures and cybersecurity." },
  ];

  const adminList: AdminProfile[] = [
    { id: 1, name: "Mitschek, Marivic R.", role: "Dean", image: "https://i.imgur.com/5Y1Esdm.png" },
    { id: 2, name: "Barrameda, Rolando B.", role: "Associate Dean", image: "https://i.imgur.com/Z6B5xL1.png" },
    { id: 3, name: "Rodriguez, Rina G.", role: "Secretary to the Dean", image: "https://i.imgur.com/jQNNtBM.png" },
    { id: 4, name: "Eduardo, Josephine T.", role: "CSD Chair", image: "https://i.imgur.com/exkdYJC.png" },
    { id: 5, name: "Manzano, Cherry P.", role: "Secretary to the Chair, CSD", image: "https://i.imgur.com/KOohIMF.png" },
    { id: 6, name: "Naz, Sherry B.", role: "ITD Chair", image: "https://i.imgur.com/VWktasU.png" },
    { id: 7, name: "Joya, Joyra Jesusa L.", role: "Secretary to the Chair, ITD", image: "https://i.imgur.com/n77k4sz.png" },
    { id: 8, name: "Mayuga, Emelyn D.", role: "Supervisor, Computer Laboratory", image: "https://i.imgur.com/UC8MHYo.png" },
    { id: 9, name: "Morallo, Homer P.", role: "Technician, Computer Laboratory", image: "https://i.imgur.com/Q7ab1ap.png" },
    { id: 10, name: "Manaois, Jennylinde R.", role: "Supervisor, Center for Artificial Intelligence", image: "https://i.imgur.com/SVMx0He.png" },
    { id: 11, name: "Del Rosario, Maria Gloria A.", role: "Supervisor, Training and Support (CDLM)", image: "https://i.imgur.com/ApX6xSV.png" },
    { id: 12, name: "Sanares, Roda N., DIT", role: "Director, Center for Digital Learning Management", image: "https://i.imgur.com/mKBpkq6.png" },
  ];

  // Search Logic
  const filteredFaculty = useMemo(() => {
    return facultyList.filter(f => {
      const matchesTab = f.department === activeTab;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        f.name.toLowerCase().includes(query) ||
        f.expertise.some(skill => skill.toLowerCase().includes(query)) ||
        f.role.toLowerCase().includes(query);
      return matchesTab && matchesSearch;
    });
  }, [facultyList, activeTab, searchQuery]);

  return (
    <div className="w-full animate-fade-in pb-16 bg-gray-50/50">
      
      {/* Header Section */}
      <div className="bg-cics-dark py-20 text-center text-white shadow-xl relative overflow-hidden mb-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">Faculty & Staff</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 font-light">
            Meet the dedicated experts shaping the future of technology through excellence in education and research.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 space-y-24">
        
        {/* Faculty Directory */}
        <section className="scroll-mt-24" id="directory">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
             <div className="w-full md:w-auto">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-green-100 rounded-xl text-cics-main">
                        <BookOpen size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Faculty Directory</h2>
                </div>
                <p className="text-gray-500 text-sm ml-14">Browse our esteemed academic team by department.</p>
             </div>

             {/* Search Bar */}
             <div className="w-full md:w-96 relative">
                <input 
                  type="text" 
                  placeholder="Search faculty, expertise, or role..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cics-main focus:ring-2 focus:ring-green-100 outline-none transition-all shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
             </div>
          </div>

          {/* Department Tabs */}
          <div className="flex justify-center md:justify-start mb-8 border-b border-gray-200">
             <div className="flex gap-8">
               <button 
                  onClick={() => setActiveTab('Computer Science')}
                  className={`pb-4 px-2 text-sm font-bold uppercase tracking-wide transition-all relative ${
                    activeTab === 'Computer Science' 
                    ? 'text-cics-main' 
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
               >
                 Computer Science
                 {activeTab === 'Computer Science' && (
                   <span className="absolute bottom-0 left-0 w-full h-1 bg-cics-main rounded-t-full"></span>
                 )}
               </button>
               <button 
                  onClick={() => setActiveTab('Information Technology')}
                  className={`pb-4 px-2 text-sm font-bold uppercase tracking-wide transition-all relative ${
                    activeTab === 'Information Technology' 
                    ? 'text-cics-main' 
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
               >
                 Information Technology
                 {activeTab === 'Information Technology' && (
                   <span className="absolute bottom-0 left-0 w-full h-1 bg-cics-main rounded-t-full"></span>
                 )}
               </button>
             </div>
          </div>

          {filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredFaculty.map((profile, index) => (
                <FacultyCard 
                  key={profile.id} 
                  profile={profile} 
                  delay={index * 50} 
                  onViewProfile={setSelectedProfile} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                 <Search size={32} />
               </div>
               <h3 className="text-xl font-bold text-gray-800">No faculty found</h3>
               <p className="text-gray-500 mt-2">Try adjusting your search terms or switching departments.</p>
            </div>
          )}
        </section>

        {/* Administrative Staff */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>

           <div className="flex items-center gap-4 mb-10 relative z-10">
             <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                <GraduationCap size={28} />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-gray-800">Administrative Staff</h2>
               <p className="text-gray-500 text-sm">Leadership & Support Team</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
            {adminList.map((admin, idx) => (
              <div key={admin.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all animate-slide-up group border border-gray-100 hover:border-blue-200 flex items-center gap-4" style={{ animationDelay: `${idx * 50}ms` }}>
                 <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-blue-500 transition-colors">
                   <img src={admin.image} alt={admin.name} className="w-full h-full object-cover" />
                 </div>
                 <div>
                   <h3 className="font-bold text-sm text-gray-800 leading-tight mb-1 group-hover:text-blue-700 transition-colors">{admin.name}</h3>
                   <p className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full inline-block">{admin.role}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Labs */}
        <section>
          <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-4">
             <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                <Microscope size={32} />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-gray-800">Research Groups & Laboratories</h2>
               <p className="text-gray-500 text-sm">Hubs of innovation and discovery</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { name: 'AI & Robotics Lab', desc: 'Focusing on machine learning, autonomous systems, and human-robot interaction.', img: 'https://picsum.photos/400/300?robot' },
               { name: 'Networking & Security Lab', desc: 'Dedicated to cybersecurity research, network infrastructure, and ethical hacking.', img: 'https://picsum.photos/400/300?server' },
               { name: 'Software Development Lab', desc: 'A collaborative space for full-stack engineering, app development, and agile projects.', img: 'https://picsum.photos/400/300?code' }
             ].map((lab, index) => (
               <div key={index} className="group relative rounded-3xl overflow-hidden shadow-lg h-72 cursor-pointer animate-slide-up hover:shadow-2xl transition-all hover:-translate-y-1" style={{ animationDelay: `${index * 150}ms` }}>
                  <img src={lab.img} alt={lab.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h4 className="font-bold text-2xl mb-2 group-hover:text-green-300 transition-colors">{lab.name}</h4>
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                      {lab.desc}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                       <span className="text-xs font-bold uppercase tracking-wider border-b border-green-300 pb-1 text-green-300">Learn more</span>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </section>
      </div>

      {/* Modal Rendered at the end */}
      <FacultyModal 
        profile={selectedProfile} 
        onClose={() => setSelectedProfile(null)} 
      />
    </div>
  );
};

export default Faculty;
