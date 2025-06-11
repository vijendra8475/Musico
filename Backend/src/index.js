import express from 'express';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import fileupload from 'express-fileupload';
import path from 'path'
import cors from 'cors'
import fs from 'fs'
import { createServer } from 'http';
import cron from 'node-cron'

import { initilizeSocket } from './lib/socket.js';

import { connectDB } from './lib/db.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import songRoutes from './routes/song.routes.js';
import albumRoutes from './routes/album.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();

const __dirName = path.resolve();
const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app)
initilizeSocket(httpServer)

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware()); // This will addauth to request object => req.auth


app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: path.join(__dirName, 'temp'),
        createParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024 // 10 MB
        }
    }))


// cron jobs
const tempDir = path.join(process.cwd(), "temp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/song', songRoutes);
app.use('/api/album', albumRoutes);
app.use('/api/stats', statsRoutes);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirName, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirName, "../frontend", "dist", "index.html"));
    });
}


app.use((err, req, res, next) => {
    res.status(500).json({
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error in index.js' : err.message,
    });
})

httpServer.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});

// socket.io