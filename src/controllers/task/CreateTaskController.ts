import { Request, Response } from "express";
import { IRequestCreateTaskDto } from "../../usecases/task/create/TRequestCreateTaskDto";
import { IResponseCreateTaskDto } from "../../usecases/task/create/TResponseCreateTaskDto";
import { CreateTask } from "../../usecases/task/create/CreateTask";
import { MongoDBTaskRepository } from "../../repository/task/MongoDBTaskRepository";
import { StatusCodes } from "http-status-codes";

const mongodb = new MongoDBTaskRepository;
const createTaskCase = CreateTask.create(mongodb);

export const CreateTaskController = async (
    req: Request<IRequestCreateTaskDto>, 
    res: Response<IResponseCreateTaskDto>) => {

    const response = await createTaskCase.execute(req.body);

    res.status(StatusCodes.CREATED).json(response);
} 