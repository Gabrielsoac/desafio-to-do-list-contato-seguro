import { NextFunction, Request, Response } from "express";
import { TUsersResponseDto } from "../../domain/usecases/user/findAll/TUsersResponseDto";
import { FindAllUsers } from "../../domain/usecases/user/findAll/FindAllUsers";
import { MongodbUserRepository } from "../../infra/repository/user/MongodbUserRepository";
import { StatusCodes } from "http-status-codes";

export const GetUsersController = async (
    _: Request<void>,
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