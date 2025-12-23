
import React from 'react';
import { ShieldCheck, Cpu, Target, Users, Sparkles, Database, Navigation, Fingerprint, Search, ArrowDown } from 'lucide-react';

export const About: React.FC = () => {
  const pipelineSteps = [
    { name: "Context Initializer", icon: Database, desc: "Aggregates scholar domain, phase, and stress metrics.", color: "text-blue-500" },
    { name: "Prompt Router", icon: Navigation, desc: "Directs request to the optimized phase-specific instruction set.", color: "text-purple-500" },
    { name: "Prompt Pack Execution", icon: Cpu, desc: "Executes LLM logic via Gemini-3-Pro-Preview high-rigor core.", color: "text-yellow-500" },
    { name: "Response Validator", icon: Fingerprint, desc: "Filters for academic integrity, ethics, and clarity norms.", color: "text-red-500" },
    { name: "Scholar-friendly Output", icon: Sparkles, desc: "Renders validated, high-impact guidance for immediate action.", color: "text-green-500" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-6 tracking-tight">The Research OS Philosophy</h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          ResearchGemini is not just a website; it's a cognitive architecture designed to support the modern scholar through the most challenging years of their life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-500 flex items-center gap-2">
            <Cpu className="w-6 h-6" /> Why Research OS?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Academic research is plagued by isolation, vague guidance, and systemic anxiety. Research OS provides a structured, digital backbone to the research lifecycle—transforming nebulous goals into actionable, validated steps.
          </p>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-slate-100 font-bold mb-2">Our Mission</h4>
            <p className="text-sm text-slate-400">To reduce PhD failure rates by 30% through adaptive navigation, integrity-first AI support, and real-time stress management.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: ShieldCheck, label: "Ethical Core", color: "text-green-500" },
            { icon: Target, label: "Gap-Focused", color: "text-blue-500" },
            { icon: Users, label: "Peer Validated", color: "text-purple-500" },
            { icon: Sparkles, label: "AI Integrated", color: "text-yellow-500" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
              <span className="text-slate-100 font-semibold text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic Architecture Section */}
      <section className="mb-24 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Research AI Intelligence Pipeline</h2>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">System Architecture Blueprint</p>
        </div>

        <div className="relative space-y-4">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-green-500/50 hidden md:block border-dashed border-l border-slate-800"></div>
          
          {pipelineSteps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full hover:border-blue-500/50 transition-all shadow-xl group-hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:border-blue-500 transition-colors`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div>
                    <h3 className="text-slate-100 font-bold text-sm uppercase font-mono">{step.name}</h3>
                    <span className="text-[10px] text-slate-600 font-mono">NODE_0{idx + 1}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
              {idx < pipelineSteps.length - 1 && (
                <div className="md:hidden flex flex-col items-center py-4">
                  <ArrowDown className="w-5 h-5 text-slate-700" />
                </div>
              )}
              {idx < pipelineSteps.length - 1 && (
                <div className="hidden md:block h-8"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-10 mb-16">
        <h3 className="text-2xl font-bold text-slate-100 mb-6 text-center">Development Roadmap</h3>
        <div className="space-y-6 max-w-xl mx-auto">
          {[
            { phase: "v1.0 - Genesis", status: "Active", desc: "Core lifecycle mapping and AI diagnostic tools." },
            { phase: "v1.5 - Synthesis", status: "Coming Soon", desc: "Automated Literature Matrix generator and citation health checks." },
            { phase: "v2.0 - Community", status: "Planned", desc: "Decentralized scholar-to-scholar mentorship network." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="text-slate-100 font-bold text-sm uppercase flex items-center gap-2">
                  {item.phase} <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-500'}`}>{item.status}</span>
                </h4>
                <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center text-slate-500 text-xs font-mono uppercase tracking-widest">
        BUILD_FOR_KNOWLEDGE_INTEGRITY // VERSION_1.0.4
      </div>
    </div>
  );
};
