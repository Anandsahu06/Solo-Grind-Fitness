# 🏋️ Solo Grind Fitness

> **Gamify your fitness journey. Level up in real life.**

A Progressive Web App (PWA) that transforms your fitness routine into an RPG-like leveling system. Start as an F-Rank weakling, become an S-Rank legend.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://solo-grind-fitness.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Core Systems](#-core-systems)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎮 Gamification System
- **RPG-Style Leveling**: Progress from Level 1 to 100
- **Rank System**: F → E → D → C → B → A → S Rank
- **XP & Stats**: Earn experience and boost STR, AGI, STA, FOC
- **Achievements**: Unlock titles and badges
- **Streak Tracking**: Maintain daily workout streaks

### 💪 Workout Features
- **Daily Quests**: Complete fitness challenges for XP
- **Dungeon System**: 
  - Beginner Dungeon (15 mins, 100 XP)
  - Warrior Dungeon (30 mins, 250 XP)
  - Hell Mode (45+ mins, 500 XP)
  - **Custom Dungeon** (Unlock at Level 20)
- **Active Workout Tracker**: Real-time exercise timer
- **Progress Tracking**: Visual stats and history

### 🎨 User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Theme**: Cyberpunk-inspired glassmorphism UI
- **Animations**: Smooth transitions with Framer Motion
- **Sound Effects**: Quest completion, dungeon victory sounds
- **Confetti Celebrations**: Visual rewards for achievements

### 📱 Progressive Web App
- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Service worker caching
- **Auto-Updates**: Seamless version updates
- **Install Prompts**: Smart mobile install overlay
- **Push Notifications**: (Coming soon)

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based auth
- **Email Verification**: Account confirmation
- **Password Reset**: Forgot password flow
- **Protected Routes**: Client-side route guards
- **Rate Limiting**: API protection

### 💎 Additional Features
- **Donation System**: "Buy a Coffee" with QR code
- **Profile Customization**: Avatar, title, stats
- **Heatmap Calendar**: Activity visualization
- **Social Features**: Guilds (Coming soon)
- **Settings**: Account management

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router v7
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Context API
- **PWA**: vite-plugin-pwa
- **Notifications**: React Hot Toast
- **Confetti**: canvas-confetti

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **Authentication**: JWT + bcrypt
- **Security**: Helmet, CORS, Rate Limiting
- **Email**: Nodemailer

### DevOps
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: MongoDB Atlas
- **Version Control**: Git + GitHub
- **CI/CD**: Auto-deploy on push

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anandsahu06/Solo-Grind-Fitness.git
   cd Solo-Grind-Fitness
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**

   **Frontend** (`.env` in root):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   **Backend** (`backend/.env`):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   
   # Email (optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. **Run the application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
Solo-Grind-Fitness/
├── public/                    # Static assets
│   ├── sologrind.png         # Logo
│   ├── favicon.ico           # Favicon
│   └── QR.jpg                # Donation QR code
│
├── src/
│   ├── components/           # Reusable components
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── InstallButton.tsx
│   │   ├── InstallPrompt.tsx
│   │   ├── ReloadPrompt.tsx
│   │   ├── SupportFab.tsx
│   │   └── ...
│   │
│   ├── context/              # React Context
│   │   ├── AuthContext.tsx
│   │   └── GameContext.tsx
│   │
│   ├── pages/                # Page components
│   │   ├── Landing.tsx
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Quests.tsx
│   │   ├── Dungeon.tsx
│   │   ├── CustomDungeon.tsx
│   │   ├── ActiveDungeon.tsx
│   │   ├── Profile.tsx
│   │   ├── Settings.tsx
│   │   ├── DonationPage.tsx
│   │   └── ...
│   │
│   ├── services/             # API services
│   │   └── api.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── levelingSystem.ts
│   │   ├── historySystem.ts
│   │   └── soundManager.ts
│   │
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
│
├── backend/
│   ├── config/               # Configuration
│   │   └── db.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/               # Mongoose models
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   └── users.js
│   ├── utils/                # Utilities
│   │   └── email.js
│   └── server.js             # Express server
│
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── vercel.json               # Vercel deployment config
└── package.json              # Dependencies
```

---

## 🎯 Core Systems

### 1. Leveling System

**Level Table:**
- **Levels 1-4**: F-Rank (100 XP/level)
- **Levels 5-11**: E-Rank (100-150 XP/level)
- **Levels 12-21**: D-Rank (150 XP/level)
- **Levels 22-34**: C-Rank (150-250 XP/level)
- **Levels 35-49**: B-Rank (250 XP/level)
- **Levels 50-74**: A-Rank (400 XP/level)
- **Levels 75-100**: S-Rank (600 XP/level)

**XP Sources:**
- Daily Quests: 20-50 XP each
- Dungeons: 100-500 XP
- Custom Workouts: Variable

### 2. Quest System

**Quest Types:**
- **Checkbox**: Simple completion (e.g., "Do 20 Push-ups")
- **Progress**: Incremental tracking (e.g., "Walk 10,000 steps")

**Daily Reset:**
- Quests reset at midnight
- Streak tracking for consecutive days

### 3. Dungeon System

**Dungeon Types:**
1. **Beginner** (Always unlocked)
   - Duration: 15 mins
   - XP: 100
   - Difficulty: ⭐

2. **Warrior** (Always unlocked)
   - Duration: 30 mins
   - XP: 250
   - Difficulty: ⭐⭐⭐

3. **Hell Mode** (Always unlocked)
   - Duration: 45+ mins
   - XP: 500
   - Difficulty: ⭐⭐⭐⭐⭐

4. **Custom** (Unlock at Level 20)
   - Duration: Variable
   - XP: 50 per exercise
   - Create your own workout!

### 4. Sound System

**Sound Effects:**
- Quest Complete: 3-note success jingle
- Dungeon Complete: Epic victory fanfare
- Dungeon Start: Rising energetic tone
- Timer Tick: Subtle beep
- Level Up: Ascending arpeggio

**Technology:**
- Web Audio API (no files needed)
- Procedurally generated sounds
- Cross-browser compatible

### 5. PWA Features

**Capabilities:**
- ✅ Installable on mobile/desktop
- ✅ Offline functionality
- ✅ Auto-update notifications
- ✅ App-like experience
- ✅ Home screen icon

**Manifest:**
- Name: "Solo Grind Fitness"
- Theme: Cyan (#00f3ff)
- Display: Standalone
- Orientation: Portrait

---

## 🌐 Deployment

### Frontend (Vercel)

1. **Connect GitHub repo** to Vercel
2. **Configure build settings:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add environment variable:**
   - `VITE_API_URL`: Your Render backend URL + `/api`
4. **Deploy** 🚀

### Backend (Render)

1. **Create Web Service** on Render
2. **Configure:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
3. **Add environment variables:**
   - `MONGO_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - Email credentials (optional)
