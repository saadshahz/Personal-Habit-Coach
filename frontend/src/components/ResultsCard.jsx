import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import DonutChart from './DonutChart';
import SuggestionCard from './SuggestionCard';

const ResultsCard = ({ result, onReset }) => {
    if (!result) return null;

    // Helper for score color
    const getScoreColor = (score) => {
        if (score >= 80) return 'from-green-400 to-emerald-600';
        if (score >= 50) return 'from-orange-400 to-amber-500';
        return 'from-red-400 to-pink-600';
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider relative z-10">Total Time Logged</span>
                    <span className="text-4xl font-extrabold text-slate-800 mt-2 relative z-10">
                        {Math.floor(result.totalMinutes / 60)}h {result.totalMinutes % 60}m
                    </span>
                </div>
                <div className="glass-card rounded-2xl p-6 flex flex-col justify-center items-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider relative z-10">Productivity Score</span>
                    <span className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${getScoreColor(result.productivityScore)} mt-2 relative z-10`}>
                        {result.productivityScore}
                    </span>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Chart & Distribution */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-1 flex flex-col h-full">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 px-2">Time Distribution</h3>
                    <div className="flex-1 min-h-[250px] relative">
                        <DonutChart data={result.distribution} />
                    </div>

                    <div className="mt-8 space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Insights</h4>

                        {result.overInvested.length === 0 && result.neglected.length === 0 && (
                            <div className="flex items-center gap-2 text-sm p-3 bg-green-50 text-green-700 rounded-lg border border-green-100">
                                <CheckCircle size={16} /> Balanced Distribution
                            </div>
                        )}

                        {result.overInvested.map((item, idx) => (
                            <div key={`over-${idx}`} className="flex items-center justify-between text-sm p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 shadow-sm">
                                <span className="flex items-center gap-2 font-semibold">
                                    <AlertTriangle size={16} /> Over-Invested
                                </span>
                                <span className="font-mono">{item.category} ({item.percent}%)</span>
                            </div>
                        ))}

                        {result.neglected.map((item, idx) => (
                            <div key={`neg-${idx}`} className="flex items-center justify-between text-sm p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-100 shadow-sm">
                                <span className="flex items-center gap-2 font-semibold">
                                    <TrendingUp size={16} /> Neglected
                                </span>
                                <span className="font-mono">{item.category} ({item.percent}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Suggestions */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-2 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-gradient-to-b from-orange-400 to-pink-500 rounded-full"></span>
                            AI Coach Suggestions
                        </h3>
                    </div>

                    <div className="space-y-4 flex-1">
                        {result.suggestions.map((suggestion, index) => (
                            <SuggestionCard key={index} suggestion={suggestion} index={index} />
                        ))}
                    </div>

                    <div className="mt-12 flex justify-end">
                        <button
                            onClick={onReset}
                            className="btn-primary py-3 px-8 rounded-xl font-semibold shadow-lg shadow-slate-200/50"
                        >
                            Start New Analysis
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsCard;
