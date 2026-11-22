
import mongoose, { Schema } from "mongoose";

const historySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        method: {
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },

        url: {
            type: String,
            required: true,
            trim: true
        },

        headers: {
            type: Schema.Types.Mixed,
            default: {}
        },

        auth: {
            type: Schema.Types.Mixed,
            default: {}
        },

        body: {
            type: String,
            default: ""
        },

        status: {
            type: Number,
            default: null
        },

        statusText: {
            type: String,
            default: ""
        },

        responseTime: {
            type: Number,
            default: null
        },

        responseData: {
            type: Schema.Types.Mixed,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const History = mongoose.model(
    "History",
    historySchema
);
