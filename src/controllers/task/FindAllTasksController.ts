import { NextFunction, Request, Response } from "express";
import { TAllTasksResponseDto } from "../../usecases/task/findAll/TAllTasksResponseDto";
import { StatusCodes } from "http-status-codes";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { FindAllTasks } from "../../usecases/task/findAll/FindAllTasks";

const taskRepository = new MongoDBTaskRepository;
const findAllTasks = FindAllTasks.create(taskRepository);

export const FindAllTasksController = async (
    _: Request,
    res: Response<TAllTasksResponseDto>,
    next: NextFunction) => {

    try {
        const tasks = await findAllTasks.execute();
        res.status(StatusCodes.OK).json(tasks);
    }
    catch(err){
        next(err);
    }
}