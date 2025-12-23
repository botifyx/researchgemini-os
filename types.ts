
export enum PhaseSlug {
  PRE_ADMISSION = 'pre-admission',
  ADMISSION_ONBOARDING = 'admission-onboarding',
  TOPIC_SELECTION = 'topic-selection',
  LITERATURE_REVIEW = 'literature-review',
  METHODOLOGY_DATA = 'methodology-data',
  EXPERIMENT_IMPLEMENTATION = 'experiment-implementation',
  WRITING_PUBLISHING = 'writing-publishing',
  SUBMISSION_VIVA = 'submission-viva'
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ResearchPhase {
  slug: PhaseSlug;
  title: string;
  description: string;
  order: number;
  problems: string[];
  solutions: string[];
  toolkits: string[];
  quickActions: string[];
  faqs: FAQ[];
}

export interface Template {
  id: string;
  title: string;
  phase: PhaseSlug;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'Markdown';
  description: string;
  purpose: string;
  whenToUse: string;
}

export interface ScorecardQuestion {
  id: string;
  text: string;
  weight: number;
}

export interface Scorecard {
  id: string;
  title: string;
  description: string;
  questions: ScorecardQuestion[];
}

export interface ResearchContext {
  domain: string;
  region: string;
  degree: string;
  goal: string;
  stressLevel: 'Low' | 'Medium' | 'High';
}

export interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface MeetingNote {
  id: string;
  date: string;
  title: string;
  notes: string;
  actionItems: ActionItem[];
}

export interface UserProgress {
  currentPhaseIndex: number;
  completedPhases: string[];
  scorecardHistory: Record<string, number>;
  lastActive: string;
  context: ResearchContext;
  meetingNotes: MeetingNote[];
  nextMeetingGoal?: string;
}
