
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Target, ShieldCheck, Scale, Mail, Clock, CheckCircle2, ChevronRight, Calculator, Zap, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IntegrityCallout } from '../../components/IntegrityCallout';
import { DECISION_RECOMMENDATIONS, SUPERVISOR_CONFIRM_QUESTIONS, BASE_SCORES, DecisionFactors, DimensionScores } from '../../data/publishingDecisionLogic';

export const DecisionAssistant: React.FC = () => {
  const [factors, setFactors] = useState<DecisionFactors>({
    country: 'EU',
    discipline: 'CS/Engineering',
    stage: 'mid',
    goal: 'degree',
    timeConstraint: 6,
    budgetSensitivity: 'low'
  });

  const [showResult, setShowResult] = useState(false);

  const { recommendation, dimensionScores } = useMemo(() => {
    // Scoring logic
    let confTotal = 0;
    let journalTotal = 0;

    const calcDimension = (dim: keyof DimensionScores) => {
      let c = BASE_SCORES.CONFERENCE[dim];
      let j = BASE_SCORES.JOURNAL[dim];

      // Country Modifiers
      if (factors.country === 'India' && dim === 'weight') j += 2;
      if (factors.country === 'US' && dim === 'weight') j -= 1;

      // Discipline Modifiers
      if (factors.discipline === 'CS/Engineering' && dim === 'weight') c += 2;
      if ((factors.discipline === 'Humanities' || factors.discipline === 'Management') && dim === 'depth') j += 1;

      // Goal Modifiers
      if (factors.goal === 'degree' && dim === 'weight') { c += 1; j += 2; }
      if (factors.goal === 'fast' && dim === 'speed') { c += 3; j -= 1; }

      return { c, j };
    };

    const speed = calcDimension('speed');
    const depth = calcDimension('depth');
    const weight = calcDimension('weight');
    const risk = calcDimension('risk');
    const cost = calcDimension('cost');

    confTotal = speed.c + depth.c + weight.c + risk.c + cost.c;
    journalTotal = speed.j + depth.j + weight.j + risk.j + cost.j;

    const scores: DimensionScores = {
      speed: Math.round(((speed.c + speed.j) / 16) * 100), // Normalized visual
      depth: Math.round(((depth.c + depth.j) / 16) * 100),
      weight: Math.round(((weight.c + weight.j) / 16) * 100),
      risk: Math.round(((risk.c + risk.j) / 16) * 100),
      cost: Math.round(((cost.c + cost.j) / 16) * 100)
    };

    let rec = DECISION_RECOMMENDATIONS.BOTH;
    if (Math.abs(confTotal - journalTotal) >= 3) {
      rec = confTotal > journalTotal ? DECISION_RECOMMENDATIONS.CONFERENCE : DECISION_RECOMMENDATIONS.JOURNAL;
    }

    return { recommendation: rec, dimensionScores: scores };
  }, [factors]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pb-32">
      <div className="mb-10">
        <Link to="/publishing" className="text-blue-500 flex items-center gap-2 text-sm font-bold mb-6 hover:underline uppercase tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Publishing
        </Link>
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-4">
          Decision <span className="text-blue-500">Assistant</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Strategic guidance node for evaluating Conference vs Journal tradeoffs.</p>
      </div>

      <IntegrityCallout />

      {!showResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12 animate-in fade-in duration-500">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-xl">
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-8 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-blue-500" /> Parameter Matrix
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono">Location_Norms</label>
                <select 
                  value={factors.country}
                  onChange={(e) => setFactors({...factors, country: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="India">India</option>
                  <option value="EU">EU / UK</option>
                  <option value="US">United States</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono">Research_Domain</label>
                <select 
                  value={factors.discipline}
                  onChange={(e) => setFactors({...factors, discipline: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="CS/Engineering">CS / Engineering</option>
                  <option value="Life Sciences">Life Sciences</option>
                  <option value="Management">Management</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Interdisciplinary">Interdisciplinary</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono">Lifecycle_Stage</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['early', 'mid', 'final'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setFactors({...factors, stage: s})}
                      className={`py-3 rounded-xl border text-[10px] font-black uppercase transition-all ${factors.stage === s ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-500'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono">Primary_Goal</label>
                <select 
                  value={factors.goal}
                  onChange={(e) => setFactors({...factors, goal: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="degree">Fulfill Degree Requirement</option>
                  <option value="fast">Fast Dissemination</option>
                  <option value="impact">High Impact Publication</option>
                  <option value="supervisor">Supervisor Instruction</option>
                  <option value="career">Career / Postdoc Profile</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono">Time_Constraint (Months)</label>
                  <span className="text-blue-600 font-mono font-black">{factors.timeConstraint}M</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  value={factors.timeConstraint}
                  onChange={(e) => setFactors({...factors, timeConstraint: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            <button 
              onClick={() => setShowResult(true)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-[2rem] mt-12 transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
            >
              Compute Strategic Recommendation <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-100 dark:bg-slate-900/50 p-8 rounded-[3rem] border border-dashed border-slate-300 dark:border-slate-800">
               <ShieldCheck className="w-10 h-10 text-slate-400 dark:text-slate-700 mb-4" />
               <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-2">Algorithm Logic</h4>
               <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                 Recommendation is calculated using normalized weights for speed, rigor, and regional doctoral norms. The "Both" strategy is triggered when scores indicate a balanced tradeoff.
               </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
          <div className="bg-slate-900 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Scale className="w-64 h-64 rotate-12" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Recommended Trajectory</span>
                <h2 className="text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-8 leading-none">
                  {recommendation.type}
                </h2>
                
                <div className="space-y-4 mb-10">
                  {recommendation.reasons.map((r, i) => (
                    <div key={i} className="flex gap-4 items-start bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                       <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                       <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-600/5 border border-blue-500/10 rounded-xl">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
                    "This recommendation supports decision-making, not certification. Always align with PI directives."
                  </p>
                </div>
              </div>

              <div className="w-full md:w-96 bg-slate-50 dark:bg-slate-950 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 space-y-8 shadow-inner">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center border-b border-slate-200 dark:border-slate-800 pb-4">Performance Matrix</h4>
                 {[
                   { label: 'Review Speed', val: dimensionScores.speed, icon: Zap },
                   { label: 'Rigor & Depth', val: dimensionScores.depth, icon: FileText },
                   { label: 'Degree Weight', val: dimensionScores.weight, icon: Calculator },
                   { label: 'Review Risk', val: dimensionScores.risk, icon: AlertCircle },
                   { label: 'Cost Efficiency', val: dimensionScores.cost, icon: Scale }
                 ].map(s => (
                   <div key={s.label} className="space-y-3">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                         <s.icon className="w-3.5 h-3.5" /> {s.label}
                       </span>
                       <span className="font-mono text-blue-600">{s.val}%</span>
                     </div>
                     <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${s.val}%` }}></div>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-8 flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-500" /> Operational Roadmap
              </h3>
              <div className="space-y-8">
                 <div className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-900/30"></div>
                    <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-2">Next 7 Days</h4>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 italic">
                      Identify top 3 target outlets. Cross-reference their "Instructions for Authors" against your current data maturity and formatting.
                    </p>
                 </div>
                 <div className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-900/30"></div>
                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Next 90 Days</h4>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 italic">
                      Execute the primary submission protocol. If aiming for "Both", draft the conference abstract first while simultaneously building the main journal dataset.
                    </p>
                 </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-8 flex items-center gap-3">
                <Mail className="w-6 h-6 text-emerald-500" /> Supervisor Sync Node
              </h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Critical Validation Questions:</p>
              <div className="space-y-4">
                 {SUPERVISOR_CONFIRM_QUESTIONS.map((q, i) => (
                   <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 italic">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                      "{q}"
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button 
              onClick={() => { setShowResult(false); window.scrollTo(0, 0); }}
              className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] hover:text-blue-500 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" /> Re-initialize Assistant Parameters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
