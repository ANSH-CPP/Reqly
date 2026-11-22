
import { Router } from "express";

import {
    createHistory,
    getHistory,
    deleteHistory,
    deleteAllHistory
} from "../controllers/history.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createHistory);

router.get("/", verifyJWT, getHistory);

// Keep this route before /:id
router.delete("/all", verifyJWT, deleteAllHistory);

router.delete("/:id", verifyJWT, deleteHistory);

export { router as historyRouter };
