import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import CarGoProjectCard from './components/CarGoProjectCard';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Download,
  Code2,
  Database,
  Smartphone,
  Globe,
  Award,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Handle scroll events for nav styling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProfileCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = (0.5 - (y / rect.height)) * 12;
    setCardTilt({ x: rotateX, y: rotateY });
  };

  const resetProfileCardTilt = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const projects = [
    {
      title: "Smart Pocket",
      date: "Mar 2026 - Present",
      category: "Mobile App",
      desc: "A powerful personal finance application built with Flutter & Firebase. Features real-time state management, expense tracking, and complex data visualization. Designed directly for iOS and Android.",
      tech: ["Flutter", "Dart", "Firebase Firestore", "Auth"],
      demoUrl: null,
      githubUrl: null,
      featured: true,
      featuredLabel: "★ Highlighted: Flutter + Firebase integration"
    },
    {
      title: "CarGo",
      date: "Oct 2025 - Feb 2026",
      category: "Full Stack Web",
      desc: "A production-deployed car rental management system covering customer reservation flow and admin-side fleet operations, backed by robust SQL Server data modeling.",
      tech: ["ASP.NET", "C#", "SQL Server", "Web UI"],
      demoUrl: "http://cargo.runasp.net/",
      githubUrl: "https://github.com/yixun06/CARGO_WEBSITE",
      featured: false,
      featuredLabel: null
    },
    {
      title: "EcoMart",
      date: "May 2025 - Jun 2025",
      category: "E-commerce Web",
      desc: "An eco-focused e-commerce platform with authentication, product browsing, cart operations, and checkout flow using PHP and MySQL.",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      demoUrl: null,
      githubUrl: "https://github.com/yixun06/ECOMART_WEBSITE",
      featured: false,
      featuredLabel: null
    },
    {
      title: "sportcourtbooking",
      date: "2025",
      category: "Web Forms System",
      desc: "A court reservation platform that streamlines booking workflows, scheduling visibility, and user-facing request management in an ASP.NET Web Forms environment.",
      tech: ["ASP.NET", "C#", "SQL Server", "Web Forms"],
      demoUrl: null,
      githubUrl: "https://github.com/yixun06/SPORTCOURTBOOKING_WEBSITE",
      featured: false,
      featuredLabel: null
    },
    {
      title: "technewsportal",
      date: "2025",
      category: "Content Platform",
      desc: "A structured news portal focused on content organization, category navigation, and maintainable ASP.NET page workflows for publishing and browsing updates.",
      tech: ["ASP.NET", "C#", "SQL Server", "HTML/CSS"],
      demoUrl: null,
      githubUrl: "https://github.com/yixun06/TECHNEWSPORTAL_WEBSITE",
      featured: false,
      featuredLabel: null
    }
  ];

  const navItems = ['Home', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      <motion.div
        className="pointer-events-none fixed z-0 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 160,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 22, mass: 0.2 }}
      />
      
      {/* Interactive Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0b]/90 backdrop-blur-md shadow-sm border-b border-slate-800/80 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer relative z-50" 
            onClick={() => scrollTo('home')}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/30">KX</div>
            <span className="text-lg font-semibold tracking-tight text-white hidden sm:block">Khew Yi Xun<span className="text-indigo-500">.</span></span>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400 uppercase tracking-widest">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              return (
                <button 
                  key={item} 
                  onClick={() => scrollTo(id)}
                  className={`relative pb-1 transition-colors uppercase tracking-widest ${activeSection === id ? 'text-white' : 'hover:text-white'}`}
                >
                  {activeSection === id && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {item}
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="hidden md:flex group items-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              <span>Hire Me</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden relative z-50 p-2 text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0a0a0b]/98 backdrop-blur-2xl px-6 pt-32 flex flex-col md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navItems.map((item) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-2xl font-bold tracking-tight ${activeSection === item.toLowerCase() ? 'text-indigo-400' : 'text-slate-300'}`}
                >
                  {item}
                </motion.button>
              ))}
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('contact')}
                className="mt-8 mx-auto flex items-center justify-center space-x-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20 w-full max-w-xs"
              >
                <span>Hire Me Today</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-slate-800/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10 w-full"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="col-span-12 md:col-span-7 flex flex-col justify-center text-center md:text-left mt-10 md:mt-0"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center space-x-3 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 mx-auto md:mx-0 w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                <span>Seeking Internship (Aug 2026 - Jan 2027)</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 mt-4">
                Full Stack <br className="hidden sm:block" />
                <span className="text-indigo-500">Developer.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
                Hi, I'm <strong className="text-white">Khew Yi Xun</strong>. A Computer Science student at UMPSA. I craft seamless digital experiences across <strong>Web & Mobile</strong> using modern toolkits.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo('projects')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/20"
                >
                  View My Work
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3.5 rounded-xl font-semibold border border-slate-700 transition-all"
                  onClick={() => alert('Resume download should be configured with your actual PDF link here.')}
                >
                  <Download size={18} />
                  <span>Resume</span>
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex justify-center md:justify-start space-x-6 opacity-80">
                <motion.a whileHover={{ y: -3, color: '#fff' }} href="https://github.com/Khew0328" target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-slate-400 transition-colors">
                  <Github size={22} />
                  <span className="text-xs font-mono uppercase tracking-tighter hidden sm:inline">GitHub</span>
                </motion.a>
                <motion.a whileHover={{ y: -3, color: '#fff' }} href="https://linkedin.com/in/Khew0328" target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-slate-400 transition-colors">
                  <Linkedin size={22} />
                  <span className="text-xs font-mono uppercase tracking-tighter hidden sm:inline">LinkedIn</span>
                </motion.a>
                <motion.a whileHover={{ y: -3, color: '#fff' }} href="mailto:yixunkhew0328@gmail.com" className="flex items-center space-x-2 text-slate-400 transition-colors">
                  <Mail size={22} />
                  <span className="text-xs font-mono uppercase tracking-tighter hidden sm:inline">Email</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Profile Picture Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="col-span-12 md:col-span-5 flex justify-center mt-12 md:mt-0 relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                onMouseMove={handleProfileCardMove}
                onMouseLeave={resetProfileCardTilt}
                style={{
                  transform: `perspective(1200px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                }}
                className="relative w-full max-w-sm aspect-[4/5] rounded-3xl bg-slate-900 border border-slate-700/50 p-2 shadow-2xl shadow-indigo-500/20 group overflow-hidden transition-transform duration-150"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent z-10 pointer-events-none rounded-3xl"></div>
                <img 
                  src="/profile.jpg" 
                  alt="Khew Yi Xun" 
                  className="w-full h-full object-cover rounded-2xl transition-all duration-700 transform group-hover:scale-105"
                />
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-6 -left-4 md:-left-8 bg-[#0a0a0b]/80 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex items-center shadow-xl z-20"
                >
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3">
                    <Layers className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Tech Stack</div>
                    <div className="text-sm font-bold text-white">Flutter + Firebase</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 relative">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-16 border-b border-slate-800/50 pb-8 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <motion.h2 variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-2">Technical Arsenal</motion.h2>
              <motion.h3 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white tracking-tight">Built for web & mobile.</motion.h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: "Mobile App Development", 
                  icon: Smartphone, 
                  skills: ["Flutter", "Dart", "Firebase Auth / Firestore", "Cross-Platform UI"],
                  highlight: true
                },
                { 
                  title: "Frontend Engineering", 
                  icon: Globe, 
                  skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS"],
                  highlight: false
                },
                { 
                  title: "Backend Architecture", 
                  icon: Database, 
                  skills: ["C# .NET", "PHP", "ASP.NET", "SQL Server", "MySQL"],
                  highlight: false
                },
                { 
                  title: "Tools & Methodologies", 
                  icon: Code2, 
                  skills: ["Git / GitHub", "Figma Design", "Responsive Web Design", "Agile integration"],
                  highlight: false
                }
              ].map((category, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className={`p-8 rounded-3xl ${category.highlight ? 'bg-indigo-900/10 border-indigo-500/30 shadow-lg shadow-indigo-500/5' : 'bg-slate-900/40 border-slate-800'} border hover:border-slate-600 transition-all duration-300 group`}
                >
                  <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${category.highlight ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'} group-hover:scale-110 transition-transform`}>
                      <category.icon size={20} />
                    </div>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map(skill => (
                      <span key={skill} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${category.highlight ? 'bg-blue-500/10 border-blue-500/20 text-blue-200 group-hover:border-blue-400/50' : 'bg-slate-800 border-slate-700 text-slate-300 group-hover:border-slate-500'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mb-16 border-b border-slate-800/50 pb-8 text-center md:text-left"
            >
              <motion.h2 variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-2">Portfolio</motion.h2>
              <motion.h3 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white tracking-tight">Featured Projects.</motion.h3>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -8 }}
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className={`group relative bg-slate-900/40 p-8 rounded-3xl border ${project.featured ? 'border-indigo-500/40 shadow-xl shadow-indigo-500/10' : 'border-slate-800'} hover:bg-slate-900/80 transition-all duration-300 flex flex-col h-full overflow-hidden ${project.featured ? 'lg:col-span-2' : ''}`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full flex items-center">
                      {project.featured && <Smartphone size={12} className="mr-1.5" />}
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase">
                      {project.date}
                    </span>
                  </div>
                  
                  {project.featured && (
                    <div className="mb-4 inline-flex items-center text-xs text-indigo-300 bg-indigo-900/30 px-3 py-1 rounded-lg border border-indigo-800/50">
                      {project.featuredLabel}
                    </div>
                  )}

                  <h4 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">{project.title}</h4>
                  <p className={`${project.featured ? 'text-slate-300 text-base' : 'text-slate-400 text-sm'} leading-relaxed mb-8 flex-grow`}>
                    {project.desc}
                  </p>
                  
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(t => (
                        <span key={t} className="text-[11px] font-mono text-slate-400 border border-slate-700/50 bg-slate-800/30 px-2.5 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    {project.demoUrl || project.githubUrl ? (
                      <div className="flex items-center gap-5 flex-wrap">
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-sm font-bold text-white hover:text-indigo-400 transition-colors group/link pb-1 border-b border-transparent hover:border-indigo-400">
                            <span>Launch Application</span>
                            <ExternalLink size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group/link pb-1 border-b border-transparent hover:border-slate-400">
                            <Github size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                            <span>View Source</span>
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center text-sm font-medium text-slate-600 cursor-not-allowed italic">
                        In Development...
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <CarGoProjectCard
                githubUrl="https://github.com/yixun06/CARGO_WEBSITE"
                liveDemoUrl="http://cargo.runasp.net/"
              />
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="py-24 relative border-t border-slate-800/50 bg-slate-900/20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Education Track */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white tracking-tight mb-10 flex items-center border-b border-slate-800/50 pb-4">
                <BookOpen className="text-indigo-500 mr-4" size={28} /> Background
              </motion.h2>
              
              <div className="relative border-l border-slate-800 ml-4 space-y-12 pb-4">
                <motion.div variants={fadeInUp} className="relative pl-8">
                  <span className="absolute w-3 h-3 rounded-full bg-indigo-500 left-[-6px] top-1.5 outline outline-[6px] outline-[#0a0a0b]"></span>
                  <div className="text-xs font-mono text-indigo-400 mb-2 uppercase tracking-wider">2024 - Present</div>
                  <h4 className="text-xl font-bold text-white">Diploma in Computer Science</h4>
                  <div className="text-slate-400 text-sm mt-1 leading-relaxed">Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA)</div>
                  <div className="mt-4 inline-block bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest">
                    Current CGPA: 3.81
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="relative pl-8">
                  <span className="absolute w-3 h-3 rounded-full bg-slate-700 left-[-6px] top-1.5 outline outline-[6px] outline-[#0a0a0b]"></span>
                  <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">2019 - 2023</div>
                  <h4 className="text-xl font-bold text-slate-200">SPM (9As 1B+)</h4>
                  <div className="text-slate-500 text-sm mt-1">SMK Jalan Mengkibol I</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Achievements Track */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white tracking-tight mb-10 flex items-center border-b border-slate-800/50 pb-4">
                <Award className="text-indigo-500 mr-4" size={28} /> Highlights
              </motion.h2>
              
              <div className="space-y-5">
                {[
                  { title: "Gold Award", event: "Youth Entrepreneurship Challenge (YEC), FIMEx 2025, UMPSA" },
                  { title: "Dean's List", event: "Awarded for 3 consecutive semesters" },
                  { title: "Team Leader", event: "Liaison Team, Chinese Debate Competition (2025)" },
                  { title: "President", event: "1st Kluang Company Boys' Brigade (2023)" },
                  { title: "Committee Member", event: "Judging Team, UMPSA × HUAWEI AppGallery Mobile App Competition" }
                ].map((item, i) => (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    variants={fadeInUp} 
                    key={i} 
                    className="flex p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/80 hover:border-slate-700 transition-all group"
                  >
                    <div className="text-indigo-500 mr-5 mt-1 group-hover:scale-110 transition-transform">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                      <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* CTA / CONTACT SECTION */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                Ready to build something <br className="hidden sm:block" />
                <span className="text-indigo-500">impactful.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                I am actively seeking a Full Stack Developer internship position starting <strong className="text-white">August 2026</strong>. Whether you have an opportunity or just want to connect, let's talk.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:yixunkhew0328@gmail.com" 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Mail size={18} />
                  <span>yixunkhew0328@gmail.com</span>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://linkedin.com/in/Khew0328" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 text-white border border-slate-700 font-semibold hover:bg-slate-700 transition-all flex items-center justify-center space-x-2"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn Profile</span>
                </motion.a>
              </motion.div>

              <motion.footer variants={fadeInUp} className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] w-full">
                <div>&copy; {new Date().getFullYear()} KHEW YI XUN</div>
                <div className="my-4 md:my-0 text-slate-600">DESIGNED FOR WEB & MOBILE</div>
                <div className="flex items-center space-x-2">
                  <MapPin size={12} />
                  <span>KLUANG, MY</span>
                </div>
              </motion.footer>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
