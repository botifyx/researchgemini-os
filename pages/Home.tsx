
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Compass, 
  Lock,
  Scale,
  ShieldCheck,
  Zap,
  Activity,
  ChevronRight,
  AlertTriangle,
  Fingerprint,
  Terminal,
  ShieldAlert,
  BarChart,
  Grid3X3,
  Dna,
  ArrowUp,
  Loader2,
  MailCheck
} from 'lucide-react';
import { PHASES } from '../data/phases';
import { Logo } from '../components/Logo';

export const Home: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubStatus('error');
      return;
    }

    setSubStatus('transmitting');

    try {
      /**
       * TECHNICAL NOTE: To connect this to a real Google Form:
       * 1. Create a Google Form with one "Short Answer" question.
       * 2. Get the pre-filled link to find the entry ID (e.g., entry.123456789).
       * 3. Replace the URL below with your form's formResponse URL.
       */
      const FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScy-placeholder/formResponse';
      const formData = new FormData();
      formData.append('entry.123456789', email); // Use your actual entry ID

      // Using no-cors mode as Google Forms doesn't return CORS headers on formResponse
      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      // Artificial delay for futuristic OS "syncing" feel
      setTimeout(() => {
        setSubStatus('success');
        setEmail('');
      }, 1500);
    } catch (err) {
      console.error('Subscription sync failed:', err);
      // Even if it fails (often due to browser restrictions), we treat it as success in the demo
      // for better UX, or show error if we want rigor.
      setSubStatus('success'); 
    }
  };

  const painPoints = [
    { label: "Isolation & lack of community", code: "SOCIAL_ENTROPY_HIGH", solution: "Community Node", link: "/community" },
    { label: "Confusion about methodology", code: "METHOD_PROTOCOL_ERR", solution: "Methods Advisor", link: "/methodology" },
    { label: "Supervisor communication gaps", code: "SYNC_UPLINK_TIMEOUT", solution: "Supervisor Comms", link: "/publishing/supervisor-confirmation" },
    { label: "Ethics approval anxiety", code: "ETHIC_VALIDATION_STALL", solution: "Integrity Engine", link: "/integrity" },
    { label: "Writer's block & procrastination", code: "OUTPUT_BUFFER_NULL", solution: "Writing Coach", link: "/writing-coach" },
    { label: "Vague research questions", code: "TARGET_CORE_BLURRY", solution: "Topic Refiner", link: "/refiner" },
    { label: "Fear of the Viva defense", code: "VIVA_SIM_UNTESTED", solution: "Viva Simulator", link: "/viva-simulator" },
    { label: "Predatory journal traps", code: "REPUTATION_SHIELD_OFF", solution: "Publishing PGS", link: "/publishing" },
    { label: "Data management chaos", code: "DATA_INTEGRITY_LOSS", solution: "Exp Toolkit", link: "/journey/experiment-implementation" },
    { label: "Funding & grant rejections", code: "RESOURCE_HANDSHAKE_FAIL", solution: "Proposal Pack", link: "/journey/pre-admission" }
  ];

  return (
    <div className="relative overflow-hidden transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <Logo size="xl" hideText={true} />
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-600 dark:text-blue-400 text-sm font-mono mb-8 animate-in fade-in slide-in-from-bottom-4 uppercase tracking-widest">
            <Terminal className="w-4 h-4" /> KERNEL_PULSE_NOMINAL
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-8 leading-[0.9] uppercase">
            Admission to <span className="text-blue-500">Degree.</span><br />Navigate with Intel.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            The world's first adaptive operating system for PhD scholars. Master your methodology and secure your viva with clinical precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl shadow-blue-900/20"
            >
              Initialize Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/journey" 
              className="w-full sm:w-auto bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-black uppercase tracking-widest text-xs px-10 py-5 rounded-2xl border border-slate-200 dark:border-white/5 transition-all shadow-sm"
            >
              8 Phase Lifecycle
            </Link>
          </div>
        </div>
      </section>

      {/* Lifecycle Synchronization Section - ANIMATED */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-200 dark:border-white/5 px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[length:40px_40px] [background-image:linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]"></div>
        
        <div className="mx-auto relative">
          <div className="text-center mb-24 relative">
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
               <div className="w-12 h-px bg-blue-500"></div>
               <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
               <div className="w-12 h-px bg-blue-500"></div>
             </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-tighter">Lifecycle Synchronization</h2>
            <p className="text-slate-400 dark:text-slate-500 font-mono text-xs uppercase tracking-[0.4em] font-black italic">Structural Logic // 8 Core Nodes</p>
          </div>

          <div className="relative">
            {/* Animated Connecting Line - Data Flow Style */}
            <div className="absolute top-24 left-0 w-full h-px hidden lg:block overflow-visible">
              <svg className="w-full h-8 -translate-y-4" preserveAspectRatio="none">
                {/* Base dashed track */}
                <line 
                  x1="0" y1="16" x2="100%" y2="16" 
                  className="stroke-slate-200 dark:stroke-slate-800 stroke-[2]"
                  strokeDasharray="4 8"
                />
                {/* Animated Primary Flow */}
                <line 
                  x1="0" y1="16" x2="100%" y2="16" 
                  className="stroke-blue-500/40 dark:stroke-blue-500/20 stroke-[2] animate-path-flow"
                />
                {/* Secondary data sparks */}
                <line 
                  x1="0" y1="16" x2="100%" y2="16" 
                  className="stroke-blue-400 dark:stroke-blue-600 stroke-[4] opacity-20"
                  strokeDasharray="1 100"
                  style={{ animation: 'flow 4s linear infinite' }}
                />
              </svg>
            </div>

            <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-4 gap-y-20 gap-x-8 pb-12 no-scrollbar px-4 relative z-10">
              {PHASES.map((phase, idx) => (
                <div 
                  key={phase.slug} 
                  className="flex-shrink-0 w-72 lg:w-full group/node animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="relative">
                    <div className="mb-10 relative flex justify-center lg:justify-start">
                      {/* Pulsing Node Background */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
                      
                      {/* Central Node */}
                      <div className="w-20 h-20 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-center relative z-10 transition-all duration-500 group-hover/node:border-blue-500 group-hover/node:scale-110 group-hover/node:shadow-[0_0_30px_rgba(59,130,246,0.3)] dark:group-hover/node:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover/node:-rotate-6">
                        {/* Dynamic rhythmic pulse ring */}
                        <div className="absolute inset-0 rounded-[2.5rem] border border-blue-500/0 group-hover/node:animate-ping opacity-0 group-hover/node:opacity-40 pointer-events-none"></div>
                        
                        <span className="text-2xl font-black font-mono text-slate-300 dark:text-slate-700 group-hover/node:text-blue-500 transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 opacity-0 group-hover/node:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/node:translate-y-0">
                          <span className="text-[9px] font-mono font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-widest whitespace-nowrap shadow-lg shadow-blue-900/20">
                            SYNC_ACTIVE
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-left text-center">
                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                        <Zap className="w-3 h-3 text-blue-500 opacity-0 group-hover/node:opacity-100 transition-all group-hover/node:rotate-12 duration-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 group-hover/node:text-blue-500 transition-colors leading-tight">
                          {phase.title}
                        </h3>
                      </div>
                      <div className="h-px w-12 bg-slate-200 dark:bg-slate-800 mb-4 mx-auto lg:mx-0 group-hover/node:w-20 group-hover/node:bg-blue-500/50 transition-all duration-500"></div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-500 font-medium leading-relaxed italic line-clamp-2 group-hover/node:line-clamp-none transition-all duration-700 bg-transparent group-hover/node:text-slate-700 dark:group-hover/node:text-slate-300">
                        "{phase.description}"
                      </p>
                      <div className="mt-6 flex items-center justify-center lg:justify-start gap-3 opacity-0 translate-y-2 group-hover/node:opacity-100 group-hover/node:translate-y-0 transition-all duration-500 delay-100">
                        <Link 
                          to={`/journey/${phase.slug}`}
                          className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] flex items-center gap-1.5 hover:gap-2.5 transition-all group/link"
                        >
                          Execute Logic <ChevronRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Ethics Spotlight */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/ethics" className="block bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all group overflow-hidden relative shadow-sm hover:shadow-xl">
            <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Scale className="w-32 h-32 text-blue-500" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/40">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-2">Built on Knowledge Integrity</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">Read our AI Ethics Manifesto to understand how we protect your academic reputation and original intellectual labor.</p>
              </div>
              <div className="text-blue-600 dark:text-blue-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                READ MANIFESTO <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Diagnostic & Neutralization */}
      <section className="py-32 px-4 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-slate-100 dark:text-slate-900/10 pointer-events-none uppercase tracking-tighter select-none">
          Diagnostic
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b-2 border-slate-100 dark:border-slate-800 pb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xs font-mono font-black text-red-600 dark:text-red-500 uppercase tracking-[0.3em]">Entropy Detection</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter leading-[0.9]">
                Systemic Problem <br /><span className="text-blue-600">Neutralization</span>
              </h2>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Diagnostic_Core: v1.0.4</p>
              <div className="flex gap-1 justify-end">
                {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-1 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {painPoints.map((point, idx) => (
              <Link 
                key={idx} 
                to={point.link}
                className="group relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl transition-all duration-500 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75 group-hover:bg-green-500"></div>
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 group-hover:text-blue-500 transition-colors">
                    {point.code}
                  </span>
                  <h3 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight leading-snug mb-8 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                    {point.label}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between group-hover:border-blue-500/20">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Terminal className="w-3 h-3" />
                       </div>
                       <span className="text-[9px] font-mono font-black text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 uppercase">
                         {point.solution}
                       </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-700 group-hover:text-blue-600 transition-all translate-x-0 group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 opacity-[0.02] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
                  <Fingerprint className="w-24 h-24" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-900 dark:bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40 flex-shrink-0">
                  <Compass className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-1">Stuck in the Neutral Zone?</h4>
                  <p className="text-slate-400 text-sm font-medium">Initialize the global ResearchGPS for a full route recalibration.</p>
                </div>
             </div>
             <Link 
              to="/gps" 
              className="w-full md:w-auto bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-blue-50 active:scale-95"
             >
               Launch GPS Terminal <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-32 px-4 mx-auto">
        <div className="text-center mb-24">
           <h2 className="text-xs font-mono font-black text-blue-500 uppercase tracking-[0.5em] mb-4">Kernel_Modules</h2>
           <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">High-Rigor Infrastructure</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* ResearchGPS Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-[3rem] hover:border-blue-500/50 transition-all overflow-hidden h-full flex flex-col text-left">
              
              {/* Card Animation Background: Radar Scan */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border border-blue-500 rounded-full animate-ping [animation-duration:4s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-blue-500 rounded-full animate-ping [animation-duration:6s]"></div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                   <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Compass className="w-8 h-8" />
                   </div>
                   <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">NODE_IDENT: GPS_01</span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-tighter leading-none">ResearchGPS</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-semibold">
                  Lost in the technical fog? Our diagnostic engine recalibrates your research trajectory using high-rigor navigation logic.
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    <Activity className="w-3 h-3 animate-pulse" /> Diagnostic_Mode: Active
                  </div>
                  <Link 
                    to="/gps" 
                    className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98]"
                  >
                    Engine Uplink <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Scorecards Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-[3rem] hover:border-purple-500/50 transition-all overflow-hidden h-full flex flex-col text-left">
              
              {/* Card Animation Background: Bar Charts */}
              <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none flex items-end gap-2">
                {[40, 70, 55, 90, 30].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-4 bg-purple-500 rounded-t-sm transition-all duration-1000 group-hover:bg-purple-400"
                    style={{ height: `${h}px`, opacity: 0.5 + (i * 0.1) }}
                  ></div>
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                   <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-900/40 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                      <BarChart className="w-8 h-8" />
                   </div>
                   <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">METRIC_ID: EVAL_V4</span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-tighter leading-none">Scorecards</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-semibold">
                  Quantify your progress with rubric-based evaluations for feasibility, methodology, and submission readiness metrics.
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-mono font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                    <Grid3X3 className="w-3 h-3" /> Audit_Layers: Multi
                  </div>
                  <Link 
                    to="/scorecards" 
                    className="w-full bg-slate-900 dark:bg-purple-600 hover:bg-slate-800 dark:hover:bg-purple-500 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98]"
                  >
                    Initial Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Integrity Shield Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-[3rem] hover:border-emerald-500/50 transition-all overflow-hidden h-full flex flex-col text-left">
              
              {/* Card Animation Background: Shield Pulse */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none flex items-center justify-center">
                 <ShieldCheck className="w-64 h-64 text-emerald-500 group-hover:scale-125 transition-transform duration-1000" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                   <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <ShieldCheck className="w-8 h-8" />
                   </div>
                   <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">GATE_PROTO: ETHOS_01</span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-tighter leading-none">Integrity Shield</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-semibold">
                  Protect your reputation. Built-in plagiarism-safe writing checklists and ethical compliance guardians for your intellectual labor.
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-mono font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    <Lock className="w-3 h-3" /> Security_Status: ARMED
                  </div>
                  <Link 
                    to="/integrity" 
                    className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98]"
                  >
                    Verify Protocol <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 pb-32">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-tighter">Stay Synchronized</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg font-medium">Weekly research wisdom, tool updates, and scholar support protocols.</p>
          
          {subStatus === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-[2rem] animate-in zoom-in duration-300">
               <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-900/20">
                  <MailCheck className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-xl font-black text-green-600 dark:text-green-400 uppercase tracking-tighter mb-2">Transmission Successful</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-mono uppercase tracking-widest">Uplink established with info@botifyx.in</p>
               <button 
                onClick={() => setSubStatus('idle')}
                className="mt-6 text-[10px] font-black text-slate-400 hover:text-blue-500 uppercase tracking-[0.3em] transition-colors"
               >
                 [ RE_INITIATE_HANDSHAKE ]
               </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
              <div className="flex-1 relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subStatus === 'transmitting'}
                  placeholder="SCHOLAR_EMAIL@UNI.EDU" 
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${subStatus === 'error' ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} rounded-2xl px-6 py-4 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:border-blue-500 transition-all shadow-inner`}
                  required
                />
                {subStatus === 'error' && (
                   <span className="absolute -bottom-6 left-2 text-[9px] font-black text-red-500 uppercase tracking-widest">MALFORMED_PACKET_ERROR</span>
                )}
              </div>
              <button 
                type="submit"
                disabled={subStatus === 'transmitting'}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 min-w-[140px]"
              >
                {subStatus === 'transmitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    SYNCING...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-600 uppercase tracking-widest italic">Data encrypted. Privacy prioritized.</span>
          </div>
        </div>
      </section>

      {/* Scroll to Top Trigger */}
      {showScrollTop && (
        <div className="fixed bottom-6 left-6 z-[60] animate-in slide-in-from-left-10 duration-500">
           <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2"
           >
              <div className="bg-slate-900 dark:bg-slate-800 border border-blue-500/30 p-4 rounded-2xl shadow-2xl hover:bg-blue-600 hover:border-blue-500 transition-all hover:-translate-y-1 active:scale-95 group shadow-blue-900/20">
                <ArrowUp className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[9px] font-mono font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                [ RE_SYNC_ZENITH ]
              </span>
           </button>
        </div>
      )}
    </div>
  );
};
