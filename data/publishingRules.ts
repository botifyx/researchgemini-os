export const PREDATORY_FLAGS = [
  { id: 'p1', text: 'Unsolicited email invitation from the journal.', weight: 1 },
  { id: 'p2', text: 'Promise of "guaranteed" or extremely fast (e.g. 1 week) publication.', weight: 3 },
  { id: 'p3', text: 'Lack of clear information on Peer Review processes.', weight: 2 },
  { id: 'p4', text: 'Journal name is suspiciously similar to a well-known top-tier journal.', weight: 2 },
  { id: 'p5', text: 'The editorial board is missing or lists people without institutional affiliations.', weight: 2 },
  { id: 'p6', text: 'High APC (Article Processing Charge) with no mention of quality standards.', weight: 1 },
  { id: 'p7', text: 'Not listed in reputable indexes like Scopus, Web of Science, or DOAJ.', weight: 3 }
];

export const SUBMISSION_CHECKLIST = [
  "Institutional Ethics Approval number is included in the manuscript.",
  "All co-authors have reviewed and approved the final version.",
  "Conflict of Interest (COI) statement is clearly defined.",
  "Funding acknowledgments are correctly formatted.",
  "Abstract follows word count limits and structural requirements.",
  "Figures and tables meet the journal's DPI and format specifications.",
  "References are formatted exactly to the journal's Style Guide (e.g. APA7, Harvard).",
  "Supplementary data files are prepared and anonymized if required."
];

export const REJECTION_GUIDE = [
  {
    type: "Desk Rejection",
    logic: "The Editor decided the paper doesn't fit the scope or isn't 'ready'.",
    action: "Don't panic. Check your formatting, scope alignment, and move to your 'Tier 2' journal target immediately."
  },
  {
    type: "Major Revision",
    logic: "Reviewers see value but require significant structural or data changes.",
    action: "Treat this as a win. Create a 'Response to Reviewers' table and address every point clinically."
  },
  {
    type: "Reject & Resubmit",
    logic: "The work is promising but current flaws prevent a proper review.",
    action: "Perform the requested fixes then resubmit as a 'New' paper to the same journal or elsewhere."
  }
];

export const ELIGIBILITY_QUESTIONS = [
  { id: 'q1', text: "Have you completed your Candidacy/Confirmation milestone?", type: "boolean" },
  { id: 'q2', text: "Is the data collection phase 100% complete?", type: "boolean" },
  { id: 'q3', text: "Do you have supervisor approval to submit externally?", type: "boolean" },
  { id: 'q4', text: "Is the paper based on your original PhD work?", type: "boolean" },
  { id: 'q5', text: "Is the manuscript currently under review elsewhere?", type: "boolean" }
];

export const JOURNAL_SELECTION_CRITERIA = [
  {
    title: "Scope & Aims Alignment",
    desc: "Does your research topic match the journal's recent publications? Check their 'About' page and last 3 issues.",
    icon: "Target"
  },
  {
    title: "Impact Factor & Quartile (Q1-Q4)",
    desc: "Evaluate prestige relative to your career stage. Q1 journals are highly competitive; Q2/Q3 are often excellent for first-time authors.",
    icon: "BarChart"
  },
  {
    title: "Average Review Velocity",
    desc: "How long is the first decision? If you have a degree deadline in 6 months, avoid journals with a 12-month average turnaround.",
    icon: "Zap"
  },
  {
    title: "Audience Reach",
    desc: "Who needs to see this? Choose specialized journals for methodology innovations, or generalist journals for interdisciplinary impact.",
    icon: "Users"
  },
  {
    title: "Indexing & Discovery",
    desc: "Is the journal indexed in Scopus, Web of Science, or PubMed? This determines how easily other scholars will find and cite your work.",
    icon: "Search"
  },
  {
    title: "Open Access & APCs",
    desc: "Does your funding body require Gold/Green Open Access? Check if your university has a transformative agreement to cover fees.",
    icon: "Lock"
  }
];