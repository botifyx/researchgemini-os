
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Scale, 
  Download, 
  Scroll, 
  CheckCircle2, 
  ArrowUp,
  ChevronRight, 
  Menu,
  X,
  Target,
  AlertTriangle,
  ArrowRight,
  FileDown,
  FileText
} from 'lucide-react';
import { SHORT_PLEDGE, MANIFESTO_SECTIONS } from '../data/ethicsManifesto';

export const EthicsManifesto: React.FC = () => {
  const [activeSection, setActiveSection] = useState('pledge');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    document.title = "AI Ethics Manifesto | ResearchGemini OS";
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setIsMobileTocOpen(false);
    setActiveSection(id);
  };

  const handleDownloadPDF = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      const content = `
# RESEARCH_GEMINI_OS // ETHICS_MANIFESTO_EXPORT
# VERSION: 1.0.4-LTS
# STATUS: BINDING_SCHOLAR_PROTOCOL

---

## THE SCHOLAR'S PLEDGE
${SHORT_PLEDGE.map((p, i) => `${i + 1}. ${p}`).join('\n')}

---

${MANIFESTO_SECTIONS.map(s => `
## ${s.title.toUpperCase()}
${s.content.join('\n\n')}
`).join('\n')}

---
[SYSTEM_SIGNED: INTEGRITY_ADVISORY_BOARD]
Date Exported: ${new Date().toLocaleDateString()}
      `.trim();

      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ResearchGemini_Ethics_Manifesto.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1200);
  };

  return (
    <div className="mx-auto px-4 py-16 lg:py-24 relative min-h-screen">
      
      {/* Toast Notification */}
      {showComingSoon && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 dark:bg-slate-800 border border-blue-500/50 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-5 flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">PDF Engine: coming soon</span>
        </div>
      )}

      <div className="lg:hidden fixed bottom-24 left-6 z-50">
        <button 
          onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
          className="bg-slate-900 border border-blue-500/30 p-4 rounded-2xl shadow-2xl text-slate-100 flex items-center gap-2"
        >
          {isMobileTocOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-xs font-black uppercase tracking-widest">Index</span>
        </button>
      </div>

      {isMobileTocOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-md p-6 flex flex-col justify-center animate-in fade-in duration-300">
          <button onClick={() => setIsMobileTocOpen(false)} className="absolute top-8 right-8 text-slate-500 p-2"><X className="w-8 h-8" /></button>
          <div className="space-y-4">
            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-4">Jump to Section</p>
            <button 
                onClick={() => scrollTo('pledge')}
                className={`w-full text-left p-4 rounded-2xl text-xl font-black uppercase tracking-tighter ${activeSection === 'pledge' ? 'bg-blue-600 text-white' : 'text-slate-500 bg-slate-900/50 border border-white/5'}`}
              >
                The Short Pledge
              </button>
            {MANIFESTO_SECTIONS.map(s => (
              <button 
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left p-4 rounded-2xl text-xl font-black uppercase tracking-tighter ${activeSection === s.id ? 'bg-blue-600 text-white' : 'text-slate-500 bg-slate-900/50 border border-white/5'}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-24">
          <section className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-[10px] font-mono mb-8 uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3.5 h-3.5" /> SECURITY_PROTOCOL_04
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-100 mb-8 tracking-tighter uppercase leading-[0.9]">
              The AI <span className="text-blue-500">Ethics</span><br />Manifesto
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
              A declaration of boundaries for high-stakes research intelligence. Engineering trust through radical transparency and human-centric design.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownload}
                disabled={isExporting}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black uppercase tracking-widest text-[10px] px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl shadow-blue-900/20"
              >
                {isExporting ? <span className="animate-pulse">Exporting...</span> : <><FileDown className="w-5 h-5" /> Export .MD</>}
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 font-black uppercase tracking-widest text-[10px] px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-sm"
              >
                <FileText className="w-5 h-5 text-red-500" /> Download as PDF
              </button>
            </div>
          </section>

          <section id="pledge" className="scroll-mt-32">
            <div className="bg-slate-900 border border-slate-800 p-10 md:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Scroll className="w-48 h-48 text-blue-500" />
              </div>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-10 bg-blue-500 rounded-full" />
                    <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter">Scholar's Short Pledge</h2>
                </div>
              </div>
              <div className="space-y-6 font-mono text-sm md:text-base text-slate-300 leading-relaxed border-l-2 border-blue-500/20 pl-8 md:pl-12">
                {SHORT_PLEDGE.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-blue-500/40">{String(i + 1).padStart(2, '0')}.</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="space-y-32">
            {MANIFESTO_SECTIONS.map((section, idx) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 group">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-slate-800">0{idx + 1}</span>
                    <h3 className="text-3xl font-black text-slate-100 uppercase tracking-tighter border-b-4 border-blue-600 pb-2">
                        {section.title}
                    </h3>
                  </div>
                  <button 
                    onClick={scrollToTop}
                    className="flex items-center gap-2 text-[10px] font-mono text-slate-600 hover:text-blue-500 uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ArrowUp className="w-3 h-3" /> Back to top
                  </button>
                </div>
                <div className="space-y-6">
                  {section.content.map((para, pIdx) => (
                    <div key={pIdx} className="flex gap-6 items-start bg-slate-900/30 p-6 rounded-3xl border border-slate-800/50 hover:border-blue-500/20 transition-all">
                        <CheckCircle2 className="w-6 h-6 text-blue-500/50 flex-shrink-0 mt-1" />
                        <p className="text-lg text-slate-400 leading-relaxed">{para}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="bg-red-600/5 border border-red-500/20 p-12 rounded-[3rem] relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/40">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter mb-2">Notice an Integrity Breach?</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    If you observe the platform being misused or have concerns regarding academic integrity, report it to our ethics board immediately.
                  </p>
                </div>
                <Link 
                  to="/contact?type=misuse"
                  className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-900/20"
                >
                  Report a concern <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-32 space-y-12">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Scale className="w-20 h-20 text-blue-500" />
              </div>
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-8 border-b border-slate-800 pb-4">Manifesto Core</h4>
              <nav className="space-y-3">
                <button
                    onClick={() => scrollTo('pledge')}
                    className={`w-full flex items-center justify-between group p-4 rounded-2xl transition-all ${
                      activeSection === 'pledge' 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                        : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-widest">Short Pledge</span>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${activeSection === 'pledge' ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                {MANIFESTO_SECTIONS.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`w-full flex items-center justify-between group p-4 rounded-2xl transition-all ${
                      activeSection === section.id 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' 
                        : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-widest">{section.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${activeSection === section.id ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
