const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/me
// @desc    Get user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                fitnessLevel: user.fitnessLevel,
                rank: user.rank,
                level: user.level,
                xp: user.xp,
                xpToNextLevel: user.xpToNextLevel,
                stats: user.stats,
                streak: user.streak,
                titles: user.titles,
                guildId: user.guildId,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PATCH /api/users/me
// @desc    Update user profile
// @access  Private
router.patch('/me', protect, async (req, res) => {
    try {
        const allowedUpdates = ['name', 'avatar', 'fitnessLevel'];
        const updates = {};

        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                fitnessLevel: user.fitnessLevel,
                rank: user.rank,
                level: user.level,
                xp: user.xp,
                stats: user.stats,
                streak: user.streak,
                titles: user.titles
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/users/me
// @desc    Delete user account
// @access  Private
router.delete('/me', protect, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);

        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;
