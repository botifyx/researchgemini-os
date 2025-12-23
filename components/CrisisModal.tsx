
import React from 'react';
import { X, AlertCircle, Zap, ShieldCheck, Timer, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CrisisModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rescueSteps = [
    { icon: Timer, text: "Breathe. Set a timer for exactly 20 minutes." },
    { icon: Zap, text: "List 3 tasks that take < 5 minutes each." },
    { icon: ShieldCheck, text: "Contact your primary supervisor for a 15-min check." },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-red-500/30 rounded-2xl max-w-2xl w-full shadow-2xl shadow-red-900/20 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-red-600/10 p-6 border-b border-red-500/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-slate-100">Rescue Protocol Active</h2>
              <p className="text-red-400 text-sm">For scholars facing high stress or mental blocks.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-100"><X /></button>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-slate-100 font-semibold mb-4">Top 5 Survival Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Micro-writing (50 words only)",
                "Physical location reset",
                "Reverse timeline audit",
                "Paper-free thinking hour",
                "Supervisor SOS ping"
              ].map((s, idx) => (
                <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 text-slate-300 text-sm flex gap-3">
                  <span className="text-red-500 font-mono">{idx + 1}.</span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
            <h3 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> 20-Minute Rescue Plan
            </h3>
            <div className="space-y-4">
              {rescueSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-slate-300" />
                  </div>
                  <p className="text-slate-300 text-sm">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/gps" 
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              Start Research GPS <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold py-3 px-6 rounded-xl border border-slate-700 transition-colors"
            >
              I feel better now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
