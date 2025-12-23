
import React from 'react';
import { ShieldCheck, ArrowRight, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const IntegrityCallout: React.FC = () => {
  return (
    <div className="relative group mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Background Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
          </div>
          {/* Pulse Decoration */}
          <div className="absolute -top-1 -right-1 w-4 h-4">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 flex items-center justify-center">
                <ShieldAlert className="w-2 h-2 text-white" />
             </span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] font-black">Integrity_Protocol_01</span>
            <div className="h-px w-8 bg-blue-500/30"></div>
          </div>
          <h4 className="text-xl md:text-2xl font-black text-slate-100 uppercase tracking-tighter mb-2 italic">
            We coach, <span className="text-blue-500">we don’t ghostwrite.</span>
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-medium">
            Our systems are engineered to refine your reasoning and structure your thinking. Your research degree is a testament to your original intellectual labor and academic reputation.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
          <Link 
            to="/ethics" 
            className="group/link flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-6 rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-900/30 active:scale-95"
          >
            Read Manifesto <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest italic">Compliance Level: ENFORCED</span>
        </div>
      </div>
    </div>
  );
};
