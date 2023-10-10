import {Request, Response, NextFunction} from "express";
import {CatchAsyncError} from "../middleware/catchAsyncErrors";

export const isAuthenticated = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return next(new ErrorHandler("Please login to access this resource", 400));
    }
})