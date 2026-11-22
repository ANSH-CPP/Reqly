// // import dotenv from "dotenv";

// // dotenv.config({
// //     path: "./.env"
// // });
// // import { Worker } from "bullmq";

// // import { redisConnection } from "../config/redis.js";
// // import connectDB from "../db/index.js";

// // import { WebhookEvent } from "../models/webhookEvent.model.js";

// // // Connect to MongoDB before starting the worker
// // await connectDB();

// // // Create BullMQ worker
// // const incomingWebhookWorker = new Worker(
// //     "incoming-webhooks",

    
// //     async (job) => {

// //         console.log("Processing incoming webhook job:", job.id);

// //         // Step 1: Get event ID
// //         const { eventId } = job.data;

// //         // Step 2: Find event in MongoDB
// //         const event = await WebhookEvent.findById(eventId);

// //         if (!event) {
// //             throw new Error("Webhook event not found");
// //         }

// //         // Step 3: Update status to processing
// //         await WebhookEvent.findByIdAndUpdate(
// //             eventId,
// //             {
// //                 processingStatus: "processing"
// //             }
// //         );

// //         // Step 4: Process webhook event
// //         console.log("Webhook event body:");
// //         console.log(event.body);

// //         // Step 5: Update status to completed
// //         await WebhookEvent.findByIdAndUpdate(
// //             eventId,
// //             {
// //                 processingStatus: "completed"
// //             }
// //         );

// //         console.log("Webhook event processed successfully");

// //         return {
// //             success: true,
// //             eventId: eventId
// //         };
// //     },


// //     {
// //         connection: redisConnection,
// //         concurrency: 5
// //     }
// // );

// // // Worker event listeners
// // incomingWebhookWorker.on("completed", (job) => {
// //     console.log(`Job ${job.id} completed successfully`);
// // });

// // incomingWebhookWorker.on("failed", (job, error) => {
// //     console.error(`Job ${job?.id} failed:`, error.message);
// // });

// // console.log("Incoming webhook worker started");



// import "dotenv/config";

// import { Worker } from "bullmq";
// import { redisConnection } from "../config/redis.js";
// import connectDB from "../db/index.js";
// import { WebhookEvent } from "../models/webhookEvent.model.js";

// // Connect to MongoDB before starting Worker
// await connectDB();

// const incomingWebhookWorker = new Worker(
//     "incoming-webhooks",

//     async (job) => {
//         console.log("Processing incoming webhook job:", job.id);

//         const { eventId } = job.data;

//         // Step 1: Find event
//         const event = await WebhookEvent.findById(eventId);

//         if (!event) {
//             throw new Error("Webhook event not found");
//         }

//         // BullMQ attemptsMade starts at 0 for the first attempt
//         const currentAttempt = job.attemptsMade + 1;
//         const maxAttempts = job.opts.attempts ?? 1;

//         try {
//             // Step 2: Mark event as processing
//             await WebhookEvent.findByIdAndUpdate(
//                 eventId,
//                 {
//                     processingStatus: "processing",
//                     attemptCount: currentAttempt,
//                     processingStartedAt: new Date(),
//                     lastError: null
//                 }
//             );

//             console.log(
//                 `Attempt ${currentAttempt}/${maxAttempts}`
//             );

//             // Step 3: Process webhook event
//             console.log("Webhook event body:");
//             console.log(event.body);

//             // Actual business logic will be added here.

//             // Step 4: Mark event as completed
//             await WebhookEvent.findByIdAndUpdate(
//                 eventId,
//                 {
//                     processingStatus: "completed",
//                     attemptCount: currentAttempt,
//                     processingCompletedAt: new Date(),
//                     lastError: null,
//                     failedAt: null
//                 }
//             );

//             console.log("Webhook event processed successfully");

//             return {
//                 success: true,
//                 eventId,
//                 attemptCount: currentAttempt
//             };

//             console.log("Webhook event body:");
//             console.log(event.body);

//         } catch (error) {

//             // Step 5: Determine whether more retries are available
//             const isFinalAttempt = currentAttempt >= maxAttempts;

