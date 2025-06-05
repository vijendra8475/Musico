import { Router } from "express";
// import { getAdmin } from "../controller/admin.controller.js";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute,requireAdmin);

router.get('/check', checkAdmin);

router.post("/song", createSong);
router.delete("/song/:id", deleteSong);

router.post("/album", createAlbum);
router.delete("/album/:id", deleteAlbum);

export default router;