
import api from "../../api/axios";

class WebhookService {

    // Generate a new incoming webhook URL
    async generateWebhook() {
        try {
            const response = await api.post("/webhooks/generate");
            return response.data.data;
        } catch (error) {
            console.error(
                "Generate webhook error:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    // Fetch incoming webhook events
    async getEvents() {
        try {
            const response = await api.get("/webhooks/events");
            return response.data.data;
        } catch (error) {
            console.error(
                "Fetch webhook events error:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    // Recover a dead-lettered webhook event
    async recoverEvent(eventId) {
        try {
            const response = await api.post(
                `/webhooks/recover/${eventId}`
            );
            return response.data.data;
        } catch (error) {
            console.error(
                "Recover webhook event error:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    // Fetch webhook analytics
    async getAnalytics() {
        try {
            const response = await api.get("/webhooks/analytics");
            return response.data.data;
        } catch (error) {
            console.error(
                "Fetch webhook analytics error:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    async getMyWebhook() {
        try {
            const response = await api.get("/webhooks/current");
            return response.data.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null;
            }

            console.error(
                "Failed to fetch existing webhook:",
                error.response?.data || error.message
            );

            throw error;
        }
    }

}

const webhookService = new WebhookService();

export default webhookService;
