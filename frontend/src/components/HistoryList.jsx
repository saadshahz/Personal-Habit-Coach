import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const HistoryList = ({ history }) => {
    if (!history || history.length === 0) {
        return (
            <div className="text-center py-20 text-slate-400">
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
                    <div key={index} className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all border border-white/40 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Calendar size={14} />
                                {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">
                                {Math.floor(record.totalMinutes / 60)}h {record.totalMinutes % 60}m
                            </div>
                        </div>

                        <h4 className="font-bold text-slate-800 mb-2">Top Focus</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {record.distribution.slice(0, 3).map((item, i) => (
                                <span key={i} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full border border-orange-100">
                                    {item.category}
                                </span>
                            ))}
                        </div>

                        <div className="border-t border-slate-100 pt-4 mt-4">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1 block">Coach Tip</span>
                            <p className="text-xs text-slate-500 italic font-serif leading-relaxed">
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
