
import { Template, PhaseSlug } from '../types';

export const TEMPLATES: Template[] = [
  // PHASE 1: PRE-ADMISSION
  {
    id: 'prop-build-01',
    title: 'Research Proposal Framework',
    phase: PhaseSlug.PRE_ADMISSION,
    type: 'DOCX',
    description: 'A comprehensive guide to writing a winning PhD proposal that addresses novelty, scope, and feasibility.',
    purpose: 'To secure admission and funding by demonstrating high-level research intent.',
    whenToUse: 'Before formal application submission.'
  },
  {
    id: 'sup-outreach-01',
    title: 'Supervisor Outreach Pack',
    phase: PhaseSlug.PRE_ADMISSION,
    type: 'Markdown',
    description: 'Scientifically calibrated email templates and project summaries for approaching potential mentors.',
    purpose: 'To initiate academic relationships and gauge supervisor fit.',
    whenToUse: '6-12 months before enrollment.'
  },

  // PHASE 2: ADMISSION & ONBOARDING
  {
    id: 'sup-pact-01',
    title: 'Supervisor Expectations Pact',
    phase: PhaseSlug.ADMISSION_ONBOARDING,
    type: 'PDF',
    description: 'A memorandum of understanding template to define meeting frequency, feedback loops, and authorship rules.',
    purpose: 'To prevent future conflicts and establish professional boundaries.',
    whenToUse: 'During the first 30 days of candidacy.'
  },
  {
    id: 'phd-timeline-01',
    title: '4-Year Research Timeline',
    phase: PhaseSlug.ADMISSION_ONBOARDING,
    type: 'XLSX',
    description: 'A master tracking sheet for milestones, reviews, data collection, and thesis drafting.',
    purpose: 'To visualize the entire degree trajectory and manage time-drift risks.',
    whenToUse: 'Immediately after onboarding.'
  },

  // PHASE 3: TOPIC SELECTION
  {
    id: 'feasibility-matrix-01',
    title: 'Topic Feasibility Matrix',
    phase: PhaseSlug.TOPIC_SELECTION,
    type: 'PDF',
    description: 'A rubric to score research ideas against data access, technical skill, and time constraints.',
    purpose: 'To objectively eliminate unworkable or overly broad research questions.',
    whenToUse: 'When choosing between 2 or 3 potential directions.'
  },
  {
    id: 'rq-generator-01',
    title: 'Research Question Generator',
    phase: PhaseSlug.TOPIC_SELECTION,
    type: 'Markdown',
    description: 'A logical frame for transforming "areas of interest" into "actionable questions".',
    purpose: 'To ensure the core question is specific, measurable, and contributes novelty.',
    whenToUse: 'During the topic narrowing stage.'
  },

  // PHASE 4: LITERATURE REVIEW
  {
    id: 'lit-matrix-01',
    title: 'Literature Synthesis Matrix',
    phase: PhaseSlug.LITERATURE_REVIEW,
    type: 'XLSX',
    description: 'Track authors, themes, methodologies, and gaps across hundreds of peer-reviewed papers.',
    purpose: 'To move from reading individual papers to synthesizing the entire field.',
    whenToUse: 'During the systematic literature review process.'
  },
  {
    id: 'prisma-flow-01',
    title: 'PRISMA Flowchart Template',
    phase: PhaseSlug.LITERATURE_REVIEW,
    type: 'DOCX',
    description: 'A standardized visual representation of your paper selection and exclusion process.',
    purpose: 'To provide methodological transparency for systematic reviews.',
    whenToUse: 'When documenting your search strategy.'
  },

  // PHASE 5: METHODOLOGY & DATA
  {
    id: 'ethics-app-01',
    title: 'Ethics Approval Checklist',
    phase: PhaseSlug.METHODOLOGY_DATA,
    type: 'PDF',
    description: 'A comprehensive list of requirements for HREC submissions, including consent forms and PIS.',
    purpose: 'To ensure ethical compliance and minimize application revisions.',
    whenToUse: 'Before any data collection begins.'
  },
  {
    id: 'method-canvas-01',
    title: 'Research Design Canvas',
    phase: PhaseSlug.METHODOLOGY_DATA,
    type: 'XLSX',
    description: 'A visual architecture for mapping Research Questions to Data Sources and Analysis Techniques.',
    purpose: 'To ensure methodological triangulation and internal validity.',
    whenToUse: 'When designing the "Methodology" chapter blueprint.'
  },

  // PHASE 6: EXPERIMENT / IMPLEMENTATION
  {
    id: 'dmp-standard-01',
    title: 'Data Management Plan (DMP)',
    phase: PhaseSlug.EXPERIMENT_IMPLEMENTATION,
    type: 'DOCX',
    description: 'Protocol for data storage, anonymization, backup, and long-term preservation.',
    purpose: 'To protect intellectual property and satisfy institutional data requirements.',
    whenToUse: 'At the start of active data collection/fieldwork.'
  },
  {
    id: 'field-journal-01',
    title: 'Research Logbook Protocol',
    phase: PhaseSlug.EXPERIMENT_IMPLEMENTATION,
    type: 'Markdown',
    description: 'Guidelines for keeping a chronological audit trail of experiments, decisions, and bugs.',
    purpose: 'To ensure repeatability and intellectual accountability.',
    whenToUse: 'Daily throughout the experimentation phase.'
  },

  // PHASE 7: WRITING & PUBLISHING
  {
    id: 'thesis-skeleton-01',
    title: 'Thesis Skeleton Blueprint',
    phase: PhaseSlug.WRITING_PUBLISHING,
    type: 'DOCX',
    description: 'A hierarchical outline for an 80k-word thesis, including typical chapter sub-sections.',
    purpose: 'To overcome writer\'s block by providing a logical structure to populate.',
    whenToUse: 'When starting the full-scale drafting process.'
  },
  {
    id: 'journal-matrix-01',
    title: 'Journal Selection Matrix',
    phase: PhaseSlug.WRITING_PUBLISHING,
    type: 'XLSX',
    description: 'Compare impact factors, review times, and scope for top-tier publication targets.',
    purpose: 'To optimize publication strategy and minimize rejection risk.',
    whenToUse: 'When preparing articles for external submission.'
  },

  // PHASE 8: SUBMISSION, VIVA & DEGREE
  {
    id: 'viva-q-01',
    title: 'Top 100 Viva Questions',
    phase: PhaseSlug.SUBMISSION_VIVA,
    type: 'Markdown',
    description: 'Common questions asked by examiners categorized by chapter (Methodology, Novelty, Contribution).',
    purpose: 'To prepare for the oral defense through active recall and simulation.',
    whenToUse: '2-3 months before the Viva date.'
  },
  {
    id: 'format-check-01',
    title: 'Thesis Formatting Checklist',
    phase: PhaseSlug.SUBMISSION_VIVA,
    type: 'PDF',
    description: 'A final audit of citations, margins, table of contents, and appendices.',
    purpose: 'To ensure technical submission compliance and avoid administrative delays.',
    whenToUse: '2 weeks before final submission.'
  }
];
