import React from 'react';
import { LayoutDashboard, History, Sparkles } from 'lucide-react';

const Navbar = ({ onViewChange, currentView }) => {
    return (
        <nav className="w-full bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-glow-purple animate-pulse-glow">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-bold text-2xl text-white tracking-tight">HabitCoach</span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => onViewChange('input')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentView === 'input'
                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-glow-purple'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Daily Input
                        </button>
                        <button
                            onClick={() => onViewChange('history')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${currentView === 'history'
                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-glow-purple'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <History size={18} />
                            History
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
