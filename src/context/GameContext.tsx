import React, { createContext, useContext, useState } from 'react';
import type { User, Quest } from '../types';

interface GameContextType {
    user: User;
    quests: Quest[];
    completeQuest: (id: string) => void;
    addXp: (amount: number) => void;
    triggerPenalty: () => void;
    skipDay: () => void;
}

const defaultUser: User = {
    id: '1',
    username: 'ShadowMonarch',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    rank: 'F',
    stats: {
        strength: 5,
        agility: 5,
        stamina: 5,
        focus: 5,
    },
    streak: 0,
    titles: ['Weakest Trainee'],
};

const defaultQuests: Quest[] = [
    {
        id: '1',
        title: 'Morning Push-ups',
        description: 'Complete 10 push-ups to wake up your muscles.',
        xpReward: 20,
        statReward: { strength: 1 },
        completed: false,
        type: 'DAILY',
    },
    {
        id: '2',
        title: 'Daily Run',
        description: 'Run for 1km.',
        xpReward: 50,
        statReward: { stamina: 1, agility: 1 },
        completed: false,
        type: 'DAILY',
    },
    {
        id: '3',
        title: 'Meditation',
        description: 'Meditate for 10 minutes.',
        xpReward: 30,
        statReward: { focus: 2 },
        completed: false,
        type: 'DAILY',
    },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(defaultUser);
    const [quests, setQuests] = useState<Quest[]>(defaultQuests);

    const addXp = (amount: number) => {
        setUser((prev) => {
            let newXp = prev.xp + amount;
            let newLevel = prev.level;
            let newXpToNext = prev.xpToNextLevel;

            if (newXp >= newXpToNext) {
                newXp -= newXpToNext;
                newLevel += 1;
                newXpToNext = Math.floor(newXpToNext * 1.5); // Exponential growth
            }

            return {
                ...prev,
                xp: newXp,
                level: newLevel,
                xpToNextLevel: newXpToNext,
            };
        });
    };

    const completeQuest = (id: string) => {
        const quest = quests.find((q) => q.id === id);
        if (quest && !quest.completed) {
            setQuests((prev) =>
                prev.map((q) => (q.id === id ? { ...q, completed: true } : q))
            );
            addXp(quest.xpReward);
            // Also update stats
            setUser((prev) => {
                const newStats = { ...prev.stats };
                if (quest.statReward.strength) newStats.strength += quest.statReward.strength;
                if (quest.statReward.agility) newStats.agility += quest.statReward.agility;
                if (quest.statReward.stamina) newStats.stamina += quest.statReward.stamina;
                if (quest.statReward.focus) newStats.focus += quest.statReward.focus;
                return { ...prev, stats: newStats };
            });
        }
    };

    const triggerPenalty = () => {
        const penaltyQuest: Quest = {
            id: `penalty-${Date.now()}`,
            title: 'PENALTY: SURVIVAL',
            description: 'You missed your daily goals. Run 5km immediately.',
            xpReward: 0,
            statReward: { stamina: 5 }, // Penalty might still give stats but no XP, or negative? 
            // In solo leveling, penalties were "Survive for 4 hours" or similar.
            // Let's make it give stats but be hard.
            completed: false,
            type: 'PENALTY'
        };
        setQuests(prev => [...prev, penaltyQuest]);
    };

    const skipDay = () => {
        // Reset daily quests
        setQuests(prev => prev.map(q => q.type === 'DAILY' ? { ...q, completed: false } : q));
        // Break streak is not fully implemented but we can simulate logic
        if (Math.random() > 0.5) {
            triggerPenalty();
        }
    };

    return (
        <GameContext.Provider value={{ user, quests, completeQuest, addXp, triggerPenalty, skipDay }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
