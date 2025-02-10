import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const healthCheck = (_: Request, res: Response) => {
    console.log("OK: HEALTH CHECKED");
    res.status(StatusCodes.OK).end();
}