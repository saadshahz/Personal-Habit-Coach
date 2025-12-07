import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ActivityInput from './components/ActivityInput';
import ResultsCard from './components/ResultsCard';
import HistoryList from './components/HistoryList';
import { analyzeDay, getHistory } from './api/client';
import { Sparkles, ArrowRight, Target } from 'lucide-react';

function App() {
    const [view, setView] = useState('input'); // input | results | history
    const [activities, setActivities] = useState([{ category: '', minutes: '' }]);
    const [goals, setGoals] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (view === 'history') {
            fetchHistory();
        }
    }, [view]);

    const fetchHistory = async () => {
        try {
            const res = await getHistory();
            setHistoryData(res.data);
        } catch (err) {
            console.error("Failed to load history");
        }
    };

    const handleAddActivity = () => {
        setActivities([...activities, { category: '', minutes: '' }]);
    };

    const handleRemoveActivity = (index) => {
        if (activities.length > 1) {
            const newActivities = activities.filter((_, i) => i !== index);
            setActivities(newActivities);
        }
    };

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        try {
            // Basic frontend validation
            const validActivities = activities.filter(a => a.category && a.minutes > 0);
            if (validActivities.length === 0) {
                throw new Error("Please add at least one valid activity.");
            }

            const payload = {
                activities: validActivities,
                goals: goals.split(',').map(g => g.trim()).filter(g => g)
            };

            const response = await analyzeDay(payload);
            setAnalysisResult(response.data);
            setView('results');
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-20 font-sans text-slate-800">
            <Navbar currentView={view} onViewChange={setView} />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* VIEW: INPUT */}
                {view === 'input' && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight mb-3">
                                Design Your Day
                            </h1>
                            <p className="text-slate-500 text-lg">
                                Log your time, set your goals, and let AI optimize your habits.
                            </p>
                        </div>

                        <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                            {/* Decorative gradient blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <div className="space-y-8 relative z-10">
                                {/* Goal Input Section */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                        <Target size={16} className="text-orange-500" />
                                        Main Focus / Goal
                                    </label>
                                    <input
                                        type="text"
                                        className="glass-input w-full rounded-xl py-3 px-4"
                                        placeholder="e.g. Learn React, Run 5k..."
                                        value={goals}
                                        onChange={(e) => setGoals(e.target.value)}
                                    />
                                </div>

                                {/* Activities Section */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                        <Sparkles size={16} className="text-pink-500" />
                                        Activities Log
                                    </label>

                                    <ActivityInput
                                        activities={activities}
                                        setActivities={setActivities}
                                        onAdd={handleAddActivity}
                                        onRemove={handleRemoveActivity}
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center justify-between">
                                        <span>{error}</span>
                                        <button onClick={() => setError(null)} className="font-bold hover:underline">Dismiss</button>
                                    </div>
                                )}

                                {/* Analyze Button */}
                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${loading ? 'bg-slate-400' : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:shadow-orange-500/40'}`}
                                >
                                    {loading ? 'Crunching Numbers...' : (
                                        <>
                                            Analyze My Day <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: RESULTS */}
                {view === 'results' && (
                    <ResultsCard
                        result={analysisResult}
                        onReset={() => {
                            setActivities([{ category: '', minutes: '' }]);
                            setGoals('');
                            setView('input');
                        }}
                    />
                )}

                {/* VIEW: HISTORY */}
                {view === 'history' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800">Your Journey</h2>
                            <div className="text-sm text-slate-500">Last 7 days</div>
                        </div>
                        <HistoryList history={historyData} />
                    </div>
                )}

            </main>
        </div>
    );
}

export default App;
