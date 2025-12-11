import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Zap,
    Target,
    Dumbbell,
    Flame,
    Users,
    Trophy,
    ArrowRight,
    Sparkles,
    Shield,
    TrendingUp,
    Brain
} from 'lucide-react';
import Footer from '../components/Footer';
import SupportFab from '../components/SupportFab';
import InstallButton from '../components/InstallButton';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: TrendingUp,
            title: 'Level & XP System',
            description: 'Gain XP from every workout and quest. Watch your level rise from 1 to infinity.',
            color: 'from-primary to-blue-500'
        },
        {
            icon: Target,
            title: 'Daily Quests',
            description: 'Complete bite-sized fitness challenges every day. Build unstoppable momentum.',
            color: 'from-secondary to-pink-500'
        },
        {
            icon: Dumbbell,
            title: 'Dungeons (Workouts)',
            description: 'Enter workout dungeons. Clear them to earn massive XP and stat boosts.',
            color: 'from-danger to-orange-500'
        },
        {
            icon: Flame,
            title: 'Streak Progression',
            description: 'Maintain your daily streak. Unlock exclusive titles and rewards.',
            color: 'from-success to-emerald-500'
        },
        {
            icon: Users,
            title: 'Guild Leaderboards',
            description: 'Join a guild. Compete with friends. Dominate the global rankings.',
            color: 'from-cyan-400 to-primary'
        },
        {
            icon: Trophy,
            title: 'Achievements & Titles',
            description: 'Unlock rare titles. Show off your dedication. Become a legend.',
            color: 'from-yellow-400 to-orange-500'
        },
    ];

    const whyItWorks = [
        {
            icon: Brain,
            title: 'Dopamine-Driven',
            description: 'Every workout triggers reward systems in your brain, making fitness addictive.'
        },
        {
            icon: Sparkles,
            title: 'Instant Feedback',
            description: 'See XP bars fill, stats increase, and levels rise in real-time.'
        },
        {
            icon: Shield,
            title: 'Consistency Over Intensity',
            description: 'Small daily wins compound into massive transformations over time.'
        },
    ];

    return (
        <div className="min-h-screen bg-background text-white overflow-x-hidden">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/sologrind.png" alt="Solo Grind" className="h-10 w-auto object-contain" />
                        <span className="font-heading font-bold text-lg tracking-wider">SOLO GRIND</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <InstallButton />
                        <button
                            onClick={() => navigate('/auth')}
                            className="text-sm text-primary hover:text-white transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-8">
                            <Sparkles size={16} className="text-primary" />
                            <span className="text-sm text-primary font-bold">THE SYSTEM HAS AWAKENED</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-black mb-6 leading-tight">
                            Awaken Your System.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                                Level Up Your Reality.
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Turn your fitness journey into an RPG-like leveling system. Start as an F-Rank weakling, become an S-Rank legend.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => navigate('/auth?mode=signup')}
                                className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.5)]"
                            >
                                Start as F-Rank
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate('/auth')}
                                className="btn-secondary text-lg px-8 py-4"
                            >
                                Login
                            </button>
                        </div>

                        {/* Stats Preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass-card p-4"
                            >
                                <div className="text-3xl font-bold text-primary">10K+</div>
                                <div className="text-xs text-gray-500">Active Hunters</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass-card p-4"
                            >
                                <div className="text-3xl font-bold text-secondary">500M+</div>
                                <div className="text-xs text-gray-500">XP Earned</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="glass-card p-4"
                            >
                                <div className="text-3xl font-bold text-success">98%</div>
                                <div className="text-xs text-gray-500">Consistency Rate</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-primary rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
                            Your <span className="text-primary">System</span> Features
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything you need to transform your fitness journey into an epic adventure.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass-card p-6 border border-white/10 hover:border-primary/30 transition-all cursor-pointer group"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-heading">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo UI Mock */}
            <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
                            See It In <span className="text-primary">Action</span>
                        </h2>
                        <p className="text-gray-400 text-lg">
                            A glimpse into your hunter dashboard.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 border border-primary/20 shadow-[0_0_50px_rgba(0,243,255,0.1)]"
                    >
                        {/* Mock Dashboard */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold font-heading">HUNTER STATUS</h3>
                                <p className="text-sm text-gray-400">ShadowMonarch</p>
                            </div>
                            <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center bg-black/50 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                                <span className="text-3xl font-heading font-bold text-primary">F</span>
                            </div>
                        </div>

                        {/* XP Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs mb-2">
                                <span>Level 1</span>
                                <span>45 / 100 XP</span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '45%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Strength: 5', 'Agility: 5', 'Stamina: 5', 'Focus: 5'].map((stat, i) => (
                                <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
                                    <span className="text-sm text-gray-300">{stat}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why It Works */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
                            Why It <span className="text-success">Works</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Backed by psychology and proven by thousands of hunters.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {whyItWorks.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4">
                                    <item.icon size={28} className="text-success" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-heading">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <button
                            onClick={() => navigate('/auth?mode=signup')}
                            className="btn-primary text-xl px-12 py-5 inline-flex items-center gap-3 group shadow-[0_0_40px_rgba(0,243,255,0.3)]"
                        >
                            Begin Your Journey
                            <Zap size={24} className="group-hover:rotate-12 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
            <SupportFab />

        </div>
    );
};

export default Landing;
