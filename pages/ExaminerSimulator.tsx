
import React, { useState } from 'react';
import { 
  Gavel, 
  Search, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Binary,
  Layers,
  Award,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const ExaminerSimulator: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    chapters: '',
    contributions: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [simulation, setSimulation] = useState<string | null>(null);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.chapters.trim()) return;

    setIsLoading(true);
    setSimulation(null);

    try {
      const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

      const prompt = `Act as a senior, critical, yet fair Doctoral Examiner for a prestigious university.

Thesis Details:
- Thesis Title: "${formData.title}"
- Chapter List: "${formData.chapters}"
- Claimed Contributions: "${formData.contributions || 'Unspecified - please deduce from title/chapters'}"

Provide a comprehensive "Simulated Examiner's Preliminary Report" with these exact sections:
1. 🧐 **General Overview & Impression**: A high-level assessment of the thesis's scope and ambition.
2. ❓ **Critical Questions per Chapter**: 2-3 deep, probing questions for each major section or chapter.
3. 🎯 **The Real Test**: For each chapter/section, explain what the examiner is ACTUALLY trying to verify (e.g., intellectual ownership, methodological rigor, logical consistency).
4. 🏗️ **Structural Weaknesses**: Identify potential "soft spots" or gaps in the argumentative chain.
5. 🛡️ **Defense Strategy**: Specific advice on how to answer the toughest questions confidently WITHOUT overclaiming or being defensive.
6. 🎓 **Contribution Audit**: Evaluate the stated contributions against typical doctoral standards (Novelty, Significance, Rigor).

Tone: Professional, clinical, analytical, and slightly formal. Use clean Markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.6,
        },
      });

      setSimulation(response.text || "Simulation failed to load.");
    } catch (error) {
      console.error("Examiner Simulator Error:", error);
      setSimulation("The examiner terminal is currently unreachable. Please verify your thesis details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-slate-900/50">
          <Gavel className="w-8 h-8 text-slate-950" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Doctoral Examiner Simulator</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          "The best defense is knowing the attack." Step into the mindset of your examiner to uncover blind spots and strengthen your thesis logic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSimulate} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> Thesis Title
              </label>
              <input 
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="The formal title of your thesis..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Chapter List / Outline
              </label>
              <textarea 
                value={formData.chapters}
                onChange={(e) => setFormData({...formData, chapters: e.target.value})}
                placeholder="1. Intro, 2. Lit Review, 3. Methodology, 4. Data..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Award className="w-3 h-3" /> Claimed Contributions
              </label>
              <textarea 
                value={formData.contributions}
                onChange={(e) => setFormData({...formData, contributions: e.target.value})}
                placeholder="What new knowledge are you adding to the field?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-100 hover:bg-white disabled:bg-slate-800 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Thesis Logic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Run Simulation
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              EXAMINER_LOGIC_v1.4
            </p>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <Binary className="w-12 h-12 text-slate-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Processing Academic Trajectory</h3>
              <p className="text-slate-600 mt-2">Correlating contributions with peer standards and drafting simulated examiner critiques...</p>
            </div>
          ) : simulation ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {simulation.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-blue-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.startsWith('🛡️') || line.includes('Defense Strategy')) {
                     return <div key={i} className="bg-blue-950/20 border border-blue-500/20 p-6 rounded-2xl mb-6 mt-8">
                       <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider text-sm">
                         <ShieldCheck className="w-4 h-4" /> Defense Protocol
                       </h4>
                       <p className="text-slate-300 text-sm leading-relaxed italic">{line.replace(/.*?:/, '').trim()}</p>
                     </div>
                  }
                   if (line.startsWith('🏗️') || line.includes('Structural Weaknesses')) {
                     return <div key={i} className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl mb-6 mt-8">
                       <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider text-sm">
                         <AlertTriangle className="w-4 h-4" /> Integrity Alert
                       </h4>
                       <p className="text-slate-300 text-sm leading-relaxed italic">{line.replace(/.*?:/, '').trim()}</p>
                     </div>
                  }
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-slate-300 leading-relaxed mb-4">{line.replace(/\*\*.*?\*\*/g, '').replace(/^\d\.\s/, '')}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-6">
                <div className="flex-1 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Peer Standards</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">This report simulates a "Major Corrections" to "Pass" threshold analysis.</p>
                  </div>
                </div>
                <div className="flex-1 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Next Step</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Use these questions to conduct a self-viva or share with your supervisor.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-slate-100/10 border border-slate-100/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <Gavel className="w-6 h-6 text-slate-100" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Simulate Viva</p>
                        <p className="text-xs text-slate-400">Ready to try answering these live? Head to the Viva Simulator.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <Gavel className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Examiner Engine Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Submit your thesis title and outline to receive a simulated examiner's report from the ROS.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
