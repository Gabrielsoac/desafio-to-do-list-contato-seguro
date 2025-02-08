/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from "express";
import { TRequestCreateTaskDto } from "../../usecases/task/create/TRequestCreateTaskDto";
import { TTaskResponseDto } from "../../usecases/task/TTaskResponseDto";
import { CreateTask } from "../../usecases/task/create/CreateTask";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { StatusCodes } from "http-status-codes";

const mongodb = new MongoDBTaskRepository;
const createTaskCase = CreateTask.create(mongodb);

export const CreateTaskController = async (
    req: Request<{}, {}, TRequestCreateTaskDto>,
    res: Response<TTaskResponseDto>,
    next: NextFunction) => {

    try {
        const response = await createTaskCase.execute(req.body);

        res.status(StatusCodes.CREATED).json(response);
    } 
    catch(err){
        next(err);
    }
} 