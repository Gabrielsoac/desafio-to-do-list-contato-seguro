/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NextFunction, Request, Response } from "express";
import { TCreateTaskRequestDto } from "./taskDtos/request/TCreateTaskRequestDto";
import { TTaskResponseDto } from "./taskDtos/response/TTaskResponseDto";
import { CreateTask } from "../../domain/usecases/task/create/CreateTask";
import { MongoDBTaskRepository } from "../../infra/repository/task/MongoDBTaskRepository";
import { StatusCodes } from "http-status-codes";

const mongodb = new MongoDBTaskRepository;
const createTaskCase = CreateTask.create(mongodb);

export const CreateTaskController = async (
    req: Request<{}, {}, TCreateTaskRequestDto>,
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