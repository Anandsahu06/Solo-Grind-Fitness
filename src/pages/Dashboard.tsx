import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Trophy,
    Zap,
    Target,
    Heart,
    Dumbbell,
    Users,
    Flame,
    TrendingUp,
    Moon,
    Activity,
    ChevronRight,
    Edit2,
    Award,
    Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { calculateUserLevel } from '../utils/levelingSystem';
import { getLast7DaysData } from '../utils/historySystem';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState('Weakest Trainee');

    // Get user profile from localStorage (from onboarding)
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const loadProfile = () => {
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                setProfile(JSON.parse(storedProfile));
            }
        };

        loadProfile();

        // Listen for updates from other components
        window.addEventListener('storage', loadProfile);

        return () => {
            window.removeEventListener('storage', loadProfile);
        };
    }, []);

    // Real Data Integration
    const { workoutFlags } = getLast7DaysData();
    const totalDiurnalWorkouts = workoutFlags.reduce((a, b) => a + b, 0);

    const [dailyQuests, setDailyQuests] = useState<any[]>([]);

    useEffect(() => {
        // Load Daily Quests
        const storedQuests = localStorage.getItem('dailyQuests');
        if (storedQuests) {
            const parsed = JSON.parse(storedQuests).map((q: any) => {
                let icon = Dumbbell;
                if (q.title.includes('Steps')) icon = Activity;
                else if (q.title.includes('Water')) icon = Heart;
                else if (q.title.includes('Sleep')) icon = Moon;
                else if (q.title.includes('Meditat')) icon = Target;
                return { ...q, icon };
            });
            setDailyQuests(parsed.slice(0, 4)); // Show top 4
        }
    }, []);

    const stats = profile?.stats || {
        str: 5,
        agi: 5,
        sta: 5,
        foc: 5
    };

    // Calculate Level Info
    let currentTotalXp = profile?.totalXp;
    if (currentTotalXp === undefined) {
        // Fallback calculation matches update logic
        const l = profile?.level || user?.level || 1;
        const x = profile?.xp !== undefined ? profile.xp : (user?.xp || 0);
        currentTotalXp = ((l - 1) * 100) + x;
    }

    // Get accurate level data from table
    const levelInfo = calculateUserLevel(currentTotalXp);

    const rank = levelInfo.rank;
    const level = levelInfo.level;
    const xp = levelInfo.xp;
    const xpToNextLevel = levelInfo.xpNeeded;
    const xpPercentage = levelInfo.progress;

    const streak = {
        current: profile?.streak !== undefined ? profile.streak : (user?.streak?.current || 0),
        best: profile?.bestStreak !== undefined ? profile.bestStreak : (user?.streak?.best || 0)
    };

    const weeklyStats = {
        workouts: totalDiurnalWorkouts,
        steps: 0,
        sleepAvg: 0
    };

    const getRankColor = (rank: string) => {
        const colors: any = {
            'F': 'from-gray-500 to-gray-600',
            'E': 'from-green-500 to-green-600',
            'D': 'from-blue-500 to-blue-600',
            'C': 'from-purple-500 to-purple-600',
            'B': 'from-yellow-500 to-yellow-600',
            'A': 'from-orange-500 to-red-600',
            'S': 'from-primary to-secondary'
        };
        return colors[rank] || colors['F'];
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto space-y-6"
            >

                {/* Profile Card */}
                <motion.div variants={itemVariants} className="glass-card p-6 border border-white/10">
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(0,243,255,0.3)]">
                                {['🥷', '⚔️', '⚡', '🧙', '🐉', '🔥'][((user?.avatar || 1) - 1)]}
                            </div>
                            {/* Rank Badge */}
                            <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(rank)} flex items-center justify-center font-heading font-bold text-white shadow-lg border-2 border-background`}>
                                {rank}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-heading font-bold">{profile?.name || user?.name || 'Hunter'}</h2>
                            <p className="text-sm text-gray-400">@{user?.username || 'hunter'}</p>

                            {/* Editable Title */}
                            <div className="mt-2 flex items-center gap-2">
                                {isEditingTitle ? (
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onBlur={() => setIsEditingTitle(false)}
                                        className="bg-white/5 border border-primary rounded px-2 py-1 text-sm focus:outline-none"
                                        autoFocus
                                    />
                                ) : (
                                    <>
                                        <span className="text-sm text-primary font-bold">"{title}"</span>
                                        <button
                                            onClick={() => setIsEditingTitle(true)}
                                            className="text-gray-500 hover:text-primary transition-colors"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Level */}
                        <div className="text-right">
                            <div className="text-3xl font-heading font-bold text-primary">Lv.{level}</div>
                            <div className="text-xs text-gray-400">{rank}-Rank Hunter</div>
                        </div>
                    </div>

                    {/* XP Progress Bar */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Experience</span>
                            <span className="text-primary font-bold">{xp} / {xpToNextLevel} XP</span>
                        </div>
                        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${xpPercentage}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-primary to-secondary relative"
                            >
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-white/20"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Display */}
                <motion.div variants={itemVariants} className="glass-card p-6 border border-white/10">
                    <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                        <Award className="text-primary" size={20} />
                        Hunter Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: 'STR', value: stats.str, max: 100, color: 'from-red-500 to-orange-500', icon: Dumbbell },
                            { name: 'AGI', value: stats.agi, max: 100, color: 'from-blue-500 to-cyan-500', icon: Zap },
                            { name: 'STA', value: stats.sta, max: 100, color: 'from-green-500 to-emerald-500', icon: Heart },
                            { name: 'FOC', value: stats.foc, max: 100, color: 'from-purple-500 to-pink-500', icon: Target },
                        ].map((stat, index) => (
                            <div key={stat.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <stat.icon size={16} className="text-gray-400" />
                                        <span className="text-sm font-bold text-gray-300">{stat.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">{stat.value}</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className={`h-full bg-gradient-to-r ${stat.color} relative`}
                                    >
                                        <motion.div
                                            animate={{
                                                boxShadow: [
                                                    '0 0 5px rgba(255,255,255,0.3)',
                                                    '0 0 15px rgba(255,255,255,0.5)',
                                                    '0 0 5px rgba(255,255,255,0.3)'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Daily Quests Preview */}
                <motion.div variants={itemVariants} className="glass-card p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-heading font-bold flex items-center gap-2">
                            <Trophy className="text-primary" size={20} />
                            Daily Quests
                        </h3>
                        <button
                            onClick={() => navigate('/quests')}
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                            View All
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
                        {dailyQuests.map((quest) => (
                            <motion.div
                                key={quest.id}
                                whileHover={{ scale: 1.05 }}
                                className={`min-w-[200px] p-4 rounded-xl border ${quest.completed
                                    ? 'bg-success/10 border-success/30'
                                    : 'bg-white/5 border-white/10'
                                    } cursor-pointer`}
                                onClick={() => navigate('/quests')}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <quest.icon size={16} className={quest.completed ? 'text-success' : 'text-gray-400'} />
                                    <span className={`text-sm font-bold ${quest.completed ? 'text-success line-through' : 'text-white'}`}>
                                        {quest.title}
                                    </span>
                                </div>
                                <div className="text-xs text-primary">+{quest.xp} XP</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                        onClick={() => navigate('/dungeon')}
                        className="glass-card p-4 border border-white/10 hover:border-primary transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/30 transition-colors">
                            <Dumbbell className="text-primary" size={24} />
                        </div>
                        <div className="text-sm font-bold text-center">Enter Dungeon</div>
                    </button>

                    <button
                        onClick={() => navigate('/quests')}
                        className="glass-card p-4 border border-white/10 hover:border-primary transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/30 transition-colors">
                            <Trophy className="text-primary" size={24} />
                        </div>
                        <div className="text-sm font-bold text-center">View Quests</div>
                    </button>

                    <button
                        onClick={() => { }}
                        className="glass-card p-4 border border-white/10 opacity-50 cursor-not-allowed group relative overflow-hidden"
                    >
                        <div className="absolute top-2 right-2 text-primary">
                            <Lock size={16} />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-gray-400">
                            <Users size={24} />
                        </div>
                        <div className="text-sm font-bold text-center text-gray-400">Guilds (Locked)</div>
                    </button>
                </motion.div>

                {/* Streak & Weekly Summary */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Streak Counter */}
                    <motion.div variants={itemVariants} className="glass-card p-6 border border-white/10">
                        <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                            <Flame className="text-orange-500" size={20} />
                            Streak
                        </h3>
                        <div className="flex items-center justify-around">
                            <div className="text-center">
                                <div className="text-4xl font-heading font-bold text-primary mb-1">{streak.current}</div>
                                <div className="text-xs text-gray-400">Current</div>
                            </div>
                            <div className="w-px h-16 bg-white/10" />
                            <div className="text-center">
                                <div className="text-4xl font-heading font-bold text-secondary mb-1">{streak.best}</div>
                                <div className="text-xs text-gray-400">Best</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Weekly Summary */}
                    <motion.div variants={itemVariants} className="glass-card p-6 border border-white/10">
                        <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="text-primary" size={20} />
                            This Week
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Dumbbell size={16} className="text-gray-400" />
                                    <span className="text-sm text-gray-300">Workouts</span>
                                </div>
                                <span className="text-sm font-bold text-primary">{weeklyStats.workouts}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-gray-400" />
                                    <span className="text-sm text-gray-300">Steps</span>
                                </div>
                                <span className="text-sm font-bold text-primary">{weeklyStats.steps.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Moon size={16} className="text-gray-400" />
                                    <span className="text-sm text-gray-300">Sleep Avg</span>
                                </div>
                                <span className="text-sm font-bold text-primary">{weeklyStats.sleepAvg}h</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </motion.div>
            <Footer />
        </div>
    );
};

export default Dashboard;
