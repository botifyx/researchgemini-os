
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Terminal, Mail, MessageSquare, ShieldCheck, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

type ContactType = 'general' | 'toolkit' | 'misuse';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [contactType, setContactType] = useState<ContactType>('general');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam === 'misuse') {
      setContactType('misuse');
    } else if (typeParam === 'toolkit') {
      setContactType('toolkit');
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-widest">Transmission Successful</span>
        </div>
      )}

      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Terminal className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4">Support Terminal</h1>
        <p className="text-slate-400">Direct uplink to the Research OS technical and ethical advisory board.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-green-600/10 border border-green-500/20 p-12 rounded-3xl text-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-100 mb-2">Uplink Successful</h2>
              <p className="text-slate-400">Your message has been encrypted and sent to our team. Expect a response within 24 standard hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 text-blue-400 hover:underline font-mono text-xs">INITIATE_NEW_SESSION</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase block mb-2">Scholar Identifier</label>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase block mb-2">Comms Address</label>
                  <input 
                    type="email" 
                    placeholder="University Email"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-500 uppercase block mb-4">Support Channel</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'general', label: 'General Question', icon: MessageSquare },
                    { id: 'toolkit', label: 'Suggest a Toolkit', icon: Terminal },
                    { id: 'misuse', label: 'Report AI Misuse / Integrity Concern', icon: AlertTriangle }
                  ].map((option) => (
                    <label 
                      key={option.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                        contactType === option.id 
                          ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="contactType"
                        value={option.id}
                        checked={contactType === option.id}
                        onChange={() => setContactType(option.id as ContactType)}
                        className="hidden"
                      />
                      <option.icon className={`w-5 h-5 ${contactType === option.id ? 'text-blue-500' : 'text-slate-600'}`} />
                      <span className="text-sm font-bold uppercase tracking-tight">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {contactType === 'misuse' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-red-400 italic">
                      Important: ResearchGemini is committed to academic integrity. We do not support, facilitate, or tolerate cheating or plagiarism. Reports are handled with clinical confidentiality.
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-500 uppercase block mb-2">Describe the Concern</label>
                    <textarea 
                      placeholder="Please provide details about the specific misuse or integrity concern..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-red-500 h-32 resize-none text-sm"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-slate-500 uppercase block mb-2">
                  {contactType === 'misuse' ? 'Additional Context' : 'Packet Payload (Message)'}
                </label>
                <textarea 
                  placeholder={contactType === 'toolkit' ? "Which tool are you suggesting?" : "Describe your query in detail..."}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 h-40 resize-none text-sm"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
              >
                Transmit Packet <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Mail className="w-4 h-4 text-blue-500" /> Direct Sync
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Support</span>
                <p className="text-slate-400 text-sm">support@researchgemini.os</p>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Ethics</span>
                <p className="text-slate-400 text-sm">ethics@researchgemini.os</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-slate-100 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Info className="w-4 h-4 text-purple-500" /> Operational Hours
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advisory board members are active Monday–Friday, 0900 to 1700 (UTC). Automated integrity guardians are active 24/7.
            </p>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl">
             <ShieldCheck className="w-6 h-6 text-blue-500 mb-2" />
             <p className="text-[10px] text-slate-500 font-mono uppercase leading-tight">
               End-to-End Encryption: All scholar data and research queries are processed with AES-256 standard and never shared with third parties.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
