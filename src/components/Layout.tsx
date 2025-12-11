import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Trophy, User, Shield, LogOut, Settings } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import SupportFab from './SupportFab';
import InstallButton from './InstallButton';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useGame();
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Load profile and listen for updates
    useEffect(() => {
        const loadProfile = () => {
            const stored = localStorage.getItem('userProfile');
            if (stored) {
                setProfile(JSON.parse(stored));
            }
        };
        loadProfile();
        window.addEventListener('storage', loadProfile);
        return () => window.removeEventListener('storage', loadProfile);
    }, []);

    const rank = profile?.rank || user?.rank || 'F';
    const avatar = profile?.avatar; // Base64 string if uploaded

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Dumbbell, label: 'Dungeon', path: '/dungeon' },
        { icon: Trophy, label: 'Quests', path: '/quests' },
        { icon: Shield, label: 'Guild', path: '/guilds' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-background text-white pb-20 md:pb-0 font-sans">
            {/* Top Bar */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2">
                    <img src="/sologrind.png" alt="Solo Grind" className="h-10 w-auto object-contain" />
                    <span className="font-heading font-bold text-lg tracking-wider">SOLO GRIND</span>
                </div>

                <div className="flex items-center gap-3">
                    <InstallButton />

                    {/* Profile Section & Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 md:gap-4 hover:bg-white/5 p-2 rounded-lg transition-colors"
                        >
                            <div className="hidden md:flex flex-col items-end text-right">
                                <span className="text-xs text-gray-400">Rank</span>
                                <span className="font-bold text-primary">{rank}-Rank Hunter</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-800 border border-primary overflow-hidden">
                                {avatar ? (
                                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary opacity-50"></div>
                                )}
                            </div>
                        </button>

                        {/* Backdrop for mobile */}
                        {isDropdownOpen && (
                            <div
                                className="fixed inset-0 z-40 md:hidden"
                                onClick={() => setIsDropdownOpen(false)}
                            />
                        )}

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                                <div className="p-2 space-y-1">
                                    <button
                                        onClick={() => {
                                            navigate('/profile');
                                            setIsDropdownOpen(false);
                                        }}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                                    >
                                        <Settings size={16} />
                                        Edit Profile
                                    </button>
                                    <div className="h-px bg-white/10 my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
                {children}
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-lg border-t border-white/10 z-50 md:hidden flex items-center justify-around px-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isLocked = item.path === '/guilds';

                    if (isLocked) {
                        return (
                            <div
                                key={item.path}
                                className="flex flex-col items-center justify-center w-full h-full text-gray-700 opacity-50 cursor-not-allowed"
                            >
                                <item.icon size={24} />
                                <span className="text-[10px] mt-1">{item.label}</span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary' : 'text-gray-500'}`}
                        >
                            <item.icon size={24} className={isActive ? 'drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]' : ''} />
                            <span className="text-[10px] mt-1">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <SupportFab />
        </div>
    );
};

export default Layout;
