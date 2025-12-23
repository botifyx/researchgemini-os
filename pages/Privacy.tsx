
import React from 'react';
import { ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
        <Lock className="w-10 h-10 text-blue-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 uppercase tracking-tighter">Privacy & Encryption</h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
        Your research integrity starts with your data privacy. We employ AES-256 standard local encryption.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
          <EyeOff className="w-8 h-8 text-blue-500 mb-6" />
          <h3 className="text-slate-100 font-bold mb-2">Zero Training</h3>
          <p className="text-sm text-slate-500">We do not use your research inputs to train our underlying language models.</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
          <Database className="w-8 h-8 text-purple-500 mb-6" />
          <h3 className="text-slate-100 font-bold mb-2">Local First</h3>
          <p className="text-sm text-slate-500">All progress data is stored in your browser's encrypted local storage by default.</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
          <ShieldCheck className="w-8 h-8 text-green-500 mb-6" />
          <h3 className="text-slate-100 font-bold mb-2">Anonymity</h3>
          <p className="text-sm text-slate-500">We do not track personally identifiable information unless explicitly shared.</p>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-white/5">
        <p className="text-xs font-mono text-slate-600 uppercase tracking-widest">Formal Policy Document v1.0.4 // Coming Soon</p>
      </div>
    </div>
  );
};
