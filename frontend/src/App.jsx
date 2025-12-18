import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ActivityInput from './components/ActivityInput';
import ResultsCard from './components/ResultsCard';
import HistoryList from './components/HistoryList';
import { analyzeDay, getHistory } from './api/client';
import { Sparkles, ArrowRight, Target, Zap } from 'lucide-react';

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
        <div className="min-h-screen pb-20 font-sans text-white">
            <Navbar currentView={view} onViewChange={setView} />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* VIEW: INPUT */}
                {view === 'input' && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className="text-center mb-10">
                            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 tracking-tight mb-4 animate-gradient bg-200">
                                Design Your Day
                            </h1>
                            <p className="text-white/70 text-lg">
                                Log your time, set your goals, and let AI optimize your habits.
                            </p>
                        </div>

                        <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                            {/* Decorative gradient blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none animate-float"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

                            <div className="space-y-8 relative z-10">
                                {/* Goal Input Section */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-white/90 uppercase tracking-wider">
                                        <Target size={16} className="text-cyan-400" />
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
                                    <label className="flex items-center gap-2 text-sm font-semibold text-white/90 uppercase tracking-wider">
                                        <Sparkles size={16} className="text-purple-400" />
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
                                    <div className="bg-red-500/20 text-red-200 p-4 rounded-xl text-sm border border-red-500/30 flex items-center justify-between backdrop-blur-md">
                                        <span>{error}</span>
                                        <button onClick={() => setError(null)} className="font-bold hover:underline">Dismiss</button>
                                    </div>
                                )}

                                {/* Analyze Button */}
                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${loading
                                            ? 'bg-slate-600 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600 hover:shadow-glow-purple'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <Zap size={20} className="animate-pulse" />
                                            Analyzing with AI...
                                        </>
                                    ) : (
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
                            <h2 className="text-3xl font-bold text-white">Your Journey</h2>
                            <div className="text-sm text-white/60">Last 7 days</div>
                        </div>
                        <HistoryList history={historyData} />
                    </div>
                )}

            </main>
        </div>
    );
}

export default App;
