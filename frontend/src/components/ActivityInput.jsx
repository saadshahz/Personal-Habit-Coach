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
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Tag className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Category (e.g. Work)"
                                        className="glass-input pl-10 w-full rounded-xl py-3 text-sm text-slate-700 placeholder:text-slate-400"
                                        value={activity.category}
                                        onChange={(e) => handleChange(index, 'category', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-32 space-y-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Mins"
                                        className={`glass-input pl-10 w-full rounded-xl py-3 text-sm text-slate-700 placeholder:text-slate-400 ${hasError ? 'border-red-300 bg-red-50 focus:border-red-400' : ''}`}
                                        value={activity.minutes}
                                        onChange={(e) => handleChange(index, 'minutes', e.target.value)}
                                        min="1"
                                    />
                                </div>
                                {hasError && <div className="text-[10px] text-red-500 pl-1">Must be &gt; 0</div>}
                            </div>

                            <button
                                onClick={() => onRemove(index)}
                                className="p-3 mt-[1px] rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
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
                className="w-full py-4 border border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50/30 transition-all flex items-center justify-center gap-2 text-sm font-semibold"
            >
                <Plus size={18} />
                Add Another Activity
            </button>
        </div>
    );
};

export default ActivityInput;
