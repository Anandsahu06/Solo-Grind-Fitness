import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Award,
    Flame,
    Calendar,
    BarChart3,
    Activity,
    Target,
    Trophy,
    Edit2,
    ChevronLeft,
    Upload,
    Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getLast7DaysData } from '../utils/historySystem';

const Profile: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'stats' | 'achievements'>('stats');
    const { user } = useAuth();

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load Profile Data
    const profileStr = localStorage.getItem('userProfile');
    const storedProfile = profileStr ? JSON.parse(profileStr) : {};
    const [profile, setProfile] = useState(storedProfile);

    const stats = profile?.stats || { str: 5, agi: 5, sta: 5, foc: 5 };

    // Real Data from History
    const { days, xpValues, strValues, workoutFlags } = getLast7DaysData();
    const xpData = xpValues;
    const strengthData = strValues;
    const weeklyWorkouts = workoutFlags;
    const weekDays = days;

    // Derived Stats
    const xpGainedThisWeek = xpValues.length > 0 ? (xpValues[xpValues.length - 1] - xpValues[0]) : 0;
    const totalWorkoutsThisWeek = weeklyWorkouts.reduce((a, b) => a + b, 0);

    // Quest Completion Rate Calculation
    const dailyQuestsStr = localStorage.getItem('dailyQuests');
    const dailyQuests = dailyQuestsStr ? JSON.parse(dailyQuestsStr) : [];
    const completedQuestsCount = dailyQuests.filter((q: any) => q.completed).length;
    const totalQuestsCount = dailyQuests.length || 1;
    const questCompletionRate = Math.round((completedQuestsCount / totalQuestsCount) * 100);

    const handleEditToggle = () => {
        if (!isEditing) {
            setEditTitle(profile?.title || 'Trainee');
        }
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = () => {
        const updated = { ...profile, title: editTitle };
        localStorage.setItem('userProfile', JSON.stringify(updated));
        setProfile(updated);
        setIsEditing(false);
        window.dispatchEvent(new Event('storage'));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                const updated = { ...profile, avatar: base64 };
                setProfile(updated);
                localStorage.setItem('userProfile', JSON.stringify(updated));
                window.dispatchEvent(new Event('storage'));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEquipTitle = (title: string) => {
        const updated = { ...profile, title };
        setProfile(updated);
        localStorage.setItem('userProfile', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const achievements = [
        {
            id: 1,
            title: 'Weakest Trainee',
            description: 'Default title',
            unlocked: true,
            equipped: profile.title === 'Weakest Trainee' || !profile.title
        },
        {
            id: 2,
            title: 'Quest Addict',
            description: 'Complete 50 quests',
            unlocked: (profile.totalQuests || 0) >= 50,
            progress: profile.totalQuests || 0,
            max: 50
        },
        {
            id: 3,
            title: 'Dungeon Master',
            description: 'Clear 20 dungeons',
            unlocked: (profile.totalDungeons || 0) >= 20,
            progress: profile.totalDungeons || 0,
            max: 20
        },
        {
            id: 4,
            title: 'Consistency Demon',
            description: '30-day streak',
            unlocked: (profile.streak || 0) >= 30,
            progress: profile.streak || 0,
            max: 30
        },
        {
            id: 5,
            title: 'Limit Breaker',
            description: 'Reach S-Rank',
            unlocked: profile.rank === 'S',
            progress: profile.rank === 'S' ? 1 : 0,
            max: 1
        },
    ];

    return (
        <div className="min-h-screen bg-background p-4 pb-24">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header & Identity Section */}
                <div className="relative mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="absolute left-0 top-1 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="text-center pt-2">
                        {/* Avatar */}
                        <div className="relative w-24 h-24 mx-auto mb-4 group">
                            <div className="w-full h-full rounded-full bg-gray-800 border-2 border-primary overflow-hidden">
                                {profile.avatar ? (
                                    <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-black">
                                        {user?.username?.[0]?.toUpperCase() || 'S'}
                                    </div>
                                )}
                            </div>

                            {/* Upload Overlay */}
                            <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Upload className="text-white" size={24} />
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        </div>

                        {/* Name & Edit */}
                        {isEditing ? (
                            <div className="flex flex-col items-center gap-2 max-w-xs mx-auto">
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Hunter Title"
                                    className="w-full bg-white/10 border border-primary rounded px-3 py-1 text-center text-sm"
                                />
                                <button
                                    onClick={handleSaveProfile}
                                    className="flex items-center gap-2 px-4 py-1 bg-primary text-black rounded-full font-bold text-sm hover:bg-primary/90"
                                >
                                    <Save size={14} /> Save
                                </button>
                            </div>
                        ) : (
                            <div className="relative inline-block">
                                <h1 className="text-3xl font-heading font-bold mb-1">{user?.username || 'Hunter'}</h1>
                                <p className="text-primary font-bold text-sm tracking-wider uppercase mb-2">
                                    {profile.title || "E-Rank Hunter"}
                                    <button onClick={handleEditToggle} className="ml-2 text-gray-500 hover:text-white inline-block">
                                        <Edit2 size={12} />
                                    </button>
                                </p>
                            </div>
                        )}
                        <p className="text-gray-400 text-sm">Level {profile.level || 1} • {Math.round(stats.str + stats.agi + stats.sta + stats.foc)} Total Stats</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setSelectedTab('stats')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedTab === 'stats'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <BarChart3 size={20} className="inline mr-2" />
                        Stats & Analytics
                    </button>
                    <button
                        onClick={() => setSelectedTab('achievements')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedTab === 'achievements'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Trophy size={20} className="inline mr-2" />
                        Achievements
                    </button>
                </div>

                {/* STATS TAB */}
                {selectedTab === 'stats' && (
                    <div className="space-y-6">

                        {/* XP/Level Graph */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 border border-white/10"
                        >
                            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                <TrendingUp className="text-primary" size={20} />
                                XP Progress (Last 7 Days)
                            </h3>
                            <div className="flex items-end justify-between h-40 gap-2">
                                {xpData.map((xp, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(xp / Math.max(1, Math.max(...xpData))) * 100}%` }}
                                            transition={{ delay: index * 0.1 }}
                                            className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg min-h-[20px]"
                                        />
                                        <span className="text-xs text-gray-400">{weekDays[index]}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Strength Progression */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-6 border border-white/10"
                        >
                            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                <Activity className="text-red-500" size={20} />
                                Strength Progression
                            </h3>
                            <div className="flex items-end justify-between h-32 gap-2">
                                {strengthData.map((str, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(str / Math.max(1, Math.max(...strengthData))) * 100}%` }}
                                            transition={{ delay: index * 0.1 }}
                                            className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t-lg min-h-[20px]"
                                        />
                                        <span className="text-xs text-gray-400">W{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Weekly Workout Heatmap */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6 border border-white/10"
                        >
                            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                <Calendar className="text-primary" size={20} />
                                Weekly Workout Heatmap
                            </h3>
                            <div className="grid grid-cols-7 gap-2">
                                {weeklyWorkouts.map((active, index) => (
                                    <div key={index} className="text-center">
                                        <div
                                            className={`w-full aspect-square rounded-lg ${active ? 'bg-success' : 'bg-white/5'
                                                } flex items-center justify-center mb-2`}
                                        >
                                            {active ? <Flame className="text-white" size={20} /> : null}
                                        </div>
                                        <span className="text-xs text-gray-400">{weekDays[index]}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats Comparison */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Quest Completion Rate */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass-card p-6 border border-white/10"
                            >
                                <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                    <Target className="text-primary" size={20} />
                                    Quest Completion
                                </h3>
                                <div className="text-center">
                                    <div className="text-5xl font-heading font-bold text-primary mb-2">{questCompletionRate}%</div>
                                    <div className="text-sm text-gray-400">Today</div>
                                </div>
                            </motion.div>

                            {/* Stamina Index */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-card p-6 border border-white/10"
                            >
                                <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                    <Activity className="text-green-500" size={20} />
                                    Stamina Index
                                </h3>
                                <div className="text-center">
                                    <div className="text-5xl font-heading font-bold text-green-500 mb-2">{stats.sta}</div>
                                    <div className="text-sm text-gray-400">Current Level</div>
                                    <div className="mt-4">
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                                style={{ width: `${Math.min((stats.sta / 100) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* This Week Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-card p-6 border border-white/10"
                        >
                            <h3 className="text-lg font-heading font-bold mb-4">This Week Estimates</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-sm text-gray-400 mb-2">Workouts</div>
                                    <div className="text-2xl font-bold text-primary">{totalWorkoutsThisWeek}</div>
                                    <div className="text-xs text-gray-500 mt-1">Active Days</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-400 mb-2">Rough XP Gained</div>
                                    <div className="text-2xl font-bold text-primary">{Math.max(0, xpGainedThisWeek)}</div>
                                    <div className="text-xs text-gray-500 mt-1">Based on history</div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                )}

                {/* ACHIEVEMENTS TAB */}
                {selectedTab === 'achievements' && (
                    <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-4 border border-white/10 flex items-center gap-4"
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${achievement.unlocked ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-600'
                                    }`}>
                                    <Award size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                                            {achievement.title}
                                        </h4>
                                        {achievement.unlocked && achievement.equipped && (
                                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                                Equipped
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

                                    {!achievement.unlocked && achievement.progress !== undefined && achievement.max && (
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-400">Progress</span>
                                                <span className="text-primary font-bold">{achievement.progress} / {achievement.max}</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                                    style={{ width: `${(achievement.progress / achievement.max) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {achievement.unlocked && !achievement.equipped && (
                                        <button
                                            onClick={() => handleEquipTitle(achievement.title)}
                                            className="text-xs text-primary hover:underline flex items-center gap-1"
                                        >
                                            <Edit2 size={12} />
                                            Equip Title
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Profile;
