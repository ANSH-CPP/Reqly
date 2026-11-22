import {Queue} from "bullmq"
import { redisConnection } from "../config/redis.js"

// create incoming webhook queue
const incomingWebhookQueue = new Queue(
    "incoming-webhooks",
    {
        connection: redisConnection,

        defaultJobOptions: {
            attempts: 5,
            backoff: {
                type: "exponential",
                delay: 2000
            },

            removeOnComplete: 1000,
            removeOnFail: false
        }
    }
);

// Add an incoming webhook event to the queue
// const addIncomingWebhookJob = async (eventId)=>{
//     const job = await incomingWebhookQueue.add(
//         "process-incoming-webhook",
//         {
//             eventId: eventId.toString()
//         },
//         {
//             jobId: eventId.toString()
//         }
//     );
//     return job;
// };


const addIncomingWebhookJob = async (
    eventId,
    customJobId = eventId.toString()
) => {
    const job = await incomingWebhookQueue.add(
        "process-incoming-webhook",
        {
            eventId: eventId.toString()
        },
        {
            jobId: customJobId
        }
    );

    return job;
};


export {
    incomingWebhookQueue,
    addIncomingWebhookJob
};