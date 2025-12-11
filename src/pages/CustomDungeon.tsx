import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Trash2,
    Clock,
    Trophy,
    ChevronLeft,
    Dumbbell
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Exercise {
    id: string;
    name: string;
    reps: string;
}

const CustomDungeon: React.FC = () => {
    const navigate = useNavigate();
    const [dungeonName, setDungeonName] = useState('');
    const [duration, setDuration] = useState('30');
    const [exercises, setExercises] = useState<Exercise[]>([
        { id: '1', name: '', reps: '' }
    ]);

    const addExercise = () => {
        const newExercise: Exercise = {
            id: Date.now().toString(),
            name: '',
            reps: ''
        };
        setExercises([...exercises, newExercise]);
    };

    const removeExercise = (id: string) => {
        if (exercises.length > 1) {
            setExercises(exercises.filter(ex => ex.id !== id));
        }
    };

    const updateExercise = (id: string, field: 'name' | 'reps', value: string) => {
        setExercises(exercises.map(ex =>
            ex.id === id ? { ...ex, [field]: value } : ex
        ));
    };

    const handleStartDungeon = () => {
        // Validation
        if (!dungeonName.trim()) {
            toast.error('Please enter a dungeon name');
            return;
        }

        const validExercises = exercises.filter(ex => ex.name.trim() && ex.reps.trim());
        if (validExercises.length === 0) {
            toast.error('Please add at least one exercise');
            return;
        }

        // Create custom dungeon data
        const customDungeon = {
            id: 'custom',
            name: dungeonName,
            difficulty: 'Advanced' as const,
            duration: `${duration} mins`,
            xpReward: Math.floor(validExercises.length * 50),
            exercises: validExercises.map(ex => `${ex.reps} ${ex.name}`),
            stats: [{ stat: 'ALL', boost: 5 }],
            locked: false,
            color: 'from-purple-500 to-pink-600',
            description: 'Your custom workout'
        };

        // Navigate to active dungeon
        navigate('/dungeon/active', { state: { dungeon: customDungeon } });
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-24">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-heading font-bold">Custom Dungeon</h1>
                        <p className="text-sm md:text-base text-gray-400">Design your perfect workout</p>
                    </div>
                </div>

                {/* Dungeon Name */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-4 md:p-6 border border-primary/30"
                >
                    <label className="block text-sm font-bold mb-2">Dungeon Name</label>
                    <input
                        type="text"
                        value={dungeonName}
                        onChange={(e) => setDungeonName(e.target.value)}
                        placeholder="e.g., Morning Grind, Evening Burn"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                        maxLength={50}
                    />
                </motion.div>

                {/* Duration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-4 md:p-6 border border-primary/30"
                >
                    <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        Estimated Duration (minutes)
                    </label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        min="5"
                        max="120"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                    />
                </motion.div>

                {/* Exercises */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-4 md:p-6 border border-primary/30"
                >
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-bold flex items-center gap-2">
                            <Dumbbell size={16} className="text-primary" />
                            Exercises ({exercises.length})
                        </label>
                        <button
                            onClick={addExercise}
                            className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg transition-colors text-sm"
                        >
                            <Plus size={16} />
                            <span className="hidden sm:inline">Add Exercise</span>
                        </button>
                    </div>

                    <div className="space-y-3">
                        {exercises.map((exercise) => (
                            <div key={exercise.id} className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={exercise.name}
                                        onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                                        placeholder="Exercise name (e.g., Push-ups)"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={exercise.reps}
                                        onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                                        placeholder="Reps/Time"
                                        className="w-24 sm:w-32 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                                    />
                                    <button
                                        onClick={() => removeExercise(exercise.id)}
                                        disabled={exercises.length === 1}
                                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-4 md:p-6 border border-primary/30 bg-primary/5"
                >
                    <div className="flex items-start gap-3">
                        <Trophy className="text-primary flex-shrink-0" size={20} />
                        <div className="text-sm">
                            <p className="text-white font-bold mb-1">Rewards</p>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                XP: <span className="text-primary font-bold">{Math.floor(exercises.filter(ex => ex.name.trim()).length * 50)}</span>
                            </p>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                Stats: <span className="text-primary font-bold">ALL +5</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn-secondary flex-1 py-3"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleStartDungeon}
                        className="btn-primary flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600"
                    >
                        Start Custom Dungeon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomDungeon;
