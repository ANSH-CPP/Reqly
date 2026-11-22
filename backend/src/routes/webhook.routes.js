import {Router} from "express"

import { generateWebhook , receiveWebhook, getWebhookEvents ,recoverWebhookEvent,getWebhookAnalytics, getMyWebhook} from "../controllers/webhook.controller.js"

import {verifyJWT} from "../middlewares/auth.middleware.js"

const webhookRouter = Router();

webhookRouter.post("/generate",verifyJWT,generateWebhook);

webhookRouter.post("/receive/:token", receiveWebhook);

// Get webhook events (JWT authentication required)
webhookRouter.get("/events", verifyJWT, getWebhookEvents);

webhookRouter.post(
    "/recover/:eventId",
    verifyJWT,
    recoverWebhookEvent
);

webhookRouter.get(
    "/analytics",
    verifyJWT,
    getWebhookAnalytics
);

webhookRouter.get("/current", verifyJWT, getMyWebhook);

export {webhookRouter};