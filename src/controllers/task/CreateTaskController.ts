/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { TRequestCreateTaskDto } from "../../usecases/task/create/TRequestCreateTaskDto";
import { TResponseCreateTaskDto } from "../../usecases/task/create/TResponseCreateTaskDto";
import { CreateTask } from "../../usecases/task/create/CreateTask";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { StatusCodes } from "http-status-codes";
import { TErrorResponseDto } from "../TErrorResponseDto";

const mongodb = new MongoDBTaskRepository;
const createTaskCase = CreateTask.create(mongodb);

export const CreateTaskController = async (
    req: Request<{}, {}, TRequestCreateTaskDto>,
    res: Response<TResponseCreateTaskDto | TErrorResponseDto>) => {

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