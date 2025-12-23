
import React, { useState } from 'react';
import { Award, MessageSquare, ShieldCheck, HelpCircle, ArrowRight, Play, RefreshCw } from 'lucide-react';
import { IntegrityCallout } from '../components/IntegrityCallout';

const VIVA_QUESTIONS = [
  { chapter: "Introduction", q: "How would you explain your research in 2 minutes to a non-specialist?", trap: "Getting too technical too fast." },
  { chapter: "Literature", q: "Why did you choose this theoretical framework over [Competing Framework]?", trap: "Not knowing the flaws of your own chosen framework." },
  { chapter: "Methodology", q: "If you were to start again, what would you change about your study design?", trap: "Being defensive; honesty shows maturity." },
  { chapter: "Findings", q: "How do your findings contribute specifically to the existing body of knowledge?", trap: "Being too vague about 'novelty'." },
  { chapter: "Conclusion", q: "What are the limitations of your work, and how do they impact the results?", trap: "Downplaying limitations too much." }
];

export const VivaSimulator: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showTrap, setShowTrap] = useState(false);

  const nextQuestion = () => {
    setShowTrap(false);
    if (currentIdx < VIVA_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStarted(false);
      setCurrentIdx(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4">Viva Simulator</h1>
        <p className="text-slate-400 mb-8">Master your defense. Practice with examiner-style questions and avoid common traps.</p>
        
        <IntegrityCallout />
      </div>

      {!started ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
              <MessageSquare className="w-6 h-6 text-blue-500 mx-auto mb-3" />
              <p className="text-sm text-slate-300">Question Banks by Chapter</p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
              <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-3" />
              <p className="text-sm text-slate-300">Examiner Mindset Tips</p>
            </div>
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
              <HelpCircle className="w-6 h-6 text-red-500 mx-auto mb-3" />
              <p className="text-sm text-slate-300">Common Traps & Pitfalls</p>
            </div>
          </div>
          <button 
            onClick={() => setStarted(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-3 mx-auto transition-transform hover:scale-105"
          >
            <Play className="w-5 h-5" /> Start Mock Viva Session
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl"></div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono bg-blue-600/10 text-blue-500 px-2 py-1 rounded border border-blue-500/20">
                EXAMINER_QUESTION_{currentIdx + 1}
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                CATEGORY: {VIVA_QUESTIONS[currentIdx].chapter}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-100 mb-12 leading-tight italic">
              "{VIVA_QUESTIONS[currentIdx].q}"
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowTrap(!showTrap)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold py-3 rounded-xl border border-slate-700 transition-colors"
              >
                {showTrap ? "Hide Help" : "Show Examiner Trap"}
              </button>
              <button 
                onClick={nextQuestion}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {showTrap && (
              <div className="mt-8 p-6 bg-red-600/10 border border-red-500/20 rounded-2xl animate-in slide-in-from-top-4 duration-300">
                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> The Trap:
                </h3>
                <p className="text-slate-300 text-sm">{VIVA_QUESTIONS[currentIdx].trap}</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => { setStarted(false); setCurrentIdx(0); }}
            className="w-full py-4 text-slate-500 hover:text-slate-300 flex items-center justify-center gap-2 transition-colors font-mono text-xs"
          >
            <RefreshCw className="w-4 h-4" /> TERMINATE_SESSION
          </button>
        </div>
      )}
    </div>
  );
};
