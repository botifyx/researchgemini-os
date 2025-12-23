
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PHASES } from '../data/phases';
import { TEMPLATES } from '../data/templates';
import { useProgress } from '../store/useProgress';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Wrench, 
  PlayCircle,
  Map,
  ArrowRight,
  ShieldCheck,
  Circle,
  Download,
  Eye,
  X,
  FileText,
  ShieldAlert,
  Search,
  FileSpreadsheet,
  FileCode,
  File as FileIcon,
  Fingerprint,
  Cpu,
  Terminal,
  Target,
  FlaskConical,
  PenTool,
  Globe,
  Gavel,
  Scale,
  Navigation,
  Loader2,
  Mail,
  ClipboardCheck,
  Microscope,
  LineChart,
  Award,
  History,
  Book
} from 'lucide-react';
import { PhaseSlug, Template } from '../types';
import { IntegrityCallout } from '../components/IntegrityCallout';

const StatusBadge: React.FC<{ status: 'Completed' | 'Active' | 'Upcoming' }> = ({ status }) => {
  const styles = {
    Completed: "bg-green-500/10 text-green-500 border-green-500/20",
    Active: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Upcoming: "bg-slate-800/50 text-slate-500 border-slate-700"
  };

  const icons = {
    Completed: <CheckCircle2 className="w-3 h-3" />,
    Active: <PlayCircle className="w-3 h-3" />,
    Upcoming: <Circle className="w-3 h-3" />
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${styles[status]}`}>
      {icons[status]} {status.toUpperCase()}
    </span>
  );
};

const FileTypeIcon: React.FC<{ type: Template['type'] }> = ({ type }) => {
  switch (type) {
    case 'PDF':
      return <FileText className="w-6 h-6 text-red-500" />;
    case 'DOCX':
      return <FileText className="w-6 h-6 text-blue-500" />;
    case 'XLSX':
      return <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
    case 'Markdown':
      return <FileCode className="w-6 h-6 text-purple-500" />;
    default:
      return <FileIcon className="w-6 h-6 text-slate-400" />;
  }
};

export const ResearchJourney: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { progress, updatePhase, markPhaseComplete } = useProgress();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [actionPulseId, setActionPulseId] = useState<string | null>(null);

  const currentIndex = slug 
    ? PHASES.findIndex(p => p.slug === slug) 
    : progress.currentPhaseIndex;

  const currentPhase = useMemo(() => PHASES[currentIndex], [currentIndex]);

  useEffect(() => {
    if (!slug || currentIndex === -1) {
      const targetSlug = PHASES[progress.currentPhaseIndex]?.slug || PHASES[0].slug;
      navigate(`/journey/${targetSlug}`, { replace: true });
    }
  }, [slug, currentIndex, progress.currentPhaseIndex, navigate]);

  const toolkitTemplates = useMemo(() => {
    if (!currentPhase) return [];
    return currentPhase.toolkits.map(toolkitTitle => 
      TEMPLATES.find(t => t.title === toolkitTitle)
    ).filter((t): t is Template => !!t);
  }, [currentPhase]);

  if (currentIndex === -1 || !currentPhase) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PHASES.length - 1;

  const getPhaseStatus = (idx: number) => {
    const p = PHASES[idx];
    if (progress.completedPhases.includes(p.slug)) return 'Completed';
    if (idx === progress.currentPhaseIndex) return 'Active';
    return 'Upcoming';
  };

  const handleNext = () => {
    if (!isLast) {
      const nextSlug = PHASES[currentIndex + 1].slug;
      navigate(`/journey/${nextSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevSlug = PHASES[currentIndex - 1].slug;
      navigate(`/journey/${prevSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSetCurrent = () => {
    updatePhase(currentIndex);
  };

  const triggerDownload = (template: Template) => {
    setDownloadingId(template.id);
    setTimeout(() => {
      const content = `
# RESEARCH_GEMINI_OS // TOOLKIT_EXPORT
# TEMPLATE: ${template.title}
# PHASE: ${template.phase.toUpperCase()}
# PROTOCOL: ${template.id}

---

## MISSION
${template.purpose}

## USAGE_GUIDELINE
${template.whenToUse}

## CORE_FRAMEWORK
- Critical Path Identification
- Novelty Mapping
- Methodological Rigor Audit
- Ethical Boundary Check
- Supervisory Alignment Node

---
[INTEGRITY_SECURE]
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
    }, 600);
  };

  // Logic mapping for quick actions
  const getActionMetadata = (action: string) => {
    const lower = action.toLowerCase();
    
    // Phase 1 Mappings
    if (lower.includes('supervisor') && lower.includes('find')) return { type: 'link', path: '/journey/pre-admission', icon: Target };
    if (lower.includes('eligibility')) return { type: 'link', path: '/integrity', icon: ShieldCheck };
    if (lower.includes('refine research proposal')) return { type: 'link', path: '/refiner', icon: Target };
    
    // Phase 2 Mappings
    if (lower.includes('reference manager')) return { type: 'link', path: '/tools', icon: Wrench };
    if (lower.includes('regulations')) return { type: 'link', path: '/publishing/country-rules', icon: Globe };
    if (lower.includes('log') && lower.includes('meeting')) return { type: 'link', path: '/dashboard', icon: History };
    
    // Phase 3 Mappings
    if (lower.includes('refine topic')) return { type: 'link', path: '/refiner', icon: Target };
    if (lower.includes('feasibility audit')) return { type: 'link', path: '/scorecards', icon: ClipboardCheck };
    if (lower.includes('recent reviews')) return { type: 'link', path: '/lit-coach', icon: FlaskConical };

    // Phase 4 Mappings
    if (lower.includes('analyze') && lower.includes('abstract')) return { type: 'link', path: '/lit-coach', icon: FlaskConical };
    if (lower.includes('core authors')) return { type: 'link', path: '/lit-coach', icon: Book };
    if (lower.includes('lit readiness')) return { type: 'link', path: '/scorecards', icon: ClipboardCheck };
    
    // Phase 5 Mappings
    if (lower.includes('select') && lower.includes('method')) return { type: 'link', path: '/methodology', icon: Microscope };
    if (lower.includes('ethics protocol')) return { type: 'link', path: '/integrity', icon: ShieldAlert };
    if (lower.includes('design rigor')) return { type: 'link', path: '/scorecards', icon: ClipboardCheck };
    
    // Phase 6 Mappings
    if (lower.includes('interpret') && lower.includes('results')) return { type: 'link', path: '/results-interpreter', icon: LineChart };
    if (lower.includes('recalibrate')) return { type: 'link', path: '/gps', icon: Navigation };
    if (lower.includes('implementation log')) return { type: 'link', path: '/dashboard', icon: History };
    
    // Phase 7 Mappings
    if (lower.includes('architect') && lower.includes('chapter')) return { type: 'link', path: '/writing-coach', icon: PenTool };
    if (lower.includes('shield') && lower.includes('predatory')) return { type: 'link', path: '/integrity', icon: ShieldAlert };
    if (lower.includes('draft supervisor email')) return { type: 'link', path: '/publishing/supervisor-confirmation', icon: Mail };
    
    // Phase 8 Mappings
    if (lower.includes('mock viva')) return { type: 'link', path: '/viva-simulator', icon: Award };
    if (lower.includes('examiner simulator')) return { type: 'link', path: '/examiner-simulator', icon: Gavel };
    if (lower.includes('thesis readiness')) return { type: 'link', path: '/scorecards', icon: ClipboardCheck };

    // Default Actionable Button
    return { type: 'button', icon: Terminal };
  };

  const handleActionClick = (action: string) => {
    setActionPulseId(action);
    setTimeout(() => setActionPulseId(null), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3 tracking-tighter uppercase text-center md:text-left">
              <Map className="w-8 h-8 text-blue-500" /> Research Journey Map
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-center md:text-left italic">"Navigating the standard doctoral lifecycle with clinical precision."</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {PHASES.map((p, idx) => (
              <button
                key={p.slug}
                onClick={() => navigate(`/journey/${p.slug}`)}
                className={`flex flex-col items-center gap-1 group transition-all ${
                  idx === currentIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <div className={`w-8 h-1 rounded-full ${
                  getPhaseStatus(idx) === 'Completed' ? 'bg-green-500' : 
                  getPhaseStatus(idx) === 'Active' ? 'bg-blue-500' : 'bg-slate-700'
                }`} />
                <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-slate-300">P{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
          {PHASES.map((p, idx) => (
            <button
              key={p.slug}
              onClick={() => navigate(`/journey/${p.slug}`)}
              className={`flex-shrink-0 min-w-[180px] p-4 rounded-2xl border text-left transition-all ${
                idx === currentIndex 
                  ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-900/10' 
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Phase {idx + 1}</span>
                <StatusBadge status={getPhaseStatus(idx)} />
              </div>
              <h3 className={`text-sm font-black uppercase tracking-tight truncate ${idx === currentIndex ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}>
                {p.title}
              </h3>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-3xl mb-8 shadow-lg">
        <button 
          onClick={handlePrev}
          disabled={isFirst}
          className="flex items-center gap-2 px-6 py-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        
        <div className="flex flex-col items-center gap-1">
          <StatusBadge status={getPhaseStatus(currentIndex)} />
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter text-center">{currentPhase.title}</h2>
        </div>

        <button 
          onClick={handleNext}
          disabled={isLast}
          className="flex items-center gap-2 px-6 py-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-sm transition-colors duration-300">
            <h3 className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase mb-4 tracking-[0.3em] font-black italic border-l-2 border-blue-600 pl-4">Strategic Objective</h3>
            <p className="text-xl text-slate-800 dark:text-slate-200 leading-relaxed mb-10 font-medium italic">
              "{currentPhase.description}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-slate-900 dark:text-slate-100 font-black mb-6 flex items-center gap-2 text-xs uppercase tracking-widest">
                  <AlertCircle className="w-4 h-4 text-red-500" /> Typical Roadblocks
                </h4>
                <ul className="space-y-4">
                  {currentPhase.problems.map((prob, i) => (
                    <li key={i} className="flex gap-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/30 mt-1.5 flex-shrink-0" />
                      {prob}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-slate-100 font-black mb-6 flex items-center gap-2 text-xs uppercase tracking-widest">
                  <Lightbulb className="w-4 h-4 text-yellow-500" /> Resolution Logic
                </h4>
                <ul className="space-y-4">
                  {currentPhase.solutions.map((sol, i) => (
                    <li key={i} className="flex gap-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm overflow-hidden relative transition-colors duration-300">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <Wrench className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-100 font-black text-xs uppercase tracking-widest leading-none">Phase Toolkits</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">Secure_Asset_Registry</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 relative z-10">
              {toolkitTemplates.length > 0 ? (
                toolkitTemplates.map((template, idx) => (
                  <div 
                    key={template.id} 
                    className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div 
                      className="flex items-center gap-6 cursor-pointer flex-1"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <div className="w-14 h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-blue-500/50 group-hover:scale-105 transition-all flex-shrink-0">
                        <FileTypeIcon type={template.type} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[8px] font-mono font-black text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 uppercase tracking-widest">{template.type}</span>
                          <span className="text-[8px] font-mono font-black text-blue-600 dark:text-blue-500 uppercase tracking-tighter">#{template.id}</span>
                          <h5 className="text-slate-900 dark:text-slate-100 font-black text-sm uppercase tracking-tight truncate">{template.title}</h5>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 font-medium line-clamp-1 italic leading-relaxed pr-4">
                          "{template.description}"
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                      <button 
                        onClick={() => setPreviewTemplate(template)}
                        className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </button>
                      <button 
                        onClick={() => triggerDownload(template)}
                        disabled={downloadingId === template.id}
                        className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/30 active:scale-95 group/btn"
                      >
                        {downloadingId === template.id ? (
                          <Terminal className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <><Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" /> Acquire</>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center bg-slate-50 dark:bg-slate-950/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <Wrench className="w-10 h-10 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-[0.2em] font-black">Zero specialized toolkits mapped to this focus node.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 border border-blue-500 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/30 group">
            <h4 className="font-black text-xl mb-3 uppercase tracking-tighter leading-none">Lifecycle Pilot</h4>
            <p className="text-blue-100 text-sm mb-8 font-medium leading-relaxed italic">Synchronize your local progress with the Research OS core engine.</p>
            
            <div className="space-y-4">
              <button 
                onClick={handleSetCurrent}
                disabled={getPhaseStatus(currentIndex) === 'Active'}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all ${
                  getPhaseStatus(currentIndex) === 'Active' 
                    ? 'bg-blue-700/50 text-blue-300 cursor-not-allowed border border-blue-400/20 shadow-inner' 
                    : 'bg-white text-blue-600 hover:scale-105 shadow-xl'
                }`}
              >
                {getPhaseStatus(currentIndex) === 'Active' ? 'Focus Synchronized' : 'Activate Focal Node'}
              </button>
              
              <button 
                onClick={() => markPhaseComplete(currentPhase.slug)}
                disabled={getPhaseStatus(currentIndex) === 'Completed'}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all border ${
                  getPhaseStatus(currentIndex) === 'Completed' 
                    ? 'bg-green-600 border-green-500 text-white cursor-not-allowed shadow-inner' 
                    : 'bg-blue-500/50 border-blue-400 hover:bg-blue-500 active:scale-95'
                }`}
              >
                {getPhaseStatus(currentIndex) === 'Completed' ? <><CheckCircle2 className="w-4 h-4" /> Phase Sealed</> : 'Verify Completion'}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            <h4 className="text-slate-900 dark:text-slate-100 font-black mb-6 flex items-center gap-3 text-xs uppercase tracking-widest">
              <PlayCircle className="w-4 h-4 text-blue-500" /> Local SOPs & Actions
            </h4>
            <div className="space-y-3">
              {currentPhase.quickActions.map((action, i) => {
                const metadata = getActionMetadata(action);
                const Icon = metadata.icon;
                const isPulsing = actionPulseId === action;

                if (metadata.type === 'link') {
                  return (
                    <Link 
                      key={i} 
                      to={metadata.path!}
                      className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl group hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all shadow-sm">
                          <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white" />
                        </div>
                        <span className="text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white uppercase tracking-tight transition-colors">{action}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                }

                return (
                  <button 
                    key={i} 
                    onClick={() => handleActionClick(action)}
                    className={`w-full flex items-center justify-between p-5 border rounded-2xl group transition-all duration-300 shadow-sm ${
                      isPulsing ? 'bg-green-500/10 border-green-500/50' : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all shadow-sm ${
                        isPulsing ? 'bg-green-600 border-green-500' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:bg-blue-600 group-hover:border-blue-500'
                      }`}>
                        {isPulsing ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white" />}
                      </div>
                      <span className={`text-sm font-black uppercase tracking-tight transition-colors ${
                        isPulsing ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-950 dark:group-hover:text-white'
                      }`}>{isPulsing ? 'PROTOCOL_INITIATED' : action}</span>
                    </div>
                    {isPulsing ? <Loader2 className="w-4 h-4 text-green-500 animate-spin" /> : <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in zoom-in duration-200">
             <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                    <FileTypeIcon type={previewTemplate.type} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{previewTemplate.title}</h2>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-[0.2em] font-black italic">{previewTemplate.type}_MODULE_PREVIEW</p>
                  </div>
                </div>
                <button onClick={() => setPreviewTemplate(null)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-100 transition-colors"><X /></button>
             </div>
             <div className="p-10">
                <div className="mb-10 p-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] relative overflow-hidden shadow-inner">
                   <h4 className="text-[9px] font-mono text-slate-400 dark:text-slate-600 uppercase mb-8 tracking-[0.3em] font-black">Structural Architecture</h4>
                   <div className="space-y-6 text-center py-10">
                      <p className="text-[10px] text-slate-400 dark:text-slate-600 italic font-mono tracking-widest uppercase font-black">
                        [ SYSTEM_ENCRYPTED_PREVIEW // DOWNLOAD_FOR_FULL_ACCESS ]
                      </p>
                   </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-900/30 uppercase tracking-[0.2em] text-[10px]"
                    onClick={() => { triggerDownload(previewTemplate); setPreviewTemplate(null); }}
                  >
                    <Download className="w-4 h-4" /> Download Blueprint
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
