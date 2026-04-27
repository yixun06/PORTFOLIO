import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
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
  Layers,
  Star,
  Terminal,
  Coffee
} from 'lucide-react';

type MousePosition = { x: number; y: number };
type ProjectCategory = 'Mobile App' | 'E-commerce Web' | 'Web Forms System' | 'Content Platform' | 'Full Stack Web';
type ProjectItem = {
  title: string;
  date: string;
  category: ProjectCategory;
  desc: string;
  tech: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
};

// ─── Floating Cursor Glow ───────────────────────────────────────────────────
function CursorGlow({ mousePosition }: { mousePosition: MousePosition }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-0 w-96 h-96 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{ x: mousePosition.x - 192, y: mousePosition.y - 192 }}
      transition={{ type: 'spring', stiffness: 80, damping: 25, mass: 0.2 }}
    />
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = target / 40;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, idx, featured }: { project: ProjectItem; idx: number; featured: boolean }) {
  const [hovered, setHovered] = useState(false);

  const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
    'Mobile App': <Smartphone size={12} />,
    'E-commerce Web': <Globe size={12} />,
    'Web Forms System': <Terminal size={12} />,
    'Content Platform': <BookOpen size={12} />,
    'Full Stack Web': <Layers size={12} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative flex flex-col bg-slate-900/50 rounded-2xl border overflow-hidden transition-all duration-300
        ${featured
          ? 'border-indigo-500/40 shadow-xl shadow-indigo-500/10 lg:col-span-2'
          : 'border-slate-800 hover:border-slate-600'}`}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Project image placeholder with gradient */}
      <div className={`relative overflow-hidden ${featured ? 'h-48' : 'h-36'}`}>
        <div className={`absolute inset-0 ${featured
          ? 'bg-gradient-to-br from-indigo-900/60 via-slate-900 to-purple-900/40'
          : 'bg-gradient-to-br from-slate-800 to-slate-900'}`} />

        {/* Decorative code lines */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 opacity-30 font-mono text-xs text-indigo-300 space-y-1 select-none">
          {['import Flutter from "dart:flutter";', `const app = new ${project.title.replace(/\s/g, '')}();`, 'await app.build();', '// Production ready ✓'].map((line, i) => (
            <div key={i} style={{ paddingLeft: `${i * 8}px` }}>{line}</div>
          ))}
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-full">
          <span className="text-indigo-400">{categoryIcons[project.category] || <Code2 size={12} />}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{project.category}</span>
        </div>

        {/* Date badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-full">
          <span className="text-[10px] font-mono text-slate-400">{project.date}</span>
        </div>

        {featured && (
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs text-indigo-300 font-medium">
              <Star size={10} className="fill-indigo-400 text-indigo-400" />
              <span>Featured Project</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h4 className={`font-bold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
          {project.title}
        </h4>
        <p className={`text-slate-400 leading-relaxed mb-5 flex-grow ${featured ? 'text-base' : 'text-sm'}`}>
          {project.desc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t: string) => (
            <span key={t} className="text-[11px] font-mono text-slate-400 border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 rounded-md hover:border-indigo-500/40 hover:text-indigo-300 transition-colors">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.demoUrl || project.githubUrl ? (
          <div className="flex items-center gap-4 flex-wrap pt-4 border-t border-slate-800/50">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-bold text-white hover:text-indigo-400 transition-colors group/link">
                <ExternalLink size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors group/link">
                <Github size={14} className="group-hover/link:-translate-y-0.5 transition-transform" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2 pt-4 border-t border-slate-800/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-sm text-slate-500 italic">In Development</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const EMAIL_ADDRESS = 'yixunkhew0328@gmail.com';
  const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent('Portfolio Inquiry')}`;
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [profileImageError, setProfileImageError] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const navItems = ['Home', 'Skills', 'Projects', 'Experience', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCardTilt({
      x: (0.5 - y / rect.height) * 14,
      y: (x / rect.width - 0.5) * 14,
    });
  };

  const openEmailClient = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) e.preventDefault();
    window.open(EMAIL_COMPOSE_URL, '_blank', 'noopener,noreferrer');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const projects: ProjectItem[] = [
    {
      title: 'Smart Pocket',
      date: 'Mar 2026 – Present',
      category: 'Mobile App',
      desc: 'A powerful personal finance app built with Flutter & Firebase. Features real-time state management, expense tracking, and rich data visualizations designed for Android.',
      tech: ['Flutter', 'Dart', 'Firebase Firestore', 'Firebase Auth', 'Provider'],
      demoUrl: null,
      githubUrl: null,
      featured: true,
    },
    {
      title: 'CarGo',
      date: '2025',
      category: 'Full Stack Web',
      desc: 'A full-stack car rental platform with booking management, admin dashboard, and live demo deployment on ASP.NET.',
      tech: ['ASP.NET', 'C#', 'SQL Server', 'HTML/CSS', 'JavaScript'],
      demoUrl: 'http://cargo.runasp.net/',
      githubUrl: 'https://github.com/yixun06?tab=repositories',
      featured: false,
    },
    {
      title: 'EcoMart',
      date: 'May – Jun 2025',
      category: 'E-commerce Web',
      desc: 'An eco-focused e-commerce platform with authentication, product browsing, cart operations, and full checkout flow.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      demoUrl: null,
      githubUrl: 'https://github.com/yixun06?tab=repositories',
      featured: false,
    },
    {
      title: 'Sport Court Booking',
      date: '2025',
      category: 'Web Forms System',
      desc: 'A court reservation platform streamlining booking workflows, scheduling visibility, and user-facing request management.',
      tech: ['ASP.NET', 'C#', 'SQL Server', 'Web Forms'],
      demoUrl: null,
      githubUrl: 'https://github.com/yixun06?tab=repositories',
      featured: false,
    },
    {
      title: 'Tech News Portal',
      date: '2025',
      category: 'Content Platform',
      desc: 'A structured news portal focused on content organization, category navigation, and maintainable ASP.NET page workflows.',
      tech: ['ASP.NET', 'C#', 'SQL Server', 'HTML/CSS'],
      demoUrl: null,
      githubUrl: 'https://github.com/yixun06?tab=repositories',
      featured: false,
    },
  ];

  const skills = [
    {
      title: 'Mobile Development',
      icon: Smartphone,
      skills: ['Flutter', 'Dart', 'Firebase Auth & Firestore', 'Cross-Platform UI', 'Provider / Riverpod'],
      highlight: true,
      color: 'indigo',
    },
    {
      title: 'Frontend Engineering',
      icon: Globe,
      skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Tailwind CSS'],
      highlight: false,
      color: 'slate',
    },
    {
      title: 'Backend Architecture',
      icon: Database,
      skills: ['C# / .NET', 'PHP', 'ASP.NET Web Forms', 'SQL Server', 'MySQL'],
      highlight: false,
      color: 'slate',
    },
    {
      title: 'Tools & Workflow',
      icon: Code2,
      skills: ['Git & GitHub', 'Figma', 'Responsive Design', 'Agile / Scrum', 'VS Code'],
      highlight: false,
      color: 'slate',
    },
  ];

  const achievements = [
    { title: 'Gold Award', event: 'Youth Entrepreneurship Challenge (YEC), FIMEx 2025, UMPSA' },
    { title: "Dean's List", event: 'Awarded for 3 consecutive semesters' },
    { title: 'Team Leader', event: 'Liaison Team, Chinese Debate Competition (2025)' },
    { title: 'President', event: '1st Kluang Company Boys\' Brigade (2023)' },
    { title: 'Committee Member', event: 'Judging Team, UMPSA × HUAWEI AppGallery Mobile App Competition' },
  ];

  return (
    <div className="min-h-screen bg-[#080810] text-slate-200 font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <CursorGlow mousePosition={mousePosition} />

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className={`fixed top-[2px] w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#080810]/95 backdrop-blur-xl shadow-md shadow-black/30 border-b border-slate-800/80 py-3'
        : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer z-50"
            onClick={() => scrollTo('home')}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-black text-lg text-white shadow-lg shadow-indigo-500/30 select-none">KX</div>
            <span className="text-base font-bold tracking-tight text-white hidden sm:block">
              Khew Yi Xun<span className="text-indigo-500">.</span>
            </span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <button
                  key={item}
                  onClick={() => scrollTo(id)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-200
                    ${isActive
                      ? 'text-white bg-indigo-500/15 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
            >
              <span>Hire Me</span>
              <ArrowRight size={14} />
            </motion.button>

            <button
              className="md:hidden z-50 p-2 text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#080810]/98 backdrop-blur-2xl flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-3xl font-black tracking-tight transition-colors
                    ${activeSection === item.toLowerCase() ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
                >
                  {item}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('contact')}
                className="mt-4 flex items-center space-x-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/30"
              >
                <span>Let's Talk</span>
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ── HERO ───────────────────────────────────────── */}
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 right-0 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[120px]" />
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10 w-full py-12 md:py-0"
          >
            {/* Text */}
            <motion.div
              initial="hidden" animate="visible" variants={stagger}
              className="col-span-12 md:col-span-7 text-center md:text-left"
            >
              <motion.div variants={fadeInUp}
                className="inline-flex items-center space-x-2.5 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[11px] font-black uppercase tracking-widest mb-6 mx-auto md:mx-0 w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                </span>
                <span>Seeking Internship · 17 Aug 2026 – 29 Jan 2027</span>
              </motion.div>

              <motion.h1 variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
              >
                Full Stack<br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"> Developer.</span>
              </motion.h1>

              <motion.p variants={fadeInUp}
                className="text-base md:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto md:mx-0 mb-8"
              >
                Hi, I'm <strong className="text-white font-bold">Khew Yi Xun</strong>. A CS student at UMPSA crafting seamless digital experiences across <strong className="text-indigo-300">Web & Mobile</strong> with modern toolkits.
              </motion.p>

              <motion.div variants={fadeInUp}
                className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 mb-10"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo('projects')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/25"
                >
                  View My Work
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="flex justify-center items-center space-x-2 bg-slate-800/80 hover:bg-slate-700/80 text-white px-7 py-3.5 rounded-xl font-bold text-sm border border-slate-700 transition-all"
                  onClick={() => alert('Configure your resume PDF link here.')}
                >
                  <Download size={16} />
                  <span>Download CV</span>
                </motion.button>
              </motion.div>

              {/* Socials */}
              <motion.div variants={fadeInUp} className="flex justify-center md:justify-start space-x-5">
                {[
                  { href: 'https://github.com/yixun06?tab=repositories', icon: Github, label: 'GitHub' },
                  { href: 'https://linkedin.com/in/Khew0328', icon: Linkedin, label: 'LinkedIn' },
                  { href: EMAIL_COMPOSE_URL, icon: Mail, label: 'Email' },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    whileHover={{ y: -3 }}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors group"
                  >
                    <Icon size={20} className="group-hover:text-indigo-400 transition-colors" />
                    <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">{label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, type: 'spring', stiffness: 90 }}
              className="col-span-12 md:col-span-5 flex justify-center"
            >
              <motion.div
                onMouseMove={handleProfileCardMove}
                onMouseLeave={() => setCardTilt({ x: 0, y: 0 })}
                style={{ transform: `perspective(1200px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)` }}
                className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer transition-transform duration-150 group will-change-transform"
              >
                {/* Card frame */}
                <div className="absolute inset-0 rounded-3xl border border-indigo-500/20 shadow-[0_0_36px_rgba(99,102,241,0.18)] pointer-events-none z-30" />

                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent z-20 pointer-events-none rounded-3xl" />

                <img
                  src="/profile.jpg"
                  alt="Khew Yi Xun"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className={`absolute inset-0 z-10 w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105 ${profileImageError ? 'hidden' : 'block'}`}
                  onLoad={() => setProfileImageError(false)}
                  onError={() => setProfileImageError(true)}
                />

                {/* Fallback if image not found */}
                <div
                  className={`fallback-avatar absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-900/80 to-slate-900 items-center justify-center z-10 ${profileImageError ? 'flex' : 'hidden'}`}
                  aria-hidden={!profileImageError}
                >
                  <div className="text-center">
                    <div className="w-28 h-28 rounded-full bg-indigo-600/30 border-2 border-indigo-500/40 flex items-center justify-center mx-auto mb-4">
                      <span className="text-5xl font-black text-indigo-300">KX</span>
                    </div>
                    <p className="text-slate-400 text-sm">Profile Photo</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-slate-700" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">Scroll</span>
          </motion.div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────── */}
        <section className="py-10 border-y border-slate-800/50 bg-slate-900/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: 5, suffix: '+', label: 'Projects Built' },
                { value: 381, suffix: '/400', label: 'CGPA Score', display: '3.81' },
                { value: 3, suffix: '×', label: "Dean's List" },
                { value: 1, suffix: ' Gold', label: 'FIMEx Award' },
              ].map(({ value, suffix, label, display }, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                    {display ? display : <AnimatedCounter target={value} suffix={suffix} />}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ────────────────────────────────────── */}
        <section id="skills" className="py-20 md:py-28 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="mb-14 text-center md:text-left"
            >
              <motion.p variants={fadeInUp} className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-3">Technical Arsenal</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Built for web <span className="text-slate-500">&</span> mobile.</motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {skills.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 group
                    ${cat.highlight
                      ? 'bg-indigo-950/30 border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}`}
                >
                  <h3 className="text-white text-base font-bold mb-5 flex items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-transform group-hover:scale-110
                      ${cat.highlight ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                      <cat.icon size={18} />
                    </div>
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <span key={skill}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors
                          ${cat.highlight
                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:border-indigo-400/50'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ──────────────────────────────────── */}
        <section id="projects" className="py-20 md:py-28 border-t border-slate-800/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={stagger}
              className="mb-14 text-center md:text-left"
            >
              <motion.p variants={fadeInUp} className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-3">Portfolio</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">Featured Projects.</motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} idx={idx} featured={project.featured} />
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE & EDUCATION ────────────────────── */}
        <section id="experience" className="py-20 md:py-28 border-t border-slate-800/30 bg-slate-900/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Education */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeInUp} className="flex items-center mb-10 pb-4 border-b border-slate-800/50">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center mr-3">
                  <BookOpen className="text-indigo-400" size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Education</h2>
              </motion.div>

              <div className="relative border-l border-slate-800 ml-4 space-y-10">
                <motion.div variants={fadeInUp} className="relative pl-8">
                  <span className="absolute w-3.5 h-3.5 rounded-full bg-indigo-500 left-[-7px] top-1 ring-4 ring-[#080810]" />
                  <div className="text-[10px] font-mono text-indigo-400 mb-2 uppercase tracking-wider">2024 – Present</div>
                  <h4 className="text-lg font-bold text-white">Diploma in Computer Science</h4>
                  <p className="text-slate-400 text-sm mt-1">Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA)</p>
                  <div className="mt-3 inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-3 py-1.5 rounded-lg text-xs">
                    <Star size={11} className="fill-emerald-400" />
                    <span>CGPA: 3.81 / Dean's List</span>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="relative pl-8">
                  <span className="absolute w-3.5 h-3.5 rounded-full bg-slate-700 left-[-7px] top-1 ring-4 ring-[#080810]" />
                  <div className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-wider">2019 – 2023</div>
                  <h4 className="text-lg font-bold text-slate-300">SPM — 9As 1B+</h4>
                  <p className="text-slate-500 text-sm mt-1">SMK Jalan Mengkibol </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeInUp} className="flex items-center mb-10 pb-4 border-b border-slate-800/50">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mr-3">
                  <Award className="text-amber-400" size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Highlights</h2>
              </motion.div>

              <div className="space-y-3">
                {achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ x: 4 }}
                    className="flex items-start p-4 md:p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-600 hover:bg-slate-900/70 transition-all group cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <Award size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────── */}
        <section id="contact" className="py-20 md:py-28 relative overflow-hidden border-t border-slate-800/30">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.p variants={fadeInUp} className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-3">Get In Touch</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
                Let's build something<br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500"> impactful.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-400 max-w-xl mx-auto text-base">
                Seeking a Full Stack internship starting <strong className="text-white">17 August 2026 - 29 January 2027</strong>. The fastest way to reach me is by email.
              </motion.p>
            </motion.div>

            <div className="max-w-3xl mx-auto w-full space-y-5">

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="space-y-5"
              >
                {[
                  { icon: Mail, label: 'Email', value: EMAIL_ADDRESS, href: EMAIL_COMPOSE_URL },
                  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/Khew0328', href: 'https://linkedin.com/in/Khew0328' },
                  { icon: Github, label: 'GitHub', value: 'github.com/yixun06?tab=repositories', href: 'https://github.com/yixun06?tab=repositories' },
                  { icon: MapPin, label: 'Location', value: 'Kluang, Johor, Malaysia', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href ?? undefined}
                    target={href && !href.startsWith('mailto') ? '_blank' : undefined}
                    rel={href && !href.startsWith('mailto') ? 'noreferrer' : undefined}
                    onClick={label === 'Email' ? openEmailClient : undefined}
                    className={`flex items-center p-4 bg-slate-900/40 border border-slate-800 rounded-xl transition-all group ${href ? 'hover:border-indigo-500/40 hover:bg-slate-900/70 cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/15 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
                      <Icon size={18} className="text-indigo-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{label}</div>
                      <span className={`text-sm truncate block ${href ? 'text-slate-300 group-hover:text-indigo-300' : 'text-slate-300'}`}>{value}</span>
                    </div>
                  </a>
                ))}

                <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Coffee size={16} className="text-indigo-400" />
                    <span className="text-sm font-bold text-white">Available for</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">Internships · Freelance Projects · Open Source Collaboration</p>
                </div>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}
                href={EMAIL_COMPOSE_URL}
                onClick={openEmailClient}
                className="w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20"
              >
                <Mail size={18} />
                <span>Open Email</span>
              </motion.a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────── */}
        <footer className="py-8 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs font-mono text-slate-600 uppercase tracking-widest">
              © {new Date().getFullYear()} Khew Yi Xun
            </div>
            <div className="flex items-center space-x-1 text-xs font-mono text-slate-600">
              <span>Designed & Built with Copilot </span>
              
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-600">
              <MapPin size={11} />
              <span>KLUANG, MY</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}