import React from 'react';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

const HistoryList = ({ history }) => {
    if (!history || history.length === 0) {
        return (
            <div className="text-center py-20 text-white/50">
                <p>No history available yet. Start logging your days!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {history.map((record, index) => {
                // Safely grab the first suggestion tip
                let firstSuggestion = "No suggestions";
                if (record.suggestions && record.suggestions.length > 0) {
                    const s = record.suggestions[0];
                    if (typeof s === 'string') {
                        firstSuggestion = s;
                    } else if (typeof s === 'object' && s.tip) {
                        firstSuggestion = s.tip;
                    }
                }

                return (
                    <div key={index} className="glass-card rounded-2xl p-6 hover:shadow-glow-purple hover:-translate-y-1 transition-all border border-white/20 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                                <Calendar size={14} />
                                {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20">
                                {Math.floor(record.totalMinutes / 60)}h {record.totalMinutes % 60}m
                            </div>
                        </div>

                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                            <TrendingUp size={16} className="text-cyan-400" />
                            Top Focus
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {record.distribution.slice(0, 3).map((item, i) => (
                                <span key={i} className="text-xs bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-md text-purple-200 px-3 py-1.5 rounded-full border border-purple-500/30">
                                    {item.category}
                                </span>
                            ))}
                        </div>

                        <div className="border-t border-white/20 pt-4 mt-4">
                            <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-2 block">Coach Tip</span>
                            <p className="text-sm text-white/70 italic leading-relaxed">
                                "{firstSuggestion}"
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HistoryList;
