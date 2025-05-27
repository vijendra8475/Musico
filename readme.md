# Spotify Clone – Full Stack Application

## Overview

This project is a full-stack Spotify-like application with a React + TypeScript + Vite frontend and a Node.js + Express + MongoDB backend. It supports user authentication (via Clerk), music streaming, album and song management, and real-time chat features.

---

## File Structure

```
.
├── Backend/
│   ├── package.json
│   └── src/
│       ├── .env
│       ├── index.js
│       ├── controller/
│       ├── lib/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── seeds/
└── Frontend/
    └── Spotify/
        ├── .env
        ├── package.json
        ├── index.html
        ├── vite.config.ts
        ├── tsconfig*.json
        ├── public/
        └── src/
```

---

## How the Application Works

- **Frontend**: Built with React, TypeScript, Vite, and Tailwind CSS. Handles user authentication, music browsing, playback, and chat UI.
- **Backend**: Node.js/Express REST API with MongoDB for data storage. Handles authentication, CRUD for songs/albums, user management, and statistics.
- **Authentication**: Uses Clerk for secure user authentication and admin checks.
- **Media Storage**: Uses Cloudinary for storing song and album images/audio files.
- **Real-time Features**: (Planned) Socket.io for chat and live updates.

---

## Environment Variables

### Backend (`Backend/src/.env`)

- `PORT`: Port for backend server (e.g., 5000)
- `MONGODB_URI`: MongoDB connection string
- `Admin_Email`: Email address for admin user
- `CLOUDNIARY_NAME`, `CLOUDNIARY_API_KEY`, `CLOUDNIARY_API_SECRET`: Cloudinary credentials
- `NODE_ENV`: Environment (development/production)
- `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`: Clerk authentication keys

### Frontend (`Frontend/Spotify/.env`)

- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for frontend authentication

---

## Dependencies

### Backend

- express
- mongoose
- dotenv
- cors
- express-fileupload
- cloudinary
- @clerk/express
- socket.io

### Frontend

- react, react-dom
- typescript
- vite
- tailwindcss, tw-animate-css
- @clerk/clerk-react
- @radix-ui/react-*
- axios
- zustand
- class-variance-authority, clsx, tailwind-merge
- lucide-react
- react-router-dom

---

## API Routes

### Auth

- `POST /api/auth/callback`  
  Syncs Clerk user to backend DB.  
  **Body:** `{ id, firstName, lastName, imageUrl }`

### User

- `GET /api/users`  
  Returns all users except the current user.  
  **Auth:** Required

### Admin

- `GET /api/admin/check`  
  Checks if current user is admin.  
  **Auth:** Admin only

- `POST /api/admin/songs`  
  Create a new song (with file upload).  
  **Auth:** Admin only

- `DELETE /api/admin/songs/:id`  
  Delete a song by ID.  
  **Auth:** Admin only

- `POST /api/admin/albums`  
  Create a new album (with file upload).  
  **Auth:** Admin only

- `DELETE /api/admin/albums/:id`  
  Delete an album and its songs.  
  **Auth:** Admin only

### Song

- `GET /api/song/`  
  Get all songs.  
  **Auth:** Admin only

- `GET /api/song/featured`  
  Get 6 random featured songs.  
  **Auth:** Admin only

- `GET /api/song/made-for-you`  
  Get 4 random songs for "Made For You".  
  **Auth:** Admin only

- `GET /api/song/trendding`  
  Get 4 trending songs.  
  **Auth:** Admin only

### Album

- `GET /api/album/`  
  Get all albums.

- `GET /api/album/:albumId`  
  Get album by ID (with songs populated).

### Stats

- `GET /api/stats/`  
  Get stats: total users, songs, albums, unique artists.  
  **Auth:** Admin only

---

## Notes

- All protected routes require a valid Clerk JWT in the `Authorization` header.
- Admin routes require the user to have the email specified in `Admin_Email`.
- File uploads (songs/images) are handled via Cloudinary.

---

## Running the Application

1. **Install dependencies** in both `Backend` and `Frontend/Spotify` folders.
2. **Set up environment variables** as described above.
3. **Start the backend**:  
   ```
   cd Backend
   npm install
   npm run seed:song   # (optional) Seed songs
   node src/index.js
   ```
4. **Start the frontend**:  
   ```
   cd Frontend/Spotify
   npm install
   npm run dev
   ```
5. Visit [http://localhost:3000](http://localhost:3000) to use the app.

