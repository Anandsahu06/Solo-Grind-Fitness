import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Dumbbell,
    Zap,
    Flame,
    Clock,
    Trophy,
    TrendingUp,
    Lock,
    Star,
    ChevronLeft
} from 'lucide-react';
import { useGame } from '../context/GameContext';

interface DungeonType {
    id: string;
    name: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hell';
    duration: string;
    xpReward: number;
    exercises: string[];
    stats: { stat: string; boost: number }[];
    locked: boolean;
    icon: any;
    color: string;
    description: string;
}

const Dungeon: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useGame();

    // Get user level from localStorage profile
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userLevel = profile?.level || user?.level || 1;

    const dungeons: DungeonType[] = [
        {
            id: 'beginner',
            name: 'Beginner Dungeon',
            difficulty: 'Beginner',
            duration: '15 mins',
            xpReward: 100,
            exercises: ['10 Push-ups', '15 Squats', '20 Jumping Jacks', '30s Plank', '10 Lunges'],
            stats: [
                { stat: 'STR', boost: 2 },
                { stat: 'STA', boost: 3 }
            ],
            locked: false,
            icon: Dumbbell,
            color: 'from-green-500 to-emerald-600',
            description: 'Perfect for starting your fitness journey'
        },
        {
            id: 'warrior',
            name: 'Warrior Dungeon',
            difficulty: 'Intermediate',
            duration: '30 mins',
            xpReward: 250,
            exercises: ['20 Push-ups', '30 Squats', '15 Burpees', '1min Plank', '20 Mountain Climbers', '15 Jump Squats'],
            stats: [
                { stat: 'STR', boost: 5 },
                { stat: 'AGI', boost: 3 },
                { stat: 'STA', boost: 4 }
            ],
            locked: false,
            icon: Zap,
            color: 'from-blue-500 to-cyan-600',
            description: 'Challenge yourself with intense exercises'
        },
        {
            id: 'hell',
            name: 'Hell Mode Dungeon',
            difficulty: 'Hell',
            duration: '45+ mins',
            xpReward: 500,
            exercises: ['50 Push-ups', '50 Squats', '30 Burpees', '2min Plank', '40 Mountain Climbers', '30 Jump Squats', '20 Pull-ups', '50 Sit-ups'],
            stats: [
                { stat: 'STR', boost: 10 },
                { stat: 'AGI', boost: 8 },
                { stat: 'STA', boost: 12 },
                { stat: 'FOC', boost: 5 }
            ],
            locked: false,
            icon: Flame,
            color: 'from-red-500 to-orange-600',
            description: 'Only for the strongest hunters'
        },
        {
            id: 'custom',
            name: 'Custom Dungeon',
            difficulty: 'Advanced',
            duration: 'Variable',
            xpReward: 300,
            exercises: ['Create your own workout'],
            stats: [
                { stat: 'ALL', boost: 5 }
            ],
            locked: userLevel < 20,
            icon: Star,
            color: 'from-purple-500 to-pink-600',
            description: 'Unlock at Level 20 - Design your perfect workout'
        }
    ];

    const handleStartDungeon = (dungeon: DungeonType) => {
        if (dungeon.locked) {
            return;
        }

        // Navigate to custom dungeon creator if it's the custom dungeon
        if (dungeon.id === 'custom') {
            navigate('/dungeon/custom');
            return;
        }

        // Sanitize dungeon object: Remove 'icon' component as it's not serializable
        // We only pass data that can be cloned (strings, numbers, arrays)
        const { icon, ...dungeonData } = dungeon;

        // Navigate to active dungeon with sanitized data
        navigate('/dungeon/active', { state: { dungeon: dungeonData } });
    };

    const getDifficultyColor = (difficulty: string) => {
        const colors: any = {
            'Beginner': 'text-green-500',
            'Intermediate': 'text-blue-500',
            'Advanced': 'text-purple-500',
            'Hell': 'text-red-500'
        };
        return colors[difficulty] || 'text-gray-500';
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-24">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="text-center absolute left-0 right-0 pointer-events-none">
                        <h1 className="text-3xl font-heading font-bold mb-2 pointer-events-auto">Dungeon Selection</h1>
                        <p className="text-gray-400 pointer-events-auto">Choose your workout and start grinding</p>
                    </div>

                    {/* Spacer to balance the flex layout */}
                    <div className="w-10"></div>
                </div>

                {/* Dungeon Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {dungeons.map((dungeon, index) => (
                        <motion.div
                            key={dungeon.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass-card p-6 border transition-all ${dungeon.locked
                                ? 'border-white/10 opacity-60'
                                : 'border-white/10 hover:border-primary/50 cursor-pointer'
                                }`}
                            onClick={() => handleStartDungeon(dungeon)}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${dungeon.color} flex items-center justify-center shadow-lg`}>
                                        <dungeon.icon className="text-white" size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-heading font-bold">{dungeon.name}</h3>
                                        <p className={`text-sm font-bold ${getDifficultyColor(dungeon.difficulty)}`}>
                                            {dungeon.difficulty}
                                        </p>
                                    </div>
                                </div>
                                {dungeon.locked && (
                                    <Lock className="text-gray-500" size={20} />
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-400 mb-4">{dungeon.description}</p>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="text-primary" size={16} />
                                    <span className="text-sm text-gray-300">{dungeon.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="text-primary" size={16} />
                                    <span className="text-sm text-gray-300">+{dungeon.xpReward} XP</span>
                                </div>
                            </div>

                            {/* Stat Boosts */}
                            <div className="mb-4">
                                <div className="text-xs text-gray-400 mb-2">Stat Boosts:</div>
                                <div className="flex flex-wrap gap-2">
                                    {dungeon.stats.map((stat) => (
                                        <div
                                            key={stat.stat}
                                            className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-primary"
                                        >
                                            {stat.stat} +{stat.boost}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Exercises Preview */}
                            <div className="mb-4">
                                <div className="text-xs text-gray-400 mb-2">Exercises ({dungeon.exercises.length}):</div>
                                <div className="space-y-1">
                                    {dungeon.exercises.slice(0, 3).map((exercise, i) => (
                                        <div key={i} className="text-xs text-gray-300 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-primary" />
                                            {exercise}
                                        </div>
                                    ))}
                                    {dungeon.exercises.length > 3 && (
                                        <div className="text-xs text-gray-500">
                                            +{dungeon.exercises.length - 3} more...
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            {dungeon.locked ? (
                                <button
                                    disabled
                                    className="btn-primary w-full opacity-50 cursor-not-allowed"
                                >
                                    <Lock size={16} className="inline mr-2" />
                                    Locked - Reach Level 20
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartDungeon(dungeon);
                                    }}
                                    className={`btn-primary w-full bg-gradient-to-r ${dungeon.color}`}
                                >
                                    Enter Dungeon
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Tips Card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-4 border border-primary/30 bg-primary/5"
                >
                    <div className="flex items-start gap-3">
                        <TrendingUp className="text-primary flex-shrink-0" size={20} />
                        <div className="text-sm">
                            <p className="text-gray-300 mb-1">
                                <span className="font-bold text-white">Pro Tip:</span> Complete dungeons consistently to unlock higher difficulty levels and custom workouts!
                            </p>
                            <p className="text-gray-400 text-xs">
                                Each dungeon completion increases your stats and brings you closer to ranking up.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Dungeon;
