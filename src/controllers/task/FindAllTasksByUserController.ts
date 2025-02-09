import { NextFunction, Request, Response } from "express";
import { TAllTasksResponseDto } from "../../usecases/task/findAll/TAllTasksResponseDto";
import { StatusCodes } from "http-status-codes";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { TFindUserRequestDto } from "../../usecases/user/findOne/TFindUserRequest";
import { FindAllTasksByUser } from "../../usecases/task/findAllTasksByUser/FindAllTasksByUser";
import { MongodbUserRepository } from "../../repository/user/MongodbUserRepository";

const taskRepository = new MongoDBTaskRepository;
const userRepository = new MongodbUserRepository;
const findAllTasksByUser = FindAllTasksByUser.create(userRepository, taskRepository);

export const FindAllTasksByUserController = async (
    req: Request<TFindUserRequestDto>,
    res: Response<TAllTasksResponseDto>,
    next: NextFunction) => {

    try {
        const tasks = await findAllTasksByUser.execute(
            {
                id: req.params.id
            }
        );
        
        res.status(StatusCodes.OK).json(tasks);
    }
    catch(err){
        next(err);
    }
}