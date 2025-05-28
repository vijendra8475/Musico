import { Router } from "express";
import { getAllSongs, getFeaturedSong, getMadeForYou, getTrendingSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);

router.get('/featured', protectRoute, requireAdmin, getFeaturedSong);
router.get('/made-for-you', protectRoute, requireAdmin, getMadeForYou);
router.get('/trending', protectRoute, requireAdmin, getTrendingSongs);


export default router;