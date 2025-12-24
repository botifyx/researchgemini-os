
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  LayoutDashboard,
  Map,
  Navigation,
  ClipboardList,
  ShieldAlert,
  AlertCircle,
  Menu,
  X,
  Github,
  Award,
  Target,
  FlaskConical,
  Microscope,
  LineChart,
  PenTool,
  Globe,
  Gavel,
  Heart,
  Fingerprint,
  ChevronDown,
  Cpu,
  Zap,
  ShieldCheck,
  Library,
  Scale,
  Activity,
  Bot,
  Sun,
  Moon,
  MapPin,
  Calculator,
  Mail,
  HelpCircle,
  Compass
} from 'lucide-react';
import { CrisisModal } from './CrisisModal';
import { EthicsModal } from './EthicsModal';
import { TourGuide } from './TourGuide';
import { Logo } from './Logo';
import { useAuth } from '../lib/AuthContext';
import { LogOut, User, LogIn } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return localStorage.getItem('research_os_theme') === 'light' ? 'light' : 'dark';
  });
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('research_os_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigation Groups
  const navGroups = [
    {
      id: 'core',
      label: 'Command',
      icon: Cpu,
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, desc: 'Project overview' },
        { name: 'Journey', path: '/journey', icon: Map, desc: 'Lifecycle map' },
      ]
    },
    {
      id: 'engines',
      label: 'Engines',
      icon: Zap,
      items: [
        { name: 'GPS', path: '/gps', icon: Navigation, desc: 'Route planning' },
        { name: 'Refiner', path: '/refiner', icon: Target, desc: 'Topic narrowing' },
        { name: 'Lit Coach', path: '/lit-coach', icon: FlaskConical, desc: 'Review & synthesis' },
        { name: 'Methods', path: '/methodology', icon: Microscope, desc: 'Design advisor' },
        { name: 'Results', path: '/results-interpreter', icon: LineChart, desc: 'Data decoder' },
        { name: 'Writer', path: '/writing-coach', icon: PenTool, desc: 'Drafting logic' },
        { name: 'Publishing PGS', path: '/publishing', icon: Globe, desc: 'Journal strategy' },
        { name: 'Supervisor Comms', path: '/publishing/supervisor-confirmation', icon: Mail, desc: 'Email templates' },
        { name: 'Country Rules', path: '/publishing/country-rules', icon: MapPin, desc: 'Global norms' },
        { name: 'Strategy Node', path: '/publishing/decision-assistant', icon: Calculator, desc: 'Conf vs Journal' },
      ]
    },
    {
      id: 'guardian',
      label: 'Guardian',
      icon: ShieldCheck,
      items: [
        { name: 'Integrity', path: '/integrity', icon: ShieldAlert, desc: 'Policy compliance' },
        { name: 'Guardian', path: '/integrity-guardian', icon: Fingerprint, desc: 'Integrity audit' },
        { name: 'Scorecards', path: '/scorecards', icon: ClipboardList, desc: 'Readiness scores' },
        { name: 'Examiner', path: '/examiner-simulator', icon: Gavel, desc: 'Defense mindset' },
        { name: 'Simulator', path: '/viva-simulator', icon: Award, desc: 'Mock defense' },
      ]
    },
  ];

  const utilityItems = [
    { name: 'AI Companion', path: '/ai', icon: Bot },
    { name: 'Wellbeing', path: '/wellbeing', icon: Heart },
    { name: 'Help', path: '/help', icon: HelpCircle },
    { name: 'Tools', path: '/tools', icon: BookOpen },
  ];

  useEffect(() => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 selection:bg-blue-500/30">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">

          <Link to="/" onClick={handleHomeClick}>
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navGroups.map((group) => (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => setActiveDropdown(activeDropdown === group.id ? null : group.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${activeDropdown === group.id || group.items.some(i => location.pathname === i.path)
                    ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-white/5'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                >
                  <group.icon className="w-3.5 h-3.5 opacity-70" />
                  {group.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === group.id ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === group.id && (
                  <div className={`absolute top-full left-0 mt-[-4px] pt-4 bg-transparent z-[100] animate-in fade-in zoom-in-95 duration-200 ${group.items.length > 6 ? 'w-[720px]' : group.items.length > 2 ? 'w-[480px]' : 'w-[240px]'
                    }`}>
                    <div className="bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 rounded-[2rem] p-3">
                      <div className={`grid ${group.items.length > 6 ? 'grid-cols-3' : group.items.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${location.pathname === item.path
                              ? 'bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400'
                              : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent'
                              }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${location.pathname === item.path ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800'
                              }`}>
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-black uppercase tracking-tight truncate">{item.name}</p>
                              <p className="text-[9px] font-mono text-slate-500 leading-none mt-0.5 uppercase tracking-tighter truncate">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />

            {utilityItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${location.pathname === item.path
                  ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-white/5'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link to="/ethics" className="hidden xl:flex items-center gap-2 px-4 py-1.5 bg-blue-600/5 border border-slate-200 dark:border-white/5 rounded-full group hover:border-blue-500/30 transition-all">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 uppercase tracking-widest transition-colors">Ethical_AI</span>
            </Link>

            <Link to="/ai" className="hidden sm:flex items-center gap-2 bg-slate-900 dark:bg-slate-800 border border-slate-700 dark:border-white/10 hover:border-blue-500/50 text-white px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 group overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-600/10 translate-y-full group-hover:translate-y-0 transition-transform" />
              <Activity className="w-3 h-3 text-blue-400" />
              AI TERMINAL
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-2 border-l border-slate-200 dark:border-white/10 pl-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter leading-none">{user?.name}</span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Scholar_Verified</span>
                </div>
                <div className="relative group">
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-10 h-10 rounded-xl border border-blue-500/20 shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-[100]">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">Initialize_Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20"
              >
                <LogIn className="w-3 h-3" />
                Sign_In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-20 px-4 overflow-y-auto animate-in slide-in-from-bottom-full duration-300">
          <div className="flex flex-col gap-8 pb-24">

            <div className="flex justify-center">
              <Link to="/ethics" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-6 py-3 bg-blue-600/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Certified_Ethical_AI</span>
              </Link>
            </div>

            {navGroups.map((group) => (
              <div key={group.id} className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-mono text-[10px] tracking-widest uppercase px-2 border-l-2 border-blue-600">
                  <group.icon className="w-3 h-3" /> {group.label} CORE
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border transition-all ${location.pathname === item.path
                        ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 shadow-inner'
                        : 'bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 active:scale-[0.98]'
                        }`}
                    >
                      <item.icon className="w-6 h-6 opacity-70" />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="space-y-4">
              <div className="text-slate-400 dark:text-slate-600 font-mono text-[10px] tracking-widest uppercase px-2 border-l-2 border-slate-300 dark:border-slate-700">System Aux</div>
              <div className="grid grid-cols-2 gap-2">
                {utilityItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-4 rounded-2xl flex flex-col items-center justify-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 active:scale-[0.98] transition-all"
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 relative">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 py-16 px-4 relative overflow-hidden transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="mb-6 block" onClick={handleHomeClick}>
              <Logo size="md" />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8 leading-relaxed text-sm font-medium italic">
              "The next-generation Research Operating System (ROS) engineered for academic rigor and knowledge integrity."
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors shadow-sm"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors shadow-sm"><Library className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-slate-200 font-bold mb-6 text-xs uppercase tracking-[0.2em] font-mono">Kernel</h4>
            <ul className="space-y-3 text-slate-500 dark:text-slate-500 text-sm font-medium">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Architecture</Link></li>
              <li><Link to="/journey" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Lifecycle</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Dashboard</Link></li>
              <li><Link to="/ai" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">AI Companion</Link></li>
              <li><Link to="/wellbeing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Wellness</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-slate-200 font-bold mb-6 text-xs uppercase tracking-[0.2em] font-mono">Trust & Safety</h4>
            <ul className="space-y-3 text-slate-500 dark:text-slate-500 text-sm font-medium">
              <li><Link to="/ethics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Ethics Manifesto</Link></li>
              <li><Link to="/integrity" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Integrity engine</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest text-[10px] font-bold">Terms of service</Link></li>
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
            <h4 className="text-slate-900 dark:text-slate-200 font-bold mb-4 text-xs uppercase tracking-[0.2em] font-mono text-center">Status</h4>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">SYSTEM_UPTIME</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">99.99%</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">INTEGRITY_SHIELD</span>
                <span className="text-green-600 dark:text-green-500 font-bold uppercase">Active_Armed</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">AI_CORE</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">Gemini_3_Pro</span>
              </div>
            </div>
            <Link to="/ethics" className="flex items-center justify-center gap-2 p-3 bg-blue-600/5 border border-blue-500/10 rounded-xl group hover:border-blue-500 transition-all">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest">Ethical AI Protocol</span>
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 dark:text-slate-600 font-mono tracking-widest uppercase text-center sm:text-left">
          <p className="leading-relaxed">
            © 2024 ResearchGemini OS. KERNEL_v1.0.4-LTS. <br className="sm:hidden" />
            <span className="text-slate-400 dark:text-slate-500 font-black">Designed, developed, and maintained by BotifyX.</span>
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors font-bold">SECURE_VAULT</Link>
            <Link to="/ethics" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors font-bold">ETHOS_01</Link>
          </div>
        </div>
      </footer>

      {/* Floating System Controllers */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        <button
          onClick={() => setIsTourOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-black shadow-2xl shadow-blue-900/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-blue-500/50"
          title="Initialize Tour Protocol"
        >
          <Compass className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsCrisisOpen(true)}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-2xl font-black shadow-2xl shadow-red-900/40 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group overflow-hidden border border-red-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <AlertCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="tracking-tighter uppercase text-xs">Rescue Protocol</span>
        </button>
      </div>

      <CrisisModal isOpen={isCrisisOpen} onClose={() => setIsCrisisOpen(false)} />
      <TourGuide isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
      <EthicsModal />
    </div>
  );
};
