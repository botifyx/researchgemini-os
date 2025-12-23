
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Scale, CheckCircle2, ArrowRight, ExternalLink, Loader2, Lock, Fingerprint, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MANIFESTO_SECTIONS } from '../data/ethicsManifesto';

interface EthicsGateProps {
  onAccept: () => void;
}

export const EthicsGate: React.FC<EthicsGateProps> = ({ onAccept }) => {
  const [agreed, setAgreed] = useState(false);
  const [initials, setInitials] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number>(0);

  // Staggered reveal effect for the summary sections to encourage cognitive engagement
  useEffect(() => {
    if (visibleSections < MANIFESTO_SECTIONS.length) {
      const timer = setTimeout(() => setVisibleSections(prev => prev + 1), 200);
      return () => clearTimeout(timer);
    }
  }, [visibleSections]);

  const handleVerify = () => {
    if (!agreed || !initials.trim()) return;
    setIsVerifying(true);
    // Simulate high-rigor security handshake for "Research OS" feel
    setTimeout(() => {
      onAccept();
    }, 1800);
  };

  const isLocked = !agreed || initials.trim().length < 2;

  return (
    <div className="max-w-4xl mx-auto my-12 md:my-20 px-4 animate-in fade-in zoom-in duration-700">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl dark:shadow-blue-900/30 relative transition-colors duration-300">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transition-opacity dark:opacity-10">
          <Fingerprint className="w-64 h-64 text-blue-500" />
        </div>

        {/* Header Section */}
        <div className="bg-slate-50 dark:bg-slate-950/50 p-10 md:p-14 border-b border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900/50 relative z-10">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-4 leading-tight">
            Ethical AI <br /><span className="text-blue-500">Access Protocol</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Security_Clearance_Required // v1.0.4</p>
        </div>

        {/* Manifesto Summary Grid */}
        <div className="p-10 md:p-14">
          <div className="mb-12">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase mb-8 border-l-4 border-blue-600 pl-4 tracking-[0.2em]">
              Protocol Summary: Core Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MANIFESTO_SECTIONS.map((section, idx) => (
                <div 
                  key={section.id} 
                  className={`bg-slate-50 dark:bg-slate-950/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/50 transition-all duration-500 transform ${
                    idx < visibleSections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono text-blue-500 font-black">0{idx + 1}</span>
                    <h4 className="text-slate-800 dark:text-slate-200 font-black text-xs uppercase tracking-widest">{section.title}</h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 italic font-medium">
                    {section.content[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Section */}
          <div className="space-y-8 bg-slate-50 dark:bg-slate-950/60 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 shadow-inner">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <label className="flex-1 flex items-center gap-5 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="peer h-8 w-8 cursor-pointer appearance-none rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all checked:border-blue-500 checked:bg-blue-600 focus:outline-none"
                  />
                  <CheckCircle2 className="absolute h-8 w-8 scale-0 text-white transition-transform peer-checked:scale-75 pointer-events-none" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    I Accept the Ethical Framework
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-tight mt-1 font-bold">
                    I acknowledge my role as the intellectual owner of all research outputs.
                  </p>
                </div>
              </label>

              <div className="w-full md:w-48">
                <label className="text-[10px] font-mono text-slate-500 uppercase block mb-2 ml-1 font-black">Digital Initials</label>
                <input 
                  type="text" 
                  maxLength={4}
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase())}
                  placeholder="E.G. JD"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 font-mono text-center focus:outline-none focus:border-blue-500 transition-all shadow-sm uppercase placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleVerify}
                disabled={isLocked || isVerifying}
                className={`flex-[2] py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase tracking-[0.2em] text-xs shadow-xl ${
                  isLocked || isVerifying 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700/50' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 active:scale-[0.98]'
                }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Initialize AI Core <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <Link 
                to="/ethics"
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-widest shadow-sm"
              >
                Full Manifesto <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Protocol Info */}
        <div className="bg-slate-50 dark:bg-slate-950 p-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Integrity_Lock: ACTIVE</span>
            </div>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Human_Audit: LOGGED</span>
            </div>
          </div>
          <p className="text-[9px] font-mono text-slate-400 dark:text-slate-700 uppercase tracking-widest italic font-bold">
            Kernel Protocol 1.0.4 // Academic Integrity Compliance Unit
          </p>
        </div>
      </div>
    </div>
  );
};
