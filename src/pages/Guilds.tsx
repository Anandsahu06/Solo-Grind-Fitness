import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Plus,
    Copy,
    Trophy,
    Flame,
    Target,
    MessageSquare,
    Crown,
    Shield,
    ChevronLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

interface GuildMember {
    id: string;
    name: string;
    rank: string;
    level: number;
    xp: number;
    avatar: string;
}

const Guilds: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'browse' | 'my-guild'>('browse');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [guildName, setGuildName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('⚔️');

    // Mock data
    const hasGuild = true; // Set to false to show join options
    const guildCode = 'SOLO-2024';

    const myGuild = {
        name: 'Shadow Hunters',
        icon: '⚔️',
        level: 5,
        xp: 2500,
        xpToNext: 5000,
        members: 12,
        rank: 'Silver'
    };

    const members: GuildMember[] = [
        { id: '1', name: 'You', rank: 'S', level: 15, xp: 5000, avatar: '🥷' },
        { id: '2', name: 'Hunter123', rank: 'A', level: 12, xp: 3500, avatar: '⚔️' },
        { id: '3', name: 'FitWarrior', rank: 'B', level: 10, xp: 2800, avatar: '⚡' },
        { id: '4', name: 'GymBeast', rank: 'B', level: 9, xp: 2200, avatar: '🔥' },
    ];

    const leaderboardData = [
        { guild: 'Shadow Hunters', xp: 25000, members: 12, icon: '⚔️' },
        { guild: 'Iron Legion', xp: 22000, members: 15, icon: '🛡️' },
        { guild: 'Phoenix Rising', xp: 20000, members: 10, icon: '🔥' },
    ];

    const feed = [
        { id: 1, user: 'Hunter123', action: 'completed Hell Mode Dungeon', time: '2h ago' },
        { id: 2, user: 'FitWarrior', action: 'reached Level 10', time: '5h ago' },
        { id: 3, user: 'You', action: 'earned "Quest Addict" title', time: '1d ago' },
    ];

    const guildIcons = ['⚔️', '🛡️', '🔥', '⚡', '🐉', '👑', '💎', '🌟'];

    const handleCopyCode = () => {
        navigator.clipboard.writeText(guildCode);
        toast.success('Guild code copied!');
    };

    const handleCreateGuild = () => {
        if (!guildName.trim()) {
            toast.error('Please enter a guild name');
            return;
        }
        toast.success(`Guild "${guildName}" created!`);
        setShowCreateModal(false);
        setGuildName('');
    };

    return (
        <div className="min-h-screen bg-background p-4 pb-24">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="relative text-center mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="absolute left-0 top-1 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-heading font-bold mb-2">Guilds</h1>
                    <p className="text-gray-400">Join forces with other hunters</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setSelectedTab('my-guild')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedTab === 'my-guild'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Shield size={20} className="inline mr-2" />
                        My Guild
                    </button>
                    <button
                        onClick={() => setSelectedTab('browse')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedTab === 'browse'
                            ? 'bg-primary text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Trophy size={20} className="inline mr-2" />
                        Leaderboards
                    </button>
                </div>

                {/* MY GUILD TAB */}
                {selectedTab === 'my-guild' && (
                    <>
                        {hasGuild ? (
                            <div className="space-y-6">

                                {/* Guild Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-card p-6 border border-white/10"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl shadow-lg">
                                            {myGuild.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h2 className="text-2xl font-heading font-bold">{myGuild.name}</h2>
                                                <span className="text-xs bg-primary text-black px-2 py-1 rounded-full font-bold">
                                                    {myGuild.rank}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">{myGuild.members} Members • Level {myGuild.level}</p>

                                            {/* Guild Code */}
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="px-3 py-1 bg-white/5 rounded-lg font-mono text-sm text-primary">
                                                    {guildCode}
                                                </div>
                                                <button
                                                    onClick={handleCopyCode}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <Copy size={16} className="text-primary" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guild XP Bar */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Guild XP</span>
                                            <span className="text-primary font-bold">{myGuild.xp} / {myGuild.xpToNext}</span>
                                        </div>
                                        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-secondary"
                                                style={{ width: `${(myGuild.xp / myGuild.xpToNext) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Guild Raid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="glass-card p-6 border border-primary/30 bg-primary/5"
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <Target className="text-primary flex-shrink-0" size={24} />
                                        <div>
                                            <h3 className="text-lg font-heading font-bold mb-1">Weekly Guild Raid</h3>
                                            <p className="text-sm text-gray-400">Collective Challenge: Complete 100 workouts as a guild</p>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Progress</span>
                                            <span className="text-primary font-bold">67 / 100</span>
                                        </div>
                                        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-success to-emerald-500" style={{ width: '67%' }} />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Reward: +500 Guild XP • Ends in 3 days</p>
                                </motion.div>

                                {/* Members List */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card p-6 border border-white/10"
                                >
                                    <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                        <Users className="text-primary" size={20} />
                                        Members ({members.length})
                                    </h3>
                                    <div className="space-y-3">
                                        {members.map((member, index) => (
                                            <div key={member.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                <div className="text-2xl">{member.avatar}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold">{member.name}</span>
                                                        {index === 0 && <Crown className="text-yellow-500" size={16} />}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {member.rank}-Rank • Level {member.level}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-primary">{member.xp} XP</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Motivational Feed */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="glass-card p-6 border border-white/10"
                                >
                                    <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                        <MessageSquare className="text-primary" size={20} />
                                        Activity Feed
                                    </h3>
                                    <div className="space-y-3">
                                        {feed.map((item) => (
                                            <div key={item.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                                <Flame className="text-primary flex-shrink-0" size={16} />
                                                <div className="flex-1">
                                                    <p className="text-sm">
                                                        <span className="font-bold text-primary">{item.user}</span>
                                                        {' '}{item.action}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Users className="mx-auto text-gray-500 mb-4" size={64} />
                                <h3 className="text-xl font-bold mb-2">No Guild Yet</h3>
                                <p className="text-gray-400 mb-6">Create or join a guild to start training with others</p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="btn-primary"
                                    >
                                        <Plus size={20} className="inline mr-2" />
                                        Create Guild
                                    </button>
                                    <button className="glass-card px-6 py-3 border border-white/10 hover:border-primary transition-all">
                                        Join with Code
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* LEADERBOARDS TAB */}
                {selectedTab === 'browse' && (
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 border border-white/10"
                        >
                            <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                                <Trophy className="text-primary" size={20} />
                                Top Guilds by XP
                            </h3>
                            <div className="space-y-3">
                                {leaderboardData.map((guild, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500 text-black' :
                                            index === 1 ? 'bg-gray-400 text-black' :
                                                index === 2 ? 'bg-orange-600 text-white' :
                                                    'bg-white/10 text-gray-400'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div className="text-2xl">{guild.icon}</div>
                                        <div className="flex-1">
                                            <div className="font-bold">{guild.guild}</div>
                                            <div className="text-xs text-gray-400">{guild.members} members</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-primary">{guild.xp.toLocaleString()} XP</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Create Guild Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-6 border border-white/10 max-w-md w-full"
                        >
                            <h3 className="text-2xl font-heading font-bold mb-4">Create Guild</h3>

                            <div className="mb-4">
                                <label className="block text-sm text-gray-400 mb-2">Guild Name</label>
                                <input
                                    type="text"
                                    value={guildName}
                                    onChange={(e) => setGuildName(e.target.value)}
                                    placeholder="Enter guild name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">Choose Icon</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {guildIcons.map((icon) => (
                                        <button
                                            key={icon}
                                            onClick={() => setSelectedIcon(icon)}
                                            className={`p-4 rounded-xl border transition-all ${selectedIcon === icon
                                                ? 'bg-primary/20 border-primary'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            <div className="text-3xl">{icon}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 glass-card px-4 py-3 border border-white/10 hover:border-danger transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateGuild}
                                    className="flex-1 btn-primary"
                                >
                                    Create
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Guilds;
