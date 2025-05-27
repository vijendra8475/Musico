import { Router } from "express";

import { authUser } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", authUser);

export default router;