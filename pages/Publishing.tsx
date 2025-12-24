
import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Search, 
  ArrowRight, 
  Info,
  Clock,
  ExternalLink,
  ShieldCheck,
  Scale,
  ListChecks,
  AlertCircle,
  MapPin,
  Calculator,
  Zap,
  Target,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { IntegrityCallout } from '../components/IntegrityCallout';
import { PREDATORY_FLAGS, SUBMISSION_CHECKLIST, REJECTION_GUIDE, ELIGIBILITY_QUESTIONS } from '../data/publishingRules';

export const Publishing: React.FC = () => {
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<string, boolean>>({});
  const [predatoryChecks, setPredatoryChecks] = useState<Record<string, boolean>>({});
  const [submissionProgress, setSubmissionProgress] = useState<number>(0);
  
  // Logic for Eligibility
  const isEligible = useMemo(() => {
    return eligibilityAnswers['q1'] && eligibilityAnswers['q3'] && eligibilityAnswers['q4'] && !eligibilityAnswers['q5'];
  }, [eligibilityAnswers]);

  // Logic for Predatory Risk
  const predatoryRiskScore = useMemo(() => {
    let score = 0;
    PREDATORY_FLAGS.forEach(flag => {
      if (predatoryChecks[flag.id]) score += flag.weight;
    });
    return score;
  }, [predatoryChecks]);

  const getRiskStatus = () => {
    if (predatoryRiskScore === 0) return { label: "SAFE", color: "text-green-500", bg: "bg-green-500/10" };
    if (predatoryRiskScore < 3) return { label: "CAUTION", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    return { label: "HIGH RISK", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const risk = getRiskStatus();

  return (
    <div className="mx-auto px-4 py-12 pb-32 transition-colors duration-300">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-blue-900/30">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter leading-none">
                Publishing <span className="text-blue-500">PGS</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Publication Guidance System for doctoral scholars.</p>
            </div>
          </div>
          <div className="flex gap-2">
             <Link to="/publishing-advisor" className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm">AI Advisor</Link>
             <div className="px-5 py-2.5 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Integrity_Safe
             </div>
          </div>
        </div>
        <IntegrityCallout />
      </div>

      {/* Strategic Hub Modules */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] font-black border-l-4 border-blue-600 pl-4">Strategic Strategy Nodes</h2>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold hidden sm:block">SYSTEM_MODULES: v1.2.4</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/publishing/country-rules" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:border-blue-500 transition-all overflow-hidden relative active:scale-[0.98]">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
              <MapPin className="w-24 h-24 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-3">Country Rules Explorer</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed italic font-medium">"Decode typical doctoral publishing practices for India, EU, UK, and the United States."</p>
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-500 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                Access Logic Base <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          <Link to="/publishing/decision-assistant" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:border-blue-500 transition-all overflow-hidden relative active:scale-[0.98]">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
              <Calculator className="w-24 h-24 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-3">Conf vs Journal Matrix</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed italic font-medium">"Strategic assistant for weighing conference speed vs journal prestige."</p>
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-500 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                Launch Assistant <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          <Link to="/publishing/supervisor-confirmation" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:border-blue-500 transition-all overflow-hidden relative active:scale-[0.98]">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
              <Mail className="w-24 h-24 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-3">Supervisor Emails</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed italic font-medium">"Copy-ready, respectful templates for confirming publication decisions."</p>
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-500 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                View Templates <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Eligibility & Progress */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3 uppercase tracking-tight">
              <CheckCircle2 className="w-5 h-5 text-blue-500" /> Pre-Flight Checklist
            </h3>
            <div className="space-y-4">
              {ELIGIBILITY_QUESTIONS.map(q => (
                <label key={q.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group">
                  <input 
                    type="checkbox" 
                    checked={eligibilityAnswers[q.id] || false}
                    onChange={(e) => setEligibilityAnswers({...eligibilityAnswers, [q.id]: e.target.checked})}
                    className="mt-1 h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors font-medium">
                    {q.text}
                  </span>
                </label>
              ))}
            </div>

            <div className={`mt-8 p-5 rounded-2xl border transition-all ${isEligible ? 'bg-green-500/5 border-green-500/20 shadow-lg shadow-green-900/5' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-2 h-2 rounded-full ${isEligible ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest font-mono text-slate-500">Node_Sync_Report</span>
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 italic">
                {isEligible 
                  ? "SYSTEM_VERIFIED: You appear ready for external submission protocols." 
                  : "SYSTEM_HOLD: Critical eligibility criteria are currently unmet."}
              </p>
              
              {isEligible && (
                <Link to="/publishing/decision-assistant" className="mt-4 flex items-center justify-between p-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all group/call">
                  Determine Best Outlet <Calculator className="w-3.5 h-3.5 group-hover/call:rotate-12 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3 uppercase tracking-tight">
              <Clock className="w-5 h-5 text-purple-500" /> Lifecycle Map
            </h3>
            <div className="space-y-6">
              {[
                { label: "Idea & Draft", threshold: 25 },
                { label: "Submitted", threshold: 50 },
                { label: "Under Review", threshold: 75 },
                { label: "Published/Accepted", threshold: 100 }
              ].map(step => (
                <button 
                  key={step.label}
                  onClick={() => setSubmissionProgress(step.threshold)}
                  className="w-full text-left group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-black uppercase tracking-widest ${submissionProgress >= step.threshold ? 'text-blue-500' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                    {submissionProgress >= step.threshold && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ${submissionProgress >= step.threshold ? 'bg-blue-600' : 'bg-transparent'}`}
                      style={{ width: submissionProgress >= step.threshold ? '100%' : '0%' }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right Column: The Core Tools */}
        <div className="lg:col-span-2 space-y-8">
          {/* Predatory Shield */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldAlert className="w-32 h-32 text-red-500" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Predatory Journal <span className="text-red-500">Shield</span></h3>
                  <p className="text-slate-500 text-sm mt-1">Audit your target journal against international red-flag criteria.</p>
                </div>
                <div className={`${risk.bg} ${risk.color} px-4 py-2 rounded-xl border border-current/20 font-black text-xs uppercase tracking-widest`}>
                  STATUS: {risk.label}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {PREDATORY_FLAGS.map(flag => (
                  <button 
                    key={flag.id}
                    onClick={() => setPredatoryChecks({...predatoryChecks, [flag.id]: !predatoryChecks[flag.id]})}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group/item ${
                      predatoryChecks[flag.id] 
                        ? 'bg-red-50 dark:bg-red-900/10 border-red-500/30' 
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-red-500/30'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                      predatoryChecks[flag.id] ? 'bg-red-600 border-red-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                    }`}>
                      {predatoryChecks[flag.id] && <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white">{flag.text}</span>
                  </button>
                ))}
              </div>

              {predatoryRiskScore > 0 && (
                <div className="bg-red-600/10 border border-red-500/20 p-6 rounded-3xl flex items-start gap-4 animate-in fade-in zoom-in duration-300 shadow-lg shadow-red-900/10">
                  <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-red-600 font-black uppercase tracking-widest text-xs mb-1">CRITICAL INTEGRITY BREACH RISK</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">If your journal target has multiple flags, pause immediately. A publication in a predatory journal can permanently invalidate your degree eligibility.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submission Readiness */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 uppercase tracking-tight">
              <ListChecks className="w-7 h-7 text-blue-500" /> Submission Protocol
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUBMISSION_CHECKLIST.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-inner">
                  <CheckCircle2 className="w-5 h-5 text-slate-300 dark:text-slate-700 mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 italic">"{item}"</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link to="/tools" className="group flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] hover:underline">
                <Zap className="w-4 h-4" /> ACCESS_FULL_TOOLKIT_TEMPLATES <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Rejection Handling */}
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-10 flex items-center gap-3 uppercase tracking-tight">
                <Scale className="w-7 h-7 text-blue-400" /> Rejection Strategy Logic
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REJECTION_GUIDE.map((guide, i) => (
                  <div key={i} className="bg-slate-950/50 border border-white/5 p-6 rounded-3xl flex flex-col h-full hover:border-blue-500/30 transition-all shadow-sm">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-3 font-black">Scenario_0{i+1}</span>
                    <h4 className="text-lg font-black uppercase mb-3 leading-tight">{guide.type}</h4>
                    <p className="text-xs text-slate-400 mb-8 italic leading-relaxed font-medium">"{guide.logic}"</p>
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <p className="text-[11px] font-black text-slate-100 flex items-start gap-2 uppercase tracking-tight">
                        <ArrowRight className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                        {guide.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-16 text-center">
        <div className="inline-flex flex-col items-center gap-4 bg-slate-100 dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 max-w-3xl mx-auto shadow-inner">
          <AlertCircle className="w-8 h-8 text-slate-400 dark:text-slate-600" />
          <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">PGS System Status</h4>
          <p className="text-sm text-slate-500 leading-relaxed italic font-medium">
            "The Journal PGS is a structural advisory engine. It provides logical criteria for decision-making but does not guarantee acceptance. Always synchronize your publishing strategy with your primary supervisor and institutional research office requirements."
          </p>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 w-full flex flex-col sm:flex-row justify-center items-center gap-8">
            <Link to="/ethics" className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] hover:underline">Read Ethics Manifesto</Link>
            <Link to="/contact?type=misuse" className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-[0.2em] hover:underline">Report Predatory Activity</Link>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
            <Link to="/publishing/country-rules" className="text-[10px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-[0.2em] hover:underline">Global Norms</Link>
            <Link to="/publishing/decision-assistant" className="text-[10px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-[0.2em] hover:underline">Decision Matrix</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
