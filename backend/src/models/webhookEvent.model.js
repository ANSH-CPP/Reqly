
// // import mongoose, { Schema } from "mongoose";

// // const webhookEventSchema = new Schema(
// //     {
// //         webhook: {
// //             type: Schema.Types.ObjectId,
// //             ref: "Webhook",
// //             required: true,
// //             index: true
// //         },

// //         eventType: {
// //             type: String,
// //             required: true,
// //             enum: [
// //                 "deployment.started",
// //                 "deployment.success",
// //                 "deployment.failed",
// //                 "test.completed"
// //             ],
// //             index: true
// //         },

// //         method: {
// //             type: String,
// //             required: true
// //         },

// //         headers: {
// //             type: Schema.Types.Mixed,
// //             default: {}
// //         },

// //         query: {
// //             type: Schema.Types.Mixed,
// //             default: {}
// //         },

// //         body: {
// //             type: Schema.Types.Mixed,
// //             default: {}
// //         },

// //         receivedAt: {
// //             type: Date,
// //             default: Date.now
// //         },

// //         processingStatus: {
// //             type: String,
// //             enum: ["pending", "processing", "completed", "failed"],
// //             default: "pending"
// //         }
// //     },
// //     {
// //         timestamps: true
// //     }
// // );

// // export const WebhookEvent = mongoose.model(
// //     "WebhookEvent",
// //     webhookEventSchema
// // );





// import mongoose, { Schema } from "mongoose";

// const webhookEventSchema = new Schema(
//     {
//         webhook: {
//             type: Schema.Types.ObjectId,
//             ref: "Webhook",
//             required: true,
//             index: true
//         },

//         // Unique ID supplied by the external service
//         providerEventId: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         eventType: {
//             type: String,
//             required: true,
//             enum: [
//                 "deployment.started",
//                 "deployment.success",
//                 "deployment.failed",
//                 "test.completed"
//             ],
//             index: true
//         },

//         method: {
//             type: String,
//             required: true
//         },

//         headers: {
//             type: Schema.Types.Mixed,
//             default: {}
//         },

//         query: {
//             type: Schema.Types.Mixed,
//             default: {}
//         },

//         body: {
//             type: Schema.Types.Mixed,
//             default: {}
//         },

//         receivedAt: {
//             type: Date,
//             default: Date.now
//         },

//         processingStatus: {
//             type: String,
//             enum: ["pending", "processing", "completed", "failed"],
//             default: "pending"
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// // Prevent duplicate events for the same webhook
// webhookEventSchema.index(
//     {
//         webhook: 1,
//         providerEventId: 1
//     },
//     {
//         unique: true,
//         partialFilterExpression: {
//             providerEventId: { $type: "string" }
//         }
//     }
// );

// export const WebhookEvent = mongoose.model(
//     "WebhookEvent",
//     webhookEventSchema
// );



import mongoose, { Schema } from "mongoose";

const webhookEventSchema = new Schema(
    {
        webhook: {
            type: Schema.Types.ObjectId,
            ref: "Webhook",
            required: true,
            index: true
        },

        providerEventId: {
            type: String,
            required: true,
            trim: true
        },

        eventType: {
            type: String,
            required: true,
            enum: [
                "deployment.started",
                "deployment.success",
                "deployment.failed",
                "test.completed"
            ],
            index: true
        },

        method: {
            type: String,
            required: true
        },

        headers: {
            type: Schema.Types.Mixed,
            default: {}
        },

        query: {
            type: Schema.Types.Mixed,
            default: {}
        },

        body: {
            type: Schema.Types.Mixed,
            default: {}
        },

        receivedAt: {
            type: Date,
            default: Date.now
        },

        processingStatus: {
            type: String,
            enum: [
                "pending",
                "processing",
                "retrying",
                "completed",
                "failed",
                "dead-lettered"
            ],
            default: "pending"
        },

        attemptCount: {
            type: Number,
            default: 0
        },

        lastError: {
            type: String,
            default: null
        },

        processingStartedAt: {
            type: Date,
            default: null
        },

        processingCompletedAt: {
            type: Date,
            default: null
        },

        failedAt: {
            type: Date,
            default: null
        },
            deadLetteredAt: {
            type: Date,
            default: null
        },

        dlqReason: {
            type: String,
            default: null
        },

        recoveryCount: {
            type: Number,
            default: 0
        },

        lastRecoveredAt: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true
    }

);

webhookEventSchema.index(
    {
        webhook: 1,
        providerEventId: 1
    },
    {
        unique: true,
        partialFilterExpression: {
            providerEventId: { $type: "string" }
        }
    }
);

export const WebhookEvent = mongoose.model(
    "WebhookEvent",
    webhookEventSchema
);
