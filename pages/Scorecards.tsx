
import React, { useState } from 'react';
import { SCORECARDS } from '../data/scorecards';
import { useProgress } from '../store/useProgress';
import { 
  ClipboardList, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { IntegrityCallout } from '../components/IntegrityCallout';

export const Scorecards: React.FC = () => {
  const [activeScorecard, setActiveScorecard] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, boolean>>({});
  const { saveScore } = useProgress();

  const handleToggle = (id: string) => {
    setResponses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateScore = (scorecardId: string) => {
    const scorecard = SCORECARDS.find(s => s.id === scorecardId);
    if (!scorecard) return 0;
    
    let total = 0;
    scorecard.questions.forEach(q => {
      if (responses[q.id]) total += q.weight;
    });
    return total;
  };

  const currentScore = activeScorecard ? calculateScore(activeScorecard) : 0;

  return (
    <div className="mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-blue-500" /> Research Scorecards
        </h1>
        <p className="text-slate-400 mt-2 mb-6">Objective rubrics to measure your progress and readiness.</p>
        
        <IntegrityCallout />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Selection Sidebar */}
        <div className="space-y-4">
          {SCORECARDS.map(s => (
            <button
              key={s.id}
              onClick={() => { setActiveScorecard(s.id); setResponses({}); }}
              className={`w-full p-4 rounded-2xl text-left border transition-all ${
                activeScorecard === s.id 
                  ? 'bg-blue-600/10 border-blue-600 text-blue-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <h3 className="font-bold text-sm mb-1">{s.title}</h3>
              <p className="text-xs line-clamp-2">{s.description}</p>
            </button>
          ))}
        </div>

        {/* Evaluation Area */}
        <div className="lg:col-span-3">
          {activeScorecard ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{SCORECARDS.find(s => s.id === activeScorecard)?.title}</h2>
                  <p className="text-slate-400 mt-1">Check all that apply to your current research state.</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-mono font-bold ${currentScore > 70 ? 'text-green-500' : currentScore > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {currentScore}%
                  </div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">READINESS_INDEX</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {SCORECARDS.find(s => s.id === activeScorecard)?.questions.map(q => (
                  <button
                    key={q.id}
                    onClick={() => handleToggle(q.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                      responses[q.id] 
                        ? 'bg-blue-600/10 border-blue-500 text-slate-100' 
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                      responses[q.id] ? 'bg-blue-500 border-blue-500 text-white' : 'bg-slate-900 border-slate-700'
                    }`}>
                      {responses[q.id] && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className="text-lg text-left">{q.text}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                  <h4 className="text-slate-100 font-bold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" /> Interpretation
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {currentScore >= 80 ? "You are in an excellent position. This phase is robust and ready for the next level." : 
                     currentScore >= 50 ? "Stable, but needs refinement. Focus on the unchecked items above to strengthen your position." : 
                     "High risk. Consider pausing collection or submission to address the foundational gaps identified here."}
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                  <h4 className="text-slate-100 font-bold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-500" /> Next Step
                  </h4>
                  <button 
                    onClick={() => saveScore(activeScorecard, currentScore)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    Save to Dashboard <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center">
              <ClipboardList className="w-16 h-16 text-slate-800 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-400">Select a scorecard to begin</h2>
              <p className="text-slate-500 mt-2">Evaluations help you spot blind spots before they become failures.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
