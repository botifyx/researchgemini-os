
export interface CountryRuleSet {
  id: string;
  name: string;
  typicallyExpected: string;
  variations: string[];
  verifyLocally: string[];
  advisoryGuidance: string;
}

export const PUBLISHING_COUNTRY_RULES: CountryRuleSet[] = [
  {
    id: 'india',
    name: 'India',
    typicallyExpected: 'Typically, scholars are expected to publish at least two research papers in peer-reviewed journals before the submission of the thesis. National regulators often maintain specific lists of approved journals (e.g., UGC-CARE) that are mandatory for degree eligibility.',
    variations: [
      'State-run universities vs. Central universities or Institutes of National Importance (IITs/IIMs).',
      'Specific impact factor requirements set by departmental research committees.',
      'Mandatory inclusion of specific indexing (Scopus, Web of Science).'
    ],
    verifyLocally: [
      'Check the latest version of the UGC-CARE list or your university\'s specific approved journal list.',
      'Confirm the minimum number of "First Author" publications required for your specific department.',
      'Verify if conference proceedings (Scopus indexed) count toward the degree requirement.'
    ],
    advisoryGuidance: 'In the Indian context, prioritize "Journal" publications over "Conferences" if the primary goal is fulfilling the mandatory submission criteria. Ensure the journal is not on any predatory lists, as this can invalidate your eligibility at the final Viva stage.'
  },
  {
    id: 'eu',
    name: 'EU / UK',
    typicallyExpected: 'Practice varies by the "Thesis Model". Traditional monographs may not strictly require prior publication, while the "PhD by Publication" or "Cumulative Thesis" model requires 3–5 published or accepted articles that constitute the core chapters.',
    variations: [
      'The "Standard PhD" (monograph) vs. "PhD by Publication".',
      'National funding agency mandates (e.g., Plan S) requiring Open Access for all outputs.',
      'Differences between Northern European (often publication-heavy) and Southern European norms.'
    ],
    verifyLocally: [
      'Confirm if your thesis must be a monograph or can be a collection of articles.',
      'Check Open Access requirements tied to your specific grant or funding body.',
      'Verify the "Acceptance" status vs "Published" status required for submission.'
    ],
    advisoryGuidance: 'For EU scholars, conferences are vital for dissemination and networking, but journals are the heavy hitters for CV-building and long-term career progression. If following a cumulative model, focus on journals with high rigor and reliable review timelines.'
  },
  {
    id: 'us',
    name: 'United States',
    typicallyExpected: 'The primary requirement is usually the completion and defense of a significant original dissertation. While publishing is highly encouraged and often essential for the job market, it is frequently a secondary expectation rather than a strict legal requirement for the degree itself.',
    variations: [
      'R1 (Research-Intensive) institutions often have higher informal publishing expectations.',
      'Adviser-specific standards—some committees require papers to be "under review" before defense.',
      'Professional Doctorates vs. traditional PhDs.'
    ],
    verifyLocally: [
      'Consult your primary supervisor (PI) on their "Publication Standard" for defense readiness.',
      'Confirm university rules on using published papers as verbatim chapters in the dissertation.',
      'Check for embargo rules if you plan to publish your dissertation as a book later.'
    ],
    advisoryGuidance: 'In the US, use publishing strategically to build your JOB MARKET profile. Conferences are excellent for early-stage feedback, but prioritize "top-tier" journals for your main findings to maximize your tenure-track or industry research prospects.'
  }
];
