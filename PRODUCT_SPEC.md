# Solo Grind Fitness - Complete Product Specification

## 📱 Product Overview

**Solo Grind Fitness** is a gamified fitness web application inspired by anime-style progression systems (like Solo Leveling). Users start as weak F-Rank trainees and level up to S-Rank hunters through real-world workouts, habits, and self-improvement.

### Alternative Names (Suggested)
1. **Solo Grind Fitness** (Current)
2. **Shadow Hunter Fitness**
3. **Rank Up Training**

---

## 🎨 Design System

### Brand Identity
- **Logo**: Minimalist "S" glyph in a neon cyan circle
- **Tagline**: "Turn your real life grind into S-Rank power"
- **Vibe**: Dark, futuristic RPG HUD with neon accents

### Color Palette
```css
Background:    #0a0a12  (Void Black)
Primary:       #00f3ff  (Neon Cyan)
Secondary:     #bc13fe  (Neon Purple)
Success:       #0aff60  (Lime Green)
Danger:        #ff003c  (System Red)
Card BG:       rgba(255, 255, 255, 0.05)  (Glassmorphism)
```

### Typography
- **Headings**: Orbitron (Google Fonts) - Futuristic, techno
- **Body**: Inter (Google Fonts) - Clean, readable

### UI Components
- **Glass Cards**: Translucent backgrounds with blur effects
- **Neon Borders**: Glowing cyan/purple borders with box-shadow
- **Buttons**: 
  - Primary: Solid neon background with glow
  - Secondary: Transparent with neon border
  - Ghost: Text only with hover glow

---

## 🎮 Core Game Mechanics

### 1. **XP & Leveling System**
- **Starting Level**: 1
- **Starting XP**: 0
- **XP to Next Level**: Progressive (100 → 150 → 225...)
- **Formula**: `newXpToNext = Math.floor(currentXpToNext * 1.5)`
- **Sources of XP**:
  - Daily Quests: 20-50 XP
  - Dungeons: 100-1000 XP
  - Penalty Quests: 0 XP (but stat rewards)

### 2. **Rank System**
Progression: **F → E → D → C → B → A → S**

Each rank has fitness benchmarks:
- **F-Rank**: 5 push-ups, 1km walk
- **E-Rank**: 10 push-ups, 2km walk
- **D-Rank**: 15 push-ups, 30s plank, 4,000 steps
- **C-Rank**: 25 push-ups, 1 min plank, 5km run
- **B-Rank**: 35 push-ups, 3km run
- **A-Rank**: 50 push-ups, 5km run, advanced exercises
- **S-Rank**: Elite athlete level

### 3. **Stats System**
Four core stats tracked and displayed:
- **Strength** 💪: Resistance training, push-ups, weights
- **Agility** ⚡: HIIT, sprints, mobility drills
- **Stamina** ❤️: Running, cycling, long-duration workouts
- **Focus** 🧠: Meditation, study time, discipline tasks

Each quest/dungeon increases specific stats.

### 4. **Quest System**

#### Daily Quests (Auto-generated each day)
Examples:
- Morning Push-ups (10 reps) → +20 XP, +1 Strength
- Daily Run (1km) → +50 XP, +1 Stamina, +1 Agility
- Meditation (10 min) → +30 XP, +2 Focus
- Drink 8 glasses of water → +15 XP
- Sleep 7+ hours → +25 XP

#### Penalty Quests
Triggered when user misses multiple daily quests:
- **Example**: "PENALTY: SURVIVAL - Run 5km immediately"
- Harder tasks but still give stat rewards
- System alert style UI (red borders, skull icon)

### 5. **Dungeon System (Workouts)**

Each workout = one Dungeon raid.

**Dungeon Categories**:
1. **Goblin Cave (E-Rank)**: 15 min beginner full-body
2. **Orc Stronghold (C-Rank)**: 30 min intermediate strength
3. **Dragon's Nest (S-Rank)**: 60 min hell mode

**Dungeon Flow**:
1. **Lobby**: Shows difficulty, time, XP reward, recommended stats
2. **Active Session**: 
   - Exercise-by-exercise with timers
   - Real-time countdown for timed exercises
   - Rep counter for rep-based exercises
3. **Victory Screen**: 
   - "DUNGEON CLEARED" animation
   - Confetti effect
   - XP gained display
   - Stat increases

### 6. **Streak System**
- Tracks consecutive days of activity
- **Current Streak**: Days in a row
- **Best Streak**: All-time record
- **Grace Period**: 1 day (optional)
- **Rewards**: Titles at milestones (7, 30, 100 days)

### 7. **Titles & Achievements**
Unlockable titles displayed under username:
- "Weakest Trainee" (default)
- "Dungeon Newbie" (first workout)
- "Consistency Freak" (30-day streak)
- "Limit Breaker" (S-Rank achieved)
- "Guild Master" (create a guild)

