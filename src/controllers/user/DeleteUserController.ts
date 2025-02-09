import { NextFunction, Request, Response } from "express";
import { TFindUserRequestDto } from "../../domain/usecases/user/findOne/TFindUserRequest";
import { MongodbUserRepository } from "../../infra/repository/user/MongodbUserRepository";
import { DeleteUserById } from "../../domain/usecases/user/delete/DeleteUser";
import { StatusCodes } from "http-status-codes";
import { MongoDBTaskRepository } from "../../infra/repository/task/MongoDBTaskRepository";

export const DeleteUserController = async (
    req: Request<TFindUserRequestDto>,
    res: Response< void >,
    next: NextFunction) => {

    const userRepository = new MongodbUserRepository;
    const taskRepository = new MongoDBTaskRepository;
    const DeleteUser = DeleteUserById.create(userRepository, taskRepository); 

    try {
        await DeleteUser.execute(
            {
                id: req.params.id
            }
        );
        res.status(StatusCodes.OK).end();
    }
    catch(err){
        next(err);
    }
}