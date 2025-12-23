
import React, { useState } from 'react';
/* Added ChevronRight to the import list to fix the missing component error on line 143 */
import { HelpCircle, Search, ChevronDown, Book, Cpu, ShieldCheck, LifeBuoy, Terminal, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HELP_CATEGORIES = [
  {
    id: 'general',
    title: 'System Overview',
    icon: Cpu,
    items: [
      { q: "What is ResearchGemini OS?", a: "ResearchGemini is an adaptive operating system designed for doctoral and masters scholars. It provides structural guidance, ethical AI support, and technical toolkits to navigate the complex research degree lifecycle." },
      { q: "Is this a replacement for my supervisor?", a: "No. The system is a high-rigor advisory engine. It complements supervisor guidance by providing structural frameworks and logical diagnostics, but institutional regulations and supervisor authority always prevail." },
      { q: "How is my data handled?", a: "We prioritize knowledge integrity and privacy. Your data is stored locally in your browser's encrypted vault. We do not use your research inputs to train commercial AI models." }
    ]
  },
  {
    id: 'engines',
    title: 'Logic Engines',
    icon: Terminal,
    items: [
      { q: "How do I use ResearchGPS?", a: "ResearchGPS is a diagnostic tool. By answering 6-8 questions about your current state, the engine calculates an optimal recovery route, identifying roadblocks and recommending specific sprints." },
      { q: "What makes the Lit Coach 'Ethical'?", a: "The Lit Coach performs structural deconstruction. It identifies a paper's problem space, methodology, and significance. It is locked from generating verbatim summaries to ensure the scholar maintains intellectual ownership." },
      { q: "When should I run a Topic Refinement?", a: "Run the Topic Refiner during Phase 1 (Pre-Admission) or Phase 3 (Topic Selection). It helps identify novelty gaps and feasibility risks before you commit to a trajectory." }
    ]
  },
  {
    id: 'integrity',
    title: 'Guardians & Integrity',
    icon: ShieldCheck,
    items: [
      { q: "How does the Plagiarism Protocol work?", a: "Our drafting tools include built-in checklists for academic honesty. The system is engineered to encourage original intellectual labor by providing structural skeletons rather than full content generation." },
      { q: "Can I report a Predatory Journal?", a: "Yes. Use the Support Terminal (Contact page) to report unsolicited invitations or suspicious publishers. Our Integrity Advisory Board updates the global red-flag criteria based on these inputs." }
    ]
  }
];

export const Help: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredCategories = HELP_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(i => 
      i.q.toLowerCase().includes(search.toLowerCase()) || 
      i.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 pb-32">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
          <HelpCircle className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-4">
          Support <span className="text-blue-500">Registry</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Documentation, manuals, and FAQs for the Research OS ecosystem.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-16 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search documentation nodes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-6 py-4 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {filteredCategories.map(cat => (
            <section key={cat.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3 border-l-4 border-blue-600 pl-4">
                <cat.icon className="w-4 h-4 text-blue-500" /> {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.items.map((item, idx) => {
                  const id = `${cat.id}-${idx}`;
                  const isOpen = openItems.includes(id);
                  return (
                    <div key={id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all">
                      <button 
                        onClick={() => toggleItem(id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left group"
                      >
                        <span className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic border-t border-slate-50 dark:border-slate-800/50 pt-4 animate-in fade-in slide-in-from-top-2">
                          "{item.a}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
               <Terminal className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
               <p className="text-slate-500 font-bold italic">"Query matched zero knowledge nodes. Refine your search parameters."</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/30 group">
             <LifeBuoy className="w-10 h-10 mb-6 text-blue-200" />
             <h4 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Rescue protocol</h4>
             <p className="text-blue-100 text-xs mb-8 font-medium leading-relaxed">Facing acute research stress or a critical technical block? Initiate the recovery mode.</p>
             <Link to="/gps" className="bg-white text-blue-600 font-black py-4 px-6 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
               Start Recalibration <ArrowRight className="w-4 h-4" />
             </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
            <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Book className="w-4 h-4 text-purple-500" /> System Manuals
            </h4>
            <div className="space-y-4">
              {[
                { name: "Engine Logic Guide", path: "/about" },
                { name: "Ethics Manifesto", path: "/ethics" },
                { name: "Integrity Standards", path: "/integrity" }
              ].map(manual => (
                <Link 
                  key={manual.name}
                  to={manual.path}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl group transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 group-hover:text-blue-500 transition-colors">{manual.name}</span>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-inner">
             <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-600 uppercase">System_Status</span>
             </div>
             <div className="space-y-2">
               <div className="flex justify-between text-[9px] font-mono text-slate-500">
                  <span>KERNEL_v1.0.4</span>
                  <span className="text-green-500 font-bold">ONLINE</span>
               </div>
               <div className="flex justify-between text-[9px] font-mono text-slate-500">
                  <span>AI_UPLINK</span>
                  <span className="text-green-500 font-bold">STABLE</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
