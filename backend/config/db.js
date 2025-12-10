const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.log('⚠️  Server will continue without database. Install MongoDB or use MongoDB Atlas.');
        console.log('📝 For MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
        // Don't exit - let server run for testing
    }
};

module.exports = connectDB;