4. **Deploy** 🚀

**Detailed Guide:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📱 Responsive Design

**Breakpoints:**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

**Mobile Optimizations:**
- Single-column layouts
- Touch-friendly buttons (min 44x44px)
- Bottom navigation
- Stacked forms
- Optimized font sizes

**Desktop Enhancements:**
- Multi-column grids
- Hover effects
- Larger spacing
- Full-width layouts

---

## 🎨 Design System

### Colors
```css
--primary: #00f3ff (Cyan)
--secondary: #bc13fe (Purple)
--background: #000000 (Black)
--card-bg: rgba(255, 255, 255, 0.05) (Glass)
```

### Typography
- **Headings**: Orbitron (Bold, Futuristic)
- **Body**: Inter (Clean, Readable)

### Components
- **Glass Cards**: Backdrop blur + border
- **Neon Effects**: Glow shadows
- **Gradients**: Primary to Secondary
- **Animations**: Framer Motion

---

## 🔒 Security

**Implemented:**
- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ HTTPS only (production)
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Helmet security headers
- ✅ Input validation
- ✅ XSS protection

**Best Practices:**
- Tokens expire in 7 days
- Passwords min 6 characters
- Email verification
- Secure password reset

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Code Style:**
- TypeScript for type safety
- ESLint for linting
- Prettier for formatting
- Meaningful commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Anand Sahu**
- GitHub: [@Anandsahu06](https://github.com/Anandsahu06)
- Project: [Solo Grind Fitness](https://github.com/Anandsahu06/Solo-Grind-Fitness)

---

## 🙏 Acknowledgments

- **Inspiration**: Solo Leveling anime/manhwa
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI**: Tailwind CSS
- **Hosting**: Vercel + Render
- **Database**: MongoDB Atlas

---

## 📚 Additional Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Auth System](AUTH_SYSTEM_COMPLETE.md)
- [Custom Dungeon Feature](CUSTOM_DUNGEON_FEATURE.md)
- [Sound System](SOUND_SYSTEM.md)
- [Responsive Fixes](RESPONSIVE_FIXES.md)
- [Install Git Guide](INSTALL_GIT.md)

---

## 🎯 Roadmap

### Upcoming Features
- [ ] Social features (Friends, Leaderboards)
- [ ] Guild system
- [ ] More dungeon types
- [ ] Workout templates
- [ ] Exercise library
- [ ] Progress photos
- [ ] Nutrition tracking
- [ ] Apple Health / Google Fit integration
- [ ] Push notifications
- [ ] Dark/Light theme toggle

### In Progress
- [x] PWA implementation
- [x] Sound effects
- [x] Custom dungeons
- [x] Donation system
- [x] Responsive design

---

## 💰 Support

If you find this project helpful, consider supporting development:

**Buy me a coffee:** [Donation Page](https://solo-grind-fitness.vercel.app/donate)

Benefits:
- ⚡ Ad-free experience
- 🛡️ Supporter badge
- ❤️ Eternal gratitude

---

## 📞 Contact

For questions, suggestions, or issues:
- **GitHub Issues**: [Create an issue](https://github.com/Anandsahu06/Solo-Grind-Fitness/issues)
- **Email**: Contact via GitHub profile

---

<div align="center">

**Made with ❤️ and 💪 by Devmitra Production**

⭐ Star this repo if you found it helpful!

[Live Demo](https://solo-grind-fitness.vercel.app) • [Report Bug](https://github.com/Anandsahu06/Solo-Grind-Fitness/issues) • [Request Feature](https://github.com/Anandsahu06/Solo-Grind-Fitness/issues)

</div>
