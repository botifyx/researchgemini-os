
import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Scale, Lock, ShieldCheck } from 'lucide-react';

export const Integrity: React.FC = () => {
  return (
    <div className="mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-blue-500" /> Integrity & Ethics Engine
        </h1>
        <p className="text-slate-400 mt-2">Protect your research from technical and ethical failures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center mb-6">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Plagiarism-Safe Writing</h2>
          <p className="text-slate-400 mb-8">Maintain academic honesty while using digital tools.</p>
          <ul className="space-y-4">
            {[
              "Always cite ideas, even if not quoted directly.",
              "Use AI for structuring, not content generation.",
              "Run every draft through university-sanctioned Turnitin.",
              "Keep original source PDFs organized for verification.",
              "Document your research timeline as proof of work."
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="w-12 h-12 bg-green-600/10 text-green-500 rounded-xl flex items-center justify-center mb-6">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ethics Approval Guide</h2>
          <p className="text-slate-400 mb-8">Navigation for HREC (Human Research Ethics Committee).</p>
          <ul className="space-y-4">
            {[
              "Identify participant vulnerability levels early.",
              "Draft Participant Information Sheets (PIS) in plain English.",
              "Explicitly state data storage & anonymization plans.",
              "Disclose any conflict of interest (COI) immediately.",
              "Maintain a signed consent form registry."
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-600/5 border border-blue-500/20 rounded-[40px] p-12 text-center max-w-4xl mx-auto">
        <Lock className="w-12 h-12 text-blue-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-slate-100 mb-4">The Predatory Journal Shield</h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Before submitting your hard work, verify that the journal is reputable. Predatory journals can kill your academic career.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-slate-100 font-bold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" /> Green Flags
            </h4>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>• Indexed in Scopus or Web of Science</li>
              <li>• Transparent peer-review process</li>
              <li>• Known editorial board members</li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-slate-100 font-bold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Red Flags
            </h4>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>• Unsolicited email invitations</li>
              <li>• Extremely fast 'acceptance' (2-3 days)</li>
              <li>• Hidden processing fees (APCs)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="text-xs text-slate-500 font-mono italic">
          AI Disclaimer: ResearchGemini supports intellectual labor, not shortcuts. All generated content must be reviewed and verified.
        </p>
      </div>
    </div>
  );
};
