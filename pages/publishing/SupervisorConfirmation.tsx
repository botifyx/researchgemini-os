
import React, { useState, useMemo } from 'react';
import { 
  Mail, 
  ArrowLeft, 
  Copy, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  User,
  Book,
  Hash,
  Briefcase,
  FileText,
  AlertTriangle,
  Zap,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { IntegrityCallout } from '../../components/IntegrityCallout';
import { SUPERVISOR_EMAIL_TEMPLATES, EmailTemplate } from '../../data/supervisorEmailTemplates';
import { fillPlaceholders } from '../../lib/fillPlaceholders';

const CATEGORIES = [
  'Requirements',
  'Decision',
  'Scope',
  'Approval',
  'Rejection',
  'Mapping',
  'Follow-up'
] as const;

export const SupervisorConfirmation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof CATEGORIES[number]>('Requirements');
  const [activeTemplateId, setActiveTemplateId] = useState(SUPERVISOR_EMAIL_TEMPLATES[0].id);
  const [inputs, setInputs] = useState<Record<string, string>>({
    Supervisor_Name: '',
    Your_Name: '',
    Department: '',
    Registration_Number: '',
    Manuscript_Title: '',
    Venue_Name: '',
    Venue_Type: 'Journal',
    Journal_Name: '',
    Research_Topic: '',
    Decision_Type: 'Major Revision',
    Chapter_Number: '',
    Topic_Context: '',
    Original_Date: '',
    Deadline_Date: ''
  });

  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedBoth, setCopiedBoth] = useState(false);

  const activeTemplate = useMemo(() => {
    return SUPERVISOR_EMAIL_TEMPLATES.find(t => t.id === activeTemplateId) || SUPERVISOR_EMAIL_TEMPLATES[0];
  }, [activeTemplateId]);

  const filteredTemplates = useMemo(() => {
    return SUPERVISOR_EMAIL_TEMPLATES.filter(t => t.category === activeTab);
  }, [activeTab]);

  const renderedSubject = useMemo(() => {
    return fillPlaceholders(activeTemplate.subject, inputs);
  }, [activeTemplate, inputs]);

  const renderedBody = useMemo(() => {
    return fillPlaceholders(activeTemplate.body, inputs);
  }, [activeTemplate, inputs]);

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = async (text: string, type: 'subject' | 'body' | 'both') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'subject') {
        setCopiedSubject(true);
        setTimeout(() => setCopiedSubject(false), 2000);
      } else if (type === 'body') {
        setCopiedBody(true);
        setTimeout(() => setCopiedBody(false), 2000);
      } else {
        setCopiedBoth(true);
        setTimeout(() => setCopiedBoth(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const content = `SUBJECT: ${renderedSubject}\n\n${renderedBody}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ResearchGemini_Supervisor_Email_${activeTemplate.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInputs({
      Supervisor_Name: '',
      Your_Name: '',
      Department: '',
      Registration_Number: '',
      Manuscript_Title: '',
      Venue_Name: '',
      Venue_Type: 'Journal',
      Journal_Name: '',
      Research_Topic: '',
      Decision_Type: 'Major Revision',
      Chapter_Number: '',
      Topic_Context: '',
      Original_Date: '',
      Deadline_Date: ''
    });
  };

  return (
    <div className="mx-auto px-4 py-12 pb-32">
      <div className="mb-10">
        <Link to="/publishing" className="text-blue-500 flex items-center gap-2 text-sm font-bold mb-6 hover:underline uppercase tracking-widest transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Publishing
        </Link>
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter mb-4 leading-none">
          Supervisor <span className="text-blue-500">Confirmation Emails</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Copy-ready, respectful emails to confirm publication decisions and requirements.</p>
      </div>

      <IntegrityCallout />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        
        {/* Left: Form Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-3">
                <Zap className="w-5 h-5 text-blue-500" /> Identity Matrix
              </h3>
              <button 
                onClick={handleReset}
                className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset_All
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono flex items-center gap-2">
                  <User className="w-3 h-3" /> Supervisor_Name
                </label>
                <input 
                  type="text" 
                  value={inputs.Supervisor_Name}
                  onChange={(e) => handleInputChange('Supervisor_Name', e.target.value)}
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono flex items-center gap-2">
                  <User className="w-3 h-3" /> Your_Name
                </label>
                <input 
                  type="text" 
                  value={inputs.Your_Name}
                  onChange={(e) => handleInputChange('Your_Name', e.target.value)}
                  placeholder="Your full legal name"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono flex items-center gap-2">
                    <Briefcase className="w-3 h-3" /> Department
                  </label>
                  <input 
                    type="text" 
                    value={inputs.Department}
                    onChange={(e) => handleInputChange('Department', e.target.value)}
                    placeholder="e.g. CS Dept"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 font-mono flex items-center gap-2">
                    <Hash className="w-3 h-3" /> Reg_No
                  </label>
                  <input 
                    type="text" 
                    value={inputs.Registration_Number}
                    onChange={(e) => handleInputChange('Registration_Number', e.target.value)}
                    placeholder="ID Number"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 font-mono">Dynamic_Context</h4>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={inputs.Manuscript_Title}
                    onChange={(e) => handleInputChange('Manuscript_Title', e.target.value)}
                    placeholder="Manuscript / Paper Title"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                  />
                  <input 
                    type="text" 
                    value={inputs.Venue_Name}
                    onChange={(e) => handleInputChange('Venue_Name', e.target.value)}
                    placeholder="Venue (Journal/Conference Name)"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800">
             <AlertTriangle className="w-8 h-8 text-amber-500 mb-4" />
             <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-2">Respectful Note</h4>
             <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
               Templates are guidance only. Supervisor authority and institutional doctoral regulations supersede any structural advice provided here. ResearchGemini does not send emails.
             </p>
          </div>
        </div>

        {/* Right: Template Selector & Preview */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200 dark:border-slate-800">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  const firstOfCat = SUPERVISOR_EMAIL_TEMPLATES.find(t => t.category === cat);
                  if (firstOfCat) setActiveTemplateId(firstOfCat.id);
                }}
                className={`px-6 py-3 rounded-t-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === cat 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-templates selector if multiple exist in category */}
          {filteredTemplates.length > 1 && (
            <div className="flex gap-4">
              {filteredTemplates.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplateId(t.id)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                    activeTemplateId === t.id 
                      ? 'border-blue-500 text-blue-500 bg-blue-500/5' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          )}

          {/* Preview Canvas */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-xl overflow-hidden animate-in fade-in duration-500">
            <div className="bg-slate-50 dark:bg-slate-950 p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 block">Email_Subject</span>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-black text-slate-800 dark:text-slate-200 shadow-inner">
                  {renderedSubject}
                </div>
              </div>
              <button 
                onClick={() => handleCopy(renderedSubject, 'subject')}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-4 rounded-2xl transition-all active:scale-95 text-slate-600 dark:text-slate-400"
                title="Copy Subject"
              >
                {copiedSubject ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <div className="p-8 md:p-12">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4 block">Email_Body_Draft</span>
               <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 font-medium text-slate-700 dark:text-slate-300 leading-relaxed min-h-[300px] whitespace-pre-wrap shadow-inner">
                 {renderedBody}
               </div>

               {activeTemplate.tips && (
                 <div className="mt-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6">
                   <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <Info className="w-3.5 h-3.5" /> Implementation_Tips
                   </h4>
                   <ul className="space-y-2">
                     {activeTemplate.tips.map((tip, i) => (
                       <li key={i} className="text-xs text-slate-500 dark:text-slate-400 flex gap-3 italic">
                         <div className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                         {tip}
                       </li>
                     ))}
                   </ul>
                 </div>
               )}

               <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleCopy(renderedBody, 'body')}
                    className="flex-1 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-black py-6 rounded-[2rem] transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs active:scale-95"
                  >
                    {copiedBody ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    Copy Email Body
                  </button>
                  <button 
                    onClick={() => handleCopy(`Subject: ${renderedSubject}\n\n${renderedBody}`, 'both')}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-[2rem] transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs active:scale-95"
                  >
                    {copiedBoth ? <CheckCircle2 className="w-5 h-5 text-green-300" /> : <Mail className="w-5 h-5" />}
                    Copy Both
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 px-8 rounded-[2rem] transition-all active:scale-95 flex items-center justify-center shadow-sm"
                    title="Download .txt"
                  >
                    <Download className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
