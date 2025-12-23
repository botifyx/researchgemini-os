
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Scale, ArrowRight, X, ShieldAlert, Lock, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const STORAGE_KEY = 'researchgemini_ethics_modal_seen';

export const EthicsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    // Modal appears only on these specific high-stakes AI/Simulation routes
    const triggerRoutes = ['/ai', '/viva-simulator'];
    
    if (!hasSeen && triggerRoutes.includes(location.pathname)) {
      setIsOpen(true);
    }
  }, [location.pathname]);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-blue-500/30 rounded-[3rem] max-w-lg w-full shadow-2xl shadow-blue-900/40 overflow-hidden relative animate-in zoom-in duration-300">
        
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        <button 
          onClick={handleClose}
          className="absolute top-8 right-8 p-2 text-slate-500 hover:text-slate-100 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 md:p-12 text-center relative">
          {/* Decorative Security Circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/5 blur-[80px] pointer-events-none"></div>

          <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900/50 group hover:rotate-6 transition-transform">
            <Scale className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter mb-4 leading-tight">
            Research Protocol <br /><span className="text-blue-500">Ethical Briefing</span>
          </h2>
          
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-8">Mandatory_First_Time_Briefing // v1.0.4</p>
          
          <div className="space-y-5 text-left mb-10">
            <div className="flex gap-4 group/item">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600/20 transition-colors">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-1">Human Intellectual Primacy</h4>
                <p className="text-slate-500 text-xs leading-relaxed">This OS serves your reasoning. You are the sole author and owner of all research outputs.</p>
              </div>
            </div>

            <div className="flex gap-4 group/item">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-purple-600/20 transition-colors">
                <ShieldAlert className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-1">Ghostwriting Prohibition</h4>
                <p className="text-slate-500 text-xs leading-relaxed">Verbatim text generation for evaluation is disabled to protect your academic reputation.</p>
              </div>
            </div>

            <div className="flex gap-4 group/item">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-600/20 transition-colors">
                <Lock className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-1">Encrypted Local Intelligence</h4>
                <p className="text-slate-500 text-xs leading-relaxed">Your research logic stays in your browser. We never train commercial models on your ideas.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleClose}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-xs shadow-xl shadow-blue-900/40 group"
            >
              Got it, I promise <Zap className="w-4 h-4 group-hover:fill-current" />
            </button>
            <Link 
              to="/ethics"
              onClick={handleClose}
              className="w-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-100 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-[10px] uppercase tracking-widest hover:bg-slate-900"
            >
              Review Full Ethics Manifesto <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        <div className="bg-slate-950 py-4 border-t border-slate-800/50 flex justify-center items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">Integrity_Lock_Engaged // 256-BIT_SECURE</span>
        </div>
      </div>
    </div>
  );
};
