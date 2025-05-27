import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express'
import fileupload from 'express-fileupload';
import path from 'path'
import cors from 'cors'

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import songRoutes from './routes/song.routes.js';
import albumRoutes from './routes/album.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();

const app = express();
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}));
const __dirName = path.resolve();
app.use(express.json());
const PORT = process.env.PORT;


app.use(clerkMiddleware()); // This will addauth to request object => req.auth
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirName, 'temp'),
    createParentPath : true,
    limits : {
        fileSize: 10 * 1024 * 1024 // 50 MB
    }
}))

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/song', songRoutes);
app.use('/api/album', albumRoutes);
app.use('/api/stats', statsRoutes);


app.use((err, req, res, next) => {
    res.status(500).json({
        message: process.env.NODE_ENV === 'production' ?'Internal Server Error in index.js' :  err.message,
    });
})

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});

// socket.io