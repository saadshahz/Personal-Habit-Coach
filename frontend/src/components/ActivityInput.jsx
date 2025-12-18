import React from 'react';
import { Plus, Trash2, Clock, Tag, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ActivityInput = ({ activities, setActivities, onAdd, onRemove }) => {

    const handleChange = (index, field, value) => {
        const newActivities = [...activities];
        newActivities[index][field] = field === 'minutes' ? (value === '' ? '' : Number(value)) : value;
        setActivities(newActivities);
    };

    // Helper to check validity of a specific row
    const isValid = (act) => {
        return act.category && act.category.trim().length > 0 && typeof act.minutes === 'number' && act.minutes > 0;
    };

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {activities.map((activity, index) => {
                    const hasError = activity.minutes !== '' && activity.minutes <= 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            className="flex gap-3 items-start group"
                        >
                            <div className="flex-1 space-y-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50">
                                        <Tag className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Category (e.g. Work)"
                                        className="glass-input pl-10 w-full rounded-xl py-3 text-sm"
                                        value={activity.category}
                                        onChange={(e) => handleChange(index, 'category', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-32 space-y-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/50">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Mins"
                                        className={`glass-input pl-10 w-full rounded-xl py-3 text-sm ${hasError ? 'border-red-400 bg-red-500/20 focus:border-red-400' : ''}`}
                                        value={activity.minutes}
                                        onChange={(e) => handleChange(index, 'minutes', e.target.value)}
                                        min="1"
                                    />
                                </div>
                                {hasError && <div className="text-[10px] text-red-300 pl-1">Must be &gt; 0</div>}
                            </div>

                            <button
                                onClick={() => onRemove(index)}
                                className="p-3 mt-[1px] rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/20 transition-colors border border-transparent hover:border-red-500/30"
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            <button
                onClick={onAdd}
                className="w-full py-4 border-2 border-dashed border-white/30 rounded-xl text-white/70 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 text-sm font-semibold backdrop-blur-md"
            >
                <Plus size={18} />
                Add Another Activity
            </button>
        </div>
    );
};

export default ActivityInput;
