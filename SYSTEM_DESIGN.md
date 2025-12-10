# Solo Grind Fitness - System Design & Architecture

## 1. High-Level Architecture

The system follows a modern **Client-Server** architecture with a focus on a "Mobile-First" experience.

### Frontend (Client)
- **Framework**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS (Utility-first, Custom Theme)
- **State Management**: React Context API (for MVP) -> Zustand/Redux (for Scale)
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend (Server) - *Recommended*
- **Runtime**: Node.js
- **Framework**: Express.js or NestJS (for better structure)
- **Database**: MongoDB (NoSQL fits the flexible "Game State" data model well)
- **Authentication**: JWT (JSON Web Tokens)

### Mobile (Future)
- **Strategy**: Progressive Web App (PWA) first, then React Native.
- **PWA**: Add `manifest.json` and Service Workers to allow "Add to Home Screen".
- **Native**: React Native can reuse 80% of the business logic (Hooks, Context, Utils) and just replace the UI layer.

---

## 2. Database Schema (MongoDB Mongoose Style)

### User Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String,
  avatarUrl: String,
  rank: { type: String, enum: ['F', 'E', 'D', 'C', 'B', 'A', 'S'] },
  level: Number,
  xp: Number,
  stats: {
    strength: Number,
    agility: Number,
    stamina: Number,
    focus: Number
  },
  streak: {
    current: Number,
    best: Number,
    lastActiveDate: Date
  },
  guildId: ObjectId, // Reference to Guild
  titles: [String],
  createdAt: Date
}
```

### Quest Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: { type: String, enum: ['DAILY', 'MAIN', 'PENALTY'] },
  difficulty: String,
  rewards: {
    xp: Number,
    stats: { strength: Number, ... }
  },
  requirements: {
    minLevel: Number
  }
}
```

### DungeonRun Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  dungeonId: ObjectId,
  startTime: Date,
  endTime: Date,
  status: { type: String, enum: ['COMPLETED', 'FAILED', 'ABORTED'] },
  xpGained: Number
}
```

---

## 3. API Endpoints (REST)

### Auth
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Get JWT token

### User
- `GET /api/user/me` - Get current user profile & stats
- `PATCH /api/user/me` - Update settings/profile

### Quests
- `GET /api/quests/daily` - Get today's generated quests
- `POST /api/quests/:id/complete` - Verify and complete a quest

### Dungeons
- `GET /api/dungeons` - List available dungeons
- `POST /api/dungeons/start` - Start a dungeon session
- `POST /api/dungeons/complete` - Submit results

---

## 4. Path to Android App

### Phase 1: PWA (Immediate)
1. Add `manifest.json` with app icons and theme colors.
2. Register a Service Worker for offline caching of assets.
3. Users can install via Chrome/Safari "Add to Home Screen".

### Phase 2: React Native (Dedicated App)
1. Initialize a new React Native CLI or Expo project.
2. **Code Sharing**:
   - Move `src/types`, `src/hooks`, `src/context`, and `src/utils` to a shared package or monorepo.
3. **UI Replacement**:
   - Replace HTML `<div>` with RN `<View>`.
   - Replace `<img>` with `<Image>`.
   - Replace Tailwind classes with `NativeWind` (Tailwind for RN) or `StyleSheet`.
4. **Native Features**:
   - Use Background Services for step tracking (Pedometer).
   - Use Push Notifications for quest reminders.
