const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [30, 'Username cannot be more than 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't return password by default
    },
    avatar: {
        type: Number,
        default: 1,
        min: 1,
        max: 6
    },
    fitnessLevel: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    rank: {
        type: String,
        enum: ['F', 'E', 'D', 'C', 'B', 'A', 'S'],
        default: 'F'
    },
    level: {
        type: Number,
        default: 1,
        min: 1
    },
    xp: {
        type: Number,
        default: 0,
        min: 0
    },
    xpToNextLevel: {
        type: Number,
        default: 100
    },
    stats: {
        strength: { type: Number, default: 5 },
        agility: { type: Number, default: 5 },
        stamina: { type: Number, default: 5 },
        focus: { type: Number, default: 5 }
    },
    streak: {
        current: { type: Number, default: 0 },
        best: { type: Number, default: 0 },
        lastActiveDate: { type: Date }
    },
    titles: {
        type: [String],
        default: ['Weakest Trainee']
    },
    guildId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guild',
        default: null
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
    const verificationToken = crypto.randomBytes(32).toString('hex');

    this.emailVerificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    return verificationToken;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken;
};

// Add XP and handle leveling
userSchema.methods.addXp = function (amount) {
    this.xp += amount;

    while (this.xp >= this.xpToNextLevel) {
        this.xp -= this.xpToNextLevel;
        this.level += 1;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);

        // Check for rank up
        this.checkRankUp();
    }

    return this.save();
};

// Check and update rank based on level
userSchema.methods.checkRankUp = function () {
    const rankThresholds = {
        'F': 1,
        'E': 5,
        'D': 10,
        'C': 20,
        'B': 35,
        'A': 50,
        'S': 75
    };

    for (const [rank, threshold] of Object.entries(rankThresholds).reverse()) {
        if (this.level >= threshold) {
            if (this.rank !== rank) {
                this.rank = rank;
                // Add rank-up title
                this.titles.push(`${rank}-Rank Hunter`);
            }
            break;
        }
    }
};

// Update streak
userSchema.methods.updateStreak = function () {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActive = this.streak.lastActiveDate
        ? new Date(this.streak.lastActiveDate).setHours(0, 0, 0, 0)
        : null;

    if (!lastActive) {
        // First time
        this.streak.current = 1;
        this.streak.lastActiveDate = new Date();
    } else {
        const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            // Same day, no change
            return;
        } else if (daysDiff === 1) {
            // Consecutive day
            this.streak.current += 1;
            this.streak.lastActiveDate = new Date();

            if (this.streak.current > this.streak.best) {
                this.streak.best = this.streak.current;
            }
        } else {
            // Streak broken
            this.streak.current = 1;
            this.streak.lastActiveDate = new Date();
        }
    }

    return this.save();
};

module.exports = mongoose.model('User', userSchema);
