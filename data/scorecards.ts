
import { Scorecard } from '../types';

export const SCORECARDS: Scorecard[] = [
  {
    id: 'feasibility',
    title: 'Topic Feasibility Score',
    description: 'Assess if your research topic is realistic within your timeframe and resources.',
    questions: [
      { id: 'f1', text: 'I have access to the necessary data or participants.', weight: 20 },
      { id: 'f2', text: 'The scope can be completed in 3-4 years (PhD) or 1-2 years (Masters).', weight: 20 },
      { id: 'f3', text: 'I have the technical skills (or can learn them quickly).', weight: 20 },
      { id: 'f4', text: 'Necessary funding, hardware, or software is available.', weight: 20 },
      { id: 'f5', text: 'My supervisor supports this specific direction.', weight: 20 }
    ]
  },
  {
    id: 'literature',
    title: 'Literature Readiness Score',
    description: 'Determine if your literature review is deep enough to sustain a thesis.',
    questions: [
      { id: 'l1', text: 'I have identified at least 3 distinct research gaps.', weight: 20 },
      { id: 'l2', text: 'I have a Synthesis Matrix for the top 30-50 papers.', weight: 20 },
      { id: 'l3', text: 'I can name the top 5 authors in my niche from memory.', weight: 20 },
      { id: 'l4', text: 'I have connected my theoretical framework to my methodology.', weight: 20 },
      { id: 'l5', text: 'I am aware of current debates/conflicts in my field.', weight: 20 }
    ]
  },
  {
    id: 'methodology',
    title: 'Methodology Readiness Score',
    description: 'Evaluate the rigor and reliability of your proposed research design.',
    questions: [
      { id: 'm1', text: 'My methodology directly answers my research questions.', weight: 20 },
      { id: 'm2', text: 'I have a clear plan for data collection and anonymization.', weight: 20 },
      { id: 'm3', text: 'I have justified my choice of method against alternatives.', weight: 20 },
      { id: 'm4', text: 'I have identified potential biases in my approach.', weight: 20 },
      { id: 'm5', text: 'Ethics approval has been granted or is in final draft.', weight: 20 }
    ]
  },
  {
    id: 'writing',
    title: 'Writing Clarity Score',
    description: 'Evaluate the readiness of your draft for submission or peer review.',
    questions: [
      { id: 'w1', text: 'Arguments flow logically between paragraphs and chapters.', weight: 20 },
      { id: 'w2', text: 'Grammar and academic tone are consistent throughout.', weight: 20 },
      { id: 'w3', text: 'All citations are present and formatted to style guide.', weight: 20 },
      { id: 'w4', text: 'The research contribution is clearly and boldly stated.', weight: 20 },
      { id: 'w5', text: 'Feedback from peers/supervisors has been incorporated.', weight: 20 }
    ]
  },
  {
    id: 'publication',
    title: 'Publication Readiness Score',
    description: 'Check if your work is ready for external peer-reviewed submission.',
    questions: [
      { id: 'p1', text: 'The findings are significant enough for my target journal.', weight: 20 },
      { id: 'p2', text: 'I have followed the journal-specific "Instructions for Authors".', weight: 20 },
      { id: 'p3', text: 'Abstract and keywords are optimized for indexing.', weight: 20 },
      { id: 'p4', text: 'All figures and tables are of publication quality.', weight: 20 },
      { id: 'p5', text: 'I have verified that the journal is not predatory.', weight: 20 }
    ]
  },
  {
    id: 'viva',
    title: 'Viva Confidence Score',
    description: 'Measure your psychological and technical readiness for the oral defense.',
    questions: [
      { id: 'v1', text: 'I can summarize my contribution in 2-3 minutes clearly.', weight: 20 },
      { id: 'v2', text: 'I know the exact locations of my key findings in the thesis.', weight: 20 },
      { id: 'v3', text: 'I have prepared for "examiner trap" questions.', weight: 20 },
      { id: 'v4', text: 'I have conducted at least one mock viva session.', weight: 20 },
      { id: 'v5', text: 'I am comfortable defending my methodological choices.', weight: 20 }
    ]
  }
];
