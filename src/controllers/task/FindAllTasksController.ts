import { Request, Response } from "express";
import { TAllTasksResponseDto } from "../../usecases/task/findAll/TAllTasksResponseDto";
import { TErrorResponse } from "../TErrorResponse";
import { StatusCodes } from "http-status-codes";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { FindAllTasks } from "../../usecases/task/findAll/FindAllTasks";

const taskRepository = new MongoDBTaskRepository;
const findAllTasks = FindAllTasks.create(taskRepository);

export const FindAllTasksController = async (
    req: Request,
    res: Response<TAllTasksResponseDto | TErrorResponse>) => {

    try {
        const tasks = await findAllTasks.execute();
        res.status(StatusCodes.OK).json(tasks);
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                code: StatusCodes.INTERNAL_SERVER_ERROR,
                message: (err as Error).message
            }
        );
    }
    
}