import Router from "express"
import { registerUser ,loginUser, getProfile, logoutUser, refreshAccessToken} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"


const router = Router();

console.log("Register route loaded");
router.post("/register",registerUser);

console.log("Login route is starting")
router.post("/login",loginUser);

router.get("/profile", verifyJWT, getProfile);
router.post("/logout", verifyJWT, logoutUser);


// router.post("/logout", (req, res) => {
//     console.log("LOGOUT ROUTE HIT");

//     return res.json({
//         message: "Logout route working"
//     });
// });

router.post("/refresh-token", refreshAccessToken);

export {router as userRouter}
