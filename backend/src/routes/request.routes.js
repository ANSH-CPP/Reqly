
import Router from "express";
import { executeRequest } from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/execute", verifyJWT, executeRequest);

export { router as requestRouter };
