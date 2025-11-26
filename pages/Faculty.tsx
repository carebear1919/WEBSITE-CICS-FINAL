
import React, { useState } from 'react';
import { Mail, BookOpen, Microscope, X, User, Briefcase, Award, ArrowRight } from 'lucide-react';

// --- Interfaces ---
interface FacultyProfile {
  name: string;
  role: string;
  department: string;
  image: string;
  expertise: string[];
  bio: string;
  researchInterests: string[];
  email: string;
}

interface AdminProfile {
  name: string;
  role: string;
  description: string;
  image: string;
}

// --- Modal Component ---
const FacultyModal: React.FC<{ profile: FacultyProfile | null; onClose: () => void }> = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-slide-up flex flex-col md:flex-row overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full z-20 transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-2/5 relative h-64 md:h-auto shrink-0">
          <img 
            src={profile.image} 
            alt={profile.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cics-dark via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
          
          <div className="absolute bottom-6 left-6 text-white md:hidden">
             <span className="bg-cics-main text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-sm uppercase tracking-wider">{profile.department}</span>
             <h3 className="text-2xl font-bold shadow-black drop-shadow-md">{profile.name}</h3>
             <p className="text-sm opacity-90">{profile.role}</p>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-3/5 p-8 bg-white flex flex-col overflow-y-auto">
          <div className="hidden md:block mb-6 border-b border-gray-100 pb-4">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{profile.name}</h3>
                  <p className="text-cics-main font-semibold flex items-center gap-2"><Award size={18}/> {profile.role}</p>
               </div>
               <span className="bg-green-100 text-cics-main text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{profile.department}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2"><User size={16} className="text-cics-main"/> Professional Bio</h4>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{profile.bio}"</p>
            </div>

            <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><Microscope size={16} className="text-cics-main"/> Research Interests</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {profile.researchInterests.map((interest, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                         {interest}
                      </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-white bg-cics-main hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-green-200 w-full justify-center md:w-auto">
                <Mail size={18} /> Contact: {profile.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Faculty Card Component ---
const FacultyCard: React.FC<{ profile: FacultyProfile; delay: number; onViewProfile: (p: FacultyProfile) => void }> = ({ profile, delay, onViewProfile }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full animate-slide-up border border-gray-100 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-wider bg-cics-main inline-block px-2 py-1 rounded mb-1 shadow-sm">
            {profile.department}
          </p>
          <h3 className="text-xl font-bold leading-tight drop-shadow-md">{profile.name}</h3>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <p className="text-cics-main font-semibold text-sm flex items-center gap-1 mb-3">
             <Award size={14} /> {profile.role}
          </p>
          
          <div className="flex flex-wrap gap-1">
             {profile.expertise.slice(0, 2).map((skill, idx) => (
               <span key={idx} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">{skill}</span>
             ))}
             {profile.expertise.length > 2 && <span className="text-xs text-gray-400 px-1 py-1">+{profile.expertise.length - 2} more</span>}
          </div>
        </div>

        <button 
          onClick={() => onViewProfile(profile)}
          className="w-full mt-auto flex items-center justify-center gap-2 py-3 rounded-lg bg-white border-2 border-green-50 text-cics-main hover:bg-cics-main hover:text-white hover:border-cics-main text-sm font-bold transition-all group-hover:shadow-md"
        >
          View Full Profile <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const Faculty: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<FacultyProfile | null>(null);

  const facultyList: FacultyProfile[] = [
    { 
      name: "Dr. Maria Santos", 
      role: "Professor & Chair, CSD", 
      department: "Computer Science", 
      image: "https://picsum.photos/400/500?person=1",
      expertise: ["Artificial Intelligence", "Neural Networks", "Data Science"],
      bio: "Dr. Santos has over 15 years of experience in AI research and has published numerous papers on deep learning applications in healthcare. She leads the university's AI initiative and mentors PhD candidates.",
      researchInterests: ["Computer Vision", "Natural Language Processing", "AI Ethics", "Predictive Analytics"],
      email: "m.santos@cics.edu"
    },
    { 
      name: "Prof. James Reyes", 
      role: "Associate Professor", 
      department: "Information Technology", 
      image: "https://picsum.photos/400/500?person=2",
      expertise: ["Network Security", "Cloud Computing", "SysAdmin"],
      bio: "Prof. Reyes is a certified CISCO instructor and brings industry-grade networking knowledge to the classroom. He mentors the university's cybersecurity team which competes internationally.",
      researchInterests: ["IoT Security", "Software Defined Networking", "Blockchain Applications"],
      email: "j.reyes@cics.edu"
    },
    { 
      name: "Dr. Alan Cheng", 
      role: "Assistant Professor", 
      department: "Computer Science", 
      image: "https://picsum.photos/400/500?person=3",
      expertise: ["Game Development", "Graphics", "HCI"],
      bio: "With a background in the AAA gaming industry, Dr. Cheng focuses on immersive technologies and interactive media design. He advocates for gamification in education.",
      researchInterests: ["Virtual Reality", "Game AI", "User Experience (UX)", "Real-time Rendering"],
      email: "a.cheng@cics.edu"
    },
    { 
      name: "Prof. Elena Cruz", 
      role: "Lecturer", 
      department: "Software Engineering", 
      image: "https://picsum.photos/400/500?person=4",
      expertise: ["Web Development", "Mobile Apps", "UI/UX"],
      bio: "Prof. Cruz specializes in full-stack development and agile methodologies. She coordinates the capstone projects for graduating seniors and organizes hackathons.",
      researchInterests: ["Progressive Web Apps", "Educational Technology", "Accessibility Standards"],
      email: "e.cruz@cics.edu"
    },
  ];

  const adminList: AdminProfile[] = [
    {
      name: "Mr. Robert Diaz",
      role: "College Secretary",
      description: "Manages student records, enrollment processes, and general administrative support for the Dean's office.",
      image: "https://picsum.photos/200/200?person=5"
    },
    {
      name: "Ms. Sarah Lee",
      role: "Laboratory Coordinator",
      description: "Oversees the maintenance and scheduling of all computer laboratories and technical equipment.",
      image: "https://picsum.photos/200/200?person=6"
    }
  ];

  return (
    <div className="w-full animate-fade-in pb-16">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-cics-dark to-cics-main py-16 text-center text-white mb-12 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md relative z-10">Faculty & Staff</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90 relative z-10 font-light">
          Meet the dedicated educators and professionals committed to shaping the future of technology.
        </p>
      </div>

      <div className="container mx-auto px-4 space-y-20">
        
        {/* Faculty Directory */}
        <section>
          <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-4">
             <div className="p-3 bg-green-100 rounded-2xl text-cics-main">
                <BookOpen size={32} />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-gray-800">Faculty Directory</h2>
               <p className="text-gray-500 text-sm">Our esteemed academic team</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facultyList.map((profile, index) => (
              <FacultyCard 
                key={index} 
                profile={profile} 
                delay={index * 100} 
                onViewProfile={setSelectedProfile} 
              />
            ))}
          </div>
        </section>

        {/* Administrative Staff */}
        <section className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 shadow-inner border border-gray-100">
           <div className="flex items-center gap-4 mb-10 justify-center">
             <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <Briefcase size={32} />
             </div>
             <div className="text-center md:text-left">
               <h2 className="text-3xl font-bold text-gray-800">Administrative Staff</h2>
               <p className="text-gray-500 text-sm">Supporting our daily operations</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {adminList.map((admin, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition-all animate-slide-up">
                 <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                   <img src={admin.image} alt={admin.name} className="w-full h-full object-cover" />
                 </div>
                 <div>
                   <h3 className="font-bold text-xl text-gray-800">{admin.name}</h3>
                   <p className="text-cics-main font-bold text-sm mb-2">{admin.role}</p>
                   <p className="text-sm text-gray-600 leading-snug">{admin.description}</p>
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
               <div key={index} className="group relative rounded-2xl overflow-hidden shadow-lg h-64 cursor-pointer animate-slide-up hover:shadow-2xl transition-all" style={{ animationDelay: `${index * 150}ms` }}>
                  <img src={lab.img} alt={lab.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-xl mb-2 group-hover:text-green-300 transition-colors">{lab.name}</h4>
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {lab.desc}
                    </p>
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
