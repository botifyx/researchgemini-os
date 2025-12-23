
export interface DecisionFactors {
  country: string;
  discipline: string;
  stage: 'early' | 'mid' | 'final';
  goal: string;
  timeConstraint: number; // in months
  budgetSensitivity: 'low' | 'medium' | 'high';
}

export interface DimensionScores {
  speed: number;
  depth: number;
  weight: number;
  risk: number;
  cost: number;
}

export const BASE_SCORES = {
  CONFERENCE: {
    speed: 5,
    depth: 2,
    weight: 2,
    risk: 3,
    cost: 2
  },
  JOURNAL: {
    speed: 2,
    depth: 5,
    weight: 5,
    risk: 4,
    cost: 4
  }
};

export const DECISION_RECOMMENDATIONS = {
  CONFERENCE: {
    type: 'Conference',
    reasons: [
      'Optimal for rapid dissemination of early-stage findings.',
      'Strongest pathway for networking and community peer feedback.',
      'Strict deadlines ensure a predictable (if fast) completion path.',
      'High relevance for fast-moving fields like Computer Science and Engineering.',
      'Excellent opportunity to test core arguments before a full journal draft.'
    ]
  },
  JOURNAL: {
    type: 'Journal',
    reasons: [
      'Maximum weight for long-term academic reputation and degree points.',
      'Allows for deep methodological rigor and comprehensive discussion.',
      'Archival status ensures your work remains reachable via major databases.',
      'Generally considered higher "prestige" in traditional academic domains.',
      'More space to elaborate on complex data and theoretical frameworks.'
    ]
  },
  BOTH: {
    type: 'Both (Conference → Journal)',
    reasons: [
      'The "Gold Standard" strategy: test at a conference, refine for a journal.',
      'Allows for two distinct outputs from one major research node.',
      'Increases citation potential by reaching two different audiences.',
      'Maximizes degree-eligibility points while maintaining high speed.',
      'Demonstrates strategic research maturity and adaptability.'
    ]
  }
};

export const SUPERVISOR_CONFIRM_QUESTIONS = [
  'Does our department accept "Conference Proceedings" as fulfillment of the publication quota?',
  'Which specific journals are on the "Restricted" or "Non-recognized" list for our university?',
  'Is there departmental funding available for APCs or conference travel registration?',
  'Would you prefer me to submit a "Short Paper" now or wait for a full "Journal" manuscript?'
];
