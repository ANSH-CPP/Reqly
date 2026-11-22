// import mongoose ,{Schema} from "mongoose"

// const webhookSchema = new Schema(
//     {
//         user:{
//             type: Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//             index: true
//         },
//         tokenHash: {
//             type: String ,
//             required: true,
//             unique: true
//         },
//         isActive: {
//             type: Boolean,
//             default: true
//         },
//         lastReceivedAt: {
//             type: Date,
//             default: null
//         }

//     },
//     {
//         timestamps: true
//     }
// );

// export const Webhook = mongoose.model(
//     "Webhook",
//     webhookSchema
// )



import mongoose, { Schema } from "mongoose";

const webhookSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        // Used to verify incoming webhook requests
        tokenHash: {
            type: String,
            required: true,
            unique: true
        },

        // Encrypted original token, used to display the URL again
        tokenEncrypted: {
            type: String,
            default: null,
            select: false
        },

        isActive: {
            type: Boolean,
            default: true
        },

        lastReceivedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const Webhook = mongoose.model(
    "Webhook",
    webhookSchema
);