---

## 📄 Pages & Features Implemented

### 1. **Onboarding Flow** (`/onboarding`)
Multi-step wizard:
- **Step 1**: Welcome screen with "THE SYSTEM HAS CHOSEN YOU"
- **Step 2**: Username input
- **Step 3**: Fitness level calibration (Beginner/Intermediate/Advanced)
- **Step 4**: System initialization loading screen

### 2. **Dashboard** (`/` or `/dashboard`)
Hunter Status screen showing:
- Rank badge (F/E/D/C/B/A/S)
- Level and XP progress bar
- Four stat bars (Strength, Agility, Stamina, Focus)
- Daily quests preview (first 3)
- Quick action buttons

### 3. **Quests Screen** (`/quests`)
- Full list of daily quests
- Interactive checkboxes to mark complete
- XP and stat rewards displayed
- Completed quests show with strikethrough and green tint
- Smooth animations on completion

### 4. **Dungeon Hub** (`/dungeon`)
- List of available dungeons
- Each card shows:
  - Name and difficulty rank
  - Estimated duration
  - XP reward
  - Recommended stats
- "ENTER DUNGEON" button

### 5. **Active Dungeon** (`/dungeon/active`)
Live workout session with:
- Exercise name and instructions
- Timer (for timed exercises)
- Rep counter (for rep-based exercises)
- "COMPLETE SET" button
- Progress through exercise list
- Victory screen with confetti on completion

### 6. **Guilds** (`/guilds`)
Social/team features:
- **My Guild Tab**:
  - Guild name, icon, description
  - Guild level and member count
  - Weekly raid target (collective goal)
  - Members list with ranks and levels
- **Find Guild Tab**: Placeholder for search

### 7. **Profile** (`/profile`)
- User avatar and rank badge
- Username and title
- Edit profile option
- Settings link
- Logout button

### 8. **Settings** (`/settings`)
- Account management (name, email)
- Notification preferences
- **Developer Tools** (for testing):
  - "Simulate New Day" button
  - "Trigger Penalty Quest" button
- Dark mode (locked as default)
- Danger zone (logout, delete account)

---

## 🛠️ Technical Architecture

### Frontend Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **Confetti**: canvas-confetti

### State Management
- **Context API**: `GameContext` for global state
- Manages:
  - User profile (level, XP, rank, stats, streak)
  - Quest list
  - Functions: `completeQuest()`, `addXp()`, `triggerPenalty()`, `skipDay()`

### Project Structure
```
src/
├── components/
│   └── Layout.tsx          # Main layout with navbar
├── context/
│   └── GameContext.tsx     # Global state management
├── pages/
│   ├── Dashboard.tsx       # Hunter status screen
│   ├── Quests.tsx          # Quest list
│   ├── Dungeon.tsx         # Dungeon hub
│   ├── ActiveDungeon.tsx   # Workout session
│   ├── Guilds.tsx          # Guild/team features
│   ├── Profile.tsx         # User profile
│   ├── Settings.tsx        # App settings
│   └── Onboarding.tsx      # Initial setup wizard
├── types/
│   └── index.ts            # TypeScript definitions
├── App.tsx                 # Main app with routing
└── index.css               # Global styles + Tailwind
```

### Backend (Recommended for Production)
**Option 1: Node.js + Express + MongoDB**
- JWT authentication
- RESTful API endpoints
- MongoDB for flexible game state storage

**Option 2: Next.js Full-Stack**
- API routes in same project
- Server-side rendering
- Vercel deployment ready

**Option 3: FastAPI (Python)**
- For ML-based workout recommendations
- Fast and modern

### Database Schema (MongoDB Example)
```javascript
User {
  _id, username, email, passwordHash,
  rank, level, xp, xpToNextLevel,
  stats: { strength, agility, stamina, focus },
  streak: { current, best, lastActiveDate },
  guildId, titles, createdAt
}

Quest {
  _id, title, description, type,
  xpReward, statReward, difficulty
}

DungeonRun {
  _id, userId, dungeonId,
  startTime, endTime, status, xpGained
}

Guild {
  _id, name, icon, description,
  ownerId, memberIds, guildXP, level
}
```

