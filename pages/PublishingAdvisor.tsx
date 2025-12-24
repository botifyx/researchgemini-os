import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  MessageSquareX, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  History,
  Target,
  FileSearch,
  CheckCircle2,
  Heart,
  BarChart,
  Zap,
  Users,
  Lock,
  BookOpen,
  Info
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { JOURNAL_SELECTION_CRITERIA } from '../data/publishingRules';

export const PublishingAdvisor: React.FC = () => {
  const [formData, setFormData] = useState({
    topic: '',
    method: '',
    region: '',
    reviews: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;

    setIsLoading(true);
    setAdvice(null);

    try {
      const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

      const prompt = `Act as an expert Academic Publishing Advisor.

Scholar Context:
- Paper Topic: "${formData.topic}"
- Methodology: "${formData.method}"
- Target Region/Scope: "${formData.region || 'International'}"
- Rejection Comments/Peer Reviews (if any): "${formData.reviews || 'N/A'}"

Provide a detailed publishing strategy with these exact sections:
1. 📊 **Journal Selection Matrix**: 5-7 criteria for choosing the optimal journal for this specific work.
2. 🔍 **Critique Decoding**: (If reviews are provided) Translate complex reviewer comments into actionable technical tasks. If not provided, list common critiques for this topic/method.
3. 🛠️ **Strategic Revision Plan**: High-level steps to address typical or specific critiques for this type of research.
4. 🧭 **Redirection Logic**: A checklist to decide if a journal is still a good fit or if it's time to resubmit elsewhere.
5. 🧘 **Emotional Equilibrium**: A section to normalize the high rejection rates in academic publishing and provide encouragement.

Tone: Professional, clinical, structural, and empathetic. Use clean Markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.65,
        },
      });

      setAdvice(response.text || "Publishing advice failed to generate.");
    } catch (error) {
      console.error("Publishing Advisor Error:", error);
      setAdvice("The publishing advisor terminal is currently experiencing a sync error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCriteriaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-4 h-4 text-blue-500" />;
      case 'BarChart': return <BarChart className="w-4 h-4 text-purple-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'Users': return <Users className="w-4 h-4 text-emerald-500" />;
      case 'Search': return <Search className="w-4 h-4 text-blue-400" />;
      case 'Lock': return <Lock className="w-4 h-4 text-slate-400" />;
      default: return <BookOpen className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Academic Publishing Advisor</h1>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          "Publishing is a marathon, not a sprint." Navigate the complex terrain of journal selection, peer reviews, and strategic revisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleConsult} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Target className="w-3 h-3" /> Paper Topic
              </label>
              <textarea 
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                placeholder="What is the central theme of your paper?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <FileSearch className="w-3 h-3" /> Methodology
              </label>
              <input 
                type="text" 
                value={formData.method}
                onChange={(e) => setFormData({...formData, method: e.target.value})}
                placeholder="e.g. Mixed Methods, Quasi-experimental"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <History className="w-3 h-3" /> Target Region / Scope
              </label>
              <input 
                type="text" 
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
                placeholder="e.g. Q1 Global Journals, EU Focus"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <MessageSquareX className="w-3 h-3" /> Rejection Comments (Optional)
              </label>
              <textarea 
                value={formData.reviews}
                onChange={(e) => setFormData({...formData, reviews: e.target.value})}
                placeholder="Paste reviewer feedback to decode it..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Synthesizing Strategy...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Generate Advisor Report
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              PUBLISH_STRATEGIST_v1.0
            </p>
          </form>

          {/* Selection Rubric Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3 uppercase tracking-tight">
              <BarChart className="w-5 h-5 text-blue-500" /> Selection Rubric
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 font-medium italic">
              Use these expert criteria to filter your long-list of potential journals before running the advisor engine.
            </p>
            <div className="space-y-6">
              {JOURNAL_SELECTION_CRITERIA.map((criterion, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                      {getCriteriaIcon(criterion.icon)}
                    </div>
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">{criterion.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed pl-11">
                    {criterion.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                Strategic Note: Aligning with a journal's 'Aims & Scope' is the single most important factor for avoiding an immediate desk rejection.
              </p>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <Globe className="w-12 h-12 text-blue-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Scanning Journal Landscapes</h3>
              <p className="text-slate-600 mt-2">Correlating topics with impact metrics and deconstructing peer review narratives...</p>
            </div>
          ) : advice ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {advice.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-blue-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.startsWith('🧘') || line.includes('Emotional Equilibrium')) {
                     return <div key={i} className="bg-blue-950/20 border border-blue-500/20 p-6 rounded-2xl mb-6 mt-8">
                       <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider text-sm">
                         <Heart className="w-4 h-4" /> Scholar Wellness
                       </h4>
                       <p className="text-slate-300 text-sm leading-relaxed italic">{line.replace(/.*?:/, '').trim()}</p>
                     </div>
                  }
                  if (line.trim() === '') return <div key={i} className="h-2" />;
                  return <p key={i} className="text-slate-300 leading-relaxed mb-4">{line.replace(/\*\*.*?\*\*/g, '').replace(/^\d\.\s/, '')}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Reputation Protection</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Always verify your final journal choice against the Predatory Journal Shield in Integrity.</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Revise vs Reject</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">A 'Major Revision' is a high-probability invitation to publish. Treat it as a win.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Publishing Protocol</p>
                        <p className="text-xs text-slate-400">Share this report with your co-authors to align on the next submission target.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <Globe className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Publishing Engine Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Input your paper details to receive a strategic publishing report from the ROS.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};