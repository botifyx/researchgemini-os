
import React, { useState } from 'react';
import { 
  LineChart, 
  BarChart, 
  Search, 
  EyeOff, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  FileCheck,
  Scale,
  FlaskRound,
  ShieldAlert,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const ResultsInterpreter: React.FC = () => {
  const [results, setResults] = useState('');
  const [expectation, setExpectation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);

  const handleInterpret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!results.trim()) return;

    setIsLoading(true);
    setInterpretation(null);

    try {
      const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

      const prompt = `Act as an expert academic Research Results Interpreter. 

Input Context:
- Result Summary (numbers or observations): "${results}"
- Expected Outcome/Hypothesis: "${expectation || 'Not explicitly stated'}"

Provide a detailed interpretation with these exact sections:
1. 📊 **Empirical Reality**: What do these results actually show in plain, objective terms?
2. 🔀 **Deviation Analysis**: If there's a gap between expectation and reality, what are the possible technical or theoretical reasons?
3. ✅ **Validation Protocol**: What specific sanity checks or follow-up tests should be run to confirm these findings?
4. ⚖️ **Academic Nuance**: Provide 2-3 neutral interpretations of the data that avoid bias.
5. 🛑 **Constraint Alert**: Warn the scholar against common over-claims or logical leaps based solely on this specific data.

Keep the tone professional, cautious, and scientifically rigorous. Use clean Markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.5,
        },
      });

      setInterpretation(response.text || "Interpretation engine returned an empty payload.");
    } catch (error) {
      console.error("Results Interpreter Error:", error);
      setInterpretation("The interpretation core encountered a critical error. Please verify your results input and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20">
          <LineChart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Results Interpretation Guide</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          "Data doesn't lie, but it often whispers." Decipher your research findings with academic rigor and objective clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleInterpret} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <BarChart className="w-3 h-3" /> Results Summary
              </label>
              <textarea 
                value={results}
                onChange={(e) => setResults(e.target.value)}
                placeholder="Enter numbers, p-values, or qualitative observations..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-40 resize-none text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <HelpCircle className="w-3 h-3" /> Expected Outcome / Hypothesis
              </label>
              <textarea 
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
                placeholder="What did you expect to happen?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none text-sm"
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
                  Decoding Findings...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Interpret Data
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              RESULT_ANALYST_v1.2
            </p>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <Search className="w-12 h-12 text-blue-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Synthesizing Statistical Context</h3>
              <p className="text-slate-600 mt-2">Correlating observations with methodological parameters and scanning for potential bias...</p>
            </div>
          ) : interpretation ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {interpretation.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-blue-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.startsWith('🛑') || line.includes('Constraint Alert')) {
                     return <div key={i} className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl mb-6 mt-8">
                       <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider text-sm">
                         <ShieldAlert className="w-4 h-4" /> Integrity Warning
                       </h4>
                       <p className="text-slate-300 text-sm leading-relaxed italic">{line.replace(/.*?:/, '').trim()}</p>
                     </div>
                  }
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-slate-300 leading-relaxed mb-4">{line.replace(/\*\*.*?\*\*/g, '').replace(/^\d\.\s/, '')}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <FileCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Peer Check</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Does this interpretation align with the literature you've synthesized?</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <Scale className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Objectivity</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Are you reporting findings that contradict your primary hypothesis?</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <FlaskRound className="w-6 h-6 text-blue-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Statistical Rigor</p>
                        <p className="text-xs text-slate-400">Remember to include standard error and confidence intervals in your final draft.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <LineChart className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Interpretation Core Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Submit your raw findings and expected outcomes to trigger the interpretation engine.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
