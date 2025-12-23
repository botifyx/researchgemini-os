
import React, { useState } from 'react';
import { Globe, Info, CheckSquare, ShieldCheck, AlertTriangle, ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PUBLISHING_COUNTRY_RULES } from '../../data/publishingCountryRules';
import { IntegrityCallout } from '../../components/IntegrityCallout';

export const CountryRules: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PUBLISHING_COUNTRY_RULES[0].id);

  const activeData = PUBLISHING_COUNTRY_RULES.find(r => r.id === activeTab) || PUBLISHING_COUNTRY_RULES[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 pb-32">
      <div className="mb-10">
        <Link to="/publishing" className="text-blue-500 flex items-center gap-2 text-sm font-bold mb-6 hover:underline uppercase tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Publishing
        </Link>
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-4">
          Country Rules <span className="text-blue-500">Explorer</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Navigating regional norms and institutional variations for doctoral publishing.</p>
      </div>

      <IntegrityCallout />

      {/* Global Disclaimer */}
      <div className="bg-amber-600/5 border border-amber-500/20 p-6 rounded-3xl mb-10 flex gap-4 items-start shadow-sm">
        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-bold italic">
          "Publication requirements vary by university, department, and discipline. ResearchGemini provides guidance based on common academic practices. Always confirm final requirements with your supervisor and official doctoral regulations."
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto no-scrollbar">
        {PUBLISHING_COUNTRY_RULES.map(country => (
          <button
            key={country.id}
            onClick={() => setActiveTab(country.id)}
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
              activeTab === country.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {country.name}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Section 1: Typically Expected */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm group">
          <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Typically Expected
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {activeData.typicallyExpected}
          </p>
        </div>

        {/* Section 2: Variations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-xs font-black text-purple-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Info className="w-4 h-4" /> Regional Variations
          </h3>
          <ul className="space-y-4">
            {activeData.variations.map((v, i) => (
              <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                {v}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Verify Locally */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-inner">
          <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <CheckSquare className="w-4 h-4" /> Verify Locally
          </h3>
          <ul className="space-y-3">
            {activeData.verifyLocally.map((v, i) => (
              <li key={i} className="flex gap-4 items-start p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 italic">"{v}"</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Guidance */}
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-32 h-32 rotate-12" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xs font-black text-blue-200 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> ResearchGemini Guidance
            </h3>
            <p className="text-sm font-bold leading-relaxed italic">
              "{activeData.advisoryGuidance}"
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">
          KNOWLEDGE_REGISTRY_v1.0.4 // REGIONAL_NORMS_ADVISORY
        </p>
      </div>
    </div>
  );
};
