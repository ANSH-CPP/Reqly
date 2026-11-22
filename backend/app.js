import dotenv from "dotenv";
import { historyRouter } from "./src/routes/history.routes.js";
dotenv.config({
    path: "./.env"
});
import { requestRouter } from "./src/routes/request.routes.js";

import { webhookRouter } from "./src/routes/webhook.routes.js";

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./src/middlewares/errorHandler.js"
import { userRouter } from "./src/routes/user.routes.js"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    // origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser())

console.log("routing is started")
// app.use("/api/v1/users",userRouter);
// app.use("/api/v1/history", historyRouter);




app.use("/api/v1/users", userRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/webhooks", webhookRouter);

app.use(errorHandler);
export { app };