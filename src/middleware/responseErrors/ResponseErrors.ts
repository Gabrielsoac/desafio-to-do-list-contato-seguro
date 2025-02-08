/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../../errors/user/UserNotFoundError";
import { StatusCodes } from "http-status-codes";
import { UserAlreadyExistsError } from "../../errors/user/UserAlreadyExistsError";
import { TaskNotFoundError } from "../../errors/task/TaskNotFoundException";

export const ResponseError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message
        });
    }

    if (err instanceof UserAlreadyExistsError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message
        });
    }

    if (err instanceof TaskNotFoundError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message
        });
    }

    console.error(err); 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: "Internal Server Error"
    });
};
