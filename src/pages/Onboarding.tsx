import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Zap, Target, Clock, Trophy, Heart, Dumbbell, TrendingUp, Activity } from 'lucide-react';

type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type FitnessGoal = 'Strength' | 'Endurance' | 'Weight Loss' | 'Aesthetics' | 'General Health';
type WorkoutTime = '10-15 mins' | '20-30 mins' | '40+ mins';
type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say';

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [gender, setGender] = useState<Gender | ''>('');
    const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal | ''>('');
    const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel | ''>('');
    const [workoutTime, setWorkoutTime] = useState<WorkoutTime | ''>('');

    const handleNext = () => {
        if (step === 5) {
            // Calculate starting stats based on selections
            calculateAndInitialize();
        } else {
            setStep(prev => prev + 1);
        }
    };

    const calculateAndInitialize = () => {
        // Calculate base stats based on fitness level and goal
        const baseStats = {
            Beginner: { str: 5, agi: 5, sta: 5, foc: 5 },
            Intermediate: { str: 10, agi: 10, sta: 10, foc: 10 },
            Advanced: { str: 15, agi: 15, sta: 15, foc: 15 }
        };

        const stats = baseStats[fitnessLevel as FitnessLevel] || baseStats.Beginner;

        // Adjust stats based on goal
        if (fitnessGoal === 'Strength') {
            stats.str += 3;
        } else if (fitnessGoal === 'Endurance') {
            stats.sta += 3;
        } else if (fitnessGoal === 'Weight Loss') {
            stats.agi += 2;
            stats.sta += 1;
        } else if (fitnessGoal === 'Aesthetics') {
            stats.str += 2;
            stats.agi += 1;
        }

        // Store in localStorage for now (will be saved to backend later)
        localStorage.setItem('userProfile', JSON.stringify({
            name,
            gender,
            fitnessGoal,
            fitnessLevel,
            workoutTime,
            stats,
            rank: fitnessLevel === 'Advanced' ? 'E' : 'F',
            level: 1,
            xp: 0
        }));

        // Move to system booting animation
        setStep(6);

        // Navigate to dashboard after animation
        setTimeout(() => {
            navigate('/dashboard');
        }, 4000);
    };

    const variants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    const fitnessGoals = [
        { value: 'Strength' as FitnessGoal, icon: Dumbbell, color: 'from-red-500 to-orange-500', desc: 'Build muscle & power' },
        { value: 'Endurance' as FitnessGoal, icon: Activity, color: 'from-blue-500 to-cyan-500', desc: 'Improve stamina' },
        { value: 'Weight Loss' as FitnessGoal, icon: TrendingUp, color: 'from-green-500 to-emerald-500', desc: 'Burn fat & get lean' },
        { value: 'Aesthetics' as FitnessGoal, icon: Trophy, color: 'from-purple-500 to-pink-500', desc: 'Look your best' },
        { value: 'General Health' as FitnessGoal, icon: Heart, color: 'from-primary to-secondary', desc: 'Overall wellness' },
    ];

    return (
        <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]" />

            <div className="z-10 w-full max-w-md">
                <AnimatePresence mode="wait">

                    {/* STEP 0: WELCOME */}
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,243,255,0.4)]"
                            >
                                <span className="text-4xl font-heading font-bold text-black">S</span>
                            </motion.div>
                            <h1 className="text-3xl font-heading font-bold mb-4">
                                THE SYSTEM HAS CHOSEN YOU.
                            </h1>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Your daily life is about to become a game. Complete quests, clear dungeons, and rise from <span className="text-white font-bold">F-Rank</span> to <span className="text-primary font-bold shadow-neon">S-Rank</span>.
                            </p>
                            <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2 group">
                                BEGIN CALIBRATION
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 1: NAME */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h2 className="text-xl font-heading text-primary mb-2">STEP 1/5 • IDENTIFICATION</h2>
                            <h1 className="text-3xl font-bold mb-8">What should we call you?</h1>

                            <div className="mb-8">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xl focus:border-primary focus:outline-none transition-colors text-center font-heading tracking-widest"
                                    autoFocus
                                />
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!name.trim()}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                CONTINUE
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: GENDER (Optional) */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h2 className="text-xl font-heading text-primary mb-2">STEP 2/5 • PROFILE</h2>
                            <h1 className="text-3xl font-bold mb-4">Gender</h1>
                            <p className="text-sm text-gray-400 mb-8">Optional - helps personalize your experience</p>

                            <div className="space-y-3 mb-8">
                                {(['Male', 'Female', 'Other', 'Prefer not to say'] as Gender[]).map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => setGender(g)}
                                        className={`w-full p-4 rounded-xl border transition-all ${gender === g
                                                ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="font-bold">{g}</div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="btn-primary w-full"
                            >
                                CONTINUE
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 3: FITNESS GOAL */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h2 className="text-xl font-heading text-primary mb-2">STEP 3/5 • OBJECTIVE</h2>
                            <h1 className="text-3xl font-bold mb-8">What's Your Goal?</h1>

                            <div className="space-y-3 mb-8">
                                {fitnessGoals.map((goal) => (
                                    <button
                                        key={goal.value}
                                        onClick={() => setFitnessGoal(goal.value)}
                                        className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${fitnessGoal === goal.value
                                                ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full bg-gradient-to-br ${goal.color}`}>
                                            <goal.icon size={24} className="text-white" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <div className="font-bold">{goal.value}</div>
                                            <div className="text-xs text-gray-400">{goal.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!fitnessGoal}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                CONTINUE
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 4: FITNESS LEVEL */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h2 className="text-xl font-heading text-primary mb-2">STEP 4/5 • CALIBRATION</h2>
                            <h1 className="text-3xl font-bold mb-8">Current Power Level?</h1>

                            <div className="space-y-4 mb-8">
                                {[
                                    { level: 'Beginner' as FitnessLevel, icon: Shield, desc: 'Just starting out' },
                                    { level: 'Intermediate' as FitnessLevel, icon: Zap, desc: 'Regular training' },
                                    { level: 'Advanced' as FitnessLevel, icon: Target, desc: 'Experienced athlete' },
                                ].map(({ level, icon: Icon, desc }) => (
                                    <button
                                        key={level}
                                        onClick={() => setFitnessLevel(level)}
                                        className={`w-full p-6 rounded-xl border flex items-center gap-4 transition-all ${fitnessLevel === level
                                                ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full ${fitnessLevel === level ? 'bg-primary text-black' : 'bg-white/10 text-gray-400'}`}>
                                            <Icon size={24} />
                                        </div>
                                        <div className="text-left">
                                            <div className={`font-bold text-lg ${fitnessLevel === level ? 'text-white' : 'text-gray-300'}`}>{level}</div>
                                            <div className="text-xs text-gray-500">{desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!fitnessLevel}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                CONTINUE
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 5: WORKOUT TIME */}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <h2 className="text-xl font-heading text-primary mb-2">STEP 5/5 • TIME ALLOCATION</h2>
                            <h1 className="text-3xl font-bold mb-8">Available Workout Time?</h1>

                            <div className="space-y-4 mb-8">
                                {[
                                    { time: '10-15 mins' as WorkoutTime, desc: 'Quick sessions' },
                                    { time: '20-30 mins' as WorkoutTime, desc: 'Balanced routine' },
                                    { time: '40+ mins' as WorkoutTime, desc: 'Full workouts' },
                                ].map(({ time, desc }) => (
                                    <button
                                        key={time}
                                        onClick={() => setWorkoutTime(time)}
                                        className={`w-full p-6 rounded-xl border flex items-center gap-4 transition-all ${workoutTime === time
                                                ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-full ${workoutTime === time ? 'bg-primary text-black' : 'bg-white/10 text-gray-400'}`}>
                                            <Clock size={24} />
                                        </div>
                                        <div className="text-left">
                                            <div className={`font-bold text-lg ${workoutTime === time ? 'text-white' : 'text-gray-300'}`}>{time}</div>
                                            <div className="text-xs text-gray-500">{desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!workoutTime}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                INITIALIZE SYSTEM
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 6: SYSTEM BOOTING */}
                    {step === 6 && (
                        <motion.div
                            key="step6"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="text-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full mx-auto mb-8"
                            />

                            <h2 className="text-3xl font-heading font-bold animate-pulse text-primary mb-6">
                                SYSTEM BOOTING...
                            </h2>

                            <div className="space-y-3 text-left max-w-sm mx-auto font-mono text-sm">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-success"
                                >
                                    ✓ Analyzing user profile...
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="text-success"
                                >
                                    ✓ Calculating base stats...
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                    className="text-success"
                                >
                                    ✓ Assigning starting rank: {fitnessLevel === 'Advanced' ? 'E' : 'F'}-Rank
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                    className="text-success"
                                >
                                    ✓ Generating Day 1 quests...
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.5 }}
                                    className="text-success"
                                >
                                    ✓ Unlocking beginner dungeon...
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 3 }}
                                    className="text-primary font-bold"
                                >
                                    ✓ SYSTEM READY. WELCOME, {name.toUpperCase()}.
                                </motion.p>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default Onboarding;
