
import React, { useState } from 'react';
import { 
  Microscope, 
  Search, 
  Database, 
  Wrench, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Binary,
  Layers,
  BarChart3
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const MethodologyAdvisor: React.FC = () => {
  const [formData, setFormData] = useState({
    rq: '',
    domain: '',
    data: '',
    skills: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleAdvise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rq.trim()) return;

    setIsLoading(true);
    setAdvice(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as an expert academic Research Methodology Advisor.

Research Context:
- Research Question(s): "${formData.rq}"
- Academic Domain: "${formData.domain || 'General Research'}"
- Available Data/Participants: "${formData.data || 'To be determined'}"
- Scholar's Skill Level/Background: "${formData.skills || 'General academic skills'}"

Provide a detailed methodological framework with these exact sections:
1. 🧪 **Methodological Candidates**: Present 2-3 suitable options (Qualitative, Quantitative, or Mixed Methods).
2. ⚖️ **Comparative Rationalization**: Why does each fit or not fit this specific inquiry?
3. 📦 **Data Requirements**: What specific evidence or datasets are needed for each option?
4. 📊 **Data Visualization Roadmap**: Detail specific visualization techniques (e.g., thematic maps, regression plots, network diagrams, or conceptual flowcharts) that would best communicate findings for these methodologies.
5. 🚧 **Risks & Systemic Limitations**: What could go wrong or what are the built-in constraints?
6. 🛡️ **Ethical Protocol**: Key ethical considerations (consent, anonymity, harm, power dynamics).
7. 🚫 **Negative Recommendation**: What approach should NOT be chosen and the critical logic behind that exclusion.

Tone: Professional, authoritative, yet encouraging. Ensure the output is formatted in clean Markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
        },
      });

      setAdvice(response.text || "Advice failed to load.");
    } catch (error) {
      console.error("Methodology Advisor Error:", error);
      setAdvice("The advisor core is currently offline. Please check your inputs or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-900/20">
          <Microscope className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Research Methodology Advisor</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          "The method is the path." Align your research design with your questions, skills, and ethical responsibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleAdvise} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Search className="w-3 h-3" /> Research Question(s)
              </label>
              <textarea 
                value={formData.rq}
                onChange={(e) => setFormData({...formData, rq: e.target.value})}
                placeholder="What are you trying to find out?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors h-24 resize-none text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Academic Domain
              </label>
              <input 
                type="text" 
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value})}
                placeholder="e.g. Clinical Psychology, Computer Science"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Database className="w-3 h-3" /> Available Data / Participants
              </label>
              <textarea 
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
                placeholder="What data do you have or can you realistically get?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors h-20 resize-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Wrench className="w-3 h-3" /> Skill Level / Background
              </label>
              <input 
                type="text" 
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="e.g. Proficient in Python, Beginner in Qual coding"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Synthesizing Framework...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Design Methodology
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              METHOD_ARCHITECT_v1.0
            </p>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <Binary className="w-12 h-12 text-emerald-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Mapping Logical Trajectories</h3>
              <p className="text-slate-600 mt-2">Correlating research questions with philosophical frameworks, data collection protocols, and visualization strategies...</p>
            </div>
          ) : advice ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {advice.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-emerald-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.startsWith('🚫') || line.includes('Negative Recommendation')) {
                     return <div key={i} className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl mb-6 mt-8">
                       <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider text-sm">
                         <AlertTriangle className="w-4 h-4" /> Strategic Exclusion
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
                  <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Validity Shield</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">These recommendations prioritize internal validity and peer-review readiness.</p>
                  </div>
                </div>
                <div className="flex-1 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <BarChart3 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Viz Ready</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Apply the suggested visualization roadmap to ensure findings are publishable.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-emerald-600/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <Microscope className="w-6 h-6 text-emerald-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Methodological Rigor</p>
                        <p className="text-xs text-slate-400">Consult with your supervisor to validate the chosen approach for your specific context.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <Microscope className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Methodology Core Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Enter your research question and context to begin the methodological design process.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
