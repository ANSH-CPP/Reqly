import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

const deadLetterQueue = new Queue(
    "dead-letter-webhooks",
    {
        connection: redisConnection,
        defaultJobOptions: {
            removeOnComplete: false,
            removeOnFail: false
        }
    }
);

const addToDeadLetterQueue = async (eventId, reason) => {
    const job = await deadLetterQueue.add(
        "failed-webhook",
        {
            eventId: eventId.toString(),
            reason
        },
        {
            jobId: eventId.toString()
        }
    );

    return job;
};

export {
    deadLetterQueue,
    addToDeadLetterQueue
};
