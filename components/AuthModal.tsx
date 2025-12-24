
import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { X, ShieldCheck, Lock, Globe, Zap, Cpu, LogIn } from 'lucide-react';
import { Logo } from './Logo';

export const AuthModal: React.FC = () => {
    const { isAuthModalOpen, closeAuthModal, login } = useAuth();

    if (!isAuthModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={closeAuthModal}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 blur-[80px] rounded-full pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        closeAuthModal();
                    }}
                    className="absolute top-6 right-6 p-3 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-8">
                        <Logo size="xl" hideText={true} />
                    </div>

                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-mono mb-6 uppercase tracking-widest">
                        <Lock className="w-3 h-3" /> Security_Gate: Locked
                    </div>

                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-tighter">
                        Initialize <span className="text-blue-600">Scholar ID</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-10 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                        To synchronize with the ResearchGemini OS ecosystem and access high-rigor engines, please verify your academic identity.
                    </p>

                    <div className="space-y-6 mb-10">
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: Cpu, label: 'Compute' },
                                { icon: Globe, label: 'Global' },
                                { icon: Zap, label: 'Speed' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2">
                                    <item.icon className="w-5 h-5 text-blue-500" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="w-full flex justify-center">
                            <button
                                onClick={login}
                                className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-full font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <LogIn className="w-5 h-5" />
                                Sign in with Google
                            </button>
                        </div>

                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-green-500" /> AES-256 Identity Protection Active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
