import { NextFunction, Request, Response } from "express";
import { TUsersResponseDto } from "../../usecases/user/findAll/TUsersResponseDto";
import { FindAllUsers } from "../../usecases/user/findAll/FindAllUsers";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";
import { StatusCodes } from "http-status-codes";

export const GetUsersController = async (
    req: Request<void>,
    res: Response<TUsersResponseDto>,
    next: NextFunction) => {

    const userRepository = new MongodbUserRepository;
    const FindUsers = FindAllUsers.create(userRepository); 

    try {
        const users = await FindUsers.execute();
        res.status(StatusCodes.OK).json(users);
    }
    catch(err){
        next(err);
    }
}