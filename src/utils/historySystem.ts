export interface DailyRecord {
    date: string;
    totalXp: number;
    stats: {
        str: number;
        agi: number;
        sta: number;
        foc: number;
    };
    workoutsCompleted: number; // 1 for active
}

export const getHistory = (): DailyRecord[] => {
    const profileStr = localStorage.getItem('userProfile');
    if (!profileStr) return [];
    try {
        const profile = JSON.parse(profileStr);
        return profile.history || [];
    } catch (e) {
        return [];
    }
};

export const updateHistory = (currentProfile: any): any[] => {
    const today = new Date().toISOString().split('T')[0];
    let history: DailyRecord[] = currentProfile.history || [];

    const existingIndex = history.findIndex(h => h.date === today);

    if (existingIndex > -1) {
        history[existingIndex] = {
            date: today,
            totalXp: currentProfile.totalXp,
            stats: currentProfile.stats,
            workoutsCompleted: history[existingIndex].workoutsCompleted + 1
        };
    } else {
        // If we missed previous days, we might want to backfill? 
        // For now, just add today.
        history.push({
            date: today,
            totalXp: currentProfile.totalXp,
            stats: currentProfile.stats,
            workoutsCompleted: 1
        });
    }

    // Sort by date
    history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Limit to 30 days
    if (history.length > 30) {
        history = history.slice(history.length - 30);
    }

    return history;
};

export const getLast7DaysData = () => {
    const history = getHistory();
    const today = new Date();
    const days: string[] = [];
    const xpValues: number[] = [];
    const strValues: number[] = [];
    const workoutFlags: number[] = []; // 1 or 0 for heatmap

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });

        days.push(dayLabel);

        const record = history.find(h => h.date === dateStr);
        if (record) {
            xpValues.push(record.totalXp);
            strValues.push(record.stats.str);
            workoutFlags.push(record.workoutsCompleted > 0 ? 1 : 0);
        } else {
            // If no record, use previous known value for XP/Stats (line graph) 
            // or 0? 
            // For "Total XP", it should flatline at the last known value.
            // Finding last known value before this date:.
            const lastKnown = history.filter(h => h.date < dateStr).pop();
            xpValues.push(lastKnown ? lastKnown.totalXp : 0);
            strValues.push(lastKnown ? lastKnown.stats.str : 0);
            workoutFlags.push(0);
        }
    }

    return { days, xpValues, strValues, workoutFlags };
};
