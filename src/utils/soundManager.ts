// Sound utility using Web Audio API for game sounds
class SoundManager {
    private audioContext: AudioContext | null = null;
    private sounds: { [key: string]: AudioBuffer } = {};

    constructor() {
        // Initialize AudioContext on first user interaction
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    // Generate beep sound
    private createBeep(frequency: number, duration: number, volume: number = 0.3): void {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Timer tick sound (subtle)
    playTimerTick(): void {
        this.createBeep(800, 0.05, 0.1);
    }

    // Timer warning (last 10 seconds)
    playTimerWarning(): void {
        this.createBeep(1000, 0.1, 0.2);
    }

    // Start sound (energetic)
    playStart(): void {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;

        // Rising tone
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();

        osc1.connect(gain1);
        gain1.connect(this.audioContext.destination);

        osc1.frequency.setValueAtTime(400, now);
        osc1.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        osc1.type = 'square';

        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc1.start(now);
        osc1.stop(now + 0.2);
    }

    // Stop/Pause sound
    playStop(): void {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;

        // Falling tone
        const osc1 = this.audioContext.createOscillator();
        const gain1 = this.audioContext.createGain();

        osc1.connect(gain1);
        gain1.connect(this.audioContext.destination);

        osc1.frequency.setValueAtTime(800, now);
        osc1.frequency.exponentialRampToValueAtTime(400, now + 0.2);
        osc1.type = 'square';

        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc1.start(now);
        osc1.stop(now + 0.2);
    }

    // Quest completion sound (success jingle)
    playQuestComplete(): void {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

        notes.forEach((freq, index) => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext!.destination);

            const startTime = now + (index * 0.15);
            osc.frequency.value = freq;
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.2, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    }

    // Dungeon completion sound (epic victory)
    playDungeonComplete(): void {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;

        // Victory fanfare
        const notes = [
            { freq: 523.25, time: 0 },    // C5
            { freq: 659.25, time: 0.15 },  // E5
            { freq: 783.99, time: 0.3 },   // G5
            { freq: 1046.50, time: 0.45 }  // C6
        ];

        notes.forEach(({ freq, time }) => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext!.destination);

            const startTime = now + time;
            osc.frequency.value = freq;
            osc.type = 'triangle';

            gain.gain.setValueAtTime(0.25, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });

        // Add bass note for emphasis
        const bass = this.audioContext.createOscillator();
        const bassGain = this.audioContext.createGain();

        bass.connect(bassGain);
        bassGain.connect(this.audioContext.destination);

        bass.frequency.value = 130.81; // C3
        bass.type = 'sine';

        bassGain.gain.setValueAtTime(0.3, now + 0.45);
        bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);

        bass.start(now + 0.45);
        bass.stop(now + 0.85);
    }

    // Level up sound (special achievement)
    playLevelUp(): void {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;

        // Ascending arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5

        notes.forEach((freq, index) => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext!.destination);

            const startTime = now + (index * 0.1);
            osc.frequency.value = freq;
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.2, startTime);
            gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

            osc.start(startTime);
            osc.stop(startTime + 0.25);
        });
    }

    // Resume AudioContext (needed for some browsers)
    resume(): void {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Helper hook for React components
export const useSounds = () => {
    return soundManager;
};
