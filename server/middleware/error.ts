import ErrorHandler from "../utils/ErrorHandler";
import {Request, Response, NextFunction} from "express";

export const ErrorMiddleWare = (err:any, req:Request, res:Response, next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    // wrong mongodb id server
    if(err.name === "CastError") {
        const message = `Resource not Found Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong jwt error
    if(err.name === "jsonWebTokenError") {
        const message = `Json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT expires error
    if(err.name === "TokenExpiredError") {
        const message = `Json web token is expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}




















