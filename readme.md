# 🎵 Musico – Full Stack Application

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
</div>

## 🎯 Overview

A modern full-stack music streaming platform built with React, TypeScript, Node.js, and MongoDB. Features include:

- 🔐 User authentication via Clerk
- 🎵 Music streaming
- 💿 Album management
- ☁️ Cloudinary file uploads
- 💬 Real-time chat (Socket.io)

## 📁 File Structure

<details>
<summary>Click to expand</summary>

```
.
├── Backend/
│   └── src/
│       ├── controller/
│       ├── lib/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── seeds/
│       └── temp/
└── Frontend/
    └── Spotify/
        ├── public/
        └── src/
```
</details>

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 🔄 Zustand (State Management)
- 🌐 Axios
- 🎭 Radix UI

### Backend
- 📡 Node.js/Express
- 🗄️ MongoDB
- ☁️ Cloudinary
- 🔐 Clerk Auth
- 🔄 Socket.io

## ⚙️ Environment Setup

<details>
<summary>Backend Environment Variables</summary>

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
CLOUDNIARY_NAME=your_cloudinary_name
CLERK_SECRET_KEY=your_clerk_secret
```
</details>

<details>
<summary>Frontend Environment Variables</summary>

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```
</details>

## 🚀 API Routes

### 🔐 Authentication
- `POST /api/auth/callback` - Sync Clerk user

### 👥 User Management
- `GET /api/users` - List all users

### 👑 Admin Routes
- `GET /api/admin/check` - Admin verification
- `POST /api/admin/songs` - Create song
- `POST /api/admin/albums` - Create album

### 🎵 Music
- `GET /api/song/featured` - Get featured songs
- `GET /api/song/trending` - Get trending songs
- `GET /api/album/:albumId` - Get album details

## 🚀 Quick Start

```bash
# Backend Setup
cd Backend
npm install
npm run seed:song   # Optional

# Frontend Setup
cd Frontend/Spotify
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start! 🎉

---

<div align="center">
  <sub>Built with ❤️ for music lovers</sub>
</div>
