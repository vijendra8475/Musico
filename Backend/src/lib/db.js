import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connection successfully to MongoDB:', conn.connection.host);
        
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process with failure
        
    }
}