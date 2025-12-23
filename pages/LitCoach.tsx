
import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  FileText, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  Brain,
  Eye,
  TrafficCone,
  Zap,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const LitCoach: React.FC = () => {
  const [abstract, setAbstract] = useState('');
  const [rq, setRq] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abstract.trim() || !rq.trim()) return;

    setIsLoading(true);
    setAnalysis(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as an expert academic literature analysis coach. 
I am a researcher with the following Research Question (RQ): "${rq}"

Analyze this paper abstract:
"${abstract}"

Provide an output with these exact sections:
1. 🎯 **The Actual Problem**: What fundamental issue is this paper truly solving?
2. 🛠️ **Methodological Approach**: What tools or strategies did the authors use?
3. 💎 **Core Significance**: Why does this paper matter in its field?
4. 🔗 **Connectivity**: How specifically does it relate to or challenge my RQ?
5. 🚦 **Strategic Verdict**: Should I Read (deep dive), Skim (grab data), or Skip (irrelevant)? Why?
6. 🧠 **Critical Inquiry**: What one critical question should I ask the authors if I met them?

Keep the tone professional, objective, and intellectually stimulating.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.65,
        },
      });

      setAnalysis(response.text || "Analysis failed to materialize.");
    } catch (error) {
      console.error("Lit Coach Error:", error);
      setAnalysis("The analysis engine encountered a cognitive block. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictColor = (text: string) => {
    if (text.toLowerCase().includes('read')) return 'text-green-500';
    if (text.toLowerCase().includes('skim')) return 'text-yellow-500';
    if (text.toLowerCase().includes('skip')) return 'text-red-500';
    return 'text-blue-400';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-900/20">
          <FlaskConical className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Literature Analysis Coach</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          "Don't just read; synthesize." Accelerate your literature review by identifying gaps and relevance in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleAnalyze} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Brain className="w-3 h-3" /> Your Research Question
              </label>
              <textarea 
                value={rq}
                onChange={(e) => setRq(e.target.value)}
                placeholder="What is the central question you are trying to answer?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-purple-500 transition-colors h-24 resize-none text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Paper Abstract
              </label>
              <textarea 
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Paste the abstract of the paper you are evaluating..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-purple-500 transition-colors h-48 resize-none text-sm"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Abstract...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" /> Analyze Relevance
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              SYNTHESIS_ENGINE_v2.0
            </p>
          </form>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <Eye className="w-12 h-12 text-purple-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Deconstructing Narrative</h3>
              <p className="text-slate-600 mt-2">Identifying methodology, extracting significance, and mapping connectivity to your RQ...</p>
            </div>
          ) : analysis ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {analysis.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-purple-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.includes('Traffic Light Verdict') || line.includes('Verdict')) {
                     return <div key={i} className={`text-2xl font-black mb-6 ${getVerdictColor(line)}`}>{line}</div>
                  }
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-slate-300 leading-relaxed mb-4">{line.replace(/\*\*.*?\*\*/g, '').replace(/^\d\.\s/, '')}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <TrafficCone className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Quick Tip</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">If the verdict is 'Skim', only look at the figures and the 'Results' section.</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Synthesis Pro</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Add these notes to your Synthesis Matrix (Tools tab) to keep track of your literature map.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-purple-600/10 border border-purple-500/20 p-6 rounded-2xl flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6 text-purple-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Supervisor Protocol</p>
                        <p className="text-xs text-slate-400">Mention this paper in your next sync if 'Connectivity' score is high.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <FlaskConical className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Scientific Engine Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Feed the engine a paper abstract and your research question to begin the academic deconstruction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
