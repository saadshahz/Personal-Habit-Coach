import React from 'react';
import { LayoutDashboard, History } from 'lucide-react';

const Navbar = ({ onViewChange, currentView }) => {
    return (
        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            H
                        </div>
                        <span className="font-bold text-xl text-slate-800 tracking-tight">HabitCoach</span>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => onViewChange('input')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === 'input' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            <LayoutDashboard size={18} />
                            Daily Input
                        </button>
                        <button
                            onClick={() => onViewChange('history')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === 'history' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
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