### API Endpoints (Planned)
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/user/me
PATCH  /api/user/me
GET    /api/quests/daily
POST   /api/quests/:id/complete
GET    /api/dungeons
POST   /api/dungeons/start
POST   /api/dungeons/complete
GET    /api/stats/overview
POST   /api/guilds
GET    /api/guilds/:id
```

---

## 📱 Path to Android App

### Phase 1: Progressive Web App (PWA)
**Immediate Next Steps**:
1. Create `manifest.json`:
```json
{
  "name": "Solo Grind Fitness",
  "short_name": "SoloGrind",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a12",
  "theme_color": "#00f3ff",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

2. Register Service Worker for offline caching
3. Users can "Add to Home Screen" on Android/iOS

### Phase 2: React Native (Dedicated App)
**Code Reuse Strategy**:
- Move `src/types`, `src/context`, `src/utils` to shared package
- Keep all game logic (XP calculations, quest completion) identical
- Replace UI layer:
  - `<div>` → `<View>`
  - `<img>` → `<Image>`
  - Tailwind → NativeWind or StyleSheet

**Native Features to Add**:
- Background step tracking (Pedometer API)
- Push notifications for quest reminders
- Health data integration (Google Fit, Apple Health)
- Offline mode with local storage

---

## 🎯 Future Enhancements

### Short-term (MVP+)
1. **Backend Integration**: Connect to real API
2. **User Authentication**: Email/password + Google OAuth
3. **Data Persistence**: Save progress to database
4. **More Dungeons**: 10+ workout templates
5. **Custom Quests**: Let users create their own

### Mid-term
1. **Social Features**:
   - Guild chat
   - Leaderboards
   - Friend challenges
2. **Advanced Stats**:
   - Weekly/monthly graphs
   - Body measurements tracking
   - Progress photos
3. **Gamification**:
   - Boss raids (monthly challenges)
   - Seasonal events
   - Cosmetic rewards (rank frames, auras)

### Long-term
1. **AI Coach**: Personalized workout recommendations
2. **Wearable Integration**: Smartwatch sync
3. **Marketplace**: In-app purchases for premium features
4. **Community**: Forums, user-generated content

---

## 💰 Monetization Strategy

### Free Tier
- Core features (quests, dungeons, stats)
- Basic guilds
- Up to 3 custom quests

### Pro Tier ($4.99/month or $49/year)
- Advanced analytics and graphs
- Unlimited custom quests
- Exclusive dungeon programs (30-day shred, 90-day strength)
- Cosmetic rewards (rank frames, auras, titles)
- Priority support

### Payment Integration (India)
- **Razorpay**: For Indian users
- **Stripe**: For international users

---

## 🚀 Deployment

### Current Setup
- Development server: `npm run dev`
- Production build: `npm run build`
- Preview: `npm run preview`

### Recommended Hosting
1. **Vercel** (easiest for Next.js/React)
2. **Netlify** (great for static sites)
3. **AWS Amplify** (scalable)
4. **Firebase Hosting** (if using Firebase backend)

---

## 📊 Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Average session duration
- Quest completion rate
- Dungeon completion rate
- Streak retention (7-day, 30-day)

### Growth
- New user signups
- Conversion to Pro tier
- Guild creation rate
- Social shares

### Health Impact
- Average workouts per week
- Total XP gained (proxy for activity)
- Rank progression speed

---

## 🎨 Design Philosophy

**"The System is Watching"**

The interface should feel like a futuristic, intrusive-but-helpful RPG HUD that lives on top of reality. Every interaction should have immediate, satisfying feedback:

- ✅ Quest completion → Particle explosion + XP float-up
- 🏆 Level up → Screen shake + glow + expanding circle
- 💀 Dungeon cleared → Confetti + victory banner
- 🔥 Streak milestone → Special animation

**Mobile-First**: 80% of users will be on phones. Design for thumb-friendly interactions.

**Dark by Default**: Reduces eye strain, makes neon colors pop, feels premium.

---

## 📝 Developer Notes

### Testing the App
1. Use **Settings → Developer Tools** to:
   - Simulate new day (resets daily quests)
   - Trigger penalty quests
2. Complete quests to see XP gain and leveling
3. Enter a dungeon to test workout flow
4. Check responsive design on mobile (DevTools)

### Known Limitations (MVP)
- No real backend (all data in memory)
- No user authentication
- No data persistence (refresh = reset)
- Guilds are mock data
- No actual step tracking

### Next Developer Tasks
1. Set up backend API
2. Implement user authentication
3. Connect frontend to API
4. Add database persistence
5. Create more dungeon templates
6. Build PWA manifest and service worker

---

## 🎓 Learning Resources

For developers new to this stack:
- **React**: [react.dev](https://react.dev)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion)
- **React Router**: [reactrouter.com](https://reactrouter.com)

---

## 📄 License & Credits

**Project**: Solo Grind Fitness  
**Inspiration**: Solo Leveling (manhwa/anime) - but all assets and names are original  
**Built with**: React, TypeScript, Tailwind CSS, Framer Motion  
**Created**: December 2025

---

**Ready to grind? Start your journey from F-Rank to S-Rank! 💪⚡**
