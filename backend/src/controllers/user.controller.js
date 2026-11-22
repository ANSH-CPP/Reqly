import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId)=>{
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false
    });

    return {
        accessToken,
        refreshToken
    };
};

const registerUser = asyncHandler( async(req,res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        throw new ApiError(
            400,
            "Username, email and password are required"
        )
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existingUser){
        throw new ApiError(
            409,
            "Username or email already exists"
        );
    }

    const user = await User.create({
        username,
        email,
        password
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            "User registered successfully"
        )
    )
})

const loginUser = asyncHandler( async(req, res) =>{
    const { email , password } = req.body;
    if(!email || !password){
        throw new ApiError(
            400,
            "Email and password is required"
        )
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(
            404,
            "User does not exist"
        )
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(
            401,
            "Invlaid email or password"
        )
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: false
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged in successfully"
            )
        );

})


const getProfile = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User profile fetched successfully"
        )
    );
});


const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: false
    };

    return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken",cookieOptions)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    // 1. Get refresh token from cookie
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(
            401,
            "Refresh token is required"
        );
    }

    // 2. Verify refresh token
    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    // 3. Find user from decoded token
    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(
            401,
            "Invalid refresh token"
        );
    }

    // 4. Compare incoming refresh token
    // with refresh token stored in database
    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(
            401,
            "Refresh token is expired or used"
        );
    }

    // 5. Generate new tokens
    const {
        accessToken,
        refreshToken
    } = await generateAccessAndRefreshTokens(user._id);

    // 6. Set new tokens in cookies
    const cookieOptions = {
        httpOnly: true,
        secure: false
    };

    // 7. Send response
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "Access token refreshed successfully"
            )
        );
});



export {registerUser, loginUser, getProfile, logoutUser,refreshAccessToken}