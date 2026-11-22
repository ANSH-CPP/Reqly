
import Redis from "ioredis";

const redisConnection = new Redis(
    process.env.REDIS_URL || "redis://127.0.0.1:6379",
    {
        maxRetriesPerRequest: null,
    }
);


// this .on is part of javascript and below events provided by ioredis

// "connect" → Event name provided by ioredis.
// "ready" → Event name provided by ioredis.
// "error" → Event name provided by ioredis.
// .on() → Method used to listen for events.
// () => {} → Callback function executed when the event occurs.


redisConnection.on("connect", () => {
    console.log("Redis connected successfully");
});

redisConnection.on("ready", () => {
    console.log("Redis is ready to accept commands");
});

redisConnection.on("error", (error) => {
    console.error("Redis connection error:", error.message);
});

export { redisConnection };
