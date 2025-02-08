/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { TRequestCreateTaskDto } from "../../usecases/task/create/TRequestCreateTaskDto";
import { TTaskResponseDto } from "../../usecases/task/TTaskResponseDto";
import { CreateTask } from "../../usecases/task/create/CreateTask";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { StatusCodes } from "http-status-codes";
import { TErrorResponse } from "../TErrorResponse";

const mongodb = new MongoDBTaskRepository;
const createTaskCase = CreateTask.create(mongodb);

export const CreateTaskController = async (
    req: Request<{}, {}, TRequestCreateTaskDto>,
    res: Response<TTaskResponseDto | TErrorResponse>) => {

    try {
        const response = await createTaskCase.execute(req.body);

        res.status(StatusCodes.CREATED).json(response);
    } 
    catch(err){
        const error = {
            code: StatusCodes.BAD_REQUEST,
            message: (err as Error).message
        }
        
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
} 