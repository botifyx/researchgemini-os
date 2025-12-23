
import React, { useState } from 'react';
import { 
  Target, 
  Search, 
  Microscope, 
  ShieldAlert, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  Info,
  CheckCircle2,
  FileSearch,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const TopicRefiner: React.FC = () => {
  const [formData, setFormData] = useState({
    area: '',
    topic: '',
    degree: 'PhD',
    type: 'Applied'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.area || !formData.topic) return;

    setIsLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as an academic topic refinement assistant.

Input Context:
- Broad Research Area: ${formData.area}
- Initial Topic Idea: ${formData.topic}
- Degree Level: ${formData.degree}
- Domain Type: ${formData.type}

Tasks:
1. Break the topic into narrower sub-areas.
2. Identify feasibility risks (scope, data access, required skills).
3. Suggest 3 specific refinement directions (concrete angles, NOT just generic titles).
4. Provide a Topic Feasibility Score (1 to 5, where 1 is high risk/vague and 5 is robust/ready).
5. List 5 critical questions the scholar must answer before finalizing.

Format the output in clean Markdown with professional academic language. Use emojis for section headers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
        },
      });

      setResult(response.text || "Unable to refine topic at this time.");
    } catch (error) {
      console.error("Topic Refinement Error:", error);
      setResult("System failure in the refinement core. Please check your connectivity.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4">Topic Refinement Engine</h1>
        <p className="text-slate-400 max-w-2xl mx-auto italic">
          "A problem well-stated is a problem half-solved." - Narrow your focus with AI-driven academic analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Search className="w-3 h-3" /> Broad Research Area
              </label>
              <input 
                type="text" 
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                placeholder="e.g. Sustainable Urban Planning"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Microscope className="w-3 h-3" /> Initial Topic Idea
              </label>
              <textarea 
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                placeholder="e.g. How solar panels affect property values in developing cities..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-500 uppercase block mb-2">Degree Level</label>
                <select 
                  value={formData.degree}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option>PhD</option>
                  <option>Professional Doctorate</option>
                  <option>Masters (Research)</option>
                  <option>Honours</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-500 uppercase block mb-2">Domain Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option>Applied</option>
                  <option>Theoretical</option>
                  <option>Interdisciplinary</option>
                  <option>Methodological</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Novelty...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Refine Topic
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-tighter">
              ADVISORY_CORE: v1.1_TOPIC_VALIDATOR
            </p>
          </form>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <FileSearch className="w-12 h-12 text-blue-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Scanning Knowledge Base</h3>
              <p className="text-slate-600 mt-2">Correlating your idea with existing academic literature and feasibility frameworks...</p>
            </div>
          ) : result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none prose-headings:text-blue-400 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-slate-100">
                {result.split('\n').map((line, i) => {
                  if (line.startsWith('#')) return <h2 key={i} className="text-2xl font-bold mb-6 mt-8 border-b border-slate-800 pb-2">{line.replace(/^#+\s/, '')}</h2>;
                  if (line.startsWith('**Feasibility Score**') || line.includes('Feasibility Score')) {
                    const scoreMatch = line.match(/\d/);
                    const score = scoreMatch ? parseInt(scoreMatch[0]) : 3;
                    return (
                      <div key={i} className="my-8 p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-between gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-blue-400 mb-1">Topic Feasibility Score</h4>
                          <p className="text-xs text-slate-500 uppercase font-mono tracking-widest">Calculated Trajectory Confidence</p>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <div 
                              key={s} 
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border transition-all ${
                                s <= score 
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40' 
                                  : 'bg-slate-950 border-slate-800 text-slate-600'
                              }`}
                            >
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
                })}
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-slate-100 font-bold mb-2 flex items-center gap-2 text-sm uppercase">
                    <ShieldAlert className="w-4 h-4 text-red-500" /> Integrity Check
                  </h4>
                  <p className="text-[11px] text-slate-500 italic">Ensure your topic isn't a "re-invention of the wheel". Conduct a preliminary systematic review immediately.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-slate-100 font-bold mb-2 flex items-center gap-2 text-sm uppercase">
                    <Lightbulb className="w-4 h-4 text-yellow-500" /> Pro-Tip
                  </h4>
                  <p className="text-[11px] text-slate-500 italic">Discuss these sub-areas with your supervisor to gauge their domain expertise in these niches.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <Target className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Awaiting Input Parameters</h3>
              <p className="max-w-xs mt-2 opacity-50">Fill out the research context form on the left to initiate the refinement logic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
