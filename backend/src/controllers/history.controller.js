
import { History } from "../models/history.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create one history record
const createHistory = asyncHandler(async (req, res) => {
    const {
        method,
        url,
        headers,
        auth,
        body,
        status,
        statusText,
        responseTime,
        responseData
    } = req.body;

    if (!method || !url) {
        throw new ApiError(
            400,
            "Method and URL are required"
        );
    }

    const history = await History.create({
        user: req.user._id,
        method,
        url,
        headers,
        auth,
        body,
        status,
        statusText,
        responseTime,
        responseData
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            history,
            "History created successfully"
        )
    );
});

// Fetch only the logged-in user's history
const getHistory = asyncHandler(async (req, res) => {
    const history = await History.find({
        user: req.user._id
    }).sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            history,
            "History fetched successfully"
        )
    );
});

// Delete one history record
const deleteHistory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const history = await History.findOneAndDelete({
        _id: id,
        user: req.user._id
    });

    if (!history) {
        throw new ApiError(
            404,
            "History not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            history,
            "History deleted successfully"
        )
    );
});

// Delete all history belonging to the logged-in user
const deleteAllHistory = asyncHandler(async (req, res) => {
    const result = await History.deleteMany({
        user: req.user._id
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                deletedCount: result.deletedCount
            },
            "All history deleted successfully"
        )
    );
});

export {
    createHistory,
    getHistory,
    deleteHistory,
    deleteAllHistory
};
