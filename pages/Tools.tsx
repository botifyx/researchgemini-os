
import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  Filter,
  Eye,
  CheckCircle2,
  X,
  ShieldAlert,
  FileDown
} from 'lucide-react';
import { Template } from '../types';
import { IntegrityCallout } from '../components/IntegrityCallout';

export const Tools: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesFilter = filter === 'All' || t.phase.includes(filter.toLowerCase().replace(' ', '-'));
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const triggerDownload = (template: Template) => {
    setDownloadingId(template.id);
    
    // Simulate system processing time for UX
    setTimeout(() => {
      const content = `
# RESEARCH_GEMINI_OS // TOOLKIT_EXPORT
# TEMPLATE: ${template.title}
# PHASE: ${template.phase.toUpperCase()}
# FORMAT_TARGET: ${template.type}
# PROTOCOL_ID: ${template.id}

---

## 🎯 STRATEGIC_MISSION (PURPOSE)
${template.purpose}

## 🧭 GUIDELINE_NODE (WHEN_TO_USE)
${template.whenToUse}

## 🏗️ STRUCTURAL_ARCHITECTURE
This ${template.type} file is designed to follow standard peer-review rigor.
Populate the following sections in your draft:

1. Abstract & Novelty Alignment
2. Theoretical Framework Grounding
3. Methodological Justification
4. Data Triangulation Map
5. Contribution Statements (The "So What?" factor)

---
[INTEGRITY_SHIELD_ACTIVE]
Note: This is an architectural framework provided by ResearchGemini OS. 
The intellectual labor of populating these nodes belongs solely to the scholar.
      `.trim();

      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ResearchGemini_${template.id}_Blueprint.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadingId(null);
    }, 800);
  };

  return (
    <div className="mx-auto px-4 py-12 relative">
      <IntegrityCallout />

      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 mt-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" /> Tools & Templates
          </h1>
          <p className="text-slate-400 mt-2">Smart frameworks to accelerate your research workflow.</p>
        </div>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-8 py-2 text-slate-100 focus:outline-none focus:border-blue-500 min-w-[160px]"
            >
              <option>All</option>
              <option>Pre-Admission</option>
              <option>Literature Review</option>
              <option>Methodology</option>
              <option>Submission</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map(template => (
          <div key={template.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                <FileText className="w-6 h-6" />
              </div>
              <span className="bg-slate-950 border border-slate-800 text-xs font-mono px-2 py-1 rounded text-slate-500 uppercase">
                {template.type}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">{template.title}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-1">{template.description}</p>
            
            <div className="space-y-3 mb-8">
              <div className="flex gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-slate-300">Purpose: <span className="text-slate-500 italic">{template.purpose}</span></span>
              </div>
              <div className="flex gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-slate-300">When: <span className="text-slate-500 italic">{template.whenToUse}</span></span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setPreviewTemplate(template)}
                className="flex-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-100 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button 
                onClick={() => triggerDownload(template)}
                disabled={downloadingId === template.id}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-colors"
              >
                {downloadingId === template.id ? (
                  <span className="animate-pulse">Fetching...</span>
                ) : (
                  <><Download className="w-4 h-4" /> Download</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in duration-200">
             <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/10 text-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100">{previewTemplate.title}</h2>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest italic">PREVIEW_MODE</p>
                  </div>
                </div>
                <button onClick={() => setPreviewTemplate(null)} className="p-2 text-slate-400 hover:text-slate-100 transition-colors"><X /></button>
             </div>
             <div className="p-8">
                <div className="mb-8 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
                   <h4 className="text-xs font-mono text-slate-500 uppercase mb-4">Structure Architecture</h4>
                   <div className="space-y-4">
                      <div className="h-4 bg-slate-900 rounded-full w-3/4"></div>
                      <div className="h-4 bg-slate-900 rounded-full w-1/2"></div>
                      <div className="h-4 bg-slate-900 rounded-full w-full"></div>
                      <div className="h-4 bg-slate-900 rounded-full w-2/3"></div>
                      <p className="text-xs text-slate-600 italic text-center py-4 font-mono tracking-widest uppercase">
                        [ SYSTEM_ENCRYPTED_PREVIEW // DOWNLOAD_FOR_FULL_ACCESS ]
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Usage Guidelines</h4>
                      <p className="text-sm text-slate-300 leading-relaxed italic">{previewTemplate.whenToUse}</p>
                   </div>
                   <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Strategic Goal</h4>
                      <p className="text-sm text-slate-300 leading-relaxed italic">{previewTemplate.purpose}</p>
                   </div>
                </div>

                <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20 flex gap-3 mb-8">
                   <ShieldAlert className="w-5 h-5 text-blue-500 flex-shrink-0" />
                   <p className="text-[11px] text-slate-400 italic">This template is a thinking frame. Always customize it based on your specific university requirements and supervisor's unique domain expectations.</p>
                </div>

                <button 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
                  onClick={() => { triggerDownload(previewTemplate); setPreviewTemplate(null); }}
                >
                  <Download className="w-5 h-5" /> Download Blueprint
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
