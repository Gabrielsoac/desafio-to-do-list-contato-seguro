import { Request, Response } from "express";
import { TUsersResponseDto } from "../../usecases/user/findAll/TUsersResponseDto";
import { FindAllUsers } from "../../usecases/user/findAll/FindAllUsers";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";
import { StatusCodes } from "http-status-codes";
import { TErrorResponseDto } from "../TErrorResponse";

export const GetUsersController = async (
    req: Request<void>,
    res: Response<TUsersResponseDto | TErrorResponseDto>) => {

    const userRepository = new MongodbUserRepository;
    const FindUsers = FindAllUsers.create(userRepository); 

    try {
        const users = await FindUsers.execute();
        res.status(StatusCodes.OK).json(users);
    }
    catch (err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: (err as Error).message
            }
        );
    }
}