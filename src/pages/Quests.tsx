import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    Circle,
    Dumbbell,
    Footprints,
    Droplet,
    Brain,
    Moon,
    AlertTriangle,
    Target,
    ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateUserLevel } from '../utils/levelingSystem';
import { updateHistory } from '../utils/historySystem';

interface Quest {
    id: string;
    title: string;
    description: string;
    xp: number;
    stat: 'STR' | 'AGI' | 'STA' | 'FOC';
    completed: boolean;
    icon: any;
    progress?: number;
    max?: number;
    type: 'checkbox' | 'progress';
}

const Quests: React.FC = () => {
    // Helper to load quests from storage or use defaults
    const loadInitialQuests = () => {
        const saved = localStorage.getItem('dailyQuests');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Re-hydrate icons
            return parsed.map((q: any) => {
                let icon = Circle;
                if (q.title.includes('Push-ups')) icon = Dumbbell;
                else if (q.title.includes('Steps')) icon = Footprints;
                else if (q.title.includes('Water')) icon = Droplet;
                else if (q.title.includes('Meditation')) icon = Brain;
                else if (q.title.includes('Sleep')) icon = Moon;
                else if (q.title.includes('Penalty')) icon = AlertTriangle;
                return { ...q, icon };
            });
        }
        return [
            {
                id: '1',
                title: '40 Push-ups',
                description: 'Complete 40 push-ups today',
                xp: 30,
                stat: 'STR',
                completed: false,
                icon: Dumbbell,
                type: 'checkbox'
            },
            {
                id: '2',
                title: '5,000 Steps',
                description: 'Walk or run 5,000 steps',
                xp: 25,
                stat: 'STA',
                completed: false,
                icon: Footprints,
                progress: 0,
                max: 5000,
                type: 'progress'
            },
            {
                id: '3',
                title: '8 Glasses of Water',
                description: 'Stay hydrated throughout the day',
                xp: 10,
                stat: 'STA',
                completed: false,
                icon: Droplet,
                progress: 0,
                max: 8,
                type: 'progress'
            },
            {
                id: '4',
                title: '10 Min Meditation',
                description: 'Practice mindfulness meditation',
                xp: 20,
                stat: 'FOC',
                completed: false,
                icon: Brain,
                type: 'checkbox'
            },
            {
                id: '5',
                title: 'Sleep 7 Hours',
                description: 'Get quality rest tonight',
                xp: 40,
                stat: 'FOC',
                completed: false,
                icon: Moon,
                type: 'checkbox'
            }
        ];
    };

    const [quests, setQuests] = useState<Quest[]>(loadInitialQuests);

    // Save to local storage whenever quests change
    useEffect(() => {
        const toSave = quests.map(({ icon, ...rest }) => rest);
        localStorage.setItem('dailyQuests', JSON.stringify(toSave));
    }, [quests]);

    const updateUserStats = (xpAmount: number, statType: 'STR' | 'AGI' | 'STA' | 'FOC', isAdding: boolean) => {
        const profileStr = localStorage.getItem('userProfile');
        if (profileStr) {
            const profile = JSON.parse(profileStr);
            const stats = profile.stats || { str: 0, agi: 0, sta: 0, foc: 0 };

            // Calculate current total XP
            let currentTotalXp = profile.totalXp;
            if (currentTotalXp === undefined) {
                const currentLvl = profile.level || 1;
                const currentProgress = profile.xp || 0;
                currentTotalXp = ((currentLvl - 1) * 100) + currentProgress;
            }

            // Update Total XP
            if (isAdding) {
                currentTotalXp += xpAmount;
            } else {
                currentTotalXp = Math.max(0, currentTotalXp - xpAmount);
            }

            // Recalculate Level and Rank
            const levelInfo = calculateUserLevel(currentTotalXp);

            // --- STREAK LOGIC ---
            const today = new Date().toISOString().split('T')[0];
            const lastActiveDate = profile.lastActiveDate;
            let currentStreak = profile.streak || 0;
            let bestStreak = profile.bestStreak || currentStreak;

            if (lastActiveDate !== today) {
                if (lastActiveDate) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];

                    if (lastActiveDate === yesterdayStr) {
                        currentStreak += 1;
                    } else {
                        currentStreak = 1;
                    }
                } else {
                    currentStreak = 1;
                }
            }

            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
            }

            // Update specific stat
            const statKey = statType.toLowerCase();
            if (stats[statKey] !== undefined) {
                if (isAdding) stats[statKey] += 1;
                else stats[statKey] = Math.max(0, stats[statKey] - 1);
            }

            // Update Total Quests Count
            let currentTotalQuests = profile.totalQuests || 0;
            if (isAdding) currentTotalQuests += 1;
            else currentTotalQuests = Math.max(0, currentTotalQuests - 1);

            // Show level up toast
            if (profile.level && levelInfo.level > profile.level) {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.5 },
                    colors: ['#FFE400', '#FFBD00', '#E89400']
                });
            }

            // Update History
            const updatedHistory = updateHistory({
                ...profile,
                totalXp: currentTotalXp,
                stats,
            });

            const updatedProfile = {
                ...profile,
                xp: levelInfo.xp,
                level: levelInfo.level,
                rank: levelInfo.rank,
                totalXp: currentTotalXp,
                stats,
                totalQuests: currentTotalQuests,
                streak: currentStreak,
                bestStreak: bestStreak,
                lastActiveDate: today,
                history: updatedHistory
            };

            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            window.dispatchEvent(new Event('storage'));
        }
    };

    const handleToggleQuest = (id: string) => {
        setQuests(prev => prev.map(quest => {
            if (quest.id === id) {
                const newCompleted = !quest.completed;
                updateUserStats(quest.xp, quest.stat, newCompleted);
                if (newCompleted) {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.6 },
                        colors: ['#00f3ff', '#bc13fe', '#0aff60']
                    });
                }
                return { ...quest, completed: newCompleted };
            }
            return quest;
        }));
    };

    const handleProgressIncrement = (id: string, amount: number = 1) => {
        setQuests(prev => prev.map(quest => {
            if (quest.id === id && quest.type === 'progress' && quest.progress !== undefined && quest.max !== undefined) {
                const newProgress = Math.min((quest.progress || 0) + amount, quest.max);
                const wasCompleted = quest.completed;
                const newCompleted = newProgress >= quest.max;

                if (newCompleted && !wasCompleted) {
                    updateUserStats(quest.xp, quest.stat, true);
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.6 },
                        colors: ['#00f3ff', '#bc13fe', '#0aff60']
                    });
                }

                return { ...quest, progress: newProgress, completed: newCompleted };
            }
            return quest;
        }));
    };

    const completedCount = quests.filter(q => q.completed).length;
    const totalCount = quests.length;

    const getStatColor = (stat: string) => {
        const colors: any = {
            'STR': 'text-red-500',
            'AGI': 'text-blue-500',
            'STA': 'text-green-500',
            'FOC': 'text-purple-500'
        };
        return colors[stat] || 'text-gray-500';
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-24">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="relative text-center mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="absolute left-0 top-1 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-heading font-bold mb-2">Daily Quests</h1>
                    <p className="text-gray-400">Complete quests to earn XP and level up</p>
                </div>

                {/* Progress Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 border border-white/10"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-sm text-gray-400">Today's Progress</div>
                            <div className="text-2xl font-heading font-bold text-primary">{completedCount} / {totalCount}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400">XP Earned</div>
                            <div className="text-2xl font-heading font-bold text-secondary">
                                {quests.reduce((sum, q) => sum + (q.completed ? q.xp : 0), 0)} XP
                            </div>
                        </div>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                    </div>
                </motion.div>

                {/* Quest List */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {quests.map((quest, index) => {
                            const Icon = quest.icon;
                            return (
                                <motion.div
                                    key={quest.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`glass-card p-4 border transition-colors ${quest.completed
                                        ? 'border-primary/50 bg-primary/5'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${quest.completed
                                                ? 'bg-primary text-black'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                }`}
                                            onClick={() => handleToggleQuest(quest.id)}
                                        >
                                            {quest.completed ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className={`font-bold ${quest.completed ? 'text-white' : 'text-gray-200'}`}>
                                                    {quest.title}
                                                </h3>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 ${getStatColor(quest.stat)}`}>
                                                    +{quest.xp} XP • {quest.stat}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-3">{quest.description}</p>

                                            {/* Progress Bar for Progressive Quests */}
                                            {quest.type === 'progress' && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs text-gray-500">
                                                        <span>{quest.progress} / {quest.max}</span>
                                                        <span>{Math.round(((quest.progress || 0) / (quest.max || 1)) * 100)}%</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-primary transition-all duration-300"
                                                                style={{ width: `${((quest.progress || 0) / (quest.max || 1)) * 100}%` }}
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleProgressIncrement(quest.id, quest.max ? Math.ceil(quest.max / 10) : 1);
                                                            }}
                                                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-primary transition-colors"
                                                            disabled={quest.completed}
                                                        >
                                                            <Target size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Quests;
