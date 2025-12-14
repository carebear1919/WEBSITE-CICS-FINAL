
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BookOpen, Briefcase, Download, GraduationCap, ChevronDown, ChevronUp, Cpu, Globe, Layers, ArrowDown, CheckCircle, Award, ScrollText } from 'lucide-react';
import ProgramBanner from '../Images/ProgramBanner.jpg';

const { useLocation } = ReactRouterDOM;

// --- Expandable Text Component ---
interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength = 250, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className={`text-gray-600 text-sm leading-relaxed text-justify transition-all duration-500 ease-in-out relative ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-[6em] overflow-hidden'}`}>
         {shouldTruncate && !isExpanded ? (
           <>
            {text.slice(0, maxLength)}...
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent"></div>
           </>
         ) : (
            <span dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />
         )}
      </div>
      
      {shouldTruncate && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs font-bold uppercase tracking-wider text-cics-main flex items-center gap-1 hover:text-green-800 transition-colors focus:outline-none"
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

// --- Admission Guidelines Component ---
const AdmissionGuidelines = () => {
  const [activeTab, setActiveTab] = useState('Freshmen');

  const requirements: Record<string, { title: string, content: string[] }> = {
    Freshmen: {
      title: "College Freshmen",
      content: [
        "An applicant who has completed Senior High School and has not taken any college course.",
        "An applicant who has completed equivalent Secondary Education from any school abroad and has not taken any college course.",
        "A passer of Alternative Learning System (ALS) with certification of eligibility to be admitted to college.",
        "Must have satisfactorily completed their senior high school education.",
        "Passed the DLSU-D Student Admissions Test (DSAT) exam and met the stanine (cut-off) scores required by the program.",
        "Passed the interview by the Department Chair concerned."
      ]
    },
    Transferees: {
      title: "Transferees",
      content: [
        "A student from another school/university may be accepted in any COS program provided he/she has a GPA of at least 2.00 or its equivalent.",
        "No failing grade in all academic and non-academic courses.",
        "Passed the interview conducted by the Department Chair concerned or the Associate Dean.",
        "Recommendation letters from at least two former professors.",
        "Certification of good moral character.",
        "Transcript of records from previous school.",
        "Taken the DLSU-D Student Admissions Test (DSAT) exam and met the stanine (cut-off) scores required by the program.",
        "Passed the Qualifying Exam for BIT and BCS applicants."
      ]
    },
    Shiftees: {
      title: "Shiftees",
      content: [
        "A student from another course who intends to shift to any COS program must have a GPA of at least 2.00.",
        "Passed the interview conducted by the Department Chair concerned or the Associate Dean.",
        "Passed the Qualifying Exam for BIT and BCS applicants.",
        "Satisfied the Retention Policy of the college/university."
      ]
    },
    Returnees: {
      title: "Returnees",
      content: [
        "A COS returning student maybe readmitted if he/she has passed the interview conducted by the Department Chair concerned or the Associate Dean.",
        "Satisfied the Retention Policy of the college/university."
      ]
    },
    SecondCourse: {
      title: "Second Course Takers",
      content: [
        "An applicant who has completed any college degree from any CHEd recognized college or university.",
        "Pass the interview conducted by the Department Chair concerned or the Associate Dean /or the Dean (for DLSUD graduates).",
        "Follow the same requirements as for transferees (for non-DLSUD graduates)."
      ]
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 animate-slide-up">
      <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
        <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-700">
           <ScrollText size={32} />
        </div>
        <div>
           <h2 className="text-3xl font-bold text-gray-800">Admission Guidelines</h2>
           <p className="text-gray-500 text-sm">Requirements for aspiring CICS students</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(requirements).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === key 
              ? 'bg-cics-main text-white shadow-lg scale-105' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 min-h-[200px] animate-fade-in">
         <h3 className="text-xl font-bold text-cics-dark mb-4">{requirements[activeTab].title}</h3>
         <ul className="space-y-3">
           {requirements[activeTab].content.map((item, idx) => (
             <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                <CheckCircle size={16} className="text-cics-main shrink-0 mt-0.5" />
                <span>{item}</span>
             </li>
           ))}
         </ul>
      </div>
    </div>
  );
};

// --- Main Programs Page ---
const Programs: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300); // delay to ensure rendering
    }
  }, [location]);

  const handleDownload = (program: string) => {
    const fileName = `${program.replace(/\s+/g, '_')}_Curriculum_2025.pdf`;
    alert(`Downloading ${fileName}... \n(This is a placeholder for the actual file download)`);
  };

  return (
    <div className="w-full animate-fade-in">
      
      {/* Modern Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden shadow-2xl group">
        <img 
          src={ProgramBanner} 
          alt="Academic Programs Banner" 
          className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[20s] ease-linear"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cics-dark/90 via-cics-main/70 to-cics-dark/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-2xl tracking-wide border-b-4 border-yellow-500 pb-4 inline-block">
              Academic Programs
            </h1>
            <p className="text-gray-100 text-lg md:text-2xl max-w-3xl font-light leading-relaxed mx-auto text-shadow-sm">
              Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for the evolving digital landscape.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80 hidden md:block">
           <ArrowDown size={32} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        
        {/* Undergraduate Programs Section */}
        <section>
          <div className="flex items-center gap-4 mb-10 animate-slide-up border-b border-gray-200 pb-4">
             <div className="p-3 bg-green-100 rounded-2xl text-cics-main">
                <GraduationCap size={32} />
             </div>
             <div>
               <h2 className="text-3xl font-bold text-gray-800">Undergraduate Programs</h2>
               <p className="text-gray-500 text-sm">Foundational degrees for aspiring tech professionals</p>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-16">
            
            {/* ==================== BSIT Card ==================== */}
            <div id="bsit" className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-slide-up scroll-mt-32">
              <div className="bg-gradient-to-r from-cics-dark to-cics-main p-8 text-white relative">
                 <Globe className="absolute -bottom-6 -right-6 text-white/10 rotate-12" size={160} />
                 <div className="relative z-10">
                   <div className="bg-white/20 backdrop-blur-sm inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border border-white/20">4 YEARS</div>
                   <h3 className="text-4xl font-bold mb-2 tracking-tight">BSIT</h3>
                   <p className="text-green-50 font-medium text-lg border-l-4 border-yellow-400 pl-3">Bachelor of Science in Information Technology</p>
                 </div>
              </div>
              
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Description & Career */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <BookOpen size={16} className="text-cics-main" /> Program Overview
                    </h4>
                    <ExpandableText 
                      text={`The Bachelor of Science in Information Technology program focuses on the rigorous training of students with the latest IT concepts and applications. It provides a practical approach in studying the various facets and latest applications of the IT industry; with track in: Network Technology or Software Technology.

Graduates of this program may pursue a meaningful career as a database administrator, entrepreneur in the IT industry, information security administrator, IT instructor, programmer, trainer or researcher. They can also become successful as researchers, information security/network administrators, technical support specialists or web administrators, web masters or web developers.`} 
                      maxLength={300} 
                    />
                  </div>

                  <div>
                     <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Briefcase size={16} className="text-cics-main" /> Department Overview
                    </h4>
                     <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                        <h5 className="font-bold text-cics-dark mb-2">Information Technology Department (ITD)</h5>
                        <ExpandableText 
                          text={`The Information Technology Department (ITD) is part of the College of Science and is in charge of overseeing the BS Information Technology program with specialization in Web Development and Network Track. Its faculty is specialized and has certifications in Networking, Mobile and Web Programming, Business and Data Analytics.

The department continuously upholds the vision and goal of DLSU-Dasmariñas and works to generate Christian professionals who can meet the labor demands of the rapidly growing local and global industries. The Information Technology Department was awarded as a Center of Development (COD) by the Commission on Higher Education (CHED) in 2016.

<b>Objectives:</b>
• Prepare students to be proficient in many computing theoretical and application areas.
• Offer students current Information Technology courses to aid in acquiring the skills required for rewarding careers in the sector.
• Train students how to conduct research, critical thinking, and abstract reasoning.`}
                          maxLength={250}
                        />
                     </div>
                  </div>

                  <div>
                     <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Layers size={16} className="text-cics-main" /> Major Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {['Introduction to Computing', 'Fundamentals of Programming', 'Data Structures and Algorithms', 'Human Computer Interaction', 'Information Assurance and Security', 'Networking', 'Social and Professional Issues', 'System Integration and Architecture', 'Web Systems and Technologies', 'Mobile Enterprise Systems', 'Internet of Things', 'Big Data and Analytics'].map((subj) => (
                          <span key={subj} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">{subj}</span>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Curriculum & Downloads */}
                <div className="space-y-6">
                   <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <h4 className="font-bold text-gray-800 mb-4 text-center">Career Paths</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {['Web Developer', 'Systems Admin', 'Network Engineer', 'IT Support', 'IT Instructor', 'Programmer', 'Technical Support'].map(job => (
                          <span key={job} className="bg-white text-cics-main px-3 py-1 rounded-full text-xs font-bold border border-green-100 shadow-sm">
                            {job}
                          </span>
                        ))}
                      </div>
                   </div>

                   <button 
                    onClick={() => handleDownload('BSIT')}
                    className="w-full bg-cics-main hover:bg-green-800 text-white px-6 py-4 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <Download size={18} className="text-white/70 group-hover:text-white transition-colors" /> Download Curriculum
                  </button>
                </div>
              </div>
            </div>

            {/* ==================== BSCS Card ==================== */}
            <div id="bscs" className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-slide-up scroll-mt-32">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white relative">
                 <Cpu className="absolute -bottom-6 -right-6 text-white/10 rotate-12" size={160} />
                 <div className="relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border border-white/20">4 YEARS</div>
                   <h3 className="text-4xl font-bold mb-2 tracking-tight">BSCS</h3>
                   <p className="text-blue-100 font-medium text-lg border-l-4 border-yellow-400 pl-3">Bachelor of Science in Computer Science</p>
                 </div>
              </div>
              
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <BookOpen size={16} className="text-blue-600" /> Program Overview
                    </h4>
                    <ExpandableText 
                      text={`The Bachelor of Science in Computer Science program prepares students to be highly competent and certified in the areas of computing theory and applications; trains them in the areas of abstract reasoning, analytical thinking and research; with track in: Robotics or Mobile and Game Development.

<b>Specialization in Game Development</b>
Provides students with real-world skills and experience required for successful game design and development. Graduates may pursue careers as Game Designer, System Designer, Level Designer, Game Programmer, Gameplay Engineer.

<b>Specialization in Intelligent Systems</b>
Trains students in abstract reasoning, analytical thinking, and research, focusing on solving problems in Artificial Intelligence (AI). Graduates may pursue careers as AI Programmer, Machine Learning Engineer, Computer Vision Analyst.`} 
                      maxLength={350} 
                    />
                  </div>

                  <div>
                     <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Briefcase size={16} className="text-blue-600" /> Department Overview
                    </h4>
                     <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                        <h5 className="font-bold text-blue-900 mb-2">Computer Science Department (CSD)</h5>
                        <ExpandableText 
                          text={`The Computer Science Department (CSD) promotes courses in Computer Science with specialization in Game Development and Intelligent Systems. It molds students into becoming computer scientists by providing them with core computer science courses as well as a variety of application and interdisciplinary areas in computational thinking.

Guided by the Lasallian values of Faith, Zeal, and Communion, it aims to develop well-rounded students who possess the five C's of a true Lasallian: Committed, Confident, Compassionate, Competent, and Christian.

<b>Objectives:</b>
• Prepare students to be highly competent in aspects of computing concepts and theories.
• Train students in the discipline of software engineering, focusing on effective design and implementation.
• Imbibe to students a sense of excellence and Christian values.`}
                          maxLength={250}
                        />
                     </div>
                  </div>

                  <div>
                     <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Layers size={16} className="text-blue-600" /> Major Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {['Fundamentals of Programming', 'Data Structures and Algorithms', 'Object-oriented Programming', 'Automata Theory', 'Software Engineering', 'Intelligent Systems', 'Parallel and Distributed Computing', 'Computer Vision', 'Game Design Principles', '3D Graphics and Animation'].map((subj) => (
                          <span key={subj} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">{subj}</span>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                   <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <h4 className="font-bold text-gray-800 mb-4 text-center">Certifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                           <Award className="text-yellow-500" size={20} />
                           <span className="text-sm font-bold text-gray-700">Microsoft Office Specialist (MOS)</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                           <Award className="text-blue-500" size={20} />
                           <span className="text-sm font-bold text-gray-700">Microsoft Technology Associate (MTA)</span>
                        </div>
                      </div>
                   </div>

                   <button 
                    onClick={() => handleDownload('BSCS')}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white px-6 py-4 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    <Download size={18} className="text-white/70 group-hover:text-white transition-colors" /> Download Curriculum
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Admission Guidelines Section */}
        <section>
          <AdmissionGuidelines />
        </section>

      </div>
    </div>
  );
};

export default Programs;
