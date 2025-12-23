
import React, { useState } from 'react';
import { 
  Heart, 
  Wind, 
  Clock, 
  Coffee, 
  Zap, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Users,
  AlertCircle,
  Brain
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useProgress } from '../store/useProgress';
import { PHASES } from '../data/phases';

export const WellbeingCoach: React.FC = () => {
  const { progress } = useProgress();
  const [formData, setFormData] = useState({
    emotion: '',
    duration: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.emotion.trim()) return;

    setIsLoading(true);
    setAdvice(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentPhase = PHASES[progress.currentPhaseIndex].title;
      
      const prompt = `Act as a professional Research Wellbeing Coach specializing in doctoral mental health.

Input Context:
- Current Research Phase: ${currentPhase}
- Scholar's Emotion/Feeling: "${formData.emotion}"
- Duration of this Stress: "${formData.duration || 'Not specified'}"

Provide a structured, empathetic recovery plan with these exact sections:
1. 🌿 **Normalize the Experience**: Provide an empathetic acknowledgment of why this is a common part of the PhD journey.
2. 🔍 **Potential Root Cause**: Identify the likely psychological or systemic triggers (e.g., imposter syndrome, decision fatigue, isolation).
3. 🧘 **Immediate Grounding Exercise**: A 2-minute physical or mental exercise to reduce acute stress.
4. ⏳ **20-Minute Recovery Task**: A small, achievable, research-adjacent win to build momentum.
5. 👥 **Human Support Protocol**: Guidance on when it's time to speak to a supervisor, mentor, or professional counselor.

Tone: Calming, professional, academic-aware, and supportive. Use clean Markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
        },
      });

      setAdvice(response.text || "Advice failed to load.");
    } catch (error) {
      console.error("Wellbeing Coach Error:", error);
      setAdvice("The wellbeing terminal is currently offline. Please take a deep breath and try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-900/20">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">Research Wellbeing Coach</h1>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          "Sustainable research requires a sustainable researcher." Combat isolation and burnout with evidence-based mental health support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleConsult} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Brain className="w-3 h-3" /> How are you feeling?
              </label>
              <textarea 
                value={formData.emotion}
                onChange={(e) => setFormData({...formData, emotion: e.target.value})}
                placeholder="e.g. Overwhelmed by data, feeling like an imposter, anxious about my viva..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-pink-500 transition-colors h-32 resize-none text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-500 uppercase block mb-2 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Duration of Stress
              </label>
              <input 
                type="text" 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="e.g. 3 days, 1 month, since starting..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-pink-500 transition-colors text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-pink-600 hover:bg-pink-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Calibrating Support...
                </>
              ) : (
                <>
                  <Wind className="w-5 h-5" /> Request Support
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-600 font-mono text-center uppercase tracking-widest">
              WELLBEING_CORE_v1.0
            </p>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center animate-pulse">
              <Coffee className="w-12 h-12 text-pink-500/50 mb-6" />
              <h3 className="text-xl font-bold text-slate-500">Processing Emotional Context</h3>
              <p className="text-slate-600 mt-2">Connecting current phase stressors with psychological support frameworks...</p>
            </div>
          ) : advice ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="prose prose-invert max-w-none">
                {advice.split('\n').map((line, i) => {
                  if (line.match(/^\d\.\s/)) {
                    const title = line.replace(/^\d\.\s/, '').split(':')[0];
                    return (
                      <h3 key={i} className="text-xl font-bold mb-4 mt-8 text-pink-400 border-b border-slate-800 pb-2 flex items-center gap-3">
                        {title}
                      </h3>
                    );
                  }
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-slate-300 leading-relaxed mb-4">{line.replace(/\*\*.*?\*\*/g, '').replace(/^\d\.\s/, '')}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Psychological Safety</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">These exercises are meant for minor stressors. For acute crises, use the emergency button below.</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <Users className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-slate-100 font-bold mb-1 text-sm uppercase">Peer Solidarity</h4>
                    <p className="text-xs text-slate-500 italic leading-tight">You are part of a global community. Reaching out is a sign of strength.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-pink-600/10 border border-pink-500/20 p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                    <Zap className="w-6 h-6 text-pink-400" />
                    <div>
                        <p className="text-sm font-bold text-slate-100 uppercase font-mono">Immediate Relief</p>
                        <p className="text-xs text-slate-400">Take 20 minutes right now to follow the recovery task above.</p>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800/50 rounded-3xl p-12 text-center text-slate-600">
              <Heart className="w-16 h-16 opacity-20 mb-6" />
              <h3 className="text-xl font-bold opacity-50">Support Core Idle</h3>
              <p className="max-w-xs mt-2 opacity-50">Share your current emotional state to receive a tailored wellbeing plan.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-16 text-center">
         <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 px-4 py-2 rounded-xl">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs text-slate-500 uppercase font-mono">Emergency Note: This is an AI tool, not a replacement for professional clinical care.</span>
         </div>
      </div>
    </div>
  );
};
