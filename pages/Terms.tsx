
import React from 'react';
import { FileText, Scale, Gavel, ShieldAlert } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5">
        <FileText className="w-10 h-10 text-slate-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 uppercase tracking-tighter">Terms of Service</h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
        Usage of ResearchGemini OS is governed by a commitment to academic integrity and intellectual honesty.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
          <Scale className="w-8 h-8 text-blue-500 mb-6" />
          <h3 className="text-slate-100 font-bold mb-2">Advisory Status</h3>
          <p className="text-sm text-slate-500 leading-relaxed">This system is an advisory tool. It does not replace the formal guidance of university supervisors or institutional regulations.</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
          <ShieldAlert className="w-8 h-8 text-red-500 mb-6" />
          <h3 className="text-slate-100 font-bold mb-2">Liability Disclaimer</h3>
          <p className="text-sm text-slate-500 leading-relaxed">ResearchGemini is not liable for degree failures, ethical breaches, or publication rejections resulting from system advisory.</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl col-span-1 md:col-span-2">
          <Gavel className="w-8 h-8 text-slate-100 mb-6" />
          <h3 className="text-slate-100 font-bold mb-2">Academic Integrity Warranty</h3>
          <p className="text-sm text-slate-500 leading-relaxed">By using this system, you warrant that all submitted work to your institution is your original intellectual property and that AI was used strictly for brainstorming and structure.</p>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-white/5">
        <p className="text-xs font-mono text-slate-600 uppercase tracking-widest">End User License Agreement v1.0.4 // Coming Soon</p>
      </div>
    </div>
  );
};
