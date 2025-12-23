
import React, { useState, useMemo } from 'react';
import { useProgress } from '../store/useProgress';
import { PHASES } from '../data/phases';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  BarChart3, 
  Calendar, 
  ShieldCheck, 
  FileText,
  Clock,
  Users,
  Plus,
  Trash2,
  CheckSquare,
  Square,
  X,
  ClipboardCheck,
  ChevronDown,
  Navigation,
  Target,
  FlaskConical,
  PenTool,
  ShieldAlert,
  Award,
  ListTodo,
  ExternalLink,
  Save,
  MessageSquare,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { progress, addMeetingNote, deleteMeetingNote, toggleActionItem, updateNextMeetingGoal } = useProgress();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', notes: '', date: new Date().toISOString().split('T')[0] });
  const [newActionItem, setNewActionItem] = useState('');
  const [actionItems, setActionItems] = useState<{id: string, text: string, completed: boolean}[]>([]);
  const [nextGoal, setNextGoal] = useState(progress.nextMeetingGoal || '');

  const currentPhase = PHASES[progress.currentPhaseIndex];
  const completionPercentage = Math.round((progress.completedPhases.length / PHASES.length) * 100);

  const pendingTasks = useMemo(() => {
    return progress.meetingNotes.flatMap(note => 
      note.actionItems.filter(item => !item.completed).map(item => ({
        ...item,
        meetingId: note.id,
        meetingTitle: note.title,
        meetingDate: note.date
      }))
    );
  }, [progress.meetingNotes]);

  const handleAddActionItem = () => {
    if (!newActionItem.trim()) return;
    setActionItems([...actionItems, { id: crypto.randomUUID(), text: newActionItem, completed: false }]);
    setNewActionItem('');
  };

  const handleRemoveDraftActionItem = (id: string) => {
    setActionItems(actionItems.filter(item => item.id !== id));
  };

  const handleSaveNote = () => {
    if (!newNote.title.trim()) return;
    addMeetingNote({
      title: newNote.title,
      notes: newNote.notes,
      date: newNote.date,
      actionItems: actionItems
    });
    setNewNote({ title: '', notes: '', date: new Date().toISOString().split('T')[0] });
    setActionItems([]);
    setIsAddingNote(false);
  };

  const handleUpdateNextGoal = () => {
    updateNextMeetingGoal(nextGoal);
  };

  const getNoteProgress = (note: any) => {
    if (!note.actionItems || note.actionItems.length === 0) return null;
    const completed = note.actionItems.filter((i: any) => i.completed).length;
    const total = note.actionItems.length;
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  const getActionLink = (action: string) => {
    const lower = action.toLowerCase();
    if (lower.includes('supervisor')) return '/publishing/supervisor-confirmation';
    if (lower.includes('ethics') || lower.includes('eligibility')) return '/integrity';
    if (lower.includes('topic') || lower.includes('abstract') || lower.includes('problem')) return '/refiner';
    if (lower.includes('literature') || lower.includes('review') || lower.includes('author')) return '/lit-coach';
    if (lower.includes('method') || lower.includes('design')) return '/methodology';
    if (lower.includes('viva')) return '/viva-simulator';
    if (lower.includes('write') || lower.includes('draft')) return '/writing-coach';
    if (lower.includes('publish') || lower.includes('journal')) return '/publishing-advisor';
    if (lower.includes('gps')) return '/gps';
    return '/journey';
  };

  const getActionIcon = (action: string) => {
    const lower = action.toLowerCase();
    if (lower.includes('supervisor')) return Mail;
    if (lower.includes('ethics')) return ShieldAlert;
    if (lower.includes('topic') || lower.includes('problem')) return Target;
    if (lower.includes('literature') || lower.includes('review')) return FlaskConical;
    if (lower.includes('write') || lower.includes('draft')) return PenTool;
    if (lower.includes('viva')) return Award;
    if (lower.includes('gps')) return Navigation;
    return Circle;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Scholar Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back. Your research system is nominal.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-blue-500 flex items-center justify-center text-xs font-black text-blue-600 dark:text-blue-400">
              {completionPercentage}%
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Journey_Map</p>
              <p className="text-slate-900 dark:text-slate-100 font-black text-sm">{progress.completedPhases.length}/8 Phases</p>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
          <div className="hidden sm:flex items-center gap-3">
            <Clock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-widest">Last_Sync</p>
              <p className="text-slate-900 dark:text-slate-100 font-black text-sm">{new Date(progress.lastActive).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20 group">
            <div className="bg-blue-500/5 dark:bg-blue-600/10 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                <h2 className="font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Active Focus: {currentPhase.title}</h2>
              </div>
              <Link to={`/journey`} className="text-[10px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-black font-mono flex items-center gap-1 uppercase tracking-widest transition-all hover:gap-2">
                System_Map <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-8 md:p-10">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-bold">Lifecycle Completion</span>
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-500 font-black">{completionPercentage}%</span>
                </div>
                <div className="flex gap-1.5 h-2">
                  {PHASES.map((p, idx) => {
                    const isDone = progress.completedPhases.includes(p.slug);
                    const isCurrent = idx === progress.currentPhaseIndex;
                    return (
                      <div 
                        key={p.slug} 
                        className={`flex-1 rounded-full transition-all duration-700 ${
                          isDone ? 'bg-blue-600' : isCurrent ? 'bg-blue-400 animate-pulse' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl font-medium">
                {currentPhase.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6 font-black">Priority Action Node</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPhase.quickActions.map((action, i) => {
                    const Icon = getActionIcon(action);
                    return (
                      <Link 
                        key={i} 
                        to={getActionLink(action)}
                        className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl group/item hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover/item:bg-blue-600 group-hover/item:border-blue-500 transition-all shadow-sm">
                            <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover/item:text-white" />
                          </div>
                          <span className="text-sm font-black text-slate-800 dark:text-slate-200 group-hover/item:text-slate-950 dark:group-hover/item:text-white uppercase tracking-tight transition-colors">{action}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-500 group-hover/item:translate-x-1 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <div className="bg-purple-500/5 dark:bg-purple-600/10 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-500" />
                <h2 className="font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Collaboration Hub</h2>
              </div>
              <button 
                onClick={() => setIsAddingNote(!isAddingNote)}
                className={`text-[10px] font-black px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all uppercase tracking-widest border ${
                  isAddingNote 
                    ? 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700' 
                    : 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-900/20 hover:scale-105 active:scale-95'
                }`}
              >
                {isAddingNote ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {isAddingNote ? 'Cancel' : 'Log Meeting'}
              </button>
            </div>
            
            <div className="p-8 md:p-10">
              <div className="mb-10 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
                <label className="text-[10px] font-mono text-purple-600 dark:text-purple-500 uppercase tracking-[0.3em] mb-4 block flex items-center gap-2 font-black">
                  <Target className="w-3.5 h-3.5" /> Next session Agenda
                </label>
                <div className="flex gap-3">
                  <input 
                    type="text"
                    value={nextGoal}
                    onChange={(e) => setNextGoal(e.target.value)}
                    onBlur={handleUpdateNextGoal}
                    placeholder="E.g. Finalize Chapter 3 draft feedback..."
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 transition-all shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                  <button 
                    onClick={handleUpdateNextGoal}
                    className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500 transition-all shadow-sm group"
                    title="Save Agenda"
                  >
                    <Save className="w-5 h-5 group-hover:scale-110" />
                  </button>
                </div>
              </div>

              {isAddingNote && (
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl relative z-10">
                  <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <ClipboardCheck className="w-5 h-5 text-purple-600 dark:text-purple-500" /> New Meeting Entry
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest ml-1">Meeting Header</label>
                       <input 
                        type="text" 
                        placeholder="e.g. Progress Review"
                        value={newNote.title}
                        onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 transition-all text-sm shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest ml-1">Calendar Date</label>
                       <input 
                        type="date" 
                        value={newNote.date}
                        onChange={(e) => setNewNote({...newNote, date: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 transition-all text-sm shadow-inner"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest ml-1">Discussion Payload</label>
                    <textarea 
                      placeholder="Key discussion points..."
                      value={newNote.notes}
                      onChange={(e) => setNewNote({...newNote, notes: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 h-28 mb-6 resize-none text-sm shadow-inner"
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase block mb-4 flex items-center gap-2 tracking-[0.2em]">
                      Action Items <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">{actionItems.length}</span>
                    </label>
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        placeholder="Define a specific task..."
                        value={newActionItem}
                        onChange={(e) => setNewActionItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddActionItem())}
                        className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-500 text-sm shadow-inner"
                      />
                      <button 
                        onClick={handleAddActionItem}
                        disabled={!newActionItem.trim()}
                        className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white px-5 rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-900/20"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {actionItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between group bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800/50">
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{item.text}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveDraftActionItem(item.id)}
                            className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSaveNote}
                    disabled={!newNote.title.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-purple-900/30 active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
                  >
                    Transmit Log to OS
                  </button>
                </div>
              )}

              {pendingTasks.length > 0 && (
                <div className="mb-12 animate-in fade-in duration-500">
                   <div className="flex items-center justify-between mb-6">
                      <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-purple-500" /> Pending Action Matrix
                      </h3>
                      <span className="text-[9px] bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 font-black uppercase">
                        {pendingTasks.length} Open_Tasks
                      </span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pendingTasks.map(item => (
                        <button 
                          key={item.id}
                          onClick={() => toggleActionItem(item.meetingId, item.id)}
                          className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-purple-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all text-left group shadow-sm active:scale-[0.98]"
                        >
                          <Square className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-purple-500 mt-0.5 flex-shrink-0 transition-colors" />
                          <div>
                            <p className="text-sm font-black text-slate-800 dark:text-slate-200 leading-snug tracking-tight transition-colors">{item.text}</p>
                            <div className="flex items-center gap-2 mt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                               <MessageSquare className="w-3 h-3 text-purple-400" />
                               <span className="text-[9px] font-mono uppercase tracking-tighter text-slate-500 dark:text-slate-400 font-bold">{item.meetingTitle} • {item.meetingDate}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                   </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                   <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex-shrink-0">Chronological Archive</h3>
                   <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                </div>
                {progress.meetingNotes.length > 0 ? (
                  progress.meetingNotes.map(note => {
                    const stats = getNoteProgress(note);
                    return (
                      <div key={note.id} className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 group transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[9px] font-mono font-black text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 uppercase tracking-widest">
                                {note.date}
                              </span>
                              {stats && (
                                <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                                  stats.percentage === 100 ? 'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border-slate-300 dark:border-slate-700'
                                }`}>
                                  {stats.completed}/{stats.total} Tasks_Done
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">{note.title}</h3>
                          </div>
                          <button 
                            onClick={() => deleteMeetingNote(note.id)}
                            className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                            title="Purge Log Entry"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {note.notes && <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed italic border-l-4 border-purple-500/20 pl-6 py-1 font-medium">"{note.notes}"</p>}
                        
                        {note.actionItems && note.actionItems.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between mb-4">
                              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Contextual Tasks</p>
                              {stats && (
                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-600 dark:bg-purple-500 transition-all duration-700" 
                                    style={{ width: `${stats.percentage}%` }}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {note.actionItems.map(item => (
                                <button 
                                  key={item.id}
                                  onClick={() => toggleActionItem(note.id, item.id)}
                                  className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left group/item active:scale-95 ${
                                    item.completed 
                                      ? 'bg-slate-100 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 shadow-inner' 
                                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-500/50 shadow-sm'
                                  }`}
                                >
                                  {item.completed ? (
                                    <CheckSquare className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover/item:text-purple-500 flex-shrink-0 transition-colors" />
                                  )}
                                  <span className={`text-xs font-bold leading-tight tracking-tight ${item.completed ? 'line-through opacity-50' : ''}`}>
                                    {item.text}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] bg-slate-50/50 dark:bg-slate-950/20">
                    <Users className="w-16 h-16 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-xs">Zero Collaboration Logs Detected</p>
                    <p className="text-slate-500 dark:text-slate-600 text-xs mt-2 italic">Start tracking your collaborative progress with supervisors to build your evidence portfolio.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <h3 className="text-slate-900 dark:text-slate-100 font-black mb-8 flex items-center gap-3 uppercase tracking-tighter text-lg">
              <Calendar className="w-5 h-5 text-slate-400 dark:text-slate-500" /> Journey Pulse
            </h3>
            <div className="space-y-5 relative">
              <div className="absolute left-[15px] top-3 bottom-3 w-px bg-slate-100 dark:bg-slate-800"></div>
              {PHASES.map((phase, idx) => {
                const isCurrent = idx === progress.currentPhaseIndex;
                const isDone = progress.completedPhases.includes(phase.slug);
                return (
                  <div key={phase.slug} className="flex items-start gap-4 relative z-10">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      isDone 
                        ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-900/20' 
                        : isCurrent 
                          ? 'bg-white dark:bg-slate-900 border-blue-500 text-blue-600 dark:text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5 text-white" /> : <span className="text-[10px] font-black font-mono">{idx + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[11px] font-black uppercase tracking-widest leading-none mt-2 ${isCurrent ? 'text-blue-600 dark:text-blue-400' : isDone ? 'text-slate-800 dark:text-slate-200' : 'text-slate-300 dark:text-slate-600'}`}>
                        {phase.title}
                      </p>
                      {isCurrent && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                           <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
                           <span className="text-[8px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono">Active_Focus</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20">
              <h3 className="text-slate-900 dark:text-slate-100 font-black mb-6 flex items-center gap-3 uppercase tracking-tighter text-lg">
                <FileText className="w-5 h-5 text-slate-400 dark:text-slate-500" /> Audit History
              </h3>
              <div className="space-y-3">
                {Object.entries(progress.scorecardHistory).length > 0 ? (
                  Object.entries(progress.scorecardHistory).map(([id, score]) => (
                    <div key={id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest capitalize">{id.replace('-', ' ')}</span>
                      <span className={`font-mono font-black text-sm ${(score as number) > 70 ? 'text-green-600' : 'text-yellow-600 dark:text-yellow-500'}`}>{(score as number)}%</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 dark:text-slate-500 text-xs py-6 italic font-medium text-center">No structural evaluations logged.</p>
                )}
                <Link to="/scorecards" className="group block text-center text-[10px] text-blue-600 dark:text-blue-400 mt-6 font-black uppercase tracking-[0.2em] hover:underline transition-all">
                  Run_New_Evaluation <ArrowRight className="inline-block w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
          </div>

          <div className="bg-blue-600 p-10 rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-blue-900/40">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <h3 className="text-white font-black text-2xl mb-3 uppercase tracking-tighter">Research Recovery</h3>
            <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium">If you're facing a mental block or technical drift, use the GPS to recalibrate your trajectory immediately.</p>
            <Link to="/gps" className="bg-white text-blue-600 font-black py-4 px-8 rounded-2xl text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:bg-slate-50 transition-all hover:gap-3 active:scale-95 shadow-xl">
              Launch GPS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-inner transition-colors duration-300">
             <ShieldCheck className="w-8 h-8 text-slate-400 dark:text-slate-700 mb-4" />
             <p className="text-[10px] text-slate-500 dark:text-slate-600 font-mono uppercase leading-relaxed tracking-widest font-bold">
               Protocol Update: Collaboration logs are processed locally. Use these encrypted records to build your candidacy confirmation and annual progress reports for your host institution.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
