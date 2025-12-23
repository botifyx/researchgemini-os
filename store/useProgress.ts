
import { useState, useEffect } from 'react';
import { UserProgress, ResearchContext, MeetingNote, ActionItem } from '../types';

const STORAGE_KEY = 'research_gemini_progress';

const DEFAULT_CONTEXT: ResearchContext = {
  domain: '',
  region: '',
  degree: 'PhD',
  goal: '',
  stressLevel: 'Medium'
};

const DEFAULT_PROGRESS: UserProgress = {
  currentPhaseIndex: 0,
  completedPhases: [],
  scorecardHistory: {},
  lastActive: new Date().toISOString(),
  context: DEFAULT_CONTEXT,
  meetingNotes: [],
  nextMeetingGoal: ''
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(saved);
    // Migration for older data
    if (!parsed.context) parsed.context = DEFAULT_CONTEXT;
    if (!parsed.meetingNotes) parsed.meetingNotes = [];
    if (parsed.nextMeetingGoal === undefined) parsed.nextMeetingGoal = '';
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updatePhase = (index: number) => {
    setProgress(prev => ({
      ...prev,
      currentPhaseIndex: index,
      lastActive: new Date().toISOString()
    }));
  };

  const markPhaseComplete = (slug: string) => {
    setProgress(prev => ({
      ...prev,
      completedPhases: prev.completedPhases.includes(slug) 
        ? prev.completedPhases 
        : [...prev.completedPhases, slug]
    }));
  };

  const saveScore = (id: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      scorecardHistory: { ...prev.scorecardHistory, [id]: score }
    }));
  };

  const updateContext = (newContext: Partial<ResearchContext>) => {
    setProgress(prev => ({
      ...prev,
      context: { ...prev.context, ...newContext }
    }));
  };

  const addMeetingNote = (note: Omit<MeetingNote, 'id'>) => {
    const newNote: MeetingNote = {
      ...note,
      id: crypto.randomUUID()
    };
    setProgress(prev => ({
      ...prev,
      meetingNotes: [newNote, ...prev.meetingNotes]
    }));
  };

  const deleteMeetingNote = (id: string) => {
    setProgress(prev => ({
      ...prev,
      meetingNotes: prev.meetingNotes.filter(n => n.id !== id)
    }));
  };

  const toggleActionItem = (noteId: string, actionId: string) => {
    setProgress(prev => ({
      ...prev,
      meetingNotes: prev.meetingNotes.map(note => {
        if (note.id === noteId) {
          return {
            ...note,
            actionItems: note.actionItems.map(item => 
              item.id === actionId ? { ...item, completed: !item.completed } : item
            )
          };
        }
        return note;
      })
    }));
  };

  const updateNextMeetingGoal = (goal: string) => {
    setProgress(prev => ({
      ...prev,
      nextMeetingGoal: goal
    }));
  };

  const resetProgress = () => setProgress(DEFAULT_PROGRESS);

  return {
    progress,
    updatePhase,
    markPhaseComplete,
    saveScore,
    updateContext,
    addMeetingNote,
    deleteMeetingNote,
    toggleActionItem,
    updateNextMeetingGoal,
    resetProgress
  };
}
