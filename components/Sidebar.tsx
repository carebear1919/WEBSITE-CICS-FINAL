
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { X, ArrowRight, ExternalLink, ChevronRight } from 'lucide-react';

const { useNavigate } = ReactRouterDOM;

// --- Sidebar Modal Component ---
interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  link: string;
  hash: string;
}

const SidebarModal: React.FC<SidebarModalProps> = ({ isOpen, onClose, title, description, link, hash }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = () => {
    navigate(`${link}${hash}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative z-10 animate-slide-up border border-gray-100">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full p-1 transition-colors"
        >
          <X size={20}/>
        </button>
        
        <div className="mb-4">
          <h3 className="text-xl font-bold text-cics-dark mb-2 pr-6">{title}</h3>
          <div className="h-1 w-12 bg-cics-main rounded-full"></div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {description}
        </p>
        
        <button 
          onClick={handleNavigate} 
          className="w-full bg-gradient-to-r from-cics-dark to-cics-main text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:from-green-800 hover:to-green-600 transition-all flex items-center justify-center gap-2 group"
        >
          View Program Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </button>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<Omit<SidebarModalProps, 'isOpen' | 'onClose'> | null>(null);

  const handleAboutClick = () => {
    navigate('/about');
    window.scrollTo(0, 0);
  };

  const openModal = (item: any, hash: string) => {
    setSelectedItem({
      title: item.label,
      description: item.desc,
      link: '/programs',
      hash: hash
    });
  };

  const itItems = [
    { label: "System Administration", desc: "Gain expertise in installing, configuring, and maintaining computer systems and servers. Learn to manage user accounts, monitor system performance, and ensure high availability of enterprise IT infrastructure." },
    { label: "Web and Mobile Application", desc: "Master the art of creating responsive, user-friendly websites and cross-platform mobile applications. This track covers front-end design, back-end development, and modern frameworks." },
    { label: "Database Management", desc: "Focus on the design, implementation, and maintenance of robust database systems. Learn advanced SQL, data warehousing, and how to manage large-scale data for business intelligence." },
    { label: "Networking and Cybersecurity", desc: "Protect digital assets and secure network infrastructures. This specialization covers network architecture, ethical hacking, information assurance, and defense against cyber threats." }
  ];

  const csItems = [
    { label: "Algorithm Design and Analysis", desc: "Dive deep into the mathematical foundations of computing. Learn to design efficient algorithms to solve complex computational problems and analyze their performance." },
    { label: "Software Engineering", desc: "Understand the complete software development lifecycle. Learn methodologies for requirements gathering, system design, testing, and maintenance of large-scale software systems." },
    { label: "AI and Machine Learning", desc: "Explore the cutting edge of technology. Study neural networks, natural language processing, and computer vision to build intelligent systems that can learn and adapt." },
    { label: "Game Development", desc: "Combine creativity with technical skill. Learn game physics, graphics programming, and game engine architecture to build immersive interactive entertainment experiences." }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-cics-dark to-green-900 rounded-l-3xl rounded-r-lg p-6 text-white shadow-2xl h-full flex flex-col gap-8">
        
        <div 
          className="animate-fade-in cursor-pointer group"
          onClick={handleAboutClick}
        >
          <div className="bg-white/10 backdrop-blur-md text-white py-2 px-4 rounded mb-4 font-bold uppercase text-sm tracking-wider shadow-md border border-white/10 group-hover:bg-white/20 transition-colors flex justify-between items-center">
            About CICS <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
          </div>
          <p className="text-gray-300 text-sm italic mb-4 group-hover:text-white transition-colors">
            Empowering the future through excellence in IT and CS education.
          </p>
        </div>

        <div className="animate-fade-in delay-100">
          <h3 className="font-bold text-green-300 uppercase mb-3 border-b border-green-700/50 pb-2">
            Information Technology
          </h3>
          <ul className="space-y-3 text-sm font-sans">
            {itItems.map((item, idx) => (
              <li 
                key={idx}
                onClick={() => openModal(item, '#bsit')}
                className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group py-1"
              >
                <span className="text-green-500 group-hover:translate-x-1 transition-transform font-bold"><ChevronRight size={14} /></span> 
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in delay-200">
          <h3 className="font-bold text-green-300 uppercase mb-3 border-b border-green-700/50 pb-2">
            Computer Science
          </h3>
          <ul className="space-y-3 text-sm font-sans">
             {csItems.map((item, idx) => (
              <li 
                key={idx}
                onClick={() => openModal(item, '#bscs')}
                className="flex items-center gap-2 hover:text-green-300 cursor-pointer transition-colors group py-1"
              >
                <span className="text-green-500 group-hover:translate-x-1 transition-transform font-bold"><ChevronRight size={14} /></span> 
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto animate-slide-up">
          <button 
            onClick={() => { navigate('/programs'); window.scrollTo(0,0); }}
            className="block w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-center py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 border border-white/20"
          >
            Explore our Programs
          </button>
        </div>
      </div>

      <SidebarModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        {...selectedItem!}
        title={selectedItem?.title || ''}
        description={selectedItem?.description || ''}
        link={selectedItem?.link || ''}
        hash={selectedItem?.hash || ''}
      />
    </>
  );
};

export default Sidebar;
