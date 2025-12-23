
import { ResearchPhase, PhaseSlug } from '../types';

export const PHASES: ResearchPhase[] = [
  {
    slug: PhaseSlug.PRE_ADMISSION,
    order: 1,
    title: "Pre-Admission",
    description: "Finding the right supervisor, funding, and university while clarifying your research intent.",
    problems: ["Vague research interest", "No funding", "High application rejection rate"],
    solutions: ["Refine Research Statement", "Target specialized journals first", "Reach out to potential supervisors"],
    toolkits: ["Research Proposal Framework", "Supervisor Outreach Pack"],
    quickActions: ["Find a Supervisor", "Check Eligibility", "Refine Research Proposal"],
    faqs: [{ question: "How early should I start?", answer: "At least 12 months before enrollment." }]
  },
  {
    slug: PhaseSlug.ADMISSION_ONBOARDING,
    order: 2,
    title: "Admission & Onboarding",
    description: "Setting up your environment, understanding institutional rules, and forming the supervisor-student pact.",
    problems: ["Imposter syndrome", "Bureaucratic confusion", "Lack of technical setup"],
    solutions: ["Attend induction", "Set clear expectations with supervisor", "Install Zotero/Mendeley"],
    toolkits: ["Supervisor Expectations Pact", "4-Year Research Timeline"],
    quickActions: ["Setup Reference Manager", "Review Research Regulations", "Log First Meeting"],
    faqs: [{ question: "Do I need a laptop?", answer: "Yes, high-performance if doing simulations." }]
  },
  {
    slug: PhaseSlug.TOPIC_SELECTION,
    order: 3,
    title: "Topic Selection",
    description: "Narrowing down from a broad field to a specific, novel, and feasible research question.",
    problems: ["Topic too broad", "Topic already covered", "Topic lacks data"],
    solutions: ["Gap analysis", "Feasibility testing", "Stakeholder consultation"],
    toolkits: ["Topic Feasibility Matrix", "Research Question Generator"],
    quickActions: ["Refine Topic Idea", "Run Feasibility Audit", "Scan Recent Reviews"],
    faqs: [{ question: "Can I change my topic?", answer: "Yes, but ideally before the first year review." }]
  },
  {
    slug: PhaseSlug.LITERATURE_REVIEW,
    order: 4,
    title: "Literature Review",
    description: "Synthesizing existing knowledge to build the foundation of your theoretical framework.",
    problems: ["Getting lost in papers", "Poor synthesis", "Outdated sources"],
    solutions: ["Use PRISMA guidelines", "Create a synthesis matrix", "Set up Google Scholar alerts"],
    toolkits: ["Literature Synthesis Matrix", "PRISMA Flowchart Template"],
    quickActions: ["Analyze Key Abstract", "Identify Core Authors", "Evaluate Lit Readiness"],
    faqs: [{ question: "How many papers are enough?", answer: "Quality over quantity; stop when you reach saturation." }]
  },
  {
    slug: PhaseSlug.METHODOLOGY_DATA,
    order: 5,
    title: "Methodology & Data",
    description: "Designing the blueprint of your research and planning for rigorous data collection.",
    problems: ["Weak research design", "Ethical approval delays", "Data access issues"],
    solutions: ["Methodological triangulation", "Pilot testing", "Early ethics submission"],
    toolkits: ["Ethics Approval Checklist", "Research Design Canvas"],
    quickActions: ["Select Research Method", "Initiate Ethics Protocol", "Audit Design Rigor"],
    faqs: [{ question: "What if I can't find participants?", answer: "Consider secondary data or online surveys." }]
  },
  {
    slug: PhaseSlug.EXPERIMENT_IMPLEMENTATION,
    order: 6,
    title: "Experiment / Implementation",
    description: "The 'doing' phase—executing your study, collecting data, and managing the process.",
    problems: ["Unexpected technical bugs", "Data corruption", "Time mismanagement"],
    solutions: ["Rigorous version control", "Regular backups", "Daily lab journals"],
    toolkits: ["Data Management Plan (DMP)", "Research Logbook Protocol"],
    quickActions: ["Interpret Pilot Results", "Recalibrate Trajectory", "Sync Implementation Log"],
    faqs: [{ question: "Is failing an experiment okay?", answer: "Yes! Negative results are still findings." }]
  },
  {
    slug: PhaseSlug.WRITING_PUBLISHING,
    order: 7,
    title: "Writing & Publishing",
    description: "Transforming results into a thesis and peer-reviewed articles.",
    problems: ["Writer's block", "Predatory journals", "Revision fatigue"],
    solutions: ["Write daily", "Use journal finders", "Collaborative writing tools"],
    toolkits: ["Thesis Skeleton Blueprint", "Journal Selection Matrix"],
    quickActions: ["Architect Chapter Flow", "Shield Against Predatory Journals", "Draft Supervisor Email"],
    faqs: [{ question: "Should I publish during PhD?", answer: "Highly recommended for career prospects." }]
  },
  {
    slug: PhaseSlug.SUBMISSION_VIVA,
    order: 8,
    title: "Submission, Viva & Degree",
    description: "The final stretch—submitting your thesis, defending it, and receiving your award.",
    problems: ["Viva anxiety", "Complex formatting", "Post-submission letdown"],
    solutions: ["Mock viva sessions", "Formatting check service", "Mental health support"],
    toolkits: ["Top 100 Viva Questions", "Thesis Formatting Checklist"],
    quickActions: ["Start Mock Viva", "Consult Examiner Simulator", "Verify Thesis Readiness"],
    faqs: [{ question: "What happens if I fail viva?", answer: "Total failure is rare; usually it's major/minor corrections." }]
  }
];
