
export interface LevelData {
    level: number;
    xpNeeded: number; // XP to complete this level
    totalXpThreshold: number; // Cumulative XP needed to REACH this level (start of level)
    rank: string;
}

// Generate the level table based on the user's specification
export const LEVEL_TABLE: LevelData[] = [];

// Helper to add ranges of levels
const addLevelRange = (start: number, end: number, xpPerLevel: number, rank: string) => {
    for (let i = start; i <= end; i++) {
        const prevTotal = LEVEL_TABLE.length > 0 ? LEVEL_TABLE[LEVEL_TABLE.length - 1].totalXpThreshold + LEVEL_TABLE[LEVEL_TABLE.length - 1].xpNeeded : 0;

        LEVEL_TABLE.push({
            level: i,
            xpNeeded: i === 100 ? 0 : xpPerLevel, // Max level has 0 needed
            totalXpThreshold: prevTotal,
            rank: rank
        });
    }
};

// Define levels based on the table
// Levels 1-4: F-Rank, 100 XP/level
addLevelRange(1, 4, 100, 'F');

// Levels 5-11: E-Rank, 150 XP/level (Level 5 is Unlock, 6-11 are normal)
// Note: Table says Lvl 5 needs 100 XP. Lvl 6 needs 150.
// Let's adjust precisely to the table provided.
// Lvl 1: 100 (Total 100)
// Lvl 2: 100 (Total 200)
// Lvl 3: 100 (Total 300)
// Lvl 4: 100 (Total 400)
// Lvl 5: 100 (Total 500) -> E-Rank Unlock
// Lvl 6: 150 (Total 650) -> E
// ...
// Lvl 12: 150 (Total 1550) -> D-Rank Unlock

// We will overwrite the auto-generated table to match SPECIFICALLY
const correctTable = () => {
    LEVEL_TABLE.length = 0; // Clear
    let cumulative = 0;

    const add = (lvl: number, needed: number, rank: string) => {
        LEVEL_TABLE.push({
            level: lvl,
            xpNeeded: needed,
            totalXpThreshold: cumulative,
            rank: rank
        });
        cumulative += needed;
    };

    // F Rank
    add(1, 100, 'F');
    add(2, 100, 'F');
    add(3, 100, 'F');
    add(4, 100, 'F');

    // E Rank Unlock & E Rank
    add(5, 100, 'E'); // Table says 100 XP needed for level 5->6 (Total 500)
    for (let i = 6; i <= 11; i++) add(i, 150, 'E');

    // D Rank Unlock & D Rank
    // Lvl 12 is unlock.
    add(12, 150, 'D');
    for (let i = 13; i <= 21; i++) add(i, 150, 'D');

    // C Rank Unlock & C Rank
    add(22, 150, 'C'); // Table says 150 needed for 22 (Total 3050)
    for (let i = 23; i <= 34; i++) add(i, 250, 'C');

    // B Rank Unlock & B Rank
    // Lvl 35 is unlock.
    for (let i = 35; i <= 49; i++) add(i, 250, 'B');

    // A Rank Unlock (Lvl 50) & A Rank
    for (let i = 50; i <= 74; i++) add(i, 400, 'A');

    // S Rank Unlock (Lvl 75) & S Rank
    for (let i = 75; i <= 99; i++) add(i, 600, 'S');

    // Level 100 (Max)
    add(100, 0, 'S'); // Max level
};

correctTable();


export const calculateUserLevel = (totalXp: number) => {
    // Find the highest level where totalXpThreshold <= totalXp
    // e.g. if totalXp is 50, we match Level 1 (threshold 0).
    // if totalXp is 150, we match Level 2 (threshold 100).

    let currentLevelData = LEVEL_TABLE[0];

    for (let i = 0; i < LEVEL_TABLE.length; i++) {
        const row = LEVEL_TABLE[i];
        if (totalXp >= row.totalXpThreshold) {
            currentLevelData = row;
        } else {
            break;
        }
    }

    // Calculate progress into current level
    const xpIntoLevel = totalXp - currentLevelData.totalXpThreshold;
    const requiredForNext = currentLevelData.xpNeeded;
    const progressPercent = requiredForNext > 0 ? (xpIntoLevel / requiredForNext) * 100 : 100;

    return {
        level: currentLevelData.level,
        rank: currentLevelData.rank,
        xp: xpIntoLevel,
        xpNeeded: requiredForNext,
        progress: Math.min(100, progressPercent),
        totalXp: totalXp
    };
};
