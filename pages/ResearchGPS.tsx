
import React, { useState, useMemo } from 'react';
import { 
  Navigation, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  FileText, 
  AlertTriangle,
  RefreshCw,
  Search,
  Book,
  Loader2,
  Clock,
  Calendar,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Compass,
  Target,
  Zap,
  Brain,
  History,
  Activity,
  Flag,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { useProgress } from '../store/useProgress';
import { PHASES } from '../data/phases';

const QUESTIONS = [
  { 
    id: 1, 
    text: "At what phase of research do you currently feel you are?", 
    options: ["Early (Proposal/Lit)", "Middle (Data/Exp)", "Late (Writing/Viva)"],
    icon: Compass
  },
  { 
    id: 2, 
    text: "What is your primary systemic barrier?", 
    options: ["Technical/Methodological Gap", "Access to Data/Resources", "Motivation/Mental Block", "Structural Confusion"],
    icon: ShieldAlert
  },
  { 
    id: 3, 
    text: "Supervisor Synchronization Status?", 
    options: ["Weekly Sync (High)", "Monthly Sync (Standard)", "Rarely Synced (Low)", "Total Drift (Zero)"],
    icon: MessageSquare
  },
  { 
    id: 4, 
    text: "Literature Maturity Level?", 
    options: ["Synthesis Matrix Complete", "Reading but disorganized", "Struggling to find relevance"],
    icon: Book
  },
  { 
    id: 5, 
    text: "Methodological Confidence?", 
    options: ["Rigorous & Locked", "Shaky/Testing", "Re-evaluating everything"],
    icon: Target
  }
];

const PROBLEM_PRESETS = [
  "My data results contradict my hypothesis.",
  "I have a deadline in 4 weeks and no draft.",
  "My supervisor is unresponsive to my queries.",
  "I am struggling to find the 'Novelty' in my niche.",
  "I'm overwhelmed by the volume of literature."
];

import { useLogger } from '../lib/logging';

export const ResearchGPS: React.FC = () => {
  const { progress } = useProgress();
  const { log } = useLogger();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [specificProblem, setSpecificProblem] = useState('');
  const [constraints, setConstraints] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const currentSyncPhase = PHASES[progress.currentPhaseIndex]?.title || "Unknown Phase";

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = option;
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const generateRoute = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    log('ResearchGPS', 'calculate_route', {
        phase: currentSyncPhase,
        selfIdPhase: answers[0],
        barrier: answers[1]
    });
    
    try {
      const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

      
      const prompt = `Act as the ResearchGPS Navigation Engine (ROS_CORE_v1). 
      
INPUT DATA:
- Synchronized Phase: ${currentSyncPhase}
- Self-Identified Phase: ${answers[0]}
- Core Barrier: ${answers[1]}
- Supervisor Sync: ${answers[2]}
- Lit State: ${answers[3]}
- Method Confidence: ${answers[4]}
- Specific Problem Payload: "${specificProblem || "General research drift/fog"}"
- External Constraints: "${constraints || "Standard full-time research parameters"}"

TASK:
Provide a clinical, high-rigor recovery route. Avoid fluff. 

OUTPUT SECTIONS:
1. [DIAGNOSTIC_SUMMARY]: A one-sentence assessment of why they are stuck.
2. [CRITICAL_PATH_NODE]: The single most important task they must finish next.
3. [7_DAY_SPRINT_PROTOCOL]: Day 1-2, Day 3-5, Day 6-7 specific micro-goals.
4. [HAZARD_MAP]: 2 common pitfalls specifically related to their current block.
5. [SUPERVISOR_UPLINK]: A specific question or framing they should use with their mentor.
6. [SYSTEM_LINK]: Suggest one of these OS tools if relevant: Lit Coach, Refiner, Methodology, Writer, or Viva Simulator.

TONE: Professional, structured, and authoritative. Use Markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.6,
          topP: 0.9,
          topK: 40
        }
      });

      setAiResponse(response.text || "Cognitive data link failed. Please re-initiate.");
    } catch (error) {
      console.error("GPS System Error:", error);
      setAiResponse("CRITICAL_SYSTEM_ERROR: The navigation core is unresponsive. Ensure API Uplink is active and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGPS = () => {
    setStep(0);
    setAnswers([]);
    setSpecificProblem('');
    setConstraints('');
    setAiResponse(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 pb-32 transition-colors duration-500">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-600/10 blur-[60px] -z-10 rounded-full animate-pulse"></div>
        <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900/40 group hover:rotate-6 transition-transform">
          <Navigation className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-4 leading-none">
          Research<span className="text-blue-500">GPS</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto italic">
          "Recalibrating scholarly trajectories through high-rigor diagnostic logic."
        </p>
      </div>

      {!aiResponse && !isGenerating ? (
        <div className="max-w-3xl mx-auto">
          {step < QUESTIONS.length ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 dark:shadow-black/30 animate-in fade-in zoom-in duration-500">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                      {React.createElement(QUESTIONS[step].icon, { className: "w-5 h-5 text-blue-600" })}
                   </div>
                   <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-black">Diagnostic_Step_0{step + 1}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 font-bold">PROGRESS: {Math.round(((step + 1) / (QUESTIONS.length + 1)) * 100)}%</div>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mb-12 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-700 ease-out" 
                  style={{ width: `${((step + 1) / (QUESTIONS.length + 1)) * 100}%` }}
                ></div>
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-10 tracking-tight leading-tight">
                {QUESTIONS[step].text}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(opt)}
                    className="group flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] hover:border-blue-500 hover:bg-white dark:hover:bg-slate-900 transition-all text-left shadow-sm active:scale-[0.98]"
                  >
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{opt}</span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
              
              {step > 0 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="mt-12 text-slate-400 dark:text-slate-500 flex items-center gap-2 hover:text-slate-900 dark:hover:text-slate-100 transition-colors font-black text-[10px] uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Question
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 dark:shadow-black/30 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                      <Brain className="w-5 h-5 text-purple-600" />
                   </div>
                   <span className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.3em] font-black">Deep_Calibration_Phase</span>
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight leading-tight">Deep Context Injection</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">Describe your specific research block or select a preset to calibrate the engine.</p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {PROBLEM_PRESETS.map(p => (
                      <button 
                        key={p}
                        onClick={() => setSpecificProblem(p)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-all uppercase tracking-tight"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3 ml-1">Current Problem (Raw Data)</label>
                  <textarea 
                    value={specificProblem}
                    onChange={(e) => setSpecificProblem(e.target.value)}
                    placeholder="Describe the exact roadblock... e.g., 'My results are statistically insignificant and I'm worried about my defense.'"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all h-40 resize-none font-medium text-sm shadow-inner"
                  />
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3 ml-1">Lifecycle Constraints</label>
                  <input 
                    type="text"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="e.g. Working full-time, 10 hours a week for research, limited lab access"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all font-medium text-sm shadow-inner"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-black rounded-2xl transition-all border border-slate-200 dark:border-slate-700 text-xs uppercase tracking-widest active:scale-95"
                  >
                    Back
                  </button>
                  <button 
                    onClick={generateRoute}
                    disabled={isGenerating}
                    className="flex-[2] py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-900/30 text-xs uppercase tracking-[0.2em]"
                  >
                    Generate Recovery Route <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : isGenerating ? (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3.5rem] p-20 text-center shadow-2xl flex flex-col items-center animate-in fade-in duration-500 transition-colors">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>
            <Loader2 className="w-20 h-20 text-blue-600 animate-spin relative z-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-tighter">SYST_ANALYZING_TRAJECTORY</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium italic leading-relaxed">
            "Correlating problem payloads with methodological norms and scanning for systemic recovery patterns..."
          </p>
          <div className="mt-12 flex gap-1.5 h-1 w-48 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-blue-600 animate-[loading-bar_3s_infinite]" style={{ width: '30%' }}></div>
          </div>
        </div>
      ) : (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-green-600/10 border border-green-500/20 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Recovery Route Sealed</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium italic">Protocol v2.1: Navigation output live from GPS core.</p>
              </div>
            </div>
            <button 
              onClick={resetGPS}
              className="px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-xl flex items-center gap-3 transition-all border border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-widest shadow-sm active:scale-95"
            >
              <RefreshCw className="w-4 h-4" /> Recalibrate Route
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/40">
            <div className="bg-slate-50 dark:bg-slate-950 px-10 py-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Activity className="w-4 h-4 text-blue-500" />
                 <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.3em]">NAV_ENGINE_OUTPUT // NODE_PULSE_NOMINAL</span>
              </div>
              <div className="flex gap-6">
                <span className="flex items-center gap-2 text-[9px] text-slate-400 font-mono font-black uppercase tracking-widest"><Clock className="w-3 h-3" /> REAL_TIME_SYNC</span>
                <span className="flex items-center gap-2 text-[9px] text-slate-400 font-mono font-black uppercase tracking-widest"><ShieldCheck className="w-3 h-3" /> ETHIC_SAFE</span>
              </div>
            </div>
            
            <div className="p-10 md:p-16 prose prose-slate dark:prose-invert max-w-none">
              {aiResponse?.split('\n').map((line, i) => {
                const cleanLine = line.replace(/^\d\.\s/, '').replace(/^#+\s/, '').replace(/\*\*.*?\*\*/g, '').trim();
                if (!cleanLine) return <div key={i} className="h-4" />;

                if (line.includes('[DIAGNOSTIC_SUMMARY]')) {
                  return (
                    <div key={i} className="mb-12 p-8 bg-blue-500/5 border-l-4 border-blue-600 rounded-r-2xl">
                      <h4 className="text-[10px] font-mono text-blue-600 dark:text-blue-500 uppercase tracking-[0.4em] font-black mb-4">Diagnostic_Executive_Summary</h4>
                      <p className="text-xl text-slate-900 dark:text-slate-100 font-black tracking-tight leading-tight italic">"{line.replace(/\[.*?\]/, '').replace(/:/, '').trim()}"</p>
                    </div>
                  );
                }
                
                if (line.includes('[CRITICAL_PATH_NODE]')) {
                   return (
                     <div key={i} className="mb-12 flex items-start gap-6 group">
                       <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/30 group-hover:scale-110 transition-transform flex-shrink-0">
                         <Target className="w-6 h-6" />
                       </div>
                       <div>
                         <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-2">Priority Checkpoint</h3>
                         <p className="text-slate-600 dark:text-slate-300 font-bold leading-relaxed">{line.replace(/\[.*?\]/, '').replace(/:/, '').trim()}</p>
                       </div>
                     </div>
                   );
                }

                if (line.includes('[7_DAY_SPRINT_PROTOCOL]')) {
                  return <h3 key={i} className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mt-16 mb-8 flex items-center gap-3 border-b-2 border-slate-100 dark:border-slate-800 pb-4"><Zap className="w-6 h-6 text-yellow-500" /> Operational Sprint Matrix</h3>;
                }

                if (line.includes('[HAZARD_MAP]')) {
                  return <h3 key={i} className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mt-16 mb-8 flex items-center gap-3 border-b-2 border-slate-100 dark:border-slate-800 pb-4"><ShieldAlert className="w-6 h-6 text-red-500" /> Environmental Hazards</h3>;
                }

                if (line.includes('[SUPERVISOR_UPLINK]')) {
                  return (
                    <div key={i} className="mt-16 p-10 bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-[2.5rem] relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <History className="w-32 h-32 text-blue-500" />
                       </div>
                       <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4 flex items-center gap-3"><MessageSquare className="w-5 h-5 text-blue-400" /> Synchronization Node</h3>
                       <p className="text-slate-400 font-medium italic text-lg leading-relaxed mb-8">"{line.replace(/\[.*?\]/, '').replace(/:/, '').trim()}"</p>
                       <Link to="/publishing/supervisor-confirmation" className="inline-flex items-center gap-2 bg-blue-600 text-white font-black text-[10px] px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-blue-500 transition-all">Generate Sync Email <ArrowRight className="w-3 h-3" /></Link>
                    </div>
                  );
                }

                if (line.includes('[SYSTEM_LINK]')) {
                   const tool = line.toLowerCase();
                   let path = '/dashboard';
                   if (tool.includes('lit coach')) path = '/lit-coach';
                   if (tool.includes('refiner')) path = '/refiner';
                   if (tool.includes('methodology')) path = '/methodology';
                   if (tool.includes('writer')) path = '/writing-coach';
                   if (tool.includes('viva')) path = '/viva-simulator';

                   return (
                     <div key={i} className="mt-12 flex justify-center">
                        <Link to={path} className="flex items-center gap-4 px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-xl hover:border-blue-500 transition-all group/node">
                           <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover/node:bg-blue-600 transition-all">
                             <Activity className="w-5 h-5 text-blue-600 group-hover/node:text-white" />
                           </div>
                           <div>
                             <span className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.3em] font-black">System_Uplink_Target</span>
                             <p className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{line.replace(/\[.*?\]/, '').replace(/:/, '').trim()}</p>
                           </div>
                           <ChevronRight className="w-5 h-5 text-slate-300 group-hover/node:text-blue-500 group-hover/node:translate-x-1 transition-all" />
                        </Link>
                     </div>
                   );
                }

                return <p key={i} className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 font-medium">{line.replace(/\*\*.*?\*\*/g, '').replace(/^\d\.\s/, '')}</p>;
              })}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 p-10 rounded-[3.5rem] text-center shadow-inner">
            <ShieldCheck className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
            <p className="text-xs text-slate-500 dark:text-slate-500 font-mono uppercase tracking-widest leading-relaxed max-w-2xl mx-auto font-black italic">
              "Rigor Disclaimer: The GPS output is a logical suggestion based on AI heuristics. Scholars must synchronize all trajectories with institutional requirements."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
