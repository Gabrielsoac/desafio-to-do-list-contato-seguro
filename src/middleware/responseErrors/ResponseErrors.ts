/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../../errors/user/UserNotFoundError";
import { StatusCodes } from "http-status-codes";

export const ResponseError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction) => {

    if(err instanceof UserNotFoundError) {
        res.status(err.statusCode).json(
            {
                statusCode: err.statusCode,
                message: err.message
            }
        )
    }

    console.log(err);
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            statusCode: 500,
            message: "Internal Server Error"
            }
        );
}