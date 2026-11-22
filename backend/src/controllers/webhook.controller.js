
import crypto from "crypto";

import { Webhook } from "../models/webhook.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { WebhookEvent } from "../models/webhookEvent.model.js";
import { ApiError } from "../utils/ApiError.js";
import { addIncomingWebhookJob } from "../queues/incomingWebhook.queue.js";
import { encryptToken } from "../utils/webhookEncryption.js";
import { decryptToken } from "../utils/webhookEncryption.js";


// Supported webhook event types
const SUPPORTED_EVENT_TYPES = [
    "deployment.started",
    "deployment.success",
    "deployment.failed",
    "test.completed"
];

// const generateWebhook = asyncHandler(async (req, res) => {

//     const token = crypto.randomBytes(32).toString("hex");

//     const tokenHash = crypto
//         .createHash("sha256")
//         .update(token)
//         .digest("hex");

//     const webhook = await Webhook.create({
//         user: req.user._id,
//         tokenHash
//     });

//     const baseUrl = process.env.API_BASE_URL ||
//         `${req.protocol}://${req.get("host")}`;

//     const webhookUrl = `${baseUrl}/api/v1/webhooks/receive/${token}`;

//     return res.status(201).json(
//         new ApiResponse(
//             201,
//             {
//                 webhookId: webhook._id,
//                 webhookUrl,
//                 isActive: webhook.isActive,
//                 createdAt: webhook.createdAt
//             },
//             "Webhook URL generated successfully"
//         )
//     );
// });











const generateWebhook = asyncHandler(async (req, res) => {

    // Step 1: Generate a random token
    const token = crypto.randomBytes(32).toString("hex");

    // Step 2: Hash token for incoming request verification
    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Step 3: Encrypt original token for future retrieval
    const tokenEncrypted = encryptToken(token);

    // Step 4: Save webhook in MongoDB
    const webhook = await Webhook.create({
        user: req.user._id,
        tokenHash,
        tokenEncrypted
    });

    // Step 5: Generate webhook URL
    const baseUrl = process.env.API_BASE_URL ||
        `${req.protocol}://${req.get("host")}`;

    const webhookUrl =
        `${baseUrl}/api/v1/webhooks/receive/${token}`;

    // Step 6: Send response
    return res.status(201).json(
        new ApiResponse(
            201,
            {
                webhookId: webhook._id,
                webhookUrl,
                isActive: webhook.isActive,
                createdAt: webhook.createdAt
            },
            "Webhook URL generated successfully"
        )
    );
});













// const receiveWebhook = asyncHandler(async (req, res) => {

//     // Step 1: Validate payload structure
//     const payload = req.body;

//     if (
//         !payload ||
//         typeof payload !== "object" ||
//         Array.isArray(payload)
//     ) {
//         throw new ApiError(400, "Invalid webhook payload");
//     }

//     // Step 2: Validate eventType
//     const eventType = payload.eventType;

//     if (
//         !eventType ||
//         typeof eventType !== "string" ||
//         !SUPPORTED_EVENT_TYPES.includes(eventType.trim())
//     ) {
//         throw new ApiError(
//             400,
//             "Invalid or unsupported webhook event type"
//         );
//     }

//     // Step 3: Extract token
//     const { token } = req.params;

//     // Step 4: Hash token
//     const tokenHash = crypto
//         .createHash("sha256")
//         .update(token)
//         .digest("hex");

//     // Step 5: Find active webhook
//     const webhook = await Webhook.findOne({
//         tokenHash,
//         isActive: true
//     });

//     if (!webhook) {
//         throw new ApiError(404, "Webhook endpoint not found");
//     }

//     // Step 6: Remove sensitive headers
//     const headers = { ...req.headers };

//     delete headers.authorization;
//     delete headers.cookie;
//     delete headers["set-cookie"];
//     delete headers["proxy-authorization"];

//     // Step 7: Save classified event in MongoDB
//     const webhookEvent = await WebhookEvent.create({
//         webhook: webhook._id,
//         eventType: eventType.trim(),
//         method: req.method,
//         headers,
//         query: req.query,
//         body: payload,
//         receivedAt: new Date()
//     });

//     // Step 8: Update last received time
//     webhook.lastReceivedAt = new Date();
//     await webhook.save();

//     // Step 9: Add event to BullMQ queue
//     const job = await addIncomingWebhookJob(webhookEvent._id);

//     console.log("Webhook job added:", job.id);
//     console.log("Event type:", webhookEvent.eventType);

//     // Step 10: Send acknowledgement
//     return res.status(200).json(
//         new ApiResponse(
//             200,
//             {
//                 eventId: webhookEvent._id,
//                 eventType: webhookEvent.eventType,
//                 jobId: job.id,
//                 receivedAt: webhookEvent.receivedAt
//             },
//             "Webhook received and queued successfully"
//         )
//     );
// });



const receiveWebhook = asyncHandler(async (req, res) => {

    // Step 1: Validate payload
    const payload = req.body;

    if (
        !payload ||
        typeof payload !== "object" ||
        Array.isArray(payload)
    ) {
        throw new ApiError(400, "Invalid webhook payload");
    }

    // Step 2: Validate event ID
    const providerEventId = payload.eventId;

    if (
        typeof providerEventId !== "string" ||
        !providerEventId.trim()
    ) {
        throw new ApiError(400, "Webhook eventId is required");
    }

    // Step 3: Validate event type
    const eventType = payload.eventType;

    if (
        typeof eventType !== "string" ||
        !SUPPORTED_EVENT_TYPES.includes(eventType.trim())
    ) {
        throw new ApiError(
            400,
            "Invalid or unsupported webhook event type"
        );
    }

    // Step 4: Extract and hash webhook token
    const { token } = req.params;

    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Step 5: Find active webhook
    const webhook = await Webhook.findOne({
        tokenHash,
        isActive: true
    });

    if (!webhook) {
        throw new ApiError(404, "Webhook endpoint not found");
    }

    // Step 6: Remove sensitive headers
    const headers = { ...req.headers };

    delete headers.authorization;
    delete headers.cookie;
    delete headers["set-cookie"];
    delete headers["proxy-authorization"];

    // Step 7: Save event in MongoDB
    let webhookEvent;

    try {
        webhookEvent = await WebhookEvent.create({
            webhook: webhook._id,
            providerEventId: providerEventId.trim(),
            eventType: eventType.trim(),
            method: req.method,
            headers,
            query: req.query,
            body: payload,
            receivedAt: new Date()
        });

    } catch (error) {

        // Step 8: Handle duplicate event
        if (error.code === 11000) {

            const existingEvent = await WebhookEvent.findOne({
                webhook: webhook._id,
                providerEventId: providerEventId.trim()
            });

            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        duplicate: true,
                        eventId: existingEvent?._id,
                        providerEventId,
                        processingStatus: existingEvent?.processingStatus
                    },
                    "Duplicate webhook event ignored"
                )
            );
        }

        throw error;
    }

    // Step 9: Update last received time
    webhook.lastReceivedAt = new Date();
    await webhook.save();

    // Step 10: Add only new events to BullMQ
    const job = await addIncomingWebhookJob(webhookEvent._id);

    console.log("Webhook job added:", job.id);
    console.log("Event type:", webhookEvent.eventType);

    // Step 11: Send acknowledgement
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                duplicate: false,
                eventId: webhookEvent._id,
                providerEventId: webhookEvent.providerEventId,
                eventType: webhookEvent.eventType,
                jobId: job.id,
                receivedAt: webhookEvent.receivedAt
            },
            "Webhook received and queued successfully"
        )
    );
});


const getWebhookEvents = asyncHandler(async (req, res) => {

    const webhooks = await Webhook.find({
        user: req.user._id
    }).select("_id");

    const webhookIds = webhooks.map(
        (webhook) => webhook._id
    );

    const events = await WebhookEvent.find({
        webhook: { $in: webhookIds }
    })
        .sort({ receivedAt: -1 })
        .limit(50);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalEvents: events.length,
                events
            },
            "Webhook events fetched successfully"
        )
    );
});




