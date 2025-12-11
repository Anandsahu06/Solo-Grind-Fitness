import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Play,
    Pause,
    SkipForward,
    X,
    Trophy,
    TrendingUp,
    Share2,
    ArrowRight,
    Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateUserLevel } from '../utils/levelingSystem';
import { updateHistory } from '../utils/historySystem';
import { soundManager } from '../utils/soundManager';

interface DungeonState {
    id: string;
    name: string;
    exercises: string[];
    xpReward: number;
    stats: { stat: string; boost: number }[];
}

type Phase = 'countdown' | 'workout' | 'complete';

const ActiveDungeon: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as any;
    console.log("ActiveDungeon State:", state);
    const dungeon = state?.dungeon as DungeonState;

    const [phase, setPhase] = useState<Phase>('countdown');
    const [countdown, setCountdown] = useState(3);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [exerciseTime, setExerciseTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [completedExercises, setCompletedExercises] = useState<number[]>([]);

    // Redirect if no dungeon data
    useEffect(() => {
        if (!dungeon) {
            navigate('/dungeon');
        }
    }, [dungeon, navigate]);

    // Countdown phase
    useEffect(() => {
        if (phase === 'countdown' && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (phase === 'countdown' && countdown === 0) {
            setPhase('workout');
            playSound('start');
        }
    }, [phase, countdown]);

    // Exercise timer
    useEffect(() => {
        if (phase === 'workout' && !isPaused) {
            const timer = setInterval(() => {
                setExerciseTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [phase, isPaused]);

    const playSound = (type: 'start' | 'next' | 'complete' | 'stop') => {
        soundManager.resume(); // Resume AudioContext if suspended

        switch (type) {
            case 'start':
                soundManager.playStart();
                break;
            case 'next':
                soundManager.playTimerTick();
                break;
            case 'complete':
                soundManager.playDungeonComplete();
                break;
            case 'stop':
                soundManager.playStop();
                break;
        }
    };

    const updateUserStats = (xpAmount: number, statsBoosts: { stat: string; boost: number }[]) => {
        const profileStr = localStorage.getItem('userProfile');
        if (profileStr) {
            const profile = JSON.parse(profileStr);
            const stats = profile.stats || { str: 0, agi: 0, sta: 0, foc: 0 };

            // Calculate current total XP (similar migration logic as Quests)
            let currentTotalXp = profile.totalXp;
            if (currentTotalXp === undefined) {
                const currentLvl = profile.level || 1;
                const currentProgress = profile.xp || 0;
                currentTotalXp = ((currentLvl - 1) * 100) + currentProgress;
            }

            // Add XP
            currentTotalXp += xpAmount;

            // Recalculate Level
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

            // Update Best Streak
            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
            }

            // Update stats
            statsBoosts.forEach(boost => {
                const statKey = boost.stat.toLowerCase();
                if (stats[statKey] !== undefined) {
                    stats[statKey] += boost.boost;
                }
            });

            // Update Total Dungeons Count
            const currentTotalDungeons = (profile.totalDungeons || 0) + 1;

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
                totalDungeons: currentTotalDungeons,
                streak: currentStreak,
                bestStreak: bestStreak,
                lastActiveDate: today,
                history: updatedHistory
            };

            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            window.dispatchEvent(new Event('storage'));

            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            window.dispatchEvent(new Event('storage'));
        }
    };

    const handleNextExercise = () => {
        setCompletedExercises([...completedExercises, currentExerciseIndex]);

        if (currentExerciseIndex < dungeon.exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setExerciseTime(0);
            playSound('next');
        } else {
            // Dungeon complete!
            setPhase('complete');
            playSound('complete');

            // Award rewards
            updateUserStats(dungeon.xpReward, dungeon.stats);

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00f3ff', '#bc13fe', '#0aff60']
            });
        }
    };

    const handleQuit = () => {
        if (window.confirm('Are you sure you want to quit? You will lose all progress.')) {
            navigate('/dungeon');
        }
    };

    const handleShare = () => {
        // In a real app, this would share to social media
        alert('Sharing functionality would go here!');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((completedExercises.length) / dungeon.exercises.length) * 100;

    if (!dungeon) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <AnimatePresence mode="wait">

                {/* COUNTDOWN PHASE */}
                {phase === 'countdown' && (
                    <motion.div
                        key="countdown"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-heading font-bold mb-8 text-primary">
                            {dungeon.name}
                        </h2>
                        <motion.div
                            key={countdown}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            className="text-9xl font-heading font-bold text-primary mb-4"
                        >
                            {countdown}
                        </motion.div>
                        <p className="text-gray-400">Get ready...</p>
                    </motion.div>
                )}

                {/* WORKOUT PHASE */}
                {phase === 'workout' && (
                    <motion.div
                        key="workout"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-heading font-bold">{dungeon.name}</h2>
                            <button
                                onClick={handleQuit}
                                className="text-gray-400 hover:text-danger transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-primary font-bold">
                                    {completedExercises.length} / {dungeon.exercises.length}
                                </span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </div>

                        {/* Current Exercise */}
                        <motion.div
                            key={currentExerciseIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-8 border border-white/10 text-center mb-6"
                        >
                            <div className="text-sm text-gray-400 mb-2">
                                Exercise {currentExerciseIndex + 1} of {dungeon.exercises.length}
                            </div>
                            <h3 className="text-4xl font-heading font-bold mb-6">
                                {dungeon.exercises[currentExerciseIndex]}
                            </h3>

                            {/* Timer */}
                            <div className="text-6xl font-heading font-bold text-primary mb-8">
                                {formatTime(exerciseTime)}
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setIsPaused(!isPaused)}
                                    className="w-16 h-16 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
                                >
                                    {isPaused ? <Play className="text-primary" size={28} /> : <Pause className="text-primary" size={28} />}
                                </button>
                                <button
                                    onClick={handleNextExercise}
                                    className="btn-primary px-8 py-4 text-lg"
                                >
                                    {currentExerciseIndex === dungeon.exercises.length - 1 ? 'Finish' : 'Next'}
                                    <SkipForward size={20} className="ml-2 inline" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Exercise List */}
                        <div className="glass-card p-4 border border-white/10">
                            <div className="text-sm text-gray-400 mb-3">Exercises:</div>
                            <div className="space-y-2">
                                {dungeon.exercises.map((exercise, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-2 text-sm ${completedExercises.includes(index)
                                            ? 'text-success line-through'
                                            : index === currentExerciseIndex
                                                ? 'text-primary font-bold'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${completedExercises.includes(index)
                                            ? 'bg-success'
                                            : index === currentExerciseIndex
                                                ? 'bg-primary'
                                                : 'bg-gray-600'
                                            }`} />
                                        {exercise}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* COMPLETE PHASE */}
                {phase === 'complete' && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl text-center"
                    >
                        {/* Success Animation */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.6 }}
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(0,243,255,0.5)]"
                        >
                            <Trophy className="text-white" size={64} />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-heading font-bold mb-2"
                        >
                            DUNGEON CLEARED!
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 mb-8"
                        >
                            Congratulations! You've completed {dungeon.name}
                        </motion.p>

                        {/* Rewards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card p-6 border border-white/10 mb-6"
                        >
                            <h3 className="text-lg font-heading font-bold mb-4 flex items-center justify-center gap-2">
                                <Flame className="text-primary" />
                                Rewards Earned
                            </h3>

                            {/* XP Reward */}
                            <div className="mb-6">
                                <div className="text-5xl font-heading font-bold text-success mb-2">
                                    +{dungeon.xpReward} XP
                                </div>
                                <div className="text-sm text-gray-400">Experience Points</div>
                            </div>

                            {/* Stat Boosts */}
                            <div className="mb-4">
                                <div className="text-sm text-gray-400 mb-3">Stats Increased:</div>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {dungeon.stats.map((stat) => (
                                        <motion.div
                                            key={stat.stat}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.6, type: 'spring' }}
                                            className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold"
                                        >
                                            <TrendingUp size={16} className="inline mr-1" />
                                            {stat.stat} +{stat.boost}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex gap-3"
                        >
                            <button
                                onClick={handleShare}
                                className="flex-1 glass-card p-4 border border-white/10 hover:border-primary transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 size={20} />
                                Share
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 btn-primary flex items-center justify-center gap-2"
                            >
                                Continue
                                <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default ActiveDungeon;
