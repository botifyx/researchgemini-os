
import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Loader2, 
  ListOrdered, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const WritingCoach: React.FC = () => {
  const [chapter, setChapter] = useState('');
  const [points, setPoints] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapter.trim() || !points.trim()) return;

    setIsLoading(true);
    setStrategy(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as an expert Academic Writing Coach and Thesis Architect.

Input:
- Chapter Name: "${chapter}"
- Key Points (bullet form): "${points}"

Output a comprehensive structural strategy with these exact sections. 
CRITICAL CONSTRAINT: Do NOT write full paragraphs. Use only bullet points, lists, and short sentences.

Sections:
1. 🏗️ **Ideal Chapter Structure**: A suggested hierarchical outline (Introduction, Sub-sections, Summary).
2. 🔄 **Logical Flow Order**: The best sequence to present the key points for maximum clarity and impact.
3. ⚠️ **Common Writing Mistakes**: Potential pitfalls specific to this type of chapter.
4. ✅ **Academic Tone Checklist**: A list of criteria to ensure the language is formal, objective, and precise.
5. ❓ **Critical Scholar Questions**: 5-7 deep questions the author must answer within this chapter to satisfy an examiner.

Tone: Professional, clinical, structural, and constructive.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.6,
        },
      });

      setStrategy(response.text || "Structural guidance failed to generate.");
    } catch (error) {
      console.error("Writing Coach Error:", error);
      setStrategy("The writing coach terminal is currently experiencing a sync error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
          <PenTool className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Thesis Writing Coach</h1>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          "Architecture precedes art." Build a logical, rigorous framework for your thesis chapters before you write a single paragraph.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Input Terminal */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleConsult} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> Chapter Context
              </label>
              <input 
                type="text" 
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Chapter 4: Methodology"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <ListOrdered className="w-3 h-3" /> Key Arguments / Points
              </label>
              <textarea 
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="- Choice of mixed methods&#10;- Participant selection criteria&#10;- Data triangulation strategy&#10;- Pilot study results..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-48 resize-none text-sm font-mono"
                required
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
                  Mapping Structural Logic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Generate Writing Strategy
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              WRITING_ARCHITECT_v1.0
            </p>
          </form>
        </div>

        {/* Strategy Display */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <PenTool className="w-12 h-12 text-blue-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Deconstructing Argumentative Chain</h3>
              <p className="text-slate-600 mt-2">Identifying logical gaps and structural hierarchies within your key points...</p>
            </div>
          ) : strategy ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {strategy.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-blue-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                    return <li key={i} className="text-slate-300 ml-4 mb-2 list-none flex gap-2">
                      <span className="text-blue-500/50">•</span> {line.trim().substring(1).trim()}
                    </li>;
                  }
                  if (line.trim() === '') return <div key={i} className="h-2" />;
                  return <p key={i} className="text-slate-400 text-sm mb-2">{line}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase"> examiner lens</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Does every section above contribute directly to the research contribution?</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Ready to Draft</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Use the "Logical Flow Order" as your paragraph headers for the first draft.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Structural Validation</p>
                        <p className="text-xs text-slate-400">Export this outline to your supervisor for early feedback on logical flow.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="mt-6 flex items-center gap-2 px-2 py-2 bg-slate-900/50 rounded-lg border border-slate-800/50">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                <p className="text-[10px] text-slate-500 leading-tight font-medium uppercase tracking-wider">
                  Ethical Note: This is a structural advisory. Writing should be your original intellectual contribution.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <PenTool className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Writing Coach Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Submit your chapter name and key points to receive a structural strategy from the ROS.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
