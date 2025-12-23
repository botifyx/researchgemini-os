
export type EmailTemplate = {
  id: string;
  title: string;
  category: 'Requirements' | 'Decision' | 'Scope' | 'Approval' | 'Rejection' | 'Mapping' | 'Follow-up';
  subject: string;
  body: string;
  placeholders: string[];
  tips?: string[];
};

export const SUPERVISOR_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'req-confirm',
    title: 'Publication Requirements Confirmation',
    category: 'Requirements',
    subject: 'Confirmation of Doctoral Publication Requirements - {{Your_Name}}',
    body: 'Dear {{Supervisor_Name}},\n\nI hope you are having a productive week.\n\nI am currently reviewing my doctoral timeline and wanted to formally confirm the specific publication requirements for my degree submission at {{Department}}. Based on my current understanding, I believe I am expected to [state your current understanding, e.g., publish two first-author peer-reviewed papers].\n\nCould you please confirm if this aligns with the department\'s current regulations or if there are specific journal lists (such as UGC-CARE, Scopus, etc.) that I must prioritize?\n\nThank you for your ongoing guidance.\n\nBest regards,\n\n{{Your_Name}}\n{{Registration_Number}}',
    placeholders: ['Supervisor_Name', 'Your_Name', 'Department', 'Registration_Number'],
    tips: [
      'Mention specific university regulation numbers if you have them.',
      'Always use your official university registration or ID number.',
      'This email is best sent after your first year review.'
    ]
  },
  {
    id: 'decision-confirm',
    title: 'Conference vs Journal Decision Confirmation',
    category: 'Decision',
    subject: 'Submission Strategy: {{Manuscript_Title}}',
    body: 'Dear {{Supervisor_Name}},\n\nFollowing our last discussion regarding the data from my latest experiment, I have been weighing the submission strategy for "{{Manuscript_Title}}".\n\nI have analyzed the trade-offs between a conference submission ({{Venue_Name}}) for rapid dissemination and a full journal article for deeper impact. Given the current stage of my PhD, I am leaning towards {{Venue_Type}} because [state your rationale].\n\nI would value your confirmation on this trajectory before I proceed with the final formatting.\n\nBest regards,\n\n{{Your_Name}}',
    placeholders: ['Supervisor_Name', 'Your_Name', 'Manuscript_Title', 'Venue_Name', 'Venue_Type'],
    tips: [
      'Briefly summarize why you chose one over the other.',
      'Show that you have considered the "speed vs. prestige" tradeoff.'
    ]
  },
  {
    id: 'scope-confirm',
    title: 'Journal Scope & Suitability Confirmation',
    category: 'Scope',
    subject: 'Suitability Query: {{Journal_Name}} for "{{Manuscript_Title}}"',
    body: 'Dear {{Supervisor_Name}},\n\nI have identified a potential outlet for my manuscript, "{{Manuscript_Title}}". The journal is {{Journal_Name}}, which is currently ranked/indexed as [e.g., Q1/Scopus].\n\nHaving reviewed their recent "Aims and Scope," I believe my work on {{Research_Topic}} aligns well because [state reason]. Before I begin the submission process, I wanted to ask if you have any previous experience with this editor or if you would recommend a different target for this specific piece of work.\n\nThank you for your time and expertise.\n\nBest regards,\n\n{{Your_Name}}',
    placeholders: ['Supervisor_Name', 'Your_Name', 'Manuscript_Title', 'Journal_Name', 'Research_Topic'],
    tips: [
      'Attach the "Instructions for Authors" PDF if the journal is new to the supervisor.',
      'Check if the journal is Open Access and if there are APC fees.'
    ]
  },
  {
    id: 'approval-confirm',
    title: 'Approval Before Final Submission',
    category: 'Approval',
    subject: 'Final Manuscript for Review: "{{Manuscript_Title}}"',
    body: 'Dear {{Supervisor_Name}},\n\nI have completed the final draft of "{{Manuscript_Title}}" and have incorporated the feedback from our last review session.\n\nI have also verified the formatting against the {{Journal_Name}} guidelines and prepared the ethical disclosure statements. I would appreciate your final approval of this version before I transmit the packet to the editorial office.\n\nI have attached the manuscript and the supplementary data files for your convenience.\n\nBest regards,\n\n{{Your_Name}}',
    placeholders: ['Supervisor_Name', 'Your_Name', 'Manuscript_Title', 'Journal_Name'],
    tips: [
      'Ensure all co-author names are spelled correctly before sending this.',
      'Double-check that the "Ethics Approval Number" is clearly visible.'
    ]
  },
  {
    id: 'rejection-confirm',
    title: 'Rejection Handling & Next-Step Confirmation',
    category: 'Rejection',
    subject: 'Update on Manuscript: {{Manuscript_Title}} ({{Decision_Type}})',
    body: 'Dear {{Supervisor_Name}},\n\nI am writing to share that I have received a {{Decision_Type}} decision from the editorial board regarding "{{Manuscript_Title}}".\n\nWhile the outcome [is/isn\'t] what we hoped for, the reviewers provided some technical feedback regarding [state key area]. I have drafted a preliminary response and redirection plan, which involves [state your plan, e.g., submitting to another journal or conducting a minor re-analysis].\n\nI would appreciate a brief meeting or your thoughts via email on how to best recalibrate this manuscript for its next submission.\n\nBest regards,\n\n{{Your_Name}}',
    placeholders: ['Supervisor_Name', 'Your_Name', 'Manuscript_Title', 'Decision_Type'],
    tips: [
      'Maintain a clinical and objective tone, even if frustrated by the rejection.',
      'Summarize the "Main Critique" in one sentence.'
    ]
  },
  {
    id: 'mapping-confirm',
    title: 'Publication-to-Degree Mapping Confirmation',
    category: 'Mapping',
    subject: 'Confirmation of Degree Eligibility Mapping - {{Your_Name}}',
    body: 'Dear {{Supervisor_Name}},\n\nAs I approach the final phase of my research, I am mapping my published outputs to the required chapters of my thesis.\n\nSpecifically, I plan to use "{{Manuscript_Title}}" as the foundation for Chapter {{Chapter_Number}}. Could you please confirm if the university permits the "Thesis by Publication" model for this specific department, or if I must rewrite the content as a standard monograph?\n\nI want to ensure there are no administrative roadblocks as I begin the final write-up.\n\nBest regards,\n\n{{Your_Name}}\n{{Registration_Number}}',
    placeholders: ['Supervisor_Name', 'Your_Name', 'Manuscript_Title', 'Chapter_Number', 'Registration_Number'],
    tips: [
      'Check your University Handbook for the phrase "Thesis as a Series of Papers".',
      'This is a critical administrative confirmation for late-stage scholars.'
    ]
  },
  {
    id: 'reminder-followup',
    title: 'Polite Reminder / Follow-up',
    category: 'Follow-up',
    subject: 'Follow-up: Query regarding {{Topic_Context}}',
    body: 'Dear {{Supervisor_Name}},\n\nI hope you are having a productive week.\n\nI am writing to politely follow up on my previous email regarding {{Topic_Context}}, sent on {{Original_Date}}. I understand your schedule is very busy, but as the submission deadline for the {{Venue_Name}} is approaching on {{Deadline_Date}}, I wanted to re-surface this for your consideration.\n\nThank you for your continued support and guidance.\n\nBest regards,\n\n{{Your_Name}}',
    placeholders: ['Supervisor_Name', 'Your_Name', 'Topic_Context', 'Original_Date', 'Venue_Name', 'Deadline_Date'],
    tips: [
      'Wait at least 7-10 days before sending a reminder unless there is an urgent deadline.',
      'Keep it short and acknowledge their busy schedule.'
    ]
  }
];
