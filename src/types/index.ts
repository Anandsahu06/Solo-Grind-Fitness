export type Rank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface Stats {
    strength: number;
    agility: number;
    stamina: number;
    focus: number;
}

export interface User {
    id: string;
    username: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    rank: Rank;
    stats: Stats;
    streak: number;
    titles: string[];
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    statReward: Partial<Stats>;
    completed: boolean;
    type: 'DAILY' | 'MAIN' | 'PENALTY';
}

export interface Dungeon {
    id: string;
    name: string;
    difficulty: Rank;
    description: string;
    duration: number; // in minutes
    xpReward: number;
    recommendedStats: Partial<Stats>;
}
