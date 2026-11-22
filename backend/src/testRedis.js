
import { redisConnection } from "./config/redis.js";

const testRedis = async () => {
    try {
        const response = await redisConnection.ping();

        console.log("Redis Ping Response:", response);

        await redisConnection.set("api-checker:test", "Redis Working!");

        const value = await redisConnection.get("api-checker:test");

        console.log("Redis Stored Value:", value);
    } catch (error) {
        console.error("Redis test failed:", error);
    } finally {
        await redisConnection.quit();
    }
};

testRedis();
