import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Shield, Zap, Target } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import PasswordStrength from '../components/PasswordStrength';

type AuthMode = 'login' | 'signup' | 'forgot';
type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';

const avatars = [
    { id: 1, name: 'Shadow Warrior', emoji: '🥷' },
    { id: 2, name: 'Iron Knight', emoji: '⚔️' },
    { id: 3, name: 'Speed Demon', emoji: '⚡' },
    { id: 4, name: 'Mystic Sage', emoji: '🧙' },
    { id: 5, name: 'Dragon Slayer', emoji: '🐉' },
    { id: 6, name: 'Phoenix Rising', emoji: '🔥' },
];

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [mode, setMode] = useState<AuthMode>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);
    const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel | ''>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error('Please enter a valid email');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authAPI.login({
                email: formData.email,
                password: formData.password
            });

            login(response.data.token, response.data.user);
            toast.success('Welcome back, Hunter!');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error('Please enter a valid email');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!fitnessLevel) {
            toast.error('Please select your fitness level');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authAPI.register({
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                avatar: selectedAvatar,
                fitnessLevel: fitnessLevel
            });

            login(response.data.token, response.data.user);
            toast.success('Account created! The System has chosen you.');
            setTimeout(() => navigate('/onboarding'), 1000);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Signup failed. Please try again.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email) {
            toast.error('Please enter your email');
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error('Please enter a valid email');
            return;
        }

        setIsLoading(true);
        try {
            await authAPI.forgotPassword(formData.email);
            toast.success('Password reset link sent to your email!');
            setTimeout(() => setMode('login'), 2000);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to send reset email.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return (
        <div className="min-h-screen bg-background text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Toaster */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1a1a24',
                        color: '#fff',
                        border: '1px solid rgba(0, 243, 255, 0.3)',
                        borderRadius: '12px',
                        padding: '16px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#0aff60',
                            secondary: '#1a1a24',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ff003c',
                            secondary: '#1a1a24',
                        },
                    },
                }}
            />

            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow" />
            </div>

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-4 left-4 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft size={20} />
                <span className="text-sm">Back to Home</span>
            </button>

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-md">
                <AnimatePresence mode="wait">

                    {/* LOGIN */}
                    {mode === 'login' && (
                        <motion.div
                            key="login"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="glass-card p-8 border border-white/10"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(0,243,255,0.4)]">
                                    <span className="text-3xl font-heading font-bold text-black">S</span>
                                </div>
                                <h1 className="text-3xl font-heading font-bold mb-2">Welcome Back</h1>
                                <p className="text-gray-400">Enter your credentials to continue</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="hunter@sologrind.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => setMode('forgot')}
                                        className="text-sm text-primary hover:underline"
                                        disabled={isLoading}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <LoadingSpinner size="sm" />
                                            <span>Logging in...</span>
                                        </div>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-400">
                                Don't have an account?{' '}
                                <button onClick={() => setMode('signup')} className="text-primary hover:underline" disabled={isLoading}>
                                    Sign up
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* SIGN UP */}
                    {mode === 'signup' && (
                        <motion.div
                            key="signup"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="glass-card p-8 border border-white/10 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-heading font-bold mb-2">Join the System</h1>
                                <p className="text-gray-400">Create your hunter profile</p>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-4">
                                {/* Avatar Selection */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">Choose Your Avatar</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {avatars.map((avatar) => (
                                            <button
                                                key={avatar.id}
                                                type="button"
                                                onClick={() => setSelectedAvatar(avatar.id)}
                                                className={`p-4 rounded-xl border transition-all ${selectedAvatar === avatar.id
                                                    ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    }`}
                                                disabled={isLoading}
                                            >
                                                <div className="text-4xl mb-2">{avatar.emoji}</div>
                                                <div className="text-xs text-gray-400">{avatar.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Username</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            placeholder="shadow_hunter"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="hunter@sologrind.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <PasswordStrength password={formData.password} />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Fitness Level */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-3">Fitness Level</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { level: 'Beginner' as FitnessLevel, icon: Shield },
                                            { level: 'Intermediate' as FitnessLevel, icon: Zap },
                                            { level: 'Advanced' as FitnessLevel, icon: Target },
                                        ].map(({ level, icon: Icon }) => (
                                            <button
                                                key={level}
                                                type="button"
                                                onClick={() => setFitnessLevel(level)}
                                                className={`p-3 rounded-xl border transition-all ${fitnessLevel === level
                                                    ? 'bg-primary/20 border-primary'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    }`}
                                                disabled={isLoading}
                                            >
                                                <Icon size={20} className="mx-auto mb-1" />
                                                <div className="text-xs">{level}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <LoadingSpinner size="sm" />
                                            <span>Creating Account...</span>
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-400">
                                Already have an account?{' '}
                                <button onClick={() => setMode('login')} className="text-primary hover:underline" disabled={isLoading}>
                                    Login
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* FORGOT PASSWORD */}
                    {mode === 'forgot' && (
                        <motion.div
                            key="forgot"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="glass-card p-8 border border-white/10"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-secondary/20 border border-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lock className="text-secondary" size={28} />
                                </div>
                                <h1 className="text-3xl font-heading font-bold mb-2">Reset Password</h1>
                                <p className="text-gray-400">Enter your email to receive a reset link</p>
                            </div>

                            <form onSubmit={handleForgotPassword} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="hunter@sologrind.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:border-primary focus:outline-none transition-colors"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary w-full bg-secondary hover:bg-purple-600 shadow-[0_0_15px_rgba(188,19,254,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <LoadingSpinner size="sm" />
                                            <span>Sending...</span>
                                        </div>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-400">
                                Remember your password?{' '}
                                <button onClick={() => setMode('login')} className="text-primary hover:underline" disabled={isLoading}>
                                    Back to login
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
};

export default Auth;
