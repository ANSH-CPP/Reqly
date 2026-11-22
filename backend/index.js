
// import dotenv from "dotenv"

// dotenv.config({
//     path: "./.env"
// })
// import {app} from "./app.js"
// import connectDB from "./src/db/index.js"
// const PORT = process.env.PORT || 4000


// connectDB()
// .then(()=>{
//     console.log("MongoDB connected Successfully")

//     app.listen(process.env.PORT || PORT , ()=>{
//         console.log(
//             `App is listening on Port ${process.env.PORT || PORT}`
//         )
//     })
// })
// .catch((error)=>{
//     console.log("MongoDB connection failed: ", error);
// });


import "dotenv/config";

import { app } from "./app.js";
import connectDB from "./src/db/index.js";

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    });
