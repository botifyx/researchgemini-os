
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useProgress } from '../store/useProgress';
import { PHASES } from '../data/phases';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Settings, 
  Info, 
  Loader2, 
  ShieldCheck, 
  Scale, 
  Cpu, 
  ChevronRight,
  Target,
  BarChart3,
  Map
} from 'lucide-react';
import { EthicsGate } from '../components/EthicsGate';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const DISCIPLINES = [
  "STEM (Science, Tech, Engineering, Math)",
  "Social Sciences & Psychology",
  "Humanities & Arts",
  "Business, Economics & Finance",
  "Health, Medicine & Nursing",
  "Law & Legal Studies",
  "Education & Pedagogy",
  "Interdisciplinary / Hybrid",
  "Data Science & Artificial Intelligence"
];

const REGIONS = [
  "Global / Unspecified",
  "United States (R1/R2 Institutions)",
  "United Kingdom (Russell Group / Post-92)",
  "European Union (Bologna Process Norms)",
  "Australia & New Zealand (Go8 / ATN)",
  "India (UGC / IIT / IISc Frameworks)",
  "China & East Asia (C9 League Norms)",
  "Global South (Regional Development Focus)",
  "Private / Corporate Research Institute"
];

const ETHICS_STORAGE_KEY = 'researchgemini_protocol_v1_accepted';

export const AICompanion: React.FC = () => {
  const { progress, updateContext } = useProgress();
  const [ethicsAccepted, setEthicsAccepted] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Protocol verified. I am the ResearchGemini AI Companion. How can I ethically support your research reasoning today? I have synced your current phase and latest scorecard metrics for context." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pipelineSteps = [
    "Context Initializing...",
    "Integrity Guard Active...",
    "Lifecycle Pulse Synced...",
    "Validating Output..."
  ];

  useEffect(() => {
    const accepted = localStorage.getItem(ETHICS_STORAGE_KEY);
    setEthicsAccepted(accepted === 'true');
  }, []);

  const handleAcceptEthics = () => {
    localStorage.setItem(ETHICS_STORAGE_KEY, 'true');
    setEthicsAccepted(true);
  };

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % pipelineSteps.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentPhase = PHASES[progress.currentPhaseIndex];
      
      // Calculate scorecard history context
      const scorecardContext = Object.entries(progress.scorecardHistory)
        .map(([id, score]) => `- ${id.toUpperCase()}: ${score}% readiness`)
        .join('\n') || 'No scores recorded yet. Scholar is operating without structural evaluations.';

      // System instruction focusing on ethical coaching
      const systemInstruction = `You are ResearchGemini AI Companion (ROS_CORE_v1). 
You are a high-rigor academic research assistant for PhD and Masters scholars.

CONSTRAINTS:
1. NEVER generate plagiarized or verbatim thesis content.
2. NEVER ghostwrite or perform the primary intellectual labor.
3. PROVIDE structural advice, methodological critiques, and reasoning pathways.
4. ALWAYS cite standard academic norms and suggest consulting supervisors.
5. IF a query asks for content generation, REFRAME it as a structural exercise.

TONE: Clinical, encouraging, professional, and intellectually rigorous.`;

      // Dynamic Context Injection
      const scholarContext = `
[SCHOLAR_METADATA_PULSE]
TARGET_DEGREE: ${progress.context.degree}
RESEARCH_DOMAIN: ${progress.context.domain || 'Undefined'}
REGIONAL_NORMS: ${progress.context.region || 'Global'}
STRESS_INTENSITY: ${progress.context.stressLevel}

CURRENT_LIFECYCLE_PHASE: 
- Title: ${currentPhase.title}
- Objective: ${currentPhase.description}
- Milestone: ${progress.currentPhaseIndex + 1} of 8

AUDIT_HISTORY (Recent Scorecards):
${scorecardContext}
[/SCHOLAR_METADATA_PULSE]
`;

      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: `${scholarContext}\n\nUSER_QUERY: ${input}\n\nRESPONSE_PROTOCOL: Acknowledge the scholar's current phase and scores if relevant to the query.` }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || "Cognitive transmission error. Re-sync required.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM_ALERT: The AI core is currently unresponsive. Re-initialize or try later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (ethicsAccepted === null) return null;

  if (!ethicsAccepted) {
    return (
      <div className="py-12 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-50 dark:via-slate-950 to-slate-50 dark:to-slate-950 min-h-screen transition-colors duration-500">
        <EthicsGate onAccept={handleAcceptEthics} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col animate-in fade-in duration-1000 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">AI Companion Terminal</h1>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
                <span className="text-[10px] font-mono text-green-700 dark:text-green-500/80 uppercase tracking-widest font-black italic">Context_Aware_Protocol_v1.2</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3 flex-1 md:flex-initial shadow-sm">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">Core_Online</span>
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-xl border transition-all ${showSettings ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 shadow-sm'}`}
            title="Configure System Context"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-2xl relative transition-colors duration-300">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] md:max-w-[75%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg ${m.role === 'user' ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400' : 'bg-blue-600 text-white'}`}>
                    {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`p-5 rounded-[2rem] text-sm leading-relaxed font-medium ${m.role === 'user' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50 shadow-sm'}`}>
                    {m.content.split('\n').map((line, j) => (
                      <p key={j} className={line.trim() === '' ? 'h-3' : 'mb-2 last:mb-0'}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="max-w-[85%] flex gap-4 flex-row">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-600 text-white animate-pulse">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 flex items-center gap-3 shadow-sm">
                    <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-500 animate-spin" />
                    <span className="text-[11px] text-slate-500 dark:text-slate-500 font-mono italic uppercase tracking-tighter font-bold">{pipelineSteps[loadingStep]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 relative z-10 backdrop-blur-md">
            <div className="flex gap-3 relative max-w-5xl mx-auto">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Consult about reasoning, logic, or research blocks..."
                className="flex-1 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm font-medium"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white px-8 rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-900/40 flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 px-4 py-2 bg-white dark:bg-slate-900/30 rounded-xl border border-slate-200 dark:border-slate-800/50 flex items-center justify-center gap-3 max-w-5xl mx-auto">
              <Scale className="w-3.5 h-3.5 text-blue-500/70 flex-shrink-0" />
              <p className="text-[9px] text-slate-500 dark:text-slate-600 font-mono uppercase tracking-widest italic text-center font-black">
                Ethical Lock Engaged: This engine is configured for advisory support only. Plagiarism and ghostwriting protocols are active.
              </p>
            </div>
          </div>
        </div>

        {showSettings && (
          <div className="w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 overflow-y-auto animate-in slide-in-from-right-10 duration-500 shadow-2xl custom-scrollbar transition-colors">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
               <h3 className="text-slate-900 dark:text-slate-100 font-black flex items-center gap-2 uppercase tracking-tighter text-lg">
                <Info className="w-4 h-4 text-blue-500" /> State Parameters
               </h3>
               <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><ChevronRight className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-widest ml-1 font-black flex items-center gap-2">
                   <Target className="w-3 h-3" /> Discipline Domain
                 </label>
                 <select 
                   value={progress.context.domain}
                   onChange={(e) => updateContext({ domain: e.target.value })}
                   className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-200 focus:border-blue-500 outline-none transition-colors appearance-none font-bold shadow-sm"
                 >
                   <option value="">Auto-Detect / Select</option>
                   {DISCIPLINES.map(d => (
                     <option key={d} value={d}>{d}</option>
                   ))}
                 </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-widest ml-1 font-black flex items-center gap-2">
                  <Map className="w-3 h-3" /> Regional Norms
                </label>
                <select 
                  value={progress.context.region}
                  onChange={(e) => updateContext({ region: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-200 focus:border-blue-500 outline-none transition-colors appearance-none font-bold shadow-sm"
                >
                  <option value="">Global Context</option>
                  {REGIONS.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 block uppercase tracking-widest ml-1 font-black">Lifecycle Stress</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map(level => (
                    <button
                      key={level}
                      onClick={() => updateContext({ stressLevel: level as any })}
                      className={`py-2.5 text-[10px] font-black uppercase rounded-xl border transition-all ${
                        progress.context.stressLevel === level 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/30' 
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-600 hover:text-slate-900 dark:hover:text-slate-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-mono text-slate-500 block uppercase tracking-widest ml-1 font-black mb-4 flex items-center gap-2">
                   <BarChart3 className="w-3 h-3" /> Audit Sync Status
                </h4>
                <div className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
                    <span className="text-[10px] font-mono text-slate-900 dark:text-slate-100 uppercase font-black tracking-[0.2em]">Context Loaded</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-relaxed italic font-bold">
                    The companion is currently referencing "{PHASES[progress.currentPhaseIndex].title}" norms and your recent scorecard audits.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <button 
                  onClick={() => {
                    localStorage.removeItem(ETHICS_STORAGE_KEY);
                    window.location.reload();
                  }}
                  className="text-[9px] font-mono text-slate-400 dark:text-slate-600 hover:text-red-500 text-left uppercase tracking-widest transition-colors flex items-center gap-2 font-black"
                >
                   <ChevronRight className="w-3 h-3" /> Terminate_Protocol_Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
