
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X, Sparkles, Target, Map, Navigation, ShieldCheck } from 'lucide-react';

interface TourStep {
  title: string;
  content: string;
  icon: React.ElementType;
  target?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Kernel Initialization",
    content: "Welcome to ResearchGemini OS. This is your high-rigor command center designed to navigate the doctoral lifecycle from admission to award.",
    icon: Sparkles
  },
  {
    title: "Scholar Dashboard",
    content: "The Dashboard tracks your focal phase, collaboration logs with supervisors, and structural audit history. It's your research heartbeat.",
    icon: Target
  },
  {
    title: "8-Phase Lifecycle",
    content: "The Journey Map deconstructs research into 8 manageable nodes. Each phase provides specific roadblocks, solutions, and peer-validated toolkits.",
    icon: Map
  },
  {
    title: "Logic Engines",
    content: "Use specialized engines like ResearchGPS for route recalibration, Topic Refiner for novelty checks, and Lit Coach for rapid synthesis.",
    icon: Navigation
  },
  {
    title: "Integrity Guardian",
    content: "Built-in plagiarism-safe writing protocols and ethical compliance checkers ensure your academic reputation remains unassailable.",
    icon: ShieldCheck
  }
];

export const TourGuide: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center p-4 pointer-events-none">
      <div className="bg-slate-900 border border-blue-500/30 rounded-[2.5rem] w-full max-w-sm shadow-2xl shadow-blue-900/40 overflow-hidden animate-in slide-in-from-bottom-10 md:zoom-in duration-500 pointer-events-auto">
        {/* Progress Bar */}
        <div className="h-1 w-full bg-slate-800 flex">
          {TOUR_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 transition-all duration-500 ${i <= currentStep ? 'bg-blue-600' : 'bg-transparent'}`} 
            />
          ))}
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
              <Icon className="w-6 h-6 text-blue-500" />
            </div>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter mb-3">
            {step.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium italic">
            "{step.content}"
          </p>

          <div className="flex items-center justify-between gap-4">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-black">
              Step_{String(currentStep + 1).padStart(2, '0')}
            </div>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button 
                  onClick={handlePrev}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-blue-900/30"
              >
                {currentStep === TOUR_STEPS.length - 1 ? 'Terminate' : 'Next_Node'}
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
