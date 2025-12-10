# Solo Grind Fitness - Backend API

A complete Node.js + Express + MongoDB backend for the Solo Grind Fitness app.

## Features

- ✅ User Authentication (JWT)
- ✅ Email Verification
- ✅ Password Reset
- ✅ User Profile Management
- ✅ Quest Management
- ✅ Dungeon System
- ✅ Guild System
- ✅ Stats Tracking

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Email**: Nodemailer
- **Environment**: dotenv

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/solo-grind-fitness

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email (for verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# OAuth (Google)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Start MongoDB

Make sure MongoDB is running locally:

```bash
# macOS/Linux
mongod

# Windows
# MongoDB should start automatically if installed as a service
```

### 4. Run the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/verify-email      - Verify email with token
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password with token
POST   /api/auth/google            - Google OAuth login
GET    /api/auth/me                - Get current user (protected)
```

### Users

```
GET    /api/users/me               - Get user profile
PATCH  /api/users/me               - Update user profile
DELETE /api/users/me               - Delete user account
```

### Quests

```
GET    /api/quests/daily           - Get today's daily quests
POST   /api/quests/:id/complete    - Mark quest as complete
GET    /api/quests/history         - Get quest completion history
```

### Dungeons

```
GET    /api/dungeons               - Get all available dungeons
POST   /api/dungeons/:id/start     - Start a dungeon run
POST   /api/dungeons/:id/complete  - Complete a dungeon run
GET    /api/dungeons/history       - Get dungeon run history
```

### Stats

```
GET    /api/stats/overview         - Get user stats overview
GET    /api/stats/history          - Get stats history (graphs)
```

### Guilds

```
POST   /api/guilds                 - Create a new guild
GET    /api/guilds/:id             - Get guild details
POST   /api/guilds/:id/join        - Join a guild
POST   /api/guilds/:id/leave       - Leave a guild
GET    /api/guilds/:id/members     - Get guild members
```

## Database Models

### User Schema

```javascript
{
  name: String,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  avatar: Number,
  fitnessLevel: String,
  rank: String (F/E/D/C/B/A/S),
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
  titles: [String],
  guildId: ObjectId,
  isEmailVerified: Boolean,
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: Date
}
```

## Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token authentication
- ✅ Email verification required
- ✅ Password reset with expiring tokens
- ✅ Rate limiting on auth endpoints
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Helmet.js security headers

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## Production Deployment

### Option 1: Railway / Render

1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy!

### Option 2: VPS (DigitalOcean, AWS)

1. Set up MongoDB Atlas (cloud database)
2. Deploy Node.js app with PM2
3. Set up Nginx reverse proxy
4. Configure SSL with Let's Encrypt

## License

MIT
