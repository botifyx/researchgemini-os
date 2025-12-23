
import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', hideText = false, className = "" }) => {
  const sizeClasses = {
    sm: { box: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-base' },
    md: { box: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl' },
    lg: { box: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-3xl' },
    xl: { box: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-6xl' }
  };

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className={`${sizeClasses[size].box} bg-blue-600 rounded-[30%] flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-105 active:scale-95`}>
        {/* Futuristic Glass Layer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
        
        {/* Background circuit-like pulse */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <GraduationCap className={`${sizeClasses[size].icon} text-white relative z-10 transition-transform duration-500 group-hover:-rotate-12`} />
        
        {/* Dynamic Sparkle - Intelligence indicator */}
        <div className="absolute top-1.5 right-1.5">
          <Sparkles className="w-3 h-3 text-blue-100 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      {!hideText && (
        <div className="flex flex-col -space-y-1">
          <span className={`${sizeClasses[size].text} font-black tracking-tighter text-slate-900 dark:text-slate-100 uppercase leading-none`}>
            Research<span className="text-blue-500">Gemini</span>
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 tracking-[0.1em] uppercase font-bold">Operating System</span>
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};
