import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: number;
    rank: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    stats: {
        strength: number;
        agility: number;
        stamina: number;
        focus: number;
    };
    streak: {
        current: number;
        best: number;
    };
    titles: string[];
    isEmailVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('userData');

        // If we have stored user data, use it immediately while verifying
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse stored user data:', e);
            }
        }

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await authAPI.getMe();
            const userData = response.data.user;
            setUser(userData);
            // Store user data for persistence
            localStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
            console.error('Auth check failed:', error);
            // Only clear if the token is actually invalid
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (token: string, userData: User) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userProfile'); // Also clear profile data
        setUser(null);
        window.location.href = '/auth';
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            // Update stored user data
            localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            updateUser,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
