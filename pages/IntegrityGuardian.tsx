
import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldAlert, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Scale,
  FileText,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const IntegrityGuardian: React.FC = () => {
  const [taskType, setTaskType] = useState('Writing');
  const [request, setRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;

    setIsLoading(true);
    setReport(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as an expert Academic Integrity Guardian and Ethical Auditor.

Input:
- Task Type: "${taskType}"
- User Request/Intent: "${request}"

Provide a comprehensive ethical audit with these exact sections:
1. 🚩 **Ethical Risks & Red Flags**: Identify potential breaches of academic integrity (e.g., plagiarism, ghostwriting, data falsification, unethical AI use).
2. 🔄 **Reframing & Ethical Recalibration**: If the request is problematic, how should it be reframed to maintain intellectual ownership?
3. 🛠️ **Safe & Ethical Alternatives**: Provide specific, permissible ways to achieve the user's research goal without compromising integrity.
4. 📚 **Relevant Academic Norms**: Cite the universal principles or standard university policies (e.g., COPE, institutional ethics) that govern this specific task.
5. 🛡️ **Integrity Statement**: A short, bold summary of why this task requires the scholar's original intellectual labor.

Tone: Clinical, authoritative, protective, and educational. Use clean Markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.4,
        },
      });

      setReport(response.text || "Auditor was unable to generate a report.");
    } catch (error) {
      console.error("Integrity Guardian Error:", error);
      setReport("The integrity terminal is currently offline. Please review your intent manually against university policy.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-900/20">
          <Fingerprint className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Academic Integrity Guardian</h1>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          "Honor is the scholar's primary currency." Protect your academic reputation by auditing your research intents against ethical standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Input Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleAudit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Scale className="w-3 h-3" /> Task Type
              </label>
              <select 
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-red-500 transition-colors text-sm"
              >
                <option>Writing & Drafting</option>
                <option>Data Collection</option>
                <option>Literature Synthesis</option>
                <option>Analysis & Coding</option>
                <option>AI Tool Usage</option>
                <option>Collaboration & Authorship</option>
                <option>Journal Submission</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <HelpCircle className="w-3 h-3" /> Your Intent / Request
              </label>
              <textarea 
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="e.g. Can I use AI to summarize these 10 papers and include the summary directly in my thesis?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-red-500 transition-colors h-40 resize-none text-sm"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Auditing Ethical intent...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Initiate Ethical Audit
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              GUARDIAN_CORE_v1.0
            </p>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <ShieldAlert className="w-12 h-12 text-red-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Scanning Ethical Boundaries</h3>
              <p className="text-slate-600 mt-2">Checking intent against institutional integrity frameworks and international research standards...</p>
            </div>
          ) : report ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {report.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-red-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.startsWith('🚩') || line.includes('Red Flags')) {
                     return <div key={i} className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl mb-6 mt-8">
                       <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 uppercase tracking-wider text-sm">
                         <AlertTriangle className="w-4 h-4" /> Integrity Warning
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
                  <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Reputation Shield</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">By following these alternatives, you ensure your degree cannot be challenged later.</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Policy Sync</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">Always keep a copy of this audit as documentation of your ethical decision process.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-red-600/10 border border-red-500/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6 text-red-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Supervisor Protocol</p>
                        <p className="text-xs text-slate-400">Not sure about the risk? Share this report with your supervisor for a formal ruling.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <Fingerprint className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Guardian Engine Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Describe your research intent to receive a formal ethical audit from the ROS.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
