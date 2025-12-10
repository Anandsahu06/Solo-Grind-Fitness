# Solo Grind Fitness - UI/UX Design Guide

## 1. Design Philosophy
**"The System is Watching."**
The interface should feel like a futuristic, intrusive-but-helpful RPG HUD (Heads-Up Display). It lives on top of reality.
- **Dark Mode Only**: Deep blacks and navys to make neon pop.
- **Glassmorphism**: Translucent layers to show depth.
- **Micro-interactions**: Every click should have immediate feedback (sound, glow, shake).

## 2. Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| **Void Black** | `#0a0a12` | Main Background |
| **Neon Cyan** | `#00f3ff` | Primary Accent, Agility, UI Borders |
| **Neon Purple** | `#bc13fe` | Secondary Accent, Focus, Magic |
| **System Red** | `#ff003c` | Danger, Strength, Alerts |
| **Life Green** | `#0aff60` | Success, Stamina, Health |

## 3. Typography
- **Headings**: `Orbitron` (Google Fonts) - Futuristic, wide, techno.
- **Body**: `Inter` (Google Fonts) - Clean, highly readable at small sizes.

## 4. Component Styles

### Buttons
- **Primary**: Solid Neon Background, Black Text, Glow Effect on Hover.
- **Secondary**: Transparent Background, Neon Border, Neon Text.
- **Ghost**: Text only, subtle hover glow.

### Cards (Glass)
- Background: `rgba(255, 255, 255, 0.05)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Backdrop Filter: `blur(10px)`
- Radius: `12px` or `16px`

## 5. Screen Flows

### Onboarding
1. **Hero**: "Start as F-Rank". Big, bold typography.
2. **Setup**: Simple form wizard. "System Calibration...".
3. **Result**: "You are F-Rank. Your journey begins."

### Dashboard (Hunter Status)
- **Top**: Rank Badge (Dominant visual).
- **Center**: Stats Grid (Radar chart or bars).
- **Bottom**: "Daily Quests" list.
- **Interaction**: Tapping XP bar shows detailed breakdown.

### Dungeon (Workout)
- **Pre-Lobby**: Difficulty selection, expected rewards.
- **Active**: Large timer, current exercise name, rep counter.
- **Post-Lobby**: "DUNGEON CLEARED" overlay. Loot reveal animation (XP, Stats).

### Quests
- List view.
- **Complete Action**: Swipe right or long-press to complete.
- **Feedback**: Particle explosion + XP number floats up.
