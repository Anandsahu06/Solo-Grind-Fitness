import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Bell,
    Palette,
    Trash2,
    Shield,
    Edit2,
    Save,
    AlertTriangle,
    ChevronLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState<'profile' | 'notifications' | 'theme' | 'account'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Profile states
    const [name, setName] = useState(user?.name || '');
    const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 1);

    // Notification states
    const [notifications, setNotifications] = useState({
        questReminders: true,
        streakWarnings: true,
        dungeonReminder: false,
        guildUpdates: true
    });

    // Theme state
    const [theme, setTheme] = useState<'dark' | 'neon'>('dark');

    const avatars = [
        { id: 1, emoji: '🥷' },
        { id: 2, emoji: '⚔️' },
        { id: 3, emoji: '⚡' },
        { id: 4, emoji: '🧙' },
        { id: 5, emoji: '🐉' },
        { id: 6, emoji: '🔥' }
    ];

    const handleSaveProfile = () => {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleDeleteAccount = () => {
        // In real app, this would call API
        toast.success('Account deleted');
        logout();
        navigate('/');
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
                    <h1 className="text-3xl font-heading font-bold mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account and preferences</p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                    <button
                        onClick={() => setSelectedTab('profile')}
                        className={`py-3 rounded-xl font-bold transition-all ${selectedTab === 'profile'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <User size={20} className="inline mr-2" />
                        Profile
                    </button>
                    <button
                        onClick={() => setSelectedTab('notifications')}
                        className={`py-3 rounded-xl font-bold transition-all ${selectedTab === 'notifications'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Bell size={20} className="inline mr-2" />
                        Notifications
                    </button>
                    <button
                        onClick={() => setSelectedTab('theme')}
                        className={`py-3 rounded-xl font-bold transition-all ${selectedTab === 'theme'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Palette size={20} className="inline mr-2" />
                        Theme
                    </button>
                    <button
                        onClick={() => setSelectedTab('account')}
                        className={`py-3 rounded-xl font-bold transition-all ${selectedTab === 'account'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Shield size={20} className="inline mr-2" />
                        Account
                    </button>
                </div>

                {/* PROFILE TAB */}
                {selectedTab === 'profile' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="glass-card p-6 border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-heading font-bold">Edit Profile</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-primary hover:underline flex items-center gap-2"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSaveProfile}
                                        className="btn-primary px-4 py-2 text-sm"
                                    >
                                        <Save size={16} className="inline mr-2" />
                                        Save
                                    </button>
                                )}
                            </div>

                            {/* Avatar Selection */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-3">Avatar</label>
                                <div className="grid grid-cols-6 gap-3">
                                    {avatars.map((avatar) => (
                                        <button
                                            key={avatar.id}
                                            onClick={() => isEditing && setSelectedAvatar(avatar.id)}
                                            disabled={!isEditing}
                                            className={`p-4 rounded-xl border transition-all ${selectedAvatar === avatar.id
                                                ? 'bg-primary/20 border-primary'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                } ${!isEditing && 'opacity-50 cursor-not-allowed'}`}
                                        >
                                            <div className="text-3xl">{avatar.emoji}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Email (Read-only) */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 opacity-50 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* NOTIFICATIONS TAB */}
                {selectedTab === 'notifications' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 border border-white/10"
                    >
                        <h3 className="text-lg font-heading font-bold mb-6">Notification Preferences</h3>

                        <div className="space-y-4">
                            {[
                                { key: 'questReminders', label: 'Quest Reminders', desc: 'Get notified about incomplete daily quests' },
                                { key: 'streakWarnings', label: 'Streak Warnings', desc: 'Alert when your streak is about to break' },
                                { key: 'dungeonReminder', label: 'Dungeon Reminder', desc: 'Daily reminder to complete a dungeon' },
                                { key: 'guildUpdates', label: 'Guild Updates', desc: 'Notifications about guild activities' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                    <div>
                                        <div className="font-bold mb-1">{item.label}</div>
                                        <div className="text-sm text-gray-400">{item.desc}</div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications({
                                            ...notifications,
                                            [item.key]: !notifications[item.key as keyof typeof notifications]
                                        })}
                                        className={`w-12 h-6 rounded-full transition-all ${notifications[item.key as keyof typeof notifications]
                                            ? 'bg-primary'
                                            : 'bg-white/10'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications[item.key as keyof typeof notifications]
                                            ? 'translate-x-6'
                                            : 'translate-x-0.5'
                                            }`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* THEME TAB */}
                {selectedTab === 'theme' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 border border-white/10"
                    >
                        <h3 className="text-lg font-heading font-bold mb-6">Theme Selection</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-6 rounded-xl border-2 transition-all ${theme === 'dark'
                                    ? 'border-primary bg-primary/10'
                                    : 'border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <div className="w-full h-32 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-4" />
                                <div className="font-bold">Dark Mode</div>
                                <div className="text-sm text-gray-400">Classic dark theme</div>
                            </button>

                            <button
                                onClick={() => setTheme('neon')}
                                className={`p-6 rounded-xl border-2 transition-all ${theme === 'neon'
                                    ? 'border-primary bg-primary/10'
                                    : 'border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <div className="w-full h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg mb-4" />
                                <div className="font-bold">Neon Mode</div>
                                <div className="text-sm text-gray-400">Vibrant neon accents</div>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ACCOUNT TAB */}
                {selectedTab === 'account' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Privacy Policy */}
                        <div className="glass-card p-6 border border-white/10">
                            <h3 className="text-lg font-heading font-bold mb-4">Privacy & Legal</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                    <div className="font-bold mb-1">Privacy Policy</div>
                                    <div className="text-sm text-gray-400">View our privacy policy</div>
                                </button>
                                <button className="w-full text-left p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                    <div className="font-bold mb-1">Terms of Service</div>
                                    <div className="text-sm text-gray-400">Read our terms and conditions</div>
                                </button>
                            </div>
                        </div>

                        {/* Delete Account */}
                        <div className="glass-card p-6 border border-danger/30 bg-danger/5">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertTriangle className="text-danger flex-shrink-0" size={24} />
                                <div>
                                    <h3 className="text-lg font-heading font-bold text-danger mb-1">Danger Zone</h3>
                                    <p className="text-sm text-gray-400">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                </div>
                            </div>

                            {!showDeleteConfirm ? (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="btn-primary bg-danger hover:bg-red-600 w-full"
                                >
                                    <Trash2 size={16} className="inline mr-2" />
                                    Delete Account
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm text-danger font-bold">Are you absolutely sure?</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="flex-1 glass-card px-4 py-3 border border-white/10 hover:border-white/20 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="flex-1 btn-primary bg-danger hover:bg-red-600"
                                        >
                                            Yes, Delete Forever
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default Settings;