//             // Step 6: Save failure information
//             await WebhookEvent.findByIdAndUpdate(
//                 eventId,
//                 {
//                     processingStatus: isFinalAttempt
//                         ? "failed"
//                         : "retrying",

//                     attemptCount: currentAttempt,
//                     lastError: error.message,

//                     ...(isFinalAttempt
//                         ? { failedAt: new Date() }
//                         : {})
//                 }
//             );

//             console.error(
//                 `Attempt ${currentAttempt} failed:`,
//                 error.message
//             );

//             // Important: Throw error so BullMQ can retry the job
//             throw error;
//         }
//     },

//     {
//         connection: redisConnection,
//         concurrency: 5
//     }
// );

// // Worker event listeners
// incomingWebhookWorker.on("completed", (job) => {
//     console.log(`Job ${job.id} completed successfully`);
// });

// incomingWebhookWorker.on("failed", (job, error) => {
//     console.error(
//         `Job ${job?.id} failed on attempt ${job?.attemptsMade}:`,
//         error.message
//     );
// });

// console.log("Incoming webhook worker started");





import "dotenv/config";

import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import connectDB from "../db/index.js";
import { WebhookEvent } from "../models/webhookEvent.model.js";
import { addToDeadLetterQueue } from "../queues/deadLetter.queue.js";
await connectDB();

const incomingWebhookWorker = new Worker(
    "incoming-webhooks",

    async (job) => {
        console.log("Processing incoming webhook job:", job.id);

        const { eventId } = job.data;

        const event = await WebhookEvent.findById(eventId);

        if (!event) {
            throw new Error("Webhook event not found");
        }

        const currentAttempt = job.attemptsMade + 1;
        const maxAttempts = job.opts.attempts ?? 1;

        try {
            await WebhookEvent.findByIdAndUpdate(
                eventId,
                {
                    processingStatus: "processing",
                    attemptCount: currentAttempt,
                    processingStartedAt: new Date()
                }
            );

            console.log(`Attempt ${currentAttempt}/${maxAttempts}`);

            console.log("Webhook event body:");
            console.log(event.body);

            // TEMPORARY FAILURE TEST
            // if (event.body?.forceFailure === true) {
            //     console.log("Simulating failure...");
            //     throw new Error("Temporary test failure");
            // }

            // Actual business logic will be added here.

            await WebhookEvent.findByIdAndUpdate(
                eventId,
                {
                    processingStatus: "completed",
                    attemptCount: currentAttempt,
                    processingCompletedAt: new Date(),
                    lastError: null,
                    failedAt: null
                }
            );

            console.log("Webhook event processed successfully");

            return {
                success: true,
                eventId,
                attemptCount: currentAttempt
            };

        
} catch (error) {
    const isFinalAttempt = currentAttempt >= maxAttempts;

    if (isFinalAttempt) {
        // Step 1: Add permanently failed event to DLQ
        await addToDeadLetterQueue(eventId, error.message);

        // Step 2: Update MongoDB status
        await WebhookEvent.findByIdAndUpdate(
            eventId,
            {
                processingStatus: "dead-lettered",
                attemptCount: currentAttempt,
                lastError: error.message,
                failedAt: new Date(),
                deadLetteredAt: new Date(),
                dlqReason: error.message
            }
        );

        console.log("Webhook moved to Dead Letter Queue");

    } else {
        // More retries are available
        await WebhookEvent.findByIdAndUpdate(
            eventId,
            {
                processingStatus: "retrying",
                attemptCount: currentAttempt,
                lastError: error.message
            }
        );
    }

            console.error(
                `Attempt ${currentAttempt} failed:`,
                error.message
            );

            // BullMQ needs this error to perform retries
            throw error;
        }

    },

    {
        connection: redisConnection,
        concurrency: 5
    }
);

incomingWebhookWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

incomingWebhookWorker.on("failed", (job, error) => {
    console.error(
        `Job ${job?.id} failed on attempt ${job?.attemptsMade}:`,
        error.message
    );
});

console.log("Incoming webhook worker started");