const getWebhookAnalytics = asyncHandler(async (req, res) => {

    // Step 1: Find all webhooks belonging to logged-in user
    const webhooks = await Webhook.find({
        user: req.user._id
    }).select("_id");

    const webhookIds = webhooks.map(
        (webhook) => webhook._id
    );

    // Step 2: Calculate analytics using aggregation
    const analytics = await WebhookEvent.aggregate([

        // Filter events belonging to this user
        {
            $match: {
                webhook: { $in: webhookIds }
            }
        },

        // Calculate total events and status-wise counts
        {
            $group: {
                _id: null,

                totalEvents: {
                    $sum: 1
                },

                successfulEvents: {
                    $sum: {
                        $cond: [
                            { $eq: ["$processingStatus", "completed"] },
                            1,
                            0
                        ]
                    }
                },

                failedEvents: {
                    $sum: {
                        $cond: [
                            { $eq: ["$processingStatus", "failed"] },
                            1,
                            0
                        ]
                    }
                },

                pendingEvents: {
                    $sum: {
                        $cond: [
                            { $eq: ["$processingStatus", "pending"] },
                            1,
                            0
                        ]
                    }
                },

                retryingEvents: {
                    $sum: {
                        $cond: [
                            { $eq: ["$processingStatus", "retrying"] },
                            1,
                            0
                        ]
                    }
                },

                deadLetteredEvents: {
                    $sum: {
                        $cond: [
                            { $eq: ["$processingStatus", "dead-lettered"] },
                            1,
                            0
                        ]
                    }
                },

                totalAttempts: {
                    $sum: "$attemptCount"
                },

                averageProcessingTime: {
                    $avg: {
                        $cond: [
                            {
                                $and: [
                                    { $ne: ["$processingStartedAt", null] },
                                    { $ne: ["$processingCompletedAt", null] }
                                ]
                            },
                            {
                                $subtract: [
                                    "$processingCompletedAt",
                                    "$processingStartedAt"
                                ]
                            },
                            null
                        ]
                    }
                }
            }
        },

        // Format final response
        {
            $project: {
                _id: 0,
                totalEvents: 1,
                successfulEvents: 1,
                failedEvents: 1,
                pendingEvents: 1,
                retryingEvents: 1,
                deadLetteredEvents: 1,
                totalAttempts: 1,
                averageProcessingTime: 1,

                successRate: {
                    $cond: [
                        { $gt: ["$totalEvents", 0] },
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        "$successfulEvents",
                                        "$totalEvents"
                                    ]
                                },
                                100
                            ]
                        },
                        0
                    ]
                }
            }
        }
    ]);

    // Step 3: Handle empty collection
    const result = analytics[0] || {
        totalEvents: 0,
        successfulEvents: 0,
        failedEvents: 0,
        pendingEvents: 0,
        retryingEvents: 0,
        deadLetteredEvents: 0,
        totalAttempts: 0,
        averageProcessingTime: null,
        successRate: 0
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Webhook analytics fetched successfully"
        )
    );
});




const recoverWebhookEvent = asyncHandler(async (req, res) => {

    const { eventId } = req.params;

    // Step 1: Find event and verify ownership
    const event = await WebhookEvent.findOne({
        _id: eventId,
        processingStatus: "dead-lettered"
    }).populate("webhook", "user");

    if (!event) {
        throw new ApiError(
            404,
            "Dead letter webhook event not found"
        );
    }

    if (
        !event.webhook ||
        event.webhook.user.toString() !== req.user._id.toString()
    ) {
        throw new ApiError(403, "You are not allowed to recover this event");
    }

    // Step 2: Generate unique job ID
    const nextRecoveryCount = event.recoveryCount + 1;

    const recoveryJobId =
        `${event._id.toString()}-recovery-${nextRecoveryCount}`;

    // Step 3: Add event back to incoming queue
    const job = await addIncomingWebhookJob(
        event._id,
        recoveryJobId
    );

    // Step 4: Update MongoDB
    event.processingStatus = "pending";
    event.recoveryCount = nextRecoveryCount;
    event.lastRecoveredAt = new Date();
    event.processingCompletedAt = null;
    event.failedAt = null;
    event.deadLetteredAt = null;
    event.dlqReason = null;

    await event.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                eventId: event._id,
                recoveryCount: event.recoveryCount,
                jobId: job.id
            },
            "Webhook event queued for manual recovery"
        )
    );
});


const getMyWebhook = asyncHandler(async (req, res) => {
    // Find the user's latest active webhook
    const webhook = await Webhook.findOne({
        user: req.user._id,
        isActive: true
    })
    .sort({ createdAt: -1 })
    .select("+tokenEncrypted");

    if (!webhook) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "No active webhook found"
            )
        );
    }

    if (!webhook.tokenEncrypted) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "Webhook URL cannot be recovered. Generate a new webhook."
            )
        );
    }

    // Decrypt original token
    const token = decryptToken(webhook.tokenEncrypted);

    const baseUrl = process.env.API_BASE_URL ||
        `${req.protocol}://${req.get("host")}`;

    const webhookUrl =
        `${baseUrl}/api/v1/webhooks/receive/${token}`;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                webhookId: webhook._id,
                webhookUrl,
                isActive: webhook.isActive,
                createdAt: webhook.createdAt
            },
            "Webhook retrieved successfully"
        )
    );
});

// export {
//     generateWebhook,
//     receiveWebhook,
//     getWebhookEvents,
//     recoverWebhookEvent,
//     getWebhookAnalytics
// };

export {
    generateWebhook,
    getMyWebhook,
    receiveWebhook,
    getWebhookEvents,
    recoverWebhookEvent,
    getWebhookAnalytics
};